import { fullBlog } from "@/app/lib/interface";
import client, { urlFor } from "@/app/lib/sanity";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { useRouter } from 'next/router';

async function getData(slug:any ) {
    const query = `
     *[_type=="blog" && slug.current =="初级前端面试题总结"] {
  "currentSlug":slug.current,   
   title,
   content, 
    titleImage
  }[0]`;
    const data = await client.fetch(query);
    return data;

}

export default async function BlogContent({
    params,
}:{
    params:{slug:string}}) {
    const data: fullBlog = await getData(params.slug)
    
    return (
        <div>
            <h1>
                <span style={{display:'block'}}>
                    BLog
                </span>
                <span style={{marginTop:'2'}}>
                    {data.title}
                </span>
            </h1>

            <Image 
             src={urlFor(data.titleImage).url()} 
             alt="Title Image" width={800} height={800} 
             style={{border:'1px'}} 
             priority
             />
     <div style={{marginTop:'16'}} className="prose prose-lg mx-auto lg:prose-xl">
<PortableText value={data.content} />

     </div>
        </div>
    )
}