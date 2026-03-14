import Hero from "./Hero";
import WhyChooseBluestone from "../Section/WhyChooseBluestone";
import About from "../Section/About";
import Programs from "../Section/Program";
import ContactUs from "../Section/Contact";
import Gallery from "../Section/Gallery";
import FranchiseOpportunity from "../Section/Franchise";
import Testimonials from "../Section/Testimonials";
import FAQSection from "../Section/FAQ";

export default function Home() {
  return (
    <>
      <Hero />
      <WhyChooseBluestone />
      <About />
      <Programs />
      <ContactUs />
      <Gallery />
      <FranchiseOpportunity/>
      <Testimonials/>
      <FAQSection/>
    </>
  );
}
