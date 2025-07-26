import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { Toaster } from "@/components/ui/sonner";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="min-h-screen flex flex-col bg-amber-50">
      <Navbar />
      <Toaster/>
      <div className="flex flex-1">
        <Sidebar />
        <Component {...pageProps} />
      </div>
    </div>
  );
}
