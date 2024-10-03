import Header from "../header/Header";
import Footer from "../footer/Footer";
import { ReactNode } from "react";

interface LayoutSimpleProps {
  children: ReactNode;
}

export default function LayoutSimple({ children }: LayoutSimpleProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header showBanner={false} showServices={false} />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}
