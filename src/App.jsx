import { Routes, Route, useLocation } from 'react-router-dom';
import { lazy, Suspense, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import MobileSticky from './components/MobileSticky';
import './App.css';

// ============================================================================
// Code-split each page for fast initial load (Google ranks fast sites higher)
// ============================================================================
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Combo = lazy(() => import('./pages/Combo'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Areas
const AreasHub = lazy(() => import('./pages/areas/AreasHub'));
const ToowoombaArea = lazy(() => import('./pages/areas/Toowoomba'));
const HighfieldsArea = lazy(() => import('./pages/areas/Highfields'));
const HelidonArea = lazy(() => import('./pages/areas/Helidon'));

// Cleaning
const CleaningHub = lazy(() => import('./pages/cleaning/CleaningHub'));
const EndOfLease = lazy(() => import('./pages/cleaning/EndOfLease'));
const RegularHouseClean = lazy(() => import('./pages/cleaning/RegularHouseClean'));
const CarpetCleaning = lazy(() => import('./pages/cleaning/CarpetCleaning'));
const WindowCleaning = lazy(() => import('./pages/cleaning/WindowCleaning'));
const GutterCleaning = lazy(() => import('./pages/cleaning/GutterCleaning'));
const PressureWashing = lazy(() => import('./pages/cleaning/PressureWashing'));
const PramCleaning = lazy(() => import('./pages/cleaning/PramCleaning'));

// Pest
const PestHub = lazy(() => import('./pages/pest/PestHub'));
const CockroachControl = lazy(() => import('./pages/pest/CockroachControl'));
const AntControl = lazy(() => import('./pages/pest/AntControl'));
const SpiderControl = lazy(() => import('./pages/pest/SpiderControl'));
const RodentControl = lazy(() => import('./pages/pest/RodentControl'));
const SilverfishControl = lazy(() => import('./pages/pest/SilverfishControl'));
const EndOfLeasePest = lazy(() => import('./pages/pest/EndOfLeasePest'));

// Blog (public)
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));

// Admin
const AdminLayout = lazy(() => import('./admin/AdminLayout'));
const AdminLogin = lazy(() => import('./admin/AdminLogin'));
const Dashboard = lazy(() => import('./admin/pages/Dashboard'));
const Leads = lazy(() => import('./admin/pages/Leads'));
const Clients = lazy(() => import('./admin/pages/Clients'));
const Jobs = lazy(() => import('./admin/pages/Jobs'));
const BlogAdmin = lazy(() => import('./admin/pages/Blog'));
const BlogEditor = lazy(() => import('./admin/pages/BlogEditor'));
const Settings = lazy(() => import('./admin/pages/Settings'));

function Loading() {
  return (
    <div style={{ minHeight: '50vh', display: 'grid', placeItems: 'center', fontFamily: 'Nunito' }}>
      <div style={{ textAlign: 'center', color: '#64748b' }}>Loading...</div>
    </div>
  );
}

// Scroll to top on every navigation
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

export default function App() {
  const { pathname } = useLocation();
  const isAdminRoute = pathname.startsWith('/admin');

  return (
    <>
      <ScrollToTop />
      {!isAdminRoute && <Header />}
      <main>
        <Suspense fallback={<Loading />}>
          <Routes>
            {/* Marketing site */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/combo" element={<Combo />} />

            {/* Areas */}
            <Route path="/areas" element={<AreasHub />} />
            <Route path="/areas/toowoomba" element={<ToowoombaArea />} />
            <Route path="/areas/highfields" element={<HighfieldsArea />} />
            <Route path="/areas/helidon" element={<HelidonArea />} />

            {/* Cleaning */}
            <Route path="/cleaning" element={<CleaningHub />} />
            <Route path="/cleaning/end-of-lease" element={<EndOfLease />} />
            <Route path="/cleaning/regular-house-clean" element={<RegularHouseClean />} />
            <Route path="/cleaning/carpet-cleaning" element={<CarpetCleaning />} />
            <Route path="/cleaning/window-cleaning" element={<WindowCleaning />} />
            <Route path="/cleaning/gutter-cleaning" element={<GutterCleaning />} />
            <Route path="/cleaning/pressure-washing" element={<PressureWashing />} />
            <Route path="/cleaning/pram-cleaning" element={<PramCleaning />} />

            {/* Pest */}
            <Route path="/pest" element={<PestHub />} />
            <Route path="/pest/cockroach-control" element={<CockroachControl />} />
            <Route path="/pest/ant-control" element={<AntControl />} />
            <Route path="/pest/spider-control" element={<SpiderControl />} />
            <Route path="/pest/rodent-control" element={<RodentControl />} />
            <Route path="/pest/silverfish-control" element={<SilverfishControl />} />
            <Route path="/pest/end-of-lease-pest" element={<EndOfLeasePest />} />

            {/* Blog (public) */}
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />

            {/* Admin */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="leads" element={<Leads />} />
              <Route path="clients" element={<Clients />} />
              <Route path="jobs" element={<Jobs />} />
              <Route path="blog" element={<BlogAdmin />} />
              <Route path="blog/new" element={<BlogEditor />} />
              <Route path="blog/edit/:slug" element={<BlogEditor />} />
              <Route path="settings" element={<Settings />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      {!isAdminRoute && <Footer />}
      {!isAdminRoute && <MobileSticky />}
    </>
  );
}
