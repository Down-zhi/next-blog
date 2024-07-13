'use client'

import Image from "next/image";
import client, { urlFor } from "./lib/sanity";
import { simpleBlogCard } from "./lib/interface";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from 'react';
import GetList from "./components/GetData/GetList";


// const datas=[
// { "title":'tom',
// 'currentSlug':'slug'

// } 
// ]
//你可以在组件内部使用React的useEffect来处理异步数据获取。 不用使用async
export default  function Home() { //内容在服务器上运行 完全安全
  // const data: simpleBlogCard[] =  GetList()    //必须让组件也是异步，才可以异步获取数据
  const [data, setData] = useState<simpleBlogCard[]>([]);
  const [show, setShow] = useState(true);

    const toggleView = () => {
        setShow(c => !c);
        
      };
      useEffect(() => {
        if (typeof window !== 'undefined' && !document.hasFocus()) {
          // 如果正在hydration，则跳过useEffect
          return;
        }
        const fetchData = async () => {
          try {
            console.log( '请求前'+ Date());
            const dataList = await GetList(); // 确保GetList是一个返回Promise<simpleBlogCard[]>的异步函数
            // dataList.forEach((post: { titleImage: any; }) => {
            //   console.log("Post titleImage info:", post.titleImage);
            // });
            setData(dataList);
            console.log('请求后'+ Date()) 
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
        fetchData();
    return ()=> console.log('页面销毁111')
      }, []); 
  return (
    <div className="grid grid-cols-1  md:grid-cols-2 mt-5">
      {/* tainWind Css 设置样式的方法 grid代表网格布局  ，默认情况网格布局只有一列，中等屏幕变成两列。 mt-5设置上外边距5px */}
      <Button onClick={toggleView} className="my-4">
        {show? '排列显示' : '图片显示'}
      </Button><br></br>
     { show?data.map((post, idx) => (
        <Card key={idx}  style={{height:"400px",margin:"20px 10px",position:'relative'}}>
          {post.titleImage&&
          <Image 
          src={urlFor(post.titleImage).url()} 
          alt="image" width={500} height={500} 
          className="rounded-t-lg h-[200px] object-cover"
          quality={50} placeholder = 'empty'
          />}
          <CardContent className="mt-5"><h3>{post.title}</h3></CardContent>
          <p className="line-clamp-3 text-sm mt-2 text-gray-600 dark:text-gray-300">{post.smallDescription}</p>
          <CardContent style={{textAlign:'center'}}>{post.date}</CardContent>
          <Button  asChild  style={{ position: 'absolute', 
      bottom: 0, width:'100%'}}>
            <Link href={`/blog/${post.currentSlug}`}>了解更多</Link>
          </Button>
        </Card> 
      )):data.map((post,idx)=>(
        <Card key={idx}>
 <CardContent className="mt-5"><h3>{post.title}</h3></CardContent>
 <Button  asChild >
            <Link href={`/blog/${post.currentSlug}`}>浏览一下</Link>
          </Button>
        </Card>
      ))}
    </div>
  );
}