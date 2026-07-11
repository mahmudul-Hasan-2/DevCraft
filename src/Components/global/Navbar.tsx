"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Menu,
  X,
  Code2,
  LogIn,
  LogOut,
  UserPlus,
  LayoutDashboard,
  ChevronDown,
  PlusCircle,
  Settings,
  Info,
  Mail
} from "lucide-react";
import { authClient } from "@/lib/auth-client";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const isActive = (path: string) => pathname === path;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          setIsDropdownOpen(false);
          setIsOpen(false);
          router.push("/login");
        },
      },
    });
  };

  return (
    <nav className="bg-zinc-950 text-white sticky top-0 z-50 shadow-md border-b border-zinc-800 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* 1. Brand Logo */}
          <div className="flex-shrink-0 flex items-center gap-2">
            <Code2 className="h-6 w-6 text-zinc-50" />
            <Link
              href="/"
              className="font-bold text-xl tracking-wider text-white"
            >
              DEV<span className="text-zinc-400">CRAFT</span>
            </Link>
          </div>

          {/* 2. Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              href="/"
              className={`text-sm hover:text-zinc-100 transition-colors ${isActive("/") ? "text-zinc-100 font-semibold" : "text-zinc-400"}`}
            >
              Home
            </Link>
            <Link
              href="/explore"
              className={`text-sm hover:text-zinc-100 transition-colors ${isActive("/explore") ? "text-zinc-100 font-semibold" : "text-zinc-400"}`}
            >
              Explore Assets
            </Link>

            {/* Rendered conditionally based on session to hit minimum 5 routes rule */}
            {!isPending &&
              (session ? (
                <>
                  <Link
                    href="/items/add"
                    className={`text-sm hover:text-zinc-100 transition-colors ${isActive("/items/add") ? "text-zinc-100 font-semibold" : "text-zinc-400"}`}
                  >
                    Sell Asset
                  </Link>
                  <Link
                    href="/items/manage"
                    className={`text-sm hover:text-zinc-100 transition-colors ${isActive("/items/manage") ? "text-zinc-100 font-semibold" : "text-zinc-400"}`}
                  >
                    Manage Items
                  </Link>
                  <Link
                    href="/about"
                    className={`text-sm hover:text-zinc-100 transition-colors ${isActive("/about") ? "text-zinc-100 font-semibold" : "text-zinc-400"}`}
                  >
                    About
                  </Link>

                  {/* Profile Dropdown Component */}
                  <div className="relative" ref={dropdownRef}>
                    <button
                      onClick={toggleDropdown}
                      className="flex items-center gap-2 focus:outline-none bg-zinc-900 border border-zinc-800 hover:border-zinc-700 rounded-full pl-2 pr-3 py-1 transition-all"
                    >
                      <div className="h-7 w-7 rounded-full bg-zinc-800 flex items-center justify-center text-xs font-semibold text-zinc-200 uppercase overflow-hidden border border-zinc-700">
                        {session.user.image ? (
                          <img
                            src={session.user.image}
                            alt={session.user.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          session.user.name.slice(0, 2)
                        )}
                      </div>
                      <span className="text-xs text-zinc-300 font-medium max-w-[100px] truncate">
                        {session.user.name}
                      </span>
                      <ChevronDown
                        className={`h-3 w-3 text-zinc-500 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}
                      />
                    </button>

                    {/* Dropdown Menu Overlay */}
                    {isDropdownOpen && (
                      <div className="absolute right-0 mt-2 w-48 rounded-lg border border-zinc-800 bg-zinc-900 p-1 shadow-xl shadow-black/50 ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                        <Link
                          href="/contact"
                          onClick={() => setIsDropdownOpen(false)}
                          className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-zinc-400 hover:bg-zinc-800 transition-colors text-left"
                        >
                          <Mail className="h-4 w-4" /> Contact Support
                        </Link>
                        <hr className="border-zinc-800 my-1" />
                        <button
                          onClick={handleLogout}
                          className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 transition-colors text-left"
                        >
                          <LogOut className="h-4 w-4" /> Logout
                        </button>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <>
                  {/* Minimum 3 routes when logged out (Home, Explore, plus About/Contact static pages) */}
                  <Link
                    href="/about"
                    className={`text-sm hover:text-zinc-100 transition-colors ${isActive("/about") ? "text-zinc-100 font-semibold" : "text-zinc-400"}`}
                  >
                    About
                  </Link>
                  <div className="flex items-center space-x-3 pl-2">
                    <Link
                      href="/login"
                      className="flex items-center gap-1.5 text-zinc-400 hover:text-zinc-100 px-3 py-1.5 transition-all text-xs font-medium"
                    >
                      <LogIn className="h-3.5 w-3.5" /> Sign In
                    </Link>
                    <Link
                      href="/register"
                      className="flex items-center gap-1.5 bg-zinc-50 hover:bg-zinc-200 text-zinc-950 font-semibold px-4 py-1.5 rounded-lg transition-all text-xs shadow-sm"
                    >
                      <UserPlus className="h-3.5 w-3.5" /> Register
                    </Link>
                  </div>
                </>
              ))}
          </div>

          {/* 3. Mobile Menu Toggle Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-zinc-400 hover:text-zinc-100 focus:outline-none"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* 4. Mobile Responsive Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden bg-zinc-950 backdrop-blur-sm border-t border-zinc-800 px-4 pt-2 pb-4 space-y-2">
          <Link
            href="/"
            onClick={toggleMenu}
            className={`block px-3 py-2 rounded-lg text-sm ${isActive("/") ? "bg-zinc-900 text-zinc-100 font-bold" : "text-zinc-400 hover:bg-zinc-900"}`}
          >
            Home
          </Link>
          <Link
            href="/explore"
            onClick={toggleMenu}
            className={`block px-3 py-2 rounded-lg text-sm ${isActive("/explore") ? "bg-zinc-900 text-zinc-100 font-bold" : "text-zinc-400 hover:bg-zinc-900"}`}
          >
            Explore Assets
          </Link>

          {!isPending &&
            (session ? (
              <>
                <Link
                  href="/items/add"
                  onClick={toggleMenu}
                  className={`block px-3 py-2 rounded-lg text-sm ${isActive("/items/add") ? "bg-zinc-900 text-zinc-100 font-bold" : "text-zinc-400 hover:bg-zinc-900"}`}
                >
                  Sell Asset
                </Link>
                <Link
                  href="/items/manage"
                  onClick={toggleMenu}
                  className={`block px-3 py-2 rounded-lg text-sm ${isActive("/items/manage") ? "bg-zinc-900 text-zinc-100 font-bold" : "text-zinc-400 hover:bg-zinc-900"}`}
                >
                  Manage Items
                </Link>
                <Link
                  href="/about"
                  onClick={toggleMenu}
                  className={`block px-3 py-2 rounded-lg text-sm ${isActive("/about") ? "bg-zinc-900 text-zinc-100 font-bold" : "text-zinc-400 hover:bg-zinc-900"}`}
                >
                  About
                </Link>
                <Link
                  href="/contact"
                  onClick={toggleMenu}
                  className={`block px-3 py-2 rounded-lg text-sm ${isActive("/contact") ? "bg-zinc-900 text-zinc-100 font-bold" : "text-zinc-400 hover:bg-zinc-900"}`}
                >
                  Contact Support
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                >
                  <LogOut className="h-4 w-4" /> Logout
                </button>
              </>
            ) : (
              <div className="pt-2 flex flex-col space-y-2 border-t border-zinc-800">
                <Link
                  href="/about"
                  onClick={toggleMenu}
                  className="block text-left text-zinc-400 hover:text-zinc-100 px-3 py-2 text-sm"
                >
                  About
                </Link>
                <Link
                  href="/login"
                  onClick={toggleMenu}
                  className="block text-center text-zinc-400 hover:text-zinc-100 px-4 py-2 text-sm font-medium transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  onClick={toggleMenu}
                  className="block text-center bg-zinc-50 text-zinc-950 font-bold px-4 py-2 rounded-lg text-sm shadow-sm hover:bg-zinc-200 transition-colors"
                >
                  Register
                </Link>
              </div>
            ))}
        </div>
      )}
    </nav>
  );
}