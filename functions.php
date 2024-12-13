<?php

add_action('wp_enqueue_scripts', 'university_features');

function university_features() {
    add_theme_support('editor-styles'); // 确保编辑器样式被支持
    add_editor_style(array('build/style-index.css', 'build/index.css'));
    add_image_size('pageBanner', 1500, 350, true); // 不知道为啥不生效
}

class PlaceholderBlock {
    function __construct($name) {
        $this->name = $name;
        add_action('init', [$this, 'onInit']);
    }

    function ourRenderCallBack($attributes, $content) {
        ob_start();

        require get_theme_file_path("/our-blocks/{$this->name}.php");

        return ob_get_clean();
    }

    function onInit() {
        wp_register_script($this->name, get_stylesheet_directory_uri() . "/our-blocks/{$this->name}.js", array('wp-blocks', 'wp-editor'));
        register_block_type("ourblocktheme/{$this->name}", array(
            'editor_script' => $this->name,
            'render_callback' => [$this, 'ourRenderCallBack']
        ));
    }
}

new PlaceholderBlock('eventsandblogs');
new PlaceholderBlock('header');
new PlaceholderBlock('footer');
new PlaceholderBlock('singlepost');
new PlaceholderBlock('page');
new PlaceholderBlock('blogindex');
new PlaceholderBlock('programarchive');
new PlaceholderBlock('singleprogram');


class JSXBlock {
    function __construct($name, $renderCallback = null, $data = null) {
        $this->name = $name;
        $this->data = $data;
        $this->renderCallback = $renderCallback;
        add_action('init', [$this, 'onInit']);
    }

    function ourRenderCallBack($attributes, $content) {
        ob_start();

        require get_theme_file_path("/our-blocks/{$this->name}.php");

        return ob_get_clean();
    }

    function onInit() {
        wp_register_script($this->name, get_stylesheet_directory_uri() . "/build/{$this->name}.js", array('wp-blocks', 'wp-editor'));

        $ourArgs = array(
            'editor_script' => $this->name
        );

        if($this->data) {
            wp_localize_script($this->name, $this->name, $this->data);
        }

        if ($this->renderCallback) {
            $ourArgs['render_callback'] = [$this, 'ourRenderCallBack'];
        }

        register_block_type("ourblocktheme/{$this->name}", $ourArgs);
    }
}

new JSXBlock('banner', true, ['fallbackimage' => get_theme_file_uri('/images/library-hero.jpg')]);
new JSXBlock('genericheading');
new JSXBlock('genericbutton');
new JSXBlock('slideshow', true);
new JSXBlock('slide', true, ['themeimagepath' => get_theme_file_uri('/images/')]);


// 限制block可以在哪用
function myallowedblocks($allowed_block_types, $editor_context) {

    if(!empty($editor_context->post->post_type=="professor")) {
        return array('core/paragraph');
    }

    if(!empty($editor_context->post)) { // 当为post类型的编辑模式时，允许所有使用所有block
        return $allowed_block_types;
    }

    // 否则编辑模板时，只允许使用以下两个block
    return array('ourblocktheme/header', 'ourblocktheme/footer');
}

add_filter('allowed_block_types_all', 'myallowedblocks', 10, 2);