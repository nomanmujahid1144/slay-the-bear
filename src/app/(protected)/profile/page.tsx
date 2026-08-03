// src/app/(protected)/profile/page.tsx
   import { redirect } from 'next/navigation';

   export default function Profile() {
       redirect('/dashboard/account');
   }