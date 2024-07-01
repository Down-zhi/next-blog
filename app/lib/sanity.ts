import  ImageUrlBuilder  from "@sanity/image-url";
import { createClient } from "next-sanity";

const client =createClient({
    apiVersion:'1',
    dataset:'production' , //安装sanity设置的
   projectId:'8pz63m6i',
   useCdn:false ,//内置缓存就不用CDN了
   token:"skXCzkIA86BHEWod5vYWLnPGfKyn9yYJ6TN097kWF1J47xurcsf21r1fU2XDCf4947T0PJHgDGDKRYJUzfyWGpZnWI1cDkZf5bNapUusP7mU1HCQVk7IjmQ31suDZV7GidISqcsSVCyQ0PsiAla8CBwY4IBGANFSvbIJ3Dr9iX2pNFN9JNR3"
})
const builder = ImageUrlBuilder(client)
export function urlFor(source:any){
    return builder.image(source)
}
export default client;