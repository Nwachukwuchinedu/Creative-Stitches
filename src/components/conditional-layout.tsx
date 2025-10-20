
"use client";

import { usePathname } from 'next/navigation';
import MainHeader from '@/components/main-header';
import MainFooter from '@/components/main-footer';

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAccountOrAdminPage = pathname.startsWith('/account') || pathname.startsWith('/admin');

  return (
    <div className="relative flex min-h-screen flex-col">
      {!isAccountOrAdminPage && <MainHeader />}
      <main className="flex-1">{children}</main>
      {!isAccountOrAdminPage && <MainFooter />}
    </div>
  );
}
