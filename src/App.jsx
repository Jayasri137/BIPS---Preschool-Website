import { Routes, Route, useLocation } from "react-router-dom";
import { useState, lazy, Suspense } from "react";
import Navbar from "./components/Navbar";
import TopBar from "./components/Top";
import Footer from "./components/Footer";
import { MediaProvider } from "./context/MediaContext";

// Lazy-loaded Components
const Home = lazy(() => import("./components/Home"));
const About = lazy(() => import("./Section/About"));
const Programs = lazy(() => import("./Section/Program"));
const ContactUs = lazy(() => import("./Section/Contact"));
const Admissions = lazy(() => import("./components/Admissions"));
const Testimonials = lazy(() => import("./Section/Testimonials"));
const ScheduleVisit = lazy(() => import("./components/ScheduleVisit"));
const AboutBluestone = lazy(() => import("./components/AboutBluestone"));

// Programs
const NestlersProgram = lazy(() => import("./Pages/Program/Nestler"));
const BambinoProgram = lazy(() => import("./Pages/Program/Babino"));
const BjrProgram = lazy(() => import("./Pages/Program/B Junior"));
const BsrProgram = lazy(() => import("./Pages/Program/B Senior"));

// Additional Components
const Curriculum = lazy(() => import("./components/Courses"));
const Centers = lazy(() => import("./components/Centers"));
const AboutFranchise = lazy(() => import("./components/AboutFranchise"));
const Daycare = lazy(() => import("./components/Daycare"));
const SummerClub = lazy(() => import("./components/SummerClub"));
const ParentTalks = lazy(() => import("./components/ParentsTalk"));
const BlogPost = lazy(() => import("./components/Blogs/BlogPosting"));
const BlogFeed = lazy(() => import("./components/Blogs/BlogListing"));
const BlogNavbar = lazy(() => import("./components/Blogs/BlogNavbar"));

// Admin
const AdminLogin = lazy(() => import("./Admin/Login"));
const AdminDashboardLayout = lazy(() => import("./Admin/Dashboard"));
const DashboardHome = lazy(() => import("./Admin/DashboardHome"));
const AdmissionsDashboard = lazy(() => import("./Admin/Admissions"));
const FranchiseDashboard = lazy(() => import("./Admin/Franchise"));
const CentersDashboard = lazy(() => import("./Admin/Centers"));
const TestimonialsDashboard = lazy(() => import("./Admin/Testimonials"));
const MediaManagement = lazy(() => import("./Admin/MediaManagement"));

// Other
import ScrollToTop from "./components/ScrollToTop";
import { BLOG_POSTS } from "./components/Blogs/data";

// Loading Fallback
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-[50vh]">
    <div className="w-10 h-10 border-4 border-orange-500/30 border-t-orange-500 rounded-full animate-spin" />
  </div>
);

export default function App() {
  const location = useLocation();

  // Logic to determine which Navbar to show
  const isBlogPostPage = location.pathname.startsWith("/blogs/") &&
    location.pathname !== "/blogs";

  const isAdminPage = location.pathname.startsWith("/admin");

  return (
    <MediaProvider>
      {!isAdminPage && <TopBar />}

      {/* Dynamic Navbar Switcher */}
      {!isAdminPage && (isBlogPostPage ? <BlogNavbar /> : <Navbar />)}

      {!isAdminPage && <ScrollToTop />}

      <main className="min-h-full">
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboardLayout />}>
              <Route index element={<DashboardHome />} />
              <Route path="admissions" element={<AdmissionsDashboard />} />
              <Route path="franchise" element={<FranchiseDashboard />} />
              <Route path="centers" element={<CentersDashboard />} />
              <Route path="testimonials" element={<TestimonialsDashboard />} />
              <Route path="media" element={<MediaManagement />} />
            </Route>

            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About showSEO={true} />} />
            <Route path="/program" element={<Programs showSEO={true} />} />
            <Route path="/program/nestlers" element={<NestlersProgram />} />
            <Route path="/program/bambino" element={<BambinoProgram />} />
            <Route path="/program/b-junior" element={<BjrProgram />} />
            <Route path="/program/b-senior" element={<BsrProgram />} />
            <Route path="/contact" element={<ContactUs showSEO={true} />} />
            <Route path="/testimonials" element={<Testimonials showSEO={true} />} />
            <Route path="/admissions" element={<Admissions />} />
            <Route path="/schedule-visit" element={<ScheduleVisit />} />
            <Route path="/about-bluestone" element={<AboutBluestone />} />
            <Route path="/curriculum" element={<Curriculum />} />
            <Route path="/centres" element={<Centers />} />
            <Route path="/franchise" element={<AboutFranchise />} />
            <Route path="/daycare" element={<Daycare />} />
            <Route path="/summer-club" element={<SummerClub />} />
            <Route path="/parents-talk" element={<ParentTalks />} />
            <Route path="/blogs/:slug" element={<BlogPost />} />
            <Route path="/blogs" element={<BlogFeed posts={BLOG_POSTS} />} />
          </Routes>
        </Suspense>
      </main>

      {!isAdminPage && <Footer />}
    </MediaProvider>
  );
}