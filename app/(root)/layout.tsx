// app/layout.tsx
import Header from '@/components/shared/Header/Header';
import React from 'react';


interface LayoutProps {
  children: React.ReactNode;
}

const Layout = async ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <Header />
      <main className="flex-1 px-5">
        {children}
      </main>
    </div>
  );
};

export default Layout;