import { createBrowserRouter } from 'react-router';
import { Root } from './components/Root';
import { Landing } from './pages/Landing';
import { AuthPage } from './pages/Auth';
import { ClientDashboard } from './pages/ClientDashboard';
import { CounselorProfile } from './pages/CounselorProfile';
import { CommunityDetail } from './pages/CommunityDetail';
import { CounselorDashboard } from './pages/CounselorDashboard';
import { OrganizationDashboard } from './pages/OrganizationDashboard';
import { AdminRoot } from './admin/AdminRoot';

export const router = createBrowserRouter([
  // ── Public & role-based platform ──────────────────────────────────────────
  {
    path: '/',
    Component: Root,
    children: [
      { index: true, Component: Landing },
      { path: 'login', Component: AuthPage },
      { path: 'signup', Component: AuthPage },
      { path: 'client/*', Component: ClientDashboard },
      { path: 'counselor/:id', Component: CounselorProfile },
      { path: 'community/:id', Component: CommunityDetail },
      { path: 'counselor-dashboard/*', Component: CounselorDashboard },
      { path: 'organization/*', Component: OrganizationDashboard },
    ],
  },

  // ── Admin backend — completely isolated, no public layout ─────────────────
  // Accessible via /admin (simulating admin.rapport.com in production).
  // No links to this path exist anywhere in the public UI.
  {
    path: '/admin',
    Component: AdminRoot,
  },
  {
    path: '/admin/*',
    Component: AdminRoot,
  },
]);
