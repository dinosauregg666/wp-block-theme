<?php

add_action('wp-enqueue_scripts', 'university_features');

function university_features() {
    add_editor_style(array('build/style-index.css', 'build/index.css'));
}



function bannerBlock() {
    wp_register_script('bannerBlockScript', get_stylesheet_directory_uri() . '/build/banner.js', array('wp-blocks', 'wp-editor'));
    register_block_type('ourblocktheme/banner', array(
        'editor_script' => 'bannerBlockScript'
    ));
}

add_action('init', 'bannerBlock');