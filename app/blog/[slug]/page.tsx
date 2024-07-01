
import { fullBlog } from "@/app/lib/interface";
import client, { urlFor } from "@/app/lib/sanity";
import { Button } from "@/components/ui/button";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/router';


//30秒就重新验证获取新数据
export const revalidate=30 

async function getData(slug:any ) {
    const decodedStr = decodeURIComponent(slug)//将url编码进行解码
    const query = `
     *[_type=="blog" && slug.current =="${decodedStr}"] {
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
    params:{slug:any}}) {
 
    const data: fullBlog = await getData(params.slug);
   
    return (
        <div>
            <h1>
           
                <span style={{display:'block'}}>
                    BLog
                </span>
                <span style={{marginTop:'2'}}>
                    {data&& data.title}
                </span>
            </h1>
           { data.titleImage&&<Image 
             src={urlFor(data.titleImage).url()} 
             alt="Title Image" width={800} height={800} 
             style={{border:'1px'}} 
             priority
             />}
     <div style={{marginTop:'16'}} className="prose prose-lg mx-auto lg:prose-xl">
<PortableText value={data.content} />

     </div>
        </div>
    )
}