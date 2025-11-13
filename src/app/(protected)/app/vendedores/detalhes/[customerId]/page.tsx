export default async function Page({
  params,
}: {
  params: Promise<{ customerId: string }>
}){

 const { customerId } = await params
  return <div>My Post: {customerId}</div>

}