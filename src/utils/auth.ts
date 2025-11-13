import { cookies } from 'next/headers';
import 'server-only';

export async function getSessionUser() {
  const cookieStore = await cookies();
  const session = cookieStore.get('smf00')?.value
  if (!session) {
    return null
  }
  return JSON.parse(session)
}