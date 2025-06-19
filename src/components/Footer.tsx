import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Instagram, Clock } from 'lucide-react';

const Footer = () => {
  // Funcție pentru a asigura scroll la începutul paginii când se face click pe link-uri
  const handleLinkClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img 
                src="/nexar-logo.jpg" 
                alt="Nexar Logo" 
                className="h-28 sm:h-32 md:h-36 w-auto"
                onError={(e) => {
                  const target = e.currentTarget as HTMLImageElement;
                  if (target.src.includes('nexar-logo.jpg')) {
                    target.src = '/Nexar - logo_black & red.png';
                  } else if (target.src.includes('Nexar - logo_black & red.png')) {
                    target.src =  '/nexar-logo.png';
                  } else if (target.src.includes('nexar-logo.png')) {
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
              <div className="hidden text-3xl font-bold text-nexar-accent">
                NEXAR
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-gray-400">Premium Motorcycles</span>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed text-sm">
              Cel mai premium marketplace pentru motociclete din România. 
              Găsește sau vinde motocicleta perfectă cu încredere și siguranță.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/nnexar.ro" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-nexar-accent transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://www.instagram.com/nexar.ro/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-nexar-accent transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://www.tiktok.com/@nexar.ro" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-nexar-accent transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Navigare Rapidă</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/anunturi" className="text-gray-300 hover:text-white transition-colors text-sm" onClick={handleLinkClick}>
                  Toate Anunțurile
                </Link>
              </li>
              <li>
                <Link to="/adauga-anunt" className="text-gray-300 hover:text-white transition-colors text-sm" onClick={handleLinkClick}>
                  Adaugă Anunț
                </Link>
              </li>
              <li>
                <Link to="/despre" className="text-gray-300 hover:text-white transition-colors text-sm" onClick={handleLinkClick}>
                  Despre Noi
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white transition-colors text-sm" onClick={handleLinkClick}>
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Categorii Populare</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/anunturi?categorie=sport" className="text-gray-300 hover:text-white transition-colors text-sm" onClick={handleLinkClick}>
                  Motociclete Sport
                </Link>
              </li>
              <li>
                <Link to="/anunturi?categorie=touring" className="text-gray-300 hover:text-white transition-colors text-sm" onClick={handleLinkClick}>
                  Touring
                </Link>
              </li>
              <li>
                <Link to="/anunturi?categorie=cruiser" className="text-gray-300 hover:text-white transition-colors text-sm" onClick={handleLinkClick}>
                  Cruiser
                </Link>
              </li>
              <li>
                <Link to="/anunturi?categorie=adventure" className="text-gray-300 hover:text-white transition-colors text-sm" onClick={handleLinkClick}>
                  Adventure
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-nexar-accent" />
                <span className="text-gray-300 text-sm">0790 454 647</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-nexar-accent" />
                <span className="text-gray-300 text-sm">contact@nexar.ro</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-nexar-accent mt-0.5" />
                <span className="text-gray-300 text-sm">Bulevardul Dem Radulescu 24, Râmnicu Vâlcea</span>
              </div>
              <div className="flex items-start space-x-3">
                <Clock className="h-4 w-4 text-nexar-accent mt-0.5" />
                <div className="text-gray-300 text-sm">
                  <div>Luni - Vineri: 09:00 - 17:00</div>
                  <div>Weekend: Închis</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 sm:mt-12 pt-6 sm:pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-300 text-sm">
              © 2024 Nexar.ro. Toate drepturile rezervate.
            </p>
            <div className="flex space-x-4 sm:space-x-6 text-sm">
              <Link to="/termeni" className="text-gray-300 hover:text-white transition-colors" onClick={handleLinkClick}>
                Termeni și Condiții
              </Link>
              <Link to="/confidentialitate" className="text-gray-300 hover:text-white transition-colors" onClick={handleLinkClick}>
                Politica de Confidențialitate
              </Link>
              <Link to="/cookies" className="text-gray-300 hover:text-white transition-colors" onClick={handleLinkClick}>
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;