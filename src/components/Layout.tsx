import React, { ReactNode, useEffect, useState } from 'react';

function Layout({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null;

  return <div className='m-4'>{children}</div>;
}

export default Layout;
