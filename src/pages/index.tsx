import Image from "next/image";
import Category from "@/components/Category";
import { Suspense } from "react";
import Videogrid from "@/components/Videogrid";


export default function Home() {
  return (
    <main className="flex-1 p-4">
      <Category />
      <Suspense fallback={<div>Loading videos...</div>}></Suspense>
      <Videogrid/>
    </main>
  );
}
