<?php
have_posts();
while (have_posts()) {
    the_post();
    ?>
    <h3><?php the_title(); ?></h3>
    <div><?php the_content(); ?></div>
    <?php
}
?>
