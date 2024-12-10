<?php

add_action('wp-enqueue_scripts', 'university_features');

function university_features() {
    add_editor_style(array('build/style-index.css', 'build/index.css'));
}

class JSXBlock {
    function __construct($name) {
        $this->name = $name;
        add_action('init', [$this, 'onInit']);
    }

    function onInit() {
        wp_register_script($this->name, get_stylesheet_directory_uri() . "/build/{$this->name}.js", array('wp-blocks', 'wp-editor'));
        register_block_type("ourblocktheme/{$this->name}", array(
            'editor_script' => $this->name
        ));
    }
}

new JSXBlock('banner');
new JSXBlock('genericheading');
new JSXBlock('genericbutton');