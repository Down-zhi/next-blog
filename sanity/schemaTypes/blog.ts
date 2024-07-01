

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
            name:'date',
            type:'date',
            title:'Publication Date',
            "options": { 
                "dateFormat": "YYYY-MM-DD", 
                "calendarTodayLabel": "Today" 
              }

        },
        {
            name:'slug',
            type:'slug',
            title:'Slug of your blog article',
            options:{
                source:'title',
                // slugify: (input: string) => input 后面取数据要它的全部值根本不需要配置这个
                // .toLowerCase() 
                // .replace(/\s+/g, '-') 
                // .replace(/[\u4e00-\u9fa5]/g, '') 
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