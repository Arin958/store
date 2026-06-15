// app/layout.tsx
import React from 'react';


interface LayoutProps {
  children: React.ReactNode;
}

const Layout = async ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      
      <main className="flex-1 px-5">
        {children}
      </main>
    </div>
  );
};

export default Layout;