import Hero from "./Hero";
import WhyChooseBluestone from "../Section/WhyChooseBluestone";
import About from "../Section/About";
import Programs from "../Section/Program";
import ContactUs from "../Section/Contact";
import Gallery from "../Section/Gallery";
import FranchiseOpportunity from "../Section/Franchise";
import Testimonials from "../Section/Testimonials";
import FAQSection from "../Section/FAQ";
import SEO from "../SEO";

export default function Home() {
  return (
    <>
      <SEO
        title="Best Preschool & Daycare"
        description="Welcome to Bluestone International Preschool, the top-rated preschool and daycare in Salem. We provide a nurturing environment with a holistic curriculum."
        keywords="preschool, daycare, international preschool, early education, Salem, children education"
      />
      <Hero />
      <WhyChooseBluestone />
      <About />
      <Programs />
      <ContactUs />
      <Gallery />
      <FranchiseOpportunity />
      <Testimonials />
      <FAQSection />
    </>
  );
}
