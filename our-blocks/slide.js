import apiFetch from '@wordpress/api-fetch'
import {Button, PanelBody, PanelRow} from '@wordpress/components'
import { InnerBlocks, InspectorControls, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor'
import { registerBlockType } from '@wordpress/blocks'
import {useEffect} from "@wordpress/element"

registerBlockType('ourblocktheme/slide', {
    title: 'Slide',
    supports: { // 让模块宽度为满宽
        align: ['full']
    },
    attributes: {
        align: {type: 'string', default: 'full'},
        imgID: {type: 'number'},
        imgURL: {type: 'string', default: window.banner.fallbackimage},
        themeimage: {type: 'string'}
    },
    edit: EditComponent,
    save: SaveComponent
})

function EditComponent(props) {

    useEffect(function() {
        if(props.attributes.themeimage) {
            props.setAttributes({imgURL:`${slide.themeimagepath}${props.attributes.themeimage}`})

        }
        console.log(props.attributes.themeimage)
    }, [])

    useEffect(function() {
        if(props.attributes.imgID) {
            async function go() {
                const response = await apiFetch({
                    path:`/wp/v2/media/${props.attributes.imgID}`,
                    method: 'GET'
                })
                console.log(response)
                props.setAttributes({themeimage: '', imgURL: response.media_details.sizes.full.source_url})
            }
            go()
        }
    }, [props.attributes.imgID])

    function onFileSelect(x) {
        props.setAttributes({imgID: x.id})
    }

    return (
        <>
            <InspectorControls>
                <PanelBody title="Background" initialOpen={true}>
                    <PanelRow>
                        <MediaUploadCheck>
                            <MediaUpload onSelect={onFileSelect} value={props.attributes.imgID} render={({open}) => {
                                return <Button onClick={open}>close image</Button>
                            }} />
                        </MediaUploadCheck>
                    </PanelRow>
                </PanelBody>
            </InspectorControls>

            <div>
                <img style={{width: '100px', height: '100px'}} src={props.attributes.imgURL} alt=""/>
                <p>this is editing area</p>
                <div>
                    {/*限制用户可以添加的模块*/}
                    <InnerBlocks allowedBlocks={['ourblocktheme/genericheading', 'ourblocktheme/genericbutton',]} />
                </div>
            </div>
        </>
    )
}

function SaveComponent() {
    return <InnerBlocks.Content />
}