'use client'
import Image from "next/image";
import client, { urlFor } from "./lib/sanity";
import { simpleBlogCard } from "./lib/interface";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from 'react';
import GetList from "./components/GetData/GetList";


//你可以在组件内部使用React的useEffect来处理异步数据获取。 不用使用async
export default  function Home() { //内容在服务器上运行 完全安全
  // const data: simpleBlogCard[] =  GetList()    //必须让组件也是异步，才可以异步获取数据
  const [data, setData] = useState<simpleBlogCard[]>([]);
  const [showOnlyImage, setShowOnlyImage] = useState(false);
    const toggleImageOnlyView = () => {
        setShowOnlyImage(c => !c);
      };
      useEffect(() => {
        const fetchData = async () => {
          try {
            const dataList = await GetList(); // 确保GetList是一个返回Promise<simpleBlogCard[]>的异步函数
            setData(dataList);
          } catch (error) {
            console.error("Error fetching data:", error);
            // 可以在此处处理错误，比如设置错误状态等
          }
        };
    
        fetchData();
      }, []); 
  return (
    <div className="grid grid-cols-1  md:grid-cols-2 mt-5">
      {/* tainWind Css 设置样式的方法 grid代表网格布局  ，默认情况网格布局只有一列，中等屏幕变成两列。 mt-5设置上外边距5px */}
      <Button onClick={toggleImageOnlyView} className="my-4">
        {showOnlyImage ? '显示全文' : '仅显示图片'}
      </Button><br></br>
      {data.map((post, idx) => (
        <Card key={idx}  style={{height:"400px",margin:"20px 10px",position:'relative'}}>
          {post.titleImage&&<Image 
          src={urlFor(post.titleImage).url()} 
          alt="image" width={500} height={500} 
          className="rounded-t-lg h-[200px] object-cover"
         
          />}
          <CardContent className="mt-5"><h3>{post.title}</h3></CardContent>
          <p className="line-clamp-3 text-sm mt-2 text-gray-600 dark:text-gray-300">{post.smallDescription}</p>
          <CardContent style={{textAlign:'center'}}>{post.date}</CardContent>
          <Button  asChild  style={{ position: 'absolute', 
      bottom: 0, width:'100%'}}>
            <Link href={`/blog/${post.currentSlug}`}>了解更多</Link>
          </Button>
        </Card> 
      ))}
    </div>
  );
}