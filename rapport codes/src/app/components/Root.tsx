import { Outlet, useLocation } from 'react-router';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

export function Root() {
  const location = useLocation();
  const isDashboard =
    location.pathname.startsWith('/client') ||
    location.pathname.startsWith('/counselor-dashboard') ||
    location.pathname.startsWith('/organization') ||
    location.pathname.startsWith('/counselor/') ||
    location.pathname.startsWith('/community/');
  const isAuth =
    location.pathname === '/login' || location.pathname === '/signup';

  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      {!isDashboard && !isAuth && <Navbar />}
      <main className="flex-1">
        <Outlet />
      </main>
      {!isDashboard && !isAuth && <Footer />}
    </div>
  );
}
