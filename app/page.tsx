import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import { ThemeProvider } from "@/components/context/ThemeContext";

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
