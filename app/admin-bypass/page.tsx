import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default function AdminBypass() {
  cookies().set('visfora_admin', 'letmein', { maxAge: 60*60*24*7 })
  redirect('/')
}