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
    <div className="relative min-h-screen bg-slate-50 text-slate-900 dark:bg-[#030712] dark:text-slate-100 flex flex-col selection:bg-cyan-500/20 selection:text-cyan-800 dark:selection:text-cyan-300 transition-colors duration-300">
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
