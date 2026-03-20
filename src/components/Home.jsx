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
        title="Best Preschool in Edappadi"
        description="Looking for the best preschool in Edappadi? Bluestone International Preschool offers a safe, engaging environment with modern learning methods to build a strong foundation for your child."
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
