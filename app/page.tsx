import Image from "next/image";
import client, { urlFor } from "./lib/sanity";
import { simpleBlogCard } from "./lib/interface";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const revalidate=30 
async function getData() {
  const query = `
  *[_type=='blog'] | order(_createdAt desc){
  title,
    smallDescription,
    "currentSlug":slug.current,
    titleImage
  }`

  const data = await client.fetch(query);
  return data;
}

export default async function Home() { //内容在服务器上运行 完全安全
  const data: simpleBlogCard[] = await getData()    //必须让组件也是异步，才可以异步获取数据
  console.log(data);
  
  return (
    <div className="grid grid-cols-1  md:grid-cols-2 mt-5">
      {/* tainWind Css 设置样式的方法 grid代表网格布局  ，默认情况网格布局只有一列，中等屏幕变成两列。 mt-5设置上外边距5px */}
      {data.map((post, idx) => (
        <Card key={idx}>
          <Image 
          src={urlFor(post.titleImage).url()} 
          alt="image" width={500} height={500} 
          className="rounded-t-lg h-[200px] object-cover"
          />
          <CardContent className="mt-5"><h3>{post.title}</h3></CardContent>
          <p className="line-clamp-3 text-sm mt-2 text-gray-600 dark:text-gray-300">{post.smallDescription}</p>
          <Button  asChild className="mt-7 w-full">
            <Link href={`/blog/${post.currentSlug}`}>了解更多</Link>
          </Button>
        </Card>

        
      ))}
    </div>
  );
}
