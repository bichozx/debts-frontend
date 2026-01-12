import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';

export default function PrivateLayout() {
  return (
    <div className="min-h-screen bg-[#0B0F14] text-white">
      <Navbar />
      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
}
