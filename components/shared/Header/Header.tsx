'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  ShoppingCart, 
  User, 
  Menu, 
  X, 
  LogOut,
  Search,
  Home
} from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { Button } from '@/components/ui/button';

// Types
interface NavItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
  requiresAuth?: boolean;
  roles?: string[];
}

// Constants
const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '/', icon: <Home size={18} /> },
  { label: 'Products', href: '/products' },
  { label: 'My Orders', href: '/orders', requiresAuth: true },
  { label: 'Cart', href: '/cart', icon: <ShoppingCart size={18} /> },
];

const ADMIN_NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', href: '/admin', requiresAuth: true, roles: ['admin'] },
  { label: 'Manage Products', href: '/admin/products', requiresAuth: true, roles: ['admin'] },
];

export const Header: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isAuthenticated, logout } = useAuthStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [cart, isCart] = useState(false)

  // Handlers
  const handleLogout = () => {
    logout();
    router.push('/');
    setIsMobileMenuOpen(false);
  };

  const handleNavigation = (href: string) => {
    router.push(href);
    setIsMobileMenuOpen(false);
  };

  // Helper functions
  const getUserDisplayName = () => {
    if (!user) return 'Guest';
    return user.name || user.email?.split('@')[0] || 'User';
  };

  const getUserInitial = () => {
    if (!user) return 'G';
    return user.name?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase() || 'U';
  };

  const isActiveRoute = (href: string) => {
    if (href === '/') return pathname === href;
    return pathname?.startsWith(href) || false;
  };

  const canViewNavItem = (item: NavItem) => {
    if (!item.requiresAuth) return true;
    if (!isAuthenticated) return false;
    if (item.roles && !item.roles.includes(user?.role || '')) return false;
    return true;
  };

  const getAllNavItems = () => {
    const items = [...NAV_ITEMS];
    if (isAuthenticated && user?.role === 'admin') {
      items.push(...ADMIN_NAV_ITEMS);
    }
    return items.filter(canViewNavItem);
  };

  // Render helpers
  const renderDesktopNav = () => (
    <nav className="hidden md:flex items-center space-x-6" aria-label="Main navigation">
      {getAllNavItems().map((item) => (
        <button
          key={item.href}
          onClick={() => handleNavigation(item.href)}
          className={`flex items-center space-x-1 text-sm font-medium transition-colors duration-200
            ${isActiveRoute(item.href) 
              ? 'text-blue-600 dark:text-blue-400' 
              : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
            }`}
          aria-current={isActiveRoute(item.href) ? 'page' : undefined}
        >
          {item.icon}
          <span>{item.label}</span>
        </button>
      ))}
    </nav>
  );

  const renderMobileNav = () => (
    <div
      className={`fixed inset-0 z-50 bg-white dark:bg-gray-900 transform transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}
        md:hidden`}
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation"
    >
      <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
        <span className="text-lg font-bold">Menu</span>
        <button
          onClick={() => setIsMobileMenuOpen(false)}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          aria-label="Close menu"
        >
          <X size={24} />
        </button>
      </div>
      
      <nav className="p-4 space-y-2" aria-label="Mobile navigation">
        {getAllNavItems().map((item) => (
          <button
            key={item.href}
            onClick={() => handleNavigation(item.href)}
            className={`flex items-center space-x-3 w-full px-4 py-3 rounded-lg transition-colors
              ${isActiveRoute(item.href)
                ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                : 'hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
              }`}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
        
        {isAuthenticated && (
          <button
            onClick={handleLogout}
            className="flex items-center space-x-3 w-full px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        )}
      </nav>
    </div>
  );

  const renderUserSection = () => (
    <div className="flex items-center space-x-3">
      {/* Search Toggle */}
      <button
        onClick={() => setIsSearchOpen(!isSearchOpen)}
        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        aria-label={isSearchOpen ? 'Close search' : 'Open search'}
      >
        <Search size={20} />
      </button>

      {/* User Profile */}
      {isAuthenticated ? (
        <div className="relative group">
          <button
            className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="User menu"
          >
            <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-medium">
              {getUserInitial()}
            </div>
            <span className="hidden sm:inline text-sm font-medium text-gray-700 dark:text-gray-300">
              {getUserDisplayName()}
            </span>
          </button>
          
          {/* Dropdown */}
          <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-900 rounded-lg shadow-lg border dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
            <div className="p-3 border-b dark:border-gray-700">
              <p className="text-sm font-medium">{user?.name}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{user?.email}</p>
              <span className="inline-block mt-1 px-2 py-0.5 text-xs rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 capitalize">
                {user?.role}
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors rounded-b-lg"
            >
              <LogOut size={16} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      ) : (
        <Link
          href="/login"
          className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors text-sm font-medium"
        >
          <User size={18} />
          <span className="hidden sm:inline">Login</span>
        </Link>
      )}

      {/* Mobile Menu Toggle */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
    </div>
  );

  const renderSearchBar = () => (
    <div className={`w-full md:w-64 transition-all duration-300 ${isSearchOpen ? 'opacity-100 max-w-full' : 'opacity-0 max-w-0 overflow-hidden'}`}>
      <div className="relative">
        <input
          type="search"
          placeholder="Search products..."
          className="w-full px-4 py-2 pl-10 rounded-lg border dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          aria-label="Search products"
        />
        <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>
    </div>
  );

  return (
    <>
    <CartDrawer open={cart} onOpenChange={isCart} />
      <header className="sticky top-0 z-40 bg-white dark:bg-gray-900 border-b dark:border-gray-800 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link 
              href="/" 
              className="flex items-center space-x-2 text-xl font-bold text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <span className="text-blue-600 dark:text-blue-400">🛍️</span>
              <span className="hidden sm:inline">ShopStore</span>
            </Link>

            {/* Desktop Navigation */}
            {renderDesktopNav()}

            {/* Right Section */}
            <div className="flex items-center space-x-2">
              {renderSearchBar()}
              {renderUserSection()}
              <Button onClick={() => isCart(true)}>
                <ShoppingCart size={24} />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Overlay */}
      {renderMobileNav()}
    </>
  );
};

export default Header;