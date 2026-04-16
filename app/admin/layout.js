"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";

export default function AdminLayout({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (session && session.user.role !== "admin") {
      router.push("/");
    }
  }, [status, session, router]);

  if (status === "loading") return <div className="min-h-screen text-white flex items-center justify-center">Loading...</div>;
  if (!session) return null;

  const navLinks = [
    { name: "Dashboard",    href: "/admin",          icon: "dashboard" },
    { name: "Blog Posts",   href: "/admin/blog",     icon: "article" },
    { name: "Projects",     href: "/admin/projects", icon: "folder" },
    { name: "Products",     href: "/admin/products", icon: "extension" },
    { name: "Reviews",      href: "/admin/reviews",  icon: "format_quote" },
    { name: "Contacts",     href: "/admin/contacts", icon: "inbox" },
    { name: "Social Links", href: "/admin/social",   icon: "share" },
    { name: "Media",        href: "/admin/media",    icon: "perm_media" },
  ];

  return (
    <div className="flex min-h-screen bg-background-dark text-slate-100">
      {/* Sidebar */}
      <aside className="w-64 bg-surface border-r border-white/5 p-6 flex flex-col hidden md:flex">
        <div className="flex items-center gap-2 mb-10">
          <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
            <span className="text-background-dark font-bold">A</span>
          </div>
          <span className="text-xl font-bold tracking-tight">Admin Panel</span>
        </div>
        
        <nav className="flex-1 space-y-2">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link 
                key={link.name} 
                href={link.href}
                className={`flex items-center gap-3 p-3 rounded-xl transition-all font-medium ${active ? 'bg-primary/10 text-primary border border-primary/20' : 'hover:bg-white/5 text-slate-400 hover:text-white'}`}
              >
                <span className="material-symbols-outlined">{link.icon}</span>
                {link.name}
              </Link>
            )
          })}
        </nav>

        <button 
          onClick={() => signOut()}
          className="flex items-center gap-3 p-3 rounded-xl hover:bg-red-500/10 text-red-400 mt-auto transition-all"
        >
          <span className="material-symbols-outlined">logout</span>
          Sign Out
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-slate-900/50 p-8">
        {children}
      </main>
    </div>
  );
}
