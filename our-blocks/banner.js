import { InnerBlocks } from '@wordpress/block-editor'

wp.blocks.registerBlockType('ourblocktheme/banner', {
    title: 'Banner',
    edit: EditComponent,
    save: SaveComponent
})

function EditComponent() {
    const useMelater = (
        <>
            <p>this is a inner blocks.</p>
        </>
    )

    return (
        <div>
            <img src={{backgroundImg: "/wp-content/themes/fictional-block-theme/images/library-hero.jpg"}} alt=""/>
            <p>this is editing area</p>
            <div>
                {/*限制用户可以添加的模块*/}
                <InnerBlocks allowedBlocks={['core/paragraph', 'core/heading', 'core/list']} />
            </div>
        </div>
    )
}

function SaveComponent() {
    return (
        <div>
            <img src={{backgroundImg: "/wp-content/themes/fictional-block-theme/images/library-hero.jpg"}} alt=""/>
            <p>this is editing area</p>
            <div>
                <InnerBlocks.Content />
            </div>
        </div>
    )
}