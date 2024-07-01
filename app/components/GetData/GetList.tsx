import client from "@/app/lib/sanity";

export const revalidate=30 
async function GetList() {
  const query = `
  *[_type=='blog'] | order(_createdAt desc){
  title,
    smallDescription,
    "currentSlug":slug.current,
    titleImage,
    date
  }`

  const data = await client.fetch(query);
  return data;
}
export default GetList;