"use client";

import { useEffect, useState } from "react";

export default function HydratedLayout({ children }: { children: React.ReactNode }) {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  return (
    <div className={hydrated ? "hydrated" : ""}>
      {children}
    </div>
  );
}
