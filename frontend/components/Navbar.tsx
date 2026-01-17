'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

/**
 * Navigation bar component
 */
export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(path);
  };

  return (
    <nav className="bg-white/80 backdrop-blur-xl border-b border-slate-200/60 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 via-accent-600 to-primary-600 bg-clip-text text-transparent bg-[length:200%_auto] animate-[shimmer_3s_linear_infinite] group-hover:animate-none">
              Cinephoria
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-1">
            <NavLink href="/" isActive={isActive('/') && pathname === '/'}>
              Accueil
            </NavLink>
            
            <DropdownMenu
              label="Séances"
              isActive={isActive('/aujourdhui')}
              items={[
                { href: '/aujourdhui/paris', label: 'Paris' },
                { href: '/aujourdhui/toulouse', label: 'Toulouse' },
              ]}
            />
            
            <DropdownMenu
              label="Cinémas"
              isActive={isActive('/cinemas')}
              items={[
                { href: '/cinemas/paris', label: 'Paris' },
                { href: '/cinemas/toulouse', label: 'Toulouse' },
              ]}
            />
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 transition-colors duration-200"
            aria-label="Toggle menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-200/60">
            <div className="flex flex-col space-y-1">
              <MobileNavLink
                href="/"
                isActive={pathname === '/'}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Accueil
              </MobileNavLink>
              
              <MobileNavSection
                label="Séances"
                isActive={isActive('/aujourdhui')}
                items={[
                  { href: '/aujourdhui/paris', label: 'Paris' },
                  { href: '/aujourdhui/toulouse', label: 'Toulouse' },
                ]}
                onClick={() => setIsMobileMenuOpen(false)}
              />
              
              <MobileNavSection
                label="Cinémas"
                isActive={isActive('/cinemas')}
                items={[
                  { href: '/cinemas/paris', label: 'Paris' },
                  { href: '/cinemas/toulouse', label: 'Toulouse' },
                ]}
                onClick={() => setIsMobileMenuOpen(false)}
              />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

/**
 * Simple navigation link component
 */
function NavLink({
  href,
  isActive,
  children,
}: {
  href: string;
  isActive: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
        isActive
          ? 'bg-primary-50 text-primary-700 shadow-sm'
          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
      }`}
    >
      {children}
    </Link>
  );
}

/**
 * Dropdown menu component for desktop
 */
function DropdownMenu({
  label,
  isActive,
  items,
}: {
  label: string;
  isActive: boolean;
  items: Array<{ href: string; label: string }>;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center ${
          isActive
            ? 'bg-primary-50 text-primary-700 shadow-sm'
            : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
        }`}
      >
        {label}
        <svg
          className={`ml-1.5 h-4 w-4 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-2 w-48 bg-white/95 backdrop-blur-xl rounded-xl shadow-soft-lg py-1.5 border border-slate-200/60 overflow-hidden">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block px-4 py-2 text-sm text-slate-700 hover:bg-primary-50 hover:text-primary-700 transition-colors duration-150"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

/**
 * Mobile navigation link
 */
function MobileNavLink({
  href,
  isActive,
  onClick,
  children,
}: {
  href: string;
  isActive: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`px-4 py-2.5 rounded-lg text-base font-medium transition-all duration-200 ${
        isActive
          ? 'bg-primary-50 text-primary-700 shadow-sm'
          : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
      }`}
    >
      {children}
    </Link>
  );
}

/**
 * Mobile navigation section with sub-items
 */
function MobileNavSection({
  label,
  isActive,
  items,
  onClick,
}: {
  label: string;
  isActive: boolean;
  items: Array<{ href: string; label: string }>;
  onClick: () => void;
}) {
  const [isExpanded, setIsExpanded] = useState(isActive);

  return (
    <div>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`w-full px-4 py-2.5 rounded-lg text-base font-medium flex items-center justify-between transition-all duration-200 ${
          isActive
            ? 'bg-primary-50 text-primary-700 shadow-sm'
            : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
        }`}
      >
        {label}
        <svg
          className={`h-5 w-5 transition-transform duration-200 ${
            isExpanded ? 'rotate-180' : ''
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      {isExpanded && (
        <div className="pl-4 mt-1 space-y-1">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClick}
              className="block px-4 py-2 rounded-lg text-sm text-slate-600 hover:bg-primary-50 hover:text-primary-700 transition-colors duration-150"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
