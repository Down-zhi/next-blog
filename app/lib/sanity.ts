import  ImageUrlBuilder  from "@sanity/image-url";
import { createClient } from "next-sanity";

const client =createClient({
    apiVersion:'1',
    dataset:'production' , //安装sanity设置的
   projectId:'8pz63m6i',
   useCdn:false //内置缓存就不用CDN了
})
const builder = ImageUrlBuilder(client)
export function urlFor(source:any){
    return builder.image(source)
}
export default client;