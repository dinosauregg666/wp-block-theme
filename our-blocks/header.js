wp.blocks.registerBlockType('ourblocktheme/header', {
    title: 'Header',
    supports: { // 让模块宽度为满宽
        align: ['full']
    },
    edit: function() {
        return wp.element.createElement('div', {className: 'our-placeholder-block'}, 'Header Placeholder')
    },
    save: function() {
        return null
    }
})