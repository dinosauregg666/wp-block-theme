import { registerBlockType } from '@wordpress/blocks'

registerBlockType('ourblocktheme/genericheading', {
    title: 'Generic Heading',
    edit: EditComponent,
    save: SaveComponent
})

function EditComponent() {
    return (
        <div>
            Generic hello
        </div>
    )
}

function SaveComponent() {
    return (
        <div>
            save area
        </div>
    )
}