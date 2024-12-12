wp.blocks.registerBlockType('ourblocktheme/footer', {
    title: 'Footer',
    supports: { // 让模块宽度为满宽
        align: ['full']
    },
    edit: function() {
        return wp.element.createElement('div', {className: 'our-placeholder-block'}, 'Footer Placeholder')
    },
    save: function() {
        return null
    }
})