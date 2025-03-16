// src/components/Container.tsx
"use client"; // ✅ Required when using client-side logic in Next.js 15 with App Router

import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode; // ✅ Correctly typed 'children' prop for TypeScript
}

const Container = ({ children }: ContainerProps) => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
);

export default Container;
