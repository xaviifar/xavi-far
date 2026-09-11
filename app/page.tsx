import Header from "./components/Header";
import Hero from "./components/Hero";
import SelectedWork from "./components/SelectedWork";
import Experience from "./components/Experience";
import Toolkit from "./components/Toolkit";
import AskAICallout from "./components/AskAICallout";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f3f3f1] text-[#161616]">
      {/* MASTER CONTAINER */}
      <div className="relative mx-auto flex min-h-screen w-full max-w-[840px] flex-col px-5 sm:px-10 md:px-14">
        {/* Integrated Navigation Header */}
        <Header />

        {/* Hero Section */}
        <Hero />

        {/* Selected Work (Prioritized at Top) */}
        <SelectedWork />

        {/* Work Experience */}
        <Experience />

        {/* Core Toolkit */}
        <Toolkit />

        {/* Ask My AI Feature */}
        <AskAICallout />

        {/* High-Impact Editorial Footer */}
        <Footer />
      </div>
    </main>
  );
}
