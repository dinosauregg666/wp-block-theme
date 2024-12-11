import { InnerBlocks } from '@wordpress/block-editor'
import { registerBlockType } from '@wordpress/blocks'

registerBlockType('ourblocktheme/banner', {
    title: 'Banner',
    supports: { // 让模块宽度为满宽
      align: ['full']
    },
    attributes: {
        align: {type: 'string', default: 'full'}
    },
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
                <InnerBlocks allowedBlocks={['ourblocktheme/genericheading', 'ourblocktheme/genericbutton',]} />
            </div>
        </div>
    )
}

function SaveComponent() {
    return <InnerBlocks.Content />
}