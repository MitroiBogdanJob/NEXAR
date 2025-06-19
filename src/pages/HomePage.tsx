import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, Star, Shield, Users, TrendingUp, ArrowRight, CheckCircle, Heart, MapPin, Calendar, Gauge, Filter, X, SlidersHorizontal } from 'lucide-react';

const HomePage = () => {
  const [showFilters, setShowFilters] = useState(false); // Default false on mobile
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    priceMin: '',
    priceMax: '',
    brand: '',
    sellerType: '',
    engineMin: '',
    engineMax: '',
    yearMin: '',
    yearMax: '',
    mileageMax: ''
  });

  const allListings = [
    {
      id: 1,
      title: "Yamaha YZF-R1 2023",
      price: 18500,
      year: 2023,
      mileage: 2500,
      location: "București",
      image: "https://images.pexels.com/photos/2116475/pexels-photo-2116475.jpeg",
      rating: 4.9,
      category: "Sport",
      brand: "Yamaha",
      seller: "Moto Expert SRL",
      sellerType: "dealer",
      engine: 998
    },
    {
      id: 2,
      title: "BMW S1000RR 2022",
      price: 16800,
      year: 2022,
      mileage: 8200,
      location: "Cluj-Napoca",
      image: "https://images.pexels.com/photos/2116475/pexels-photo-2116475.jpeg",
      rating: 4.8,
      category: "Sport",
      brand: "BMW",
      seller: "BMW Moto Center",
      sellerType: "dealer",
      engine: 999
    },
    {
      id: 3,
      title: "Ducati Panigale V4",
      price: 22000,
      year: 2023,
      mileage: 1200,
      location: "Timișoara",
      image: "https://images.pexels.com/photos/2116475/pexels-photo-2116475.jpeg",
      rating: 5.0,
      category: "Sport",
      brand: "Ducati",
      seller: "Ducati Premium",
      sellerType: "dealer",
      engine: 1103
    },
    {
      id: 4,
      title: "BMW R1250GS Adventure",
      price: 19800,
      year: 2023,
      mileage: 3200,
      location: "Iași",
      image: "https://images.pexels.com/photos/2116475/pexels-photo-2116475.jpeg",
      rating: 4.9,
      category: "Adventure",
      brand: "BMW",
      seller: "BMW Adventure",
      sellerType: "dealer",
      engine: 1254
    },
    {
      id: 5,
      title: "Harley-Davidson Street Glide",
      price: 24500,
      year: 2022,
      mileage: 5600,
      location: "București",
      image: "https://images.pexels.com/photos/2116475/pexels-photo-2116475.jpeg",
      rating: 4.7,
      category: "Touring",
      brand: "Harley-Davidson",
      seller: "Harley Center",
      sellerType: "dealer",
      engine: 1868
    },
    {
      id: 6,
      title: "KTM 1290 Super Duke R",
      price: 16200,
      year: 2022,
      mileage: 7300,
      location: "Cluj-Napoca",
      image: "https://images.pexels.com/photos/2116475/pexels-photo-2116475.jpeg",
      rating: 4.6,
      category: "Naked",
      brand: "KTM",
      seller: "Vânzător Individual",
      sellerType: "privat",
      engine: 1301
    },
    {
      id: 7,
      title: "Honda CBR600RR 2021",
      price: 12800,
      year: 2021,
      mileage: 4500,
      location: "Constanța",
      image: "https://images.pexels.com/photos/2116475/pexels-photo-2116475.jpeg",
      rating: 4.5,
      category: "Sport",
      brand: "Honda",
      seller: "Honda Center",
      sellerType: "dealer",
      engine: 599
    },
    {
      id: 8,
      title: "Suzuki GSX-R1000R",
      price: 15800,
      year: 2021,
      mileage: 12000,
      location: "Brașov",
      image: "https://images.pexels.com/photos/2116475/pexels-photo-2116475.jpeg",
      rating: 4.5,
      category: "Sport",
      brand: "Suzuki",
      seller: "Vânzător Individual",
      sellerType: "privat",
      engine: 999
    }
  ];

  // Filtrare și căutare
  const filteredListings = useMemo(() => {
    return allListings.filter(listing => {
      // Căutare în text
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = !searchQuery || 
        listing.title.toLowerCase().includes(searchLower) ||
        listing.brand.toLowerCase().includes(searchLower) ||
        listing.category.toLowerCase().includes(searchLower) ||
        listing.location.toLowerCase().includes(searchLower) ||
        listing.seller.toLowerCase().includes(searchLower);

      // Filtre
      const matchesPrice = (!filters.priceMin || listing.price >= parseInt(filters.priceMin)) &&
                          (!filters.priceMax || listing.price <= parseInt(filters.priceMax));
      
      const matchesBrand = !filters.brand || listing.brand.toLowerCase() === filters.brand.toLowerCase();
      
      const matchesSellerType = !filters.sellerType || listing.sellerType === filters.sellerType;
      
      const matchesEngine = (!filters.engineMin || listing.engine >= parseInt(filters.engineMin)) &&
                           (!filters.engineMax || listing.engine <= parseInt(filters.engineMax));
      
      const matchesYear = (!filters.yearMin || listing.year >= parseInt(filters.yearMin)) &&
                         (!filters.yearMax || listing.year <= parseInt(filters.yearMax));
      
      const matchesMileage = !filters.mileageMax || listing.mileage <= parseInt(filters.mileageMax);

      return matchesSearch && matchesPrice && matchesBrand && matchesSellerType && 
             matchesEngine && matchesYear && matchesMileage;
    });
  }, [searchQuery, filters, allListings]);

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      priceMin: '',
      priceMax: '',
      brand: '',
      sellerType: '',
      engineMin: '',
      engineMax: '',
      yearMin: '',
      yearMax: '',
      mileageMax: ''
    });
    setSearchQuery('');
  };

  const categories = [
    { name: "Sport", count: "245 anunțuri", image: "https://images.pexels.com/photos/2116475/pexels-photo-2116475.jpeg" },
    { name: "Touring", count: "189 anunțuri", image: "https://images.pexels.com/photos/2116475/pexels-photo-2116475.jpeg" },
    { name: "Cruiser", count: "156 anunțuri", image: "https://images.pexels.com/photos/2116475/pexels-photo-2116475.jpeg" },
    { name: "Adventure", count: "203 anunțuri", image: "https://images.pexels.com/photos/2116475/pexels-photo-2116475.jpeg" },
  ];

  const ListingRow = ({ listing }: { listing: any }) => (
    <Link
      to={`/anunt/${listing.id}`}
      className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 group border border-gray-100 block"
    >
      <div className="flex flex-col sm:flex-row">
        <div className="relative w-full sm:w-64 flex-shrink-0">
          <img
            src={listing.image}
            alt={listing.title}
            className="w-full h-48 sm:h-40 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-3 left-3">
            <span className="bg-nexar-accent text-white px-3 py-1 rounded-full text-xs font-semibold">
              {listing.category}
            </span>
          </div>
          <button className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-colors">
            <Heart className="h-4 w-4 text-gray-600 hover:text-nexar-accent transition-colors" />
          </button>
        </div>
        
        <div className="flex-1 p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3">
            <div className="mb-3 sm:mb-0">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-nexar-accent transition-colors mb-2">
                {listing.title}
              </h3>
              <div className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">€{listing.price.toLocaleString()}</div>
              <div className="text-sm text-gray-500">
                Vândut de: <span className="font-semibold text-gray-700">{listing.seller}</span>
                <span className={`ml-2 px-2 py-1 rounded-full text-xs font-semibold ${
                  listing.sellerType === 'dealer' 
                    ? 'bg-blue-100 text-blue-800' 
                    : 'bg-green-100 text-green-800'
                }`}>
                  {listing.sellerType === 'dealer' ? 'Dealer' : 'Privat'}
                </span>
              </div>
            </div>
            
            <div className="flex items-center space-x-1 bg-gray-50 rounded-lg px-3 py-1 self-start">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="text-sm font-semibold">{listing.rating}</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 mb-4">
            <div className="flex items-center space-x-2 text-gray-600">
              <Calendar className="h-4 w-4" />
              <span className="text-sm font-medium">{listing.year}</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <Gauge className="h-4 w-4" />
              <span className="text-sm font-medium">{listing.mileage.toLocaleString()} km</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <MapPin className="h-4 w-4" />
              <span className="text-sm font-medium">{listing.location}</span>
            </div>
          </div>
          
          <div className="bg-nexar-accent text-white px-4 sm:px-6 py-2.5 rounded-lg font-semibold hover:bg-nexar-gold transition-colors inline-flex items-center space-x-2 w-full sm:w-auto justify-center sm:justify-start">
            <span>Vezi Detalii</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </Link>
  );

  return (
    <div className="animate-fade-in">
      {/* Hero Section - Mobile Optimized */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="text-center text-white">
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4 sm:mb-6 leading-tight">
              Găsește Motocicleta
              <span className="block text-nexar-accent">Perfectă</span>
            </h1>
            
            {/* Hero Search - Mobile Optimized */}
            <div className="max-w-xl mx-auto mb-6 sm:mb-8">
              <div className="relative backdrop-blur-md bg-white/10 rounded-2xl p-1 border border-white/20">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Caută după marcă, model..."
                  className="w-full pl-4 pr-20 sm:pr-24 py-3 text-base rounded-xl border-0 bg-white/90 backdrop-blur-sm focus:ring-2 focus:ring-nexar-accent shadow-lg text-gray-900 placeholder-gray-600"
                />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-nexar-accent text-white px-4 sm:px-6 py-2 rounded-lg font-semibold hover:bg-nexar-gold transition-colors text-sm shadow-lg">
                  Caută
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center px-4 sm:px-0">
              <Link
                to="/anunturi"
                className="bg-nexar-accent/90 backdrop-blur-sm text-white px-6 py-3 rounded-xl font-semibold hover:bg-nexar-gold transition-all duration-200 transform hover:scale-105 shadow-lg border border-nexar-accent/30"
              >
                Explorează Anunțurile
              </Link>
              <Link
                to="/adauga-anunt"
                className="bg-white/90 backdrop-blur-sm text-gray-900 px-6 py-3 rounded-xl font-semibold hover:bg-white transition-all duration-200 transform hover:scale-105 shadow-lg border border-white/30"
              >
                Vinde Motocicleta Ta
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Listings with Filters - Mobile Optimized */}
      <section className="py-8 sm:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6 sm:mb-10">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              Anunțuri Premium
            </h2>
            <p className="text-lg text-gray-600 max-w-xl mx-auto">
              Descoperă cele mai noi și mai atractive motociclete disponibile pe platformă
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Filters Sidebar - Mobile Optimized - DOAR PENTRU DESKTOP */}
            <div className="hidden lg:block lg:w-80">
              <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24 border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                    <Filter className="h-5 w-5" />
                    <span>Filtrează</span>
                  </h3>
                </div>

                <div className="space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto">
                  {/* Brand */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">Marcă</label>
                    <select
                      value={filters.brand}
                      onChange={(e) => handleFilterChange('brand', e.target.value)}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-nexar-accent focus:border-transparent"
                    >
                      <option value="">Toate mărcile</option>
                      <option value="Yamaha">Yamaha</option>
                      <option value="Honda">Honda</option>
                      <option value="Suzuki">Suzuki</option>
                      <option value="Kawasaki">Kawasaki</option>
                      <option value="BMW">BMW</option>
                      <option value="Ducati">Ducati</option>
                      <option value="KTM">KTM</option>
                      <option value="Aprilia">Aprilia</option>
                      <option value="Triumph">Triumph</option>
                      <option value="Harley-Davidson">Harley-Davidson</option>
                      <option value="MV Agusta">MV Agusta</option>
                      <option value="Benelli">Benelli</option>
                      <option value="Moto Guzzi">Moto Guzzi</option>
                      <option value="Indian">Indian</option>
                      <option value="Zero">Zero</option>
                      <option value="Energica">Energica</option>
                      <option value="Husqvarna">Husqvarna</option>
                      <option value="Beta">Beta</option>
                      <option value="Sherco">Sherco</option>
                      <option value="GasGas">GasGas</option>
                    </select>
                  </div>

                  {/* Seller Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">Tip Vânzător</label>
                    <select
                      value={filters.sellerType}
                      onChange={(e) => handleFilterChange('sellerType', e.target.value)}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-nexar-accent focus:border-transparent"
                    >
                      <option value="">Toți vânzătorii</option>
                      <option value="privat">Privat</option>
                      <option value="dealer">Dealer</option>
                    </select>
                  </div>

                  {/* Engine Size */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">Capacitate Motor (cc)</label>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="number"
                        placeholder="Min"
                        value={filters.engineMin}
                        onChange={(e) => handleFilterChange('engineMin', e.target.value)}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-nexar-accent focus:border-transparent"
                      />
                      <input
                        type="number"
                        placeholder="Max"
                        value={filters.engineMax}
                        onChange={(e) => handleFilterChange('engineMax', e.target.value)}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-nexar-accent focus:border-transparent"
                      />
                    </div>
                  </div>

                  {/* Price Range */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">Preț (EUR)</label>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="number"
                        placeholder="Min"
                        value={filters.priceMin}
                        onChange={(e) => handleFilterChange('priceMin', e.target.value)}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-nexar-accent focus:border-transparent"
                      />
                      <input
                        type="number"
                        placeholder="Max"
                        value={filters.priceMax}
                        onChange={(e) => handleFilterChange('priceMax', e.target.value)}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-nexar-accent focus:border-transparent"
                      />
                    </div>
                  </div>

                  {/* Mileage */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">Kilometraj Maxim</label>
                    <input
                      type="number"
                      placeholder="ex: 50000"
                      value={filters.mileageMax}
                      onChange={(e) => handleFilterChange('mileageMax', e.target.value)}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-nexar-accent focus:border-transparent"
                    />
                  </div>

                  {/* Year Range */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">An Fabricație</label>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="number"
                        placeholder="De la"
                        value={filters.yearMin}
                        onChange={(e) => handleFilterChange('yearMin', e.target.value)}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-nexar-accent focus:border-transparent"
                      />
                      <input
                        type="number"
                        placeholder="Până la"
                        value={filters.yearMax}
                        onChange={(e) => handleFilterChange('yearMax', e.target.value)}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-nexar-accent focus:border-transparent"
                      />
                    </div>
                  </div>

                  {/* Clear Filters */}
                  <button
                    onClick={clearFilters}
                    className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2"
                  >
                    <X className="h-4 w-4" />
                    <span>Șterge Filtrele</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Mobile Filters Modal */}
            {showFilters && (
              <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 lg:hidden">
                <div className="fixed inset-x-0 bottom-0 bg-white rounded-t-2xl max-h-[80vh] overflow-y-auto">
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                        <Filter className="h-5 w-5" />
                        <span>Filtrează Rezultatele</span>
                      </h3>
                      <button
                        onClick={() => setShowFilters(false)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>

                    <div className="space-y-6">
                      {/* Brand */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">Marcă</label>
                        <select
                          value={filters.brand}
                          onChange={(e) => handleFilterChange('brand', e.target.value)}
                          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-nexar-accent focus:border-transparent"
                        >
                          <option value="">Toate mărcile</option>
                          <option value="Yamaha">Yamaha</option>
                          <option value="Honda">Honda</option>
                          <option value="Suzuki">Suzuki</option>
                          <option value="Kawasaki">Kawasaki</option>
                          <option value="BMW">BMW</option>
                          <option value="Ducati">Ducati</option>
                          <option value="KTM">KTM</option>
                          <option value="Aprilia">Aprilia</option>
                          <option value="Triumph">Triumph</option>
                          <option value="Harley-Davidson">Harley-Davidson</option>
                        </select>
                      </div>

                      {/* Seller Type */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">Tip Vânzător</label>
                        <select
                          value={filters.sellerType}
                          onChange={(e) => handleFilterChange('sellerType', e.target.value)}
                          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-nexar-accent focus:border-transparent"
                        >
                          <option value="">Toți vânzătorii</option>
                          <option value="privat">Privat</option>
                          <option value="dealer">Dealer</option>
                        </select>
                      </div>

                      {/* Price Range */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">Preț (EUR)</label>
                        <div className="grid grid-cols-2 gap-2">
                          <input
                            type="number"
                            placeholder="Min"
                            value={filters.priceMin}
                            onChange={(e) => handleFilterChange('priceMin', e.target.value)}
                            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-nexar-accent focus:border-transparent"
                          />
                          <input
                            type="number"
                            placeholder="Max"
                            value={filters.priceMax}
                            onChange={(e) => handleFilterChange('priceMax', e.target.value)}
                            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-nexar-accent focus:border-transparent"
                          />
                        </div>
                      </div>

                      {/* Clear Filters */}
                      <button
                        onClick={clearFilters}
                        className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2"
                      >
                        <X className="h-4 w-4" />
                        <span>Șterge Filtrele</span>
                      </button>

                      {/* Apply Filters Button */}
                      <button
                        onClick={() => setShowFilters(false)}
                        className="w-full bg-nexar-accent text-white py-3 rounded-lg font-semibold hover:bg-nexar-gold transition-colors"
                      >
                        Aplică Filtrele
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Main Content */}
            <div className="flex-1">
              {/* Toggle Filters Button - DOAR PE MOBILE */}
              <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <button
                  onClick={() => setShowFilters(true)}
                  className="flex items-center space-x-2 bg-white text-gray-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-50 transition-colors border border-gray-200 lg:hidden"
                >
                  <SlidersHorizontal className="h-4 w-4" />
                  <span>Filtre</span>
                </button>
                
                <p className="text-gray-600 text-sm sm:text-base">
                  {filteredListings.length} rezultate găsite
                  {searchQuery && (
                    <span className="block sm:inline sm:ml-2 text-nexar-accent">
                      pentru "{searchQuery}"
                    </span>
                  )}
                </p>
              </div>

              {/* No Results */}
              {filteredListings.length === 0 && (
                <div className="bg-white rounded-xl shadow-sm p-8 sm:p-12 text-center border border-gray-100">
                  <Search className="h-12 sm:h-16 w-12 sm:w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Nu am găsit rezultate</h3>
                  <p className="text-gray-600 mb-6 text-sm sm:text-base">
                    Încearcă să modifici criteriile de căutare sau filtrele pentru a găsi mai multe rezultate.
                  </p>
                  <button
                    onClick={clearFilters}
                    className="bg-nexar-accent text-white px-6 py-3 rounded-lg font-semibold hover:bg-nexar-gold transition-colors"
                  >
                    Șterge Toate Filtrele
                  </button>
                </div>
              )}

              {/* Listings */}
              <div className="space-y-4">
                {filteredListings.map((listing) => (
                  <ListingRow key={listing.id} listing={listing} />
                ))}
              </div>

              <div className="text-center mt-6 sm:mt-10">
                <Link
                  to="/anunturi"
                  className="inline-flex items-center space-x-2 bg-nexar-accent text-white px-6 py-3 rounded-lg font-semibold hover:bg-nexar-gold transition-colors"
                >
                  <span>Vezi Toate Anunțurile</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories - Mobile Optimized */}
      <section className="py-8 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6 sm:mb-10">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              Categorii Populare
            </h2>
            <p className="text-base sm:text-lg text-gray-600">
              Găsește exact tipul de motocicletă pe care îl cauți
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {categories.map((category, index) => (
              <Link
                key={index}
                to={`/anunturi?categorie=${category.name.toLowerCase()}`}
                className="group relative overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-105 border border-gray-200"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-24 sm:h-32 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 text-white">
                  <h3 className="font-bold text-sm sm:text-base mb-1">{category.name}</h3>
                  <p className="text-xs text-gray-200">{category.count}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us - Mobile Optimized */}
      <section className="py-8 sm:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6 sm:mb-10">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              De Ce Să Alegi Nexar?
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-xl mx-auto">
              Oferim cea mai sigură și eficientă platformă pentru cumpărarea și vânzarea motocicletelor
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm text-center hover:shadow-md transition-shadow border border-gray-200">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-nexar-accent/10 rounded-lg mb-4">
                <Shield className="h-6 w-6 text-nexar-accent" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3">Siguranță Garantată</h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                Toate anunțurile sunt verificate manual. Sistem de rating și recenzii pentru fiecare vânzător.
              </p>
            </div>

            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm text-center hover:shadow-md transition-shadow border border-gray-200">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-nexar-accent/10 rounded-lg mb-4">
                <CheckCircle className="h-6 w-6 text-nexar-accent" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3">Proces Simplificat</h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                Interfață intuitivă și proces de listare simplu. Publică anunțul tău în doar câteva minute.
              </p>
            </div>

            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm text-center hover:shadow-md transition-shadow border border-gray-200 md:col-span-2 lg:col-span-1">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-nexar-accent/10 rounded-lg mb-4">
                <Users className="h-6 w-6 text-nexar-accent" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3">Comunitate Activă</h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                Peste 15,000 de pasionați de motociclete. Găsește sfaturi și recomandări de la experți.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Mobile Optimized */}
      <section className="py-8 sm:py-16 bg-gradient-to-r from-gray-900 to-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4">
            Gata să Începi?
          </h2>
          <p className="text-base sm:text-lg text-gray-300 mb-6 leading-relaxed">
            Alătură-te comunității Nexar și descoperă cea mai bună experiență de cumpărare și vânzare de motociclete
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/auth"
              className="bg-nexar-accent/90 backdrop-blur-sm text-white px-6 py-3 rounded-xl font-semibold hover:bg-nexar-gold transition-all duration-200 transform hover:scale-105 shadow-lg border border-nexar-accent/30"
            >
              Creează Cont Gratuit
            </Link>
            <Link
              to="/anunturi"
              className="bg-white/90 backdrop-blur-sm text-gray-900 px-6 py-3 rounded-xl font-semibold hover:bg-white transition-all duration-200 transform hover:scale-105 shadow-lg border border-white/30"
            >
              Explorează Anunțurile
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;