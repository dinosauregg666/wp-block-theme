wp.blocks.registerBlockType('ourblocktheme/blogindex', {
    title: 'Blog Index',
    supports: { // 让模块宽度为满宽
        align: ['full']
    },
    edit: function() {
        return wp.element.createElement('div', {className: 'our-placeholder-block'}, 'Blog Index Placeholder')
    },
    save: function() {
        return null
    }
})