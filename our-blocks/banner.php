<?php

if(!$attributes['imgURL']) { // 不存在图片时，使用默认图片
    $attributes['imgURL'] = get_theme_file_uri('/images/library-hero.jpg');
}

?>



<div>
    <img src="<?php echo $attributes['imgURL'] ?>" alt=""/>
    <p>this is editing area</p>
    <div>
        <?php echo $content;?>
    </div>
</div>