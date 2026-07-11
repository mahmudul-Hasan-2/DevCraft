"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Code2, LogIn, LogOut, ShoppingBag } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  
  // Frontend State Testing (Toggle true/false to test states)
  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  const toggleMenu = () => setIsOpen(!isOpen);
  const isActive = (path: string) => pathname === path;

  return (
    <nav className="bg-primary text-white sticky top-0 z-50 shadow-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* 1. Brand Logo */}
          <div className="flex-shrink-0 flex items-center gap-2">
            <Code2 className="h-6 w-6 text-accent" />
            <Link href="/" className="font-bold text-xl tracking-wider text-white">
              DEV<span className="text-accent">CRAFT</span>
            </Link>
          </div>

          {/* 2. Desktop Navigation (Conditional Rendering) */}
          <div className="hidden md:flex items-center space-x-6">
            <Link 
              href="/" 
              className={`text-sm hover:text-accent transition-colors ${isActive("/") ? "text-accent font-semibold" : "text-gray-300"}`}
            >
              Home
            </Link>
            <Link 
              href="/explore" 
              className={`text-sm hover:text-accent transition-colors ${isActive("/explore") ? "text-accent font-semibold" : "text-gray-300"}`}
            >
              Explore Assets
            </Link>

            {isLoggedIn ? (
              <>
                <Link 
                  href="/items/add" 
                  className={`text-sm hover:text-accent transition-colors ${isActive("/items/add") ? "text-accent font-semibold" : "text-gray-300"}`}
                >
                  Sell Asset
                </Link>
                <Link 
                  href="/items/manage" 
                  className={`text-sm hover:text-accent transition-colors ${isActive("/items/manage") ? "text-accent font-semibold" : "text-gray-300"}`}
                >
                  Dashboard
                </Link>
                <button 
                  onClick={() => setIsLoggedIn(false)} 
                  className="flex items-center gap-1 bg-red-500/10 hover:bg-red-500 hover:text-white text-red-400 px-4 py-1.5 rounded-global transition-all border border-red-500/20 text-xs font-medium"
                >
                  <LogOut className="h-3.5 w-3.5" /> Logout
                </button>
              </>
            ) : (
              <Link 
                href="/login" 
                className="flex items-center gap-1 bg-accent hover:bg-emerald-600 text-primary font-bold px-5 py-1.5 rounded-global transition-all text-xs"
              >
                <LogIn className="h-3.5 w-3.5" /> Identity Login
              </Link>
            )}
          </div>

          {/* 3. Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu} className="text-gray-300 hover:text-white focus:outline-none">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* 4. Mobile Responsive Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden bg-primary/95 backdrop-blur-sm border-t border-gray-800 px-2 pt-2 pb-4 space-y-2">
          <Link 
            href="/" 
            onClick={toggleMenu}
            className={`block px-3 py-2 rounded-global text-sm ${isActive("/") ? "bg-accent text-primary font-bold" : "text-gray-300 hover:bg-gray-800"}`}
          >
            Home
          </Link>
          <Link 
            href="/explore" 
            onClick={toggleMenu}
            className={`block px-3 py-2 rounded-global text-sm ${isActive("/explore") ? "bg-accent text-primary font-bold" : "text-gray-300 hover:bg-gray-800"}`}
          >
            Explore Assets
          </Link>

          {isLoggedIn ? (
            <>
              <Link 
                href="/items/add" 
                onClick={toggleMenu}
                className={`block px-3 py-2 rounded-global text-sm ${isActive("/items/add") ? "bg-accent text-primary font-bold" : "text-gray-300 hover:bg-gray-800"}`}
              >
                Sell Asset
              </Link>
              <Link 
                href="/items/manage" 
                onClick={toggleMenu}
                className={`block px-3 py-2 rounded-global text-sm ${isActive("/items/manage") ? "bg-accent text-primary font-bold" : "text-gray-300 hover:bg-gray-800"}`}
              >
                Dashboard
              </Link>
              <button 
                onClick={() => { setIsLoggedIn(false); toggleMenu(); }} 
                className="w-full text-left flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded-global"
              >
                <LogOut className="h-4 w-4" /> Logout
              </button>
            </>
          ) : (
            <Link 
              href="/login" 
              onClick={toggleMenu}
              className="block text-center bg-accent text-primary font-bold px-4 py-2 rounded-global text-sm"
            >
              Identity Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}