import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { 
  Star, Heart, Share2, MapPin, Calendar, Gauge, Fuel, 
  Settings, Shield, Phone, MessageCircle, 
  ChevronLeft, ChevronRight, Check,
  Car, Cog, Palette, Award, User, ExternalLink
} from 'lucide-react';

const ListingDetailPage = () => {
  const { id } = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showContactForm, setShowContactForm] = useState(false);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const listing = {
    id: 1,
    title: "Yamaha YZF-R1 2023",
    price: "€18,500",
    year: 2023,
    mileage: "2,500 km",
    location: "București, Sector 1",
    coordinates: "44.4268,26.1025", // Coordonate pentru Google Maps
    images: [
      "https://images.pexels.com/photos/2116475/pexels-photo-2116475.jpeg",
      "https://images.pexels.com/photos/2116475/pexels-photo-2116475.jpeg",
      "https://images.pexels.com/photos/2116475/pexels-photo-2116475.jpeg",
      "https://images.pexels.com/photos/2116475/pexels-photo-2116475.jpeg",
      "https://images.pexels.com/photos/2116475/pexels-photo-2116475.jpeg"
    ],
    rating: 4.9,
    seller: {
      name: "Moto Expert SRL",
      rating: 4.8,
      reviews: 127,
      verified: true,
      phone: "0790 45 46 47",
      email: "contact@motoexpert.ro",
      avatar: "https://images.pexels.com/photos/2116475/pexels-photo-2116475.jpeg"
    },
    category: "Sport",
    engine: "998cc",
    fuel: "Benzină",
    transmission: "Manual",
    color: "Albastru Racing",
    condition: "Excelentă",
    features: [
      "ABS",
      "Control tracțiune",
      "Suspensie reglabilă",
      "Frâne Brembo",
      "Quickshifter",
      "Sistem de navigație",
      "Încălzire mânere",
      "LED complet"
    ],
    description: `
      Yamaha YZF-R1 2023 în stare impecabilă, cu doar 2,500 km parcurși. 
      Motocicleta a fost întreținută exclusiv la service-ul autorizat Yamaha și 
      vine cu toate documentele în regulă.
      
      Caracteristici tehnice:
      - Motor: 998cc, 4 cilindri în linie
      - Putere: 200 CP
      - Cuplu: 112.4 Nm
      - Greutate: 199 kg
      
      Dotări speciale:
      - Pachet electronic complet (ABS, TC, Launch Control)
      - Suspensie Öhlins reglabilă
      - Frâne Brembo cu discuri flotante
      - Jante din aliaj ușor
      - Sistem de evacuare Akrapovic (opțional)
      
      Motocicleta nu a fost implicată în accidente și nu prezintă defecte.
      Disponibilă pentru test drive cu programare prealabilă.
    `,
    posted: "Acum 2 zile",
    views: 1247,
    featured: true
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === listing.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? listing.images.length - 1 : prev - 1
    );
  };

  const technicalSpecs = [
    { icon: Calendar, label: "Categorie", value: listing.category, color: "text-blue-600" },
    { icon: Cog, label: "Transmisie", value: listing.transmission, color: "text-green-600" },
    { icon: Palette, label: "Culoare", value: listing.color, color: "text-purple-600" },
    { icon: Award, label: "Stare", value: listing.condition, color: "text-emerald-600" },
    { icon: MapPin, label: "Locație", value: listing.location, color: "text-red-600" }
  ];

  const openGoogleMaps = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${listing.coordinates}`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="relative">
                <img
                  src={listing.images[currentImageIndex]}
                  alt={listing.title}
                  className="w-full h-96 object-cover"
                />
                
                {listing.featured && (
                  <div className="absolute top-4 left-4">
                    <span className="bg-nexar-accent text-white px-4 py-2 rounded-full font-semibold">
                      Premium
                    </span>
                  </div>
                )}
                
                <div className="absolute top-4 right-4 flex space-x-2">
                  <button className="bg-white/90 backdrop-blur-sm rounded-full p-3 hover:bg-white transition-colors">
                    <Heart className="h-5 w-5 text-gray-600 hover:text-red-500 transition-colors" />
                  </button>
                  <button className="bg-white/90 backdrop-blur-sm rounded-full p-3 hover:bg-white transition-colors">
                    <Share2 className="h-5 w-5 text-gray-600" />
                  </button>
                </div>
                
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-colors"
                >
                  <ChevronLeft className="h-6 w-6 text-gray-600" />
                </button>
                
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-colors"
                >
                  <ChevronRight className="h-6 w-6 text-gray-600" />
                </button>
                
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {listing.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-3 h-3 rounded-full transition-colors ${
                        index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              </div>
              
              {/* Thumbnail Gallery */}
              <div className="p-4">
                <div className="flex space-x-2 overflow-x-auto">
                  {listing.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                        index === currentImageIndex ? 'border-nexar-accent' : 'border-gray-200'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${listing.title} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Details */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{listing.title}</h1>
                  <div className="flex items-center space-x-4 text-gray-600">
                    <span className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>Publicat {listing.posted}</span>
                    </span>
                    <span>{listing.views} vizualizări</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-bold text-nexar-accent mb-2">{listing.price}</div>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="font-semibold">{listing.rating}</span>
                  </div>
                </div>
              </div>

              {/* Specifications */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <Calendar className="h-8 w-8 text-nexar-accent mx-auto mb-2" />
                  <div className="font-semibold text-gray-900">{listing.year}</div>
                  <div className="text-sm text-gray-600">An fabricație</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <Gauge className="h-8 w-8 text-nexar-accent mx-auto mb-2" />
                  <div className="font-semibold text-gray-900">{listing.mileage}</div>
                  <div className="text-sm text-gray-600">Kilometraj</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <Settings className="h-8 w-8 text-nexar-accent mx-auto mb-2" />
                  <div className="font-semibold text-gray-900">{listing.engine}</div>
                  <div className="text-sm text-gray-600">Capacitate motor</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <Fuel className="h-8 w-8 text-nexar-accent mx-auto mb-2" />
                  <div className="font-semibold text-gray-900">{listing.fuel}</div>
                  <div className="text-sm text-gray-600">Combustibil</div>
                </div>
              </div>

              {/* Modern Technical Details & Features */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {/* Technical Details */}
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
                    <Car className="h-6 w-6 text-nexar-accent" />
                    <span>Detalii Tehnice</span>
                  </h3>
                  
                  <div className="space-y-4">
                    {technicalSpecs.map((spec, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center space-x-3">
                          <div className={`p-2 rounded-lg bg-gray-50 ${spec.color}`}>
                            <spec.icon className="h-5 w-5" />
                          </div>
                          <span className="font-medium text-gray-700">{spec.label}</span>
                        </div>
                        <span className="font-bold text-gray-900">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Features */}
                <div className="bg-gradient-to-br from-nexar-accent/5 to-nexar-gold/5 rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
                    <Settings className="h-6 w-6 text-nexar-accent" />
                    <span>Dotări</span>
                  </h3>
                  
                  <div className="grid grid-cols-1 gap-3">
                    {listing.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105">
                        <div className="flex-shrink-0 w-8 h-8 bg-nexar-accent/10 rounded-full flex items-center justify-center">
                          <Check className="h-4 w-4 text-nexar-accent" />
                        </div>
                        <span className="font-medium text-gray-800">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
                  <MessageCircle className="h-6 w-6 text-blue-600" />
                  <span>Descriere Detaliată</span>
                </h3>
                <div className="prose max-w-none text-gray-700 leading-relaxed">
                  {listing.description.split('\n').map((paragraph, index) => (
                    <p key={index} className="mb-4">{paragraph}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Seller Info */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center space-x-4 mb-6">
                <img
                  src={listing.seller.avatar}
                  alt={listing.seller.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="text-lg font-semibold text-gray-900">{listing.seller.name}</h3>
                    {listing.seller.verified && (
                      <Shield className="h-5 w-5 text-green-500" />
                    )}
                  </div>
                  <div className="flex items-center space-x-1 text-sm text-gray-600">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span>{listing.seller.rating}</span>
                    <span>({listing.seller.reviews} recenzii)</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => setShowContactForm(!showContactForm)}
                  className="w-full bg-nexar-accent text-white py-3 rounded-xl font-semibold hover:bg-nexar-gold transition-colors flex items-center justify-center space-x-2"
                >
                  <MessageCircle className="h-5 w-5" />
                  <span>Trimite Mesaj</span>
                </button>
                
                <a
                  href={`tel:${listing.seller.phone}`}
                  className="w-full bg-gray-900 text-white py-3 rounded-xl font-semibold hover:bg-gray-800 transition-colors flex items-center justify-center space-x-2"
                >
                  <Phone className="h-5 w-5" />
                  <span>Sună Acum</span>
                </a>
                
                <button
                  onClick={openGoogleMaps}
                  className="w-full border-2 border-gray-900 text-gray-900 py-3 rounded-xl font-semibold hover:bg-gray-900 hover:text-white transition-colors flex items-center justify-center space-x-2"
                >
                  <ExternalLink className="h-5 w-5" />
                  <span>Vezi pe Hartă</span>
                </button>
              </div>

              {showContactForm && (
                <div className="mt-6 pt-6 border-t border-gray-200 animate-slide-up">
                  <form className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Numele tău
                      </label>
                      <input
                        type="text"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-nexar-accent focus:border-transparent"
                        placeholder="Introdu numele tău"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-nexar-accent focus:border-transparent"
                        placeholder="email@exemplu.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Mesaj
                      </label>
                      <textarea
                        rows={4}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-nexar-accent focus:border-transparent"
                        placeholder="Sunt interesat de această motocicletă..."
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-nexar-accent text-white py-3 rounded-lg font-semibold hover:bg-nexar-gold transition-colors"
                    >
                      Trimite Mesaj
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingDetailPage;