import { InnerBlocks } from '@wordpress/block-editor'
import { registerBlockType } from '@wordpress/blocks'


registerBlockType('ourblocktheme/slideshow', {
    title: 'Slideshow',
    supports: { // 让模块宽度为满宽
        align: ['full']
    },
    attributes: {
        align: {type: 'string', default: 'full'},
    },
    edit: EditComponent,
    save: SaveComponent
})

function EditComponent(props) {

    return (
        <div style={{backgroundColor: '#333', padding: '35px'}} >
            <p>Slideshow</p>
            <InnerBlocks allowedBlocks={['ourblocktheme/slide']} />
        </div>
    )
}

function SaveComponent() {
    return <InnerBlocks.Content />
}