import { useAuthStore } from '../stores/authStore/auth.store';

export default function Navbar() {
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  return (
    <>
      <header className="w-full h-14 bg-[#0E1623] border-b border-gray-800 flex items-center px-6">
        {/* Brand */}
        <div className="flex-1">
          <span className="text-white font-semibold tracking-wide">
            BET<span className="text-emerald-500">X</span>
          </span>
        </div>

        {/* User */}
        <div className="flex items-center gap-4 text-sm">
          {user && (
            <span className="text-gray-300 hidden sm:block">{user.email}</span>
          )}

          <button
            onClick={logout}
            className="text-gray-400 hover:text-red-400 transition"
          >
            Logout
          </button>
        </div>
      </header>
    </>
  );
}
