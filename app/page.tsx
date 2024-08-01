import Hero from "@/components/components/Hero";
import Navbar from "@/components/components/Navbar";
import Image from "next/image";
import { ThemeProvider } from "@/components/components/context/ThemeContext";

export default function Home() {
  return (
    <main>
      <ThemeProvider>
        <Navbar></Navbar>
        <Hero></Hero>
      </ThemeProvider>
    </main>
  );
}
