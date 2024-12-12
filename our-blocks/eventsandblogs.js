wp.blocks.registerBlockType('ourblocktheme/eventsandblogs', {
    title: 'Events Blogs',
    supports: { // 让模块宽度为满宽
        align: ['full']
    },
    edit: function() {
        return wp.element.createElement('div', {className: 'our-placeholder-block'}, 'Events And Blogs Placeholder')
    },
    save: function() {
        return null
    }
})