import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { User, Plus, Menu, X, Bell, Heart, Wifi, WifiOff } from 'lucide-react';
import { auth, checkSupabaseConnection } from '../lib/supabase';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in with proper variable declaration and error handling
    let userData: string | null = null;
    
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        userData = localStorage.getItem('user');
        if (userData) {
          setUser(JSON.parse(userData));
        }
      }
    } catch (error) {
      console.error('Error accessing localStorage or parsing user data:', error);
      // Clear potentially corrupted data
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.removeItem('user');
      }
    }

    // Check Supabase connection
    const checkConnection = async () => {
      const connected = await checkSupabaseConnection();
      setIsConnected(connected);
    };
    
    checkConnection();
  }, []);

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = async () => {
    await auth.signOut();
    localStorage.removeItem('user');
    setUser(null);
    setIsUserMenuOpen(false);
    navigate('/');
  };

  return (
    <header className="bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          {/* Logo - MĂRIT SEMNIFICATIV */}
          <Link to="/" className="flex items-center group min-w-0">
            <img 
              src="/Nexar - logo_black & red.png" 
              alt="Nexar" 
              className="h-20 sm:h-24 w-auto transition-transform group-hover:scale-105 flex-shrink-0"
              onError={(e) => {
                // Try PNG if JPG fails
                const target = e.currentTarget as HTMLImageElement;
                if (target.src.includes('Nexar - logo_black & red.png')) {
                  target.src = '/nexar-logo.jpg';
                } else if (target.src.includes('nexar-logo.jpg')) {
                  // Try nexar-logo.png if the other fails
                  target.src = '/nexar-logo.png';
                } else if (target.src.includes('nexar-logo.png')) {
                  // Try image.png as fallback
                  target.src = '/image.png';
                } else {
                  // Final fallback - hide image and show text
                  target.style.display = 'none';
                  const textLogo = target.nextElementSibling as HTMLElement;
                  if (textLogo) {
                    textLogo.style.display = 'block';
                  }
                }
              }}
            />
            
            {/* Fallback text logo */}
            <div className="hidden text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-nexar-accent">
              NEXAR
            </div>
          </Link>

          {/* Connection Status Indicator */}
          <div className="hidden lg:flex items-center space-x-4">
            {isConnected !== null && (
              <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-medium ${
                isConnected 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {isConnected ? (
                  <>
                    <Wifi className="h-3 w-3" />
                    <span>Conectat</span>
                  </>
                ) : (
                  <>
                    <WifiOff className="h-3 w-3" />
                    <span>Deconectat</span>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden lg:flex items-center space-x-1">
            <Link
              to="/anunturi"
              className={`px-3 xl:px-4 py-2 rounded-lg font-medium transition-all duration-200 text-sm ${
                isActive('/anunturi')
                  ? 'bg-nexar-accent text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Anunțuri
            </Link>
            <Link
              to="/adauga-anunt"
              className="flex items-center space-x-2 bg-nexar-accent text-white px-3 xl:px-4 py-2 rounded-lg font-medium hover:bg-nexar-gold transition-all duration-200 text-sm"
            >
              <Plus className="h-4 w-4" />
              <span className="hidden xl:inline">Adaugă Anunț</span>
              <span className="xl:hidden">Adaugă</span>
            </Link>
            
            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                {user ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-7 h-7 bg-nexar-accent rounded-full flex items-center justify-center text-white font-semibold text-xs">
                      {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                    </div>
                    <span className="text-sm font-medium text-gray-700 hidden xl:inline">Bună, {user.name || 'Utilizator'}</span>
                  </div>
                ) : (
                  <User className="h-5 w-5 text-gray-700" />
                )}
              </button>
              
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white/95 backdrop-blur-md rounded-lg shadow-lg border border-gray-200 py-2 animate-scale-in">
                  {user ? (
                    <>
                      <Link
                        to="/profil"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        Profilul Meu
                      </Link>
                      <Link
                        to="/favorite"
                        className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <Heart className="h-4 w-4" />
                        <span>Favorite</span>
                      </Link>
                      <Link
                        to="/notificari"
                        className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <Bell className="h-4 w-4" />
                        <span>Notificări</span>
                      </Link>
                      <Link
                        to="/admin"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        Admin Panel
                      </Link>
                      <hr className="my-2" />
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        Deconectează-te
                      </button>
                    </>
                  ) : (
                    <Link
                      to="/auth"
                      className="block px-4 py-2 text-sm text-gray-900 font-medium hover:bg-gray-50 transition-colors"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      Conectează-te
                    </Link>
                  )}
                </div>
              )}
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-200 animate-slide-up bg-white/95 backdrop-blur-md">
            <div className="space-y-2">
              {/* Connection Status on Mobile */}
              {isConnected !== null && (
                <div className={`flex items-center justify-center space-x-2 px-4 py-2 rounded-lg text-xs font-medium ${
                  isConnected 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {isConnected ? (
                    <>
                      <Wifi className="h-3 w-3" />
                      <span>Conectat la Supabase</span>
                    </>
                  ) : (
                    <>
                      <WifiOff className="h-3 w-3" />
                      <span>Deconectat de la Supabase</span>
                    </>
                  )}
                </div>
              )}
              
              <Link
                to="/anunturi"
                className="block px-4 py-3 rounded-lg font-medium text-gray-700 hover:bg-gray-100 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Anunțuri
              </Link>
              <Link
                to="/adauga-anunt"
                className="flex items-center space-x-2 px-4 py-3 bg-nexar-accent text-white rounded-lg font-medium mx-0"
                onClick={() => setIsMenuOpen(false)}
              >
                <Plus className="h-4 w-4" />
                <span>Adaugă Anunț</span>
              </Link>
              
              {user ? (
                <>
                  <div className="px-4 py-3 text-gray-700 font-medium border-t border-gray-200 mt-2 pt-4">
                    Bună, {user.name || 'Utilizator'}
                  </div>
                  <Link
                    to="/profil"
                    className="block px-4 py-3 rounded-lg font-medium text-gray-700 hover:bg-gray-100 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Profilul Meu
                  </Link>
                  <Link
                    to="/admin"
                    className="block px-4 py-3 rounded-lg font-medium text-gray-700 hover:bg-gray-100 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Admin Panel
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left px-4 py-3 rounded-lg font-medium text-red-600 hover:bg-red-50 transition-colors"
                  >
                    Deconectează-te
                  </button>
                </>
              ) : (
                <Link
                  to="/auth"
                  className="block px-4 py-3 rounded-lg font-medium text-gray-900 hover:bg-gray-100 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Conectează-te
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;