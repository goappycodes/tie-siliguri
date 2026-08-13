import Hero from "@/components/home/Hero";
import Intro from "@/components/home/Intro";
import Pillars from "@/components/home/Pillars";
import YearOne from "@/components/home/YearOne";
import Programs from "@/components/home/Programs";
import EventsStrip from "@/components/home/EventsStrip";
import Cadence from "@/components/home/Cadence";
import Community from "@/components/home/Community";
import Leadership from "@/components/home/Leadership";
import Membership from "@/components/home/Membership";
import Trust from "@/components/home/Trust";
import Gallery from "@/components/home/Gallery";
import Closing from "@/components/home/Closing";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Intro />
      <Pillars />
      <YearOne />
      <Programs />
      <EventsStrip />
      <Cadence />
      <Community />
      <Leadership />
      <Membership />
      <Trust />
      <Gallery />
      <Closing />
    </>
  );
}
