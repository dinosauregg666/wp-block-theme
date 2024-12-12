wp.blocks.registerBlockType('ourblocktheme/singlepost', {
    title: 'Single Post',
    supports: { // 让模块宽度为满宽
        align: ['full']
    },
    edit: function() {
        return wp.element.createElement('div', {className: 'our-placeholder-block'}, 'Single Post Placeholder')
    },
    save: function() {
        return null
    }
})