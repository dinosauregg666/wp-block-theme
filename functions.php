<?php

add_action('wp-enqueue_scripts', 'university_features');

function university_features() {
    add_editor_style(array('build/style-index.css', 'build/index.css'));
}

class JSXBlock {
    function __construct($name, $renderCallback = null) {
        $this->name = $name;
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

        if ($this->renderCallback) {
            $ourArgs['render_callback'] = [$this, 'ourRenderCallBack'];
        }

        register_block_type("ourblocktheme/{$this->name}", $ourArgs);
    }
}

new JSXBlock('banner', true);
new JSXBlock('genericheading');
new JSXBlock('genericbutton');