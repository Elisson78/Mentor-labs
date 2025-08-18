"use client";

import { useEffect, useState } from 'react';

interface ClientOnlyModalProps {
  children: React.ReactNode;
  show: boolean;
}

export function ClientOnlyModal({ children, show }: ClientOnlyModalProps) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted || !show) {
    return null;
  }

  return <>{children}</>;
}