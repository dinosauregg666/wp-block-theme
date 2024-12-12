wp.blocks.registerBlockType('ourblocktheme/page', {
    title: 'Single Page',
    supports: { // 让模块宽度为满宽
        align: ['full']
    },
    edit: function() {
        return wp.element.createElement('div', {className: 'our-placeholder-block'}, 'Single Page Placeholder')
    },
    save: function() {
        return null
    }
})