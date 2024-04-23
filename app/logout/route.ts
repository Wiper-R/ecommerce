import config from '@/config/server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function GET() {
  cookies().delete(config.TOKEN_KEY);
  redirect('/');
}
