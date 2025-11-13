import { redirect, RedirectType } from 'next/navigation'

export default async function Page(){
    redirect('/clientes', RedirectType.replace)
}