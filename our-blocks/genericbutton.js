import {link} from "@wordpress/icons"
import {ToolbarGroup, ToolbarButton, Popover, Button, PanelBody, PanelRow, ColorPalette} from "@wordpress/components"
import { RichText, BlockControls, __experimentalLinkControl as LinkControl, InspectorControls} from '@wordpress/block-editor'
import { registerBlockType } from '@wordpress/blocks'
import { useState } from '@wordpress/element'


registerBlockType('ourblocktheme/genericbutton', {
    title: 'Generic Button',
    attributes: {
        text: {type: 'string'},
        size: {type: 'string', default: 'large'},
        linkObject: {type: 'object', default: {url: '#'}},
        colorName: {type: 'string'}
    },
    edit: EditComponent,
    save: SaveComponent
})

function EditComponent(props) {
    const [isLinkPickerVisible, setIsLinkPickerVisible] = useState(false)

    function handleTextChange(x) {
        props.setAttributes({text: x})
    }

    function buttonHandler() {
        setIsLinkPickerVisible(prev => !prev)
    }

    function handleLinkChange(newLink) {
        console.log(newLink, 8888)
        props.setAttributes({linkObject: newLink})
    }

    const ourColors = [
        {name: 'blue', color: '#0d3b66'},
        {name: 'orange', color: '#ee964b'},
        {name: 'dark-orange', color: '#f95738'},
    ]

    function handleColorChange(colorCode) {
        props.setAttributes({colorName: colorCode})
    }

    return (
        <>
            {/*为选中出现的设置栏提供选项*/}
            <BlockControls>
                <ToolbarGroup>
                    <ToolbarButton onClick={buttonHandler} icon={link}  />
                </ToolbarGroup>
                <ToolbarGroup>
                    <ToolbarButton isPressed={props.attributes.size === 'large'} onClick={() => props.setAttributes({size: 'large'})}>Large</ToolbarButton>
                    <ToolbarButton isPressed={props.attributes.size === 'Medium'} onClick={() => props.setAttributes({size: 'medium'})}>Medium</ToolbarButton>
                    <ToolbarButton isPressed={props.attributes.size === 'Small'} onClick={() => props.setAttributes({size: 'small'})}>Small</ToolbarButton>
                </ToolbarGroup>
            </BlockControls>
            <InspectorControls>
                <PanelBody title="Color" initialOpen={true}>
                    <PanelRow>
                        <ColorPalette color={ourColors} value={props.attributes.colorName} onChange={handleColorChange} />
                    </PanelRow>
                </PanelBody>
            </InspectorControls>
            <RichText allowedFormats={[]} tagName="a" className={`btn btn--${props.attributes.size} button`} value={props.attributes.text} onChange={handleTextChange} />
            {isLinkPickerVisible && (
                <Popover position="middle center">
                    <LinkControl settings={[]} value={props.attributes.linkObject} onChange={handleLinkChange} />
                    <Button variant="primary" onClick={() => setIsLinkPickerVisible(false)} style={{display: "block", width: "100%"}}>Confirm Link</Button>
                </Popover>
            )}
        </>
    )
}

function SaveComponent(props) {
    return (
        <a href={props.attributes.linkObject.url} className={`btn btn--${props.attributes.size} button`}>
            {props.attributes.text}
        </a>
    )
}