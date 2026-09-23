import React from 'react';
import Navbar from '@/components/common/Navbar';
import Sidebar from '@/components/common/Sidebar';

export default function BrandPortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-cinema-midnight text-slate-100">
      <Navbar />
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 flex-1 flex gap-8">
        <Sidebar portalType="brand" />
        <main className="flex-1 min-w-0">
          {children}
        </main>
      </div>
    </div>
  );
}
