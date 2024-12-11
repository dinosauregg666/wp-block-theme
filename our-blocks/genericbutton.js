import ourColors from "../inc/ourColors"
import {link} from "@wordpress/icons"
import {ToolbarGroup, ToolbarButton, Popover, Button, PanelBody, PanelRow, ColorPalette} from "@wordpress/components"
import { RichText, BlockControls, __experimentalLinkControl as LinkControl, InspectorControls, getColorObjectByColorValue} from '@wordpress/block-editor'
import { registerBlockType } from '@wordpress/blocks'
import { useState } from '@wordpress/element'


registerBlockType('ourblocktheme/genericbutton', {
    title: 'Generic Button',
    attributes: {
        text: {type: 'string'},
        size: {type: 'string', default: 'large'},
        linkObject: {type: 'object', default: {url: '#'}},
        colorName: {type: 'string', default: 'blue'}
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

    const currentColorValue = ourColors.filter(color => {
        return color.name == props.attributes.colorName
    })[0].color

    function handleColorChange(colorCode) {
        const { name } = getColorObjectByColorValue(ourColors, colorCode) // 该函数是根据颜色16进制值获取颜色名称并保存到ourColors数组中，再返回颜色名称
        props.setAttributes({colorName: name})
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
                        <ColorPalette disableCustomColors={true} clearable={false} colors={ourColors} value={currentColorValue} onChange={handleColorChange} />
                    </PanelRow>
                </PanelBody>
            </InspectorControls>
            <RichText allowedFormats={[]} tagName="a" className={`btn btn--${props.attributes.size} button btn--${props.attributes.colorName}`} value={props.attributes.text} onChange={handleTextChange} />
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
        <a href={props.attributes.linkObject.url} className={`btn btn--${props.attributes.size} button btn--${props.attributes.colorName}`}>
            {props.attributes.text}
        </a>
    )
}