

export default {
    name:'blog',
    type:'document',
    title:'Blog',
    fields:[
        {
            name:'title',
            type:'string',
            title:'Title of blog article',
        },
        {
            name:'slug',
            type:'slug',
            title:'Slug of your blog article',
            options:{
                source:'title',
                slugify: (input: string) => input
                .toLowerCase() 
                .replace(/\s+/g, '-') 
                // .replace(/[\u4e00-\u9fa5]/g, '') // 移除中文字符，如果需要中文slug则不需要这行
                }
        },
        {
            name:'titleImage',
            type:'image',
            title:'Title Image'
        },
        {
            name:'smallDescription',
            type:'text',
            title:'Small Description'
        },
          {
            name:'content',
            type:'array',
            title:'Content',
            of:[
                {type:'block'}
            ]
        },
    ]
}