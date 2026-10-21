import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import VideoIntro from "@/components/VideoIntro";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#f4f5f8] text-[#4b5262] dark:bg-[#0c0e12] dark:text-[#9ba1b0] flex flex-col selection:bg-[#f59e0b]/20 selection:text-[#f59e0b] transition-colors duration-200">
      {/* Sticky Glassmorphic Navbar */}
      <Navbar />

      {/* Main Content Flow */}
      <main className="flex-1 w-full flex flex-col">
        {/* Hero Section with Interactive Three.js Background */}
        <Hero />

        {/* Interactive Video Introduction */}
        <VideoIntro />

        {/* Professional Career Experience Timeline */}
        <Experience />

        {/* Featured Projects with Architecture Details & Filters */}
        <Projects />

        {/* Technical Arsenal & Core Competencies */}
        <Skills />

        {/* Contact & Inquiries */}
        <Contact />
      </main>

      {/* Obsidian Footer */}
      <Footer />
    </div>
  );
}
