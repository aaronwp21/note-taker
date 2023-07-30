import React, { ReactNode } from 'react';

function Layout({ children }: { children: ReactNode }) {
  return <div className="m-4">{children}</div>;
}

export default Layout;
