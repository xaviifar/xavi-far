import Header from "./components/Header";
import Hero from "./components/Hero";
import Activity from "./components/Activity";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Education from "./components/Education";
import TechStack from "./components/TechStack";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen w-full flex flex-col items-center px-6 sm:px-8 bg-bg text-ink">
      <div className="w-full max-w-[720px]">
        {/* Navigation Bar */}
        <Header />

        {/* Hero & About Bio */}
        <Hero />

        {/* GitHub / Systems Activity Heatmap */}
        <Activity />

        {/* Selected Projects */}
        <Projects />

        {/* Experience Timeline */}
        <Experience />

        {/* Education & Credentials */}
        <Education />

        {/* Tech Stack Pills */}
        <TechStack />

        {/* Contact Section & Message Form */}
        <Contact />

        {/* Pixel Art Footer */}
        <Footer />
      </div>
    </main>
  );
}
