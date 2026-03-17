import { Routes, Route, useLocation } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar";
import TopBar from "./components/Top";
import Footer from "./components/Footer";

// Pages
import Home from "./components/Home";
import About from "./Section/About";
import Programs from "./Section/Program";
import ContactUs from "./Section/Contact";
import Admissions from "./components/Admissions";
import Gallery from "./Section/Gallery";
import Testimonials from "./Section/Testimonials";
import ScheduleVisit from "./components/ScheduleVisit";
import AboutBluestone from "./components/AboutBluestone";

//Programs
import NestlersProgram from "./Pages/Program/Nestler";
import BambinoProgram from "./Pages/Program/Babino";
import BjrProgram from "./Pages/Program/B Junior";
import BsrProgram from "./Pages/Program/B Senior";

// Scroll To Top
import ScrollToTop from "./components/ScrollToTop";
import Curriculum from "./components/Courses";
import Centers from "./components/Centers";
import AboutFranchise from "./components/AboutFranchise";
import Daycare from "./components/Daycare";
import SummerClub from "./components/SummerClub";
import ParentTalks from "./components/ParentsTalk";
import BlogPost from "./components/Blogs/BlogPosting";
import { BLOG_POSTS } from "./components/Blogs/data";
import BlogFeed from "./components/Blogs/BlogListing";
import BlogNavbar from "./components/Blogs/BlogNavbar";

// Admin
import AdminLogin from "./Admin/Login";
import AdminDashboardLayout from "./Admin/Dashboard";
import DashboardHome from "./Admin/DashboardHome";
import AdmissionsDashboard from "./Admin/Admissions";
import FranchiseDashboard from "./Admin/Franchise";
import MediaManagement from "./Admin/MediaManagement";

export default function App() {
  const location = useLocation();

  // Logic to determine which Navbar to show
  const isBlogPostPage = location.pathname.startsWith("/blogs/") &&
    location.pathname !== "/blogs";

  const isAdminPage = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdminPage && <TopBar />}

      {/* Dynamic Navbar Switcher */}
      {!isAdminPage && (isBlogPostPage ? <BlogNavbar /> : <Navbar />)}

      {!isAdminPage && <ScrollToTop />}

      <main className="min-h-full">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About showSEO={true} />} />
          <Route path="/program" element={<Programs showSEO={true} />} />
          <Route path="/program/nestlers" element={<NestlersProgram />} />
          <Route path="/program/bambino" element={<BambinoProgram />} />
          <Route path="/program/b-junior" element={<BjrProgram />} />
          <Route path="/program/b-senior" element={<BsrProgram />} />
          <Route path="/contact" element={<ContactUs showSEO={true} />} />
          <Route path="/testimonials" element={<Testimonials />} />
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

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboardLayout />}>
            <Route index element={<DashboardHome />} />
            <Route path="admissions" element={<AdmissionsDashboard />} />
            <Route path="franchise" element={<FranchiseDashboard />} />
            <Route path="media" element={<MediaManagement />} />
          </Route>
        </Routes>
      </main>

      {!isAdminPage && <Footer />}
    </>
  );
}