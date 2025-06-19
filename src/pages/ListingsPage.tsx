import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Star, Heart, MapPin, Calendar, Gauge, ChevronLeft, ChevronRight, Settings, Fuel, User, X, SlidersHorizontal } from 'lucide-react';

const ListingsPage = () => {
  const [showFilters, setShowFilters] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    priceMin: '',
    priceMax: '',
    category: '',
    brand: '',
    yearMin: '',
    yearMax: '',
    mileageMax: '',
    location: '',
    fuel: '',
    transmission: '',
    engineMin: '',
    engineMax: '',
    condition: '',
    sellerType: ''
  });
  const itemsPerPage = 10;

  const allListings = [
    {
      id: 1,
      title: "Yamaha YZF-R1 2023",
      price: 18500,
      year: 2023,
      mileage: 2500,
      location: "Timișoara",
      image: "https://images.pexels.com/photos/2116475/pexels-photo-2116475.jpeg",
      rating: 4.9,
      seller: "Vânzător Individual",
      sellerType: "individual",
      category: "Sport",
      brand: "Yamaha",
      model: "YZF-R1",
      engine: 998,
      fuel: "Benzină",
      transmission: "Manuală",
      condition: "La comandă",
      featured: true
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
      seller: "BMW Moto Center",
      sellerType: "dealer",
      category: "Sport",
      brand: "BMW",
      model: "S1000RR",
      engine: 999,
      fuel: "Benzină",
      transmission: "Manuală",
      condition: "Excelentă",
      featured: false
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
      seller: "Ducati Premium",
      sellerType: "dealer",
      category: "Sport",
      brand: "Ducati",
      model: "Panigale V4",
      engine: 1103,
      fuel: "Benzină",
      transmission: "Manuală",
      condition: "La comandă",
      featured: true
    },
    {
      id: 4,
      title: "Honda CBR600RR 2007",
      price: 7200,
      year: 2007,
      mileage: 11000,
      location: "București",
      image: "https://images.pexels.com/photos/2116475/pexels-photo-2116475.jpeg",
      rating: 4.3,
      seller: "Vânzător Individual",
      sellerType: "individual",
      category: "Sport",
      brand: "Honda",
      model: "CBR600RR",
      engine: 600,
      fuel: "Benzină",
      transmission: "Manuală",
      condition: "Bună",
      featured: false
    },
    {
      id: 5,
      title: "Kawasaki Ninja ZX-10R",
      price: 17200,
      year: 2022,
      mileage: 6500,
      location: "Constanța",
      image: "https://images.pexels.com/photos/2116475/pexels-photo-2116475.jpeg",
      rating: 4.6,
      seller: "Kawasaki Pro",
      sellerType: "dealer",
      category: "Sport",
      brand: "Kawasaki",
      model: "Ninja ZX-10R",
      engine: 998,
      fuel: "Benzină",
      transmission: "Manuală",
      condition: "Foarte bună",
      featured: false
    },
    {
      id: 6,
      title: "Suzuki GSX-R1000R",
      price: 15800,
      year: 2021,
      mileage: 12000,
      location: "Brașov",
      image: "https://images.pexels.com/photos/2116475/pexels-photo-2116475.jpeg",
      rating: 4.5,
      seller: "Suzuki Center",
      sellerType: "dealer",
      category: "Sport",
      brand: "Suzuki",
      model: "GSX-R1000R",
      engine: 999,
      fuel: "Benzină",
      transmission: "Manuală",
      condition: "Bună",
      featured: false
    },
    {
      id: 7,
      title: "Aprilia RSV4 1100 Factory",
      price: 21500,
      year: 2023,
      mileage: 1800,
      location: "București",
      image: "https://images.pexels.com/photos/2116475/pexels-photo-2116475.jpeg",
      rating: 4.9,
      seller: "Aprilia Racing",
      sellerType: "dealer",
      category: "Sport",
      brand: "Aprilia",
      model: "RSV4 1100 Factory",
      engine: 1077,
      fuel: "Benzină",
      transmission: "Manuală",
      condition: "La comandă",
      featured: true
    },
    {
      id: 8,
      title: "KTM 1290 Super Duke R",
      price: 16200,
      year: 2022,
      mileage: 7300,
      location: "Cluj-Napoca",
      image: "https://images.pexels.com/photos/2116475/pexels-photo-2116475.jpeg",
      rating: 4.7,
      seller: "KTM Center",
      sellerType: "dealer",
      category: "Naked",
      brand: "KTM",
      model: "1290 Super Duke R",
      engine: 1301,
      fuel: "Benzină",
      transmission: "Manuală",
      condition: "Foarte bună",
      featured: false
    },
    {
      id: 9,
      title: "Triumph Speed Triple 1200 RS",
      price: 18900,
      year: 2023,
      mileage: 2100,
      location: "Timișoara",
      image: "https://images.pexels.com/photos/2116475/pexels-photo-2116475.jpeg",
      rating: 4.8,
      seller: "Triumph Dealer",
      sellerType: "dealer",
      category: "Naked",
      brand: "Triumph",
      model: "Speed Triple 1200 RS",
      engine: 1160,
      fuel: "Benzină",
      transmission: "Manuală",
      condition: "Excelentă",
      featured: false
    },
    {
      id: 10,
      title: "Harley-Davidson Sportster S",
      price: 14800,
      year: 2022,
      mileage: 5600,
      location: "București",
      image: "https://images.pexels.com/photos/2116475/pexels-photo-2116475.jpeg",
      rating: 4.6,
      seller: "Harley Center",
      sellerType: "dealer",
      category: "Cruiser",
      brand: "Harley-Davidson",
      model: "Sportster S",
      engine: 1252,
      fuel: "Benzină",
      transmission: "Manuală",
      condition: "Foarte bună",
      featured: false
    },
    {
      id: 11,
      title: "BMW R1250GS Adventure",
      price: 19800,
      year: 2023,
      mileage: 3200,
      location: "Iași",
      image: "https://images.pexels.com/photos/2116475/pexels-photo-2116475.jpeg",
      rating: 4.9,
      seller: "BMW Adventure",
      sellerType: "dealer",
      category: "Adventure",
      brand: "BMW",
      model: "R1250GS Adventure",
      engine: 1254,
      fuel: "Benzină",
      transmission: "Manuală",
      condition: "Excelentă",
      featured: true
    },
    {
      id: 12,
      title: "Ducati Multistrada V4 S",
      price: 23500,
      year: 2023,
      mileage: 1500,
      location: "Constanța",
      image: "https://images.pexels.com/photos/2116475/pexels-photo-2116475.jpeg",
      rating: 5.0,
      seller: "Ducati Adventure",
      sellerType: "dealer",
      category: "Adventure",
      brand: "Ducati",
      model: "Multistrada V4 S",
      engine: 1158,
      fuel: "Benzină",
      transmission: "Manuală",
      condition: "La comandă",
      featured: true
    }
  ];

  // Filtrare și căutare avansată
  const filteredListings = useMemo(() => {
    return allListings.filter(listing => {
      // Căutare în text
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = !searchQuery || 
        listing.title.toLowerCase().includes(searchLower) ||
        listing.brand.toLowerCase().includes(searchLower) ||
        listing.model.toLowerCase().includes(searchLower) ||
        listing.category.toLowerCase().includes(searchLower) ||
        listing.location.toLowerCase().includes(searchLower) ||
        listing.seller.toLowerCase().includes(searchLower);

      // Filtre
      const matchesPrice = (!filters.priceMin || listing.price >= parseInt(filters.priceMin)) &&
                          (!filters.priceMax || listing.price <= parseInt(filters.priceMax));
      
      const matchesCategory = !filters.category || listing.category.toLowerCase() === filters.category.toLowerCase();
      
      const matchesBrand = !filters.brand || listing.brand.toLowerCase() === filters.brand.toLowerCase();
      
      const matchesYear = (!filters.yearMin || listing.year >= parseInt(filters.yearMin)) &&
                         (!filters.yearMax || listing.year <= parseInt(filters.yearMax));
      
      const matchesMileage = !filters.mileageMax || listing.mileage <= parseInt(filters.mileageMax);
      
      const matchesLocation = !filters.location || listing.location.toLowerCase().includes(filters.location.toLowerCase());
      
      const matchesFuel = !filters.fuel || listing.fuel.toLowerCase() === filters.fuel.toLowerCase();
      
      const matchesTransmission = !filters.transmission || listing.transmission.toLowerCase() === filters.transmission.toLowerCase();
      
      const matchesEngine = (!filters.engineMin || listing.engine >= parseInt(filters.engineMin)) &&
                           (!filters.engineMax || listing.engine <= parseInt(filters.engineMax));
      
      const matchesCondition = !filters.condition || listing.condition.toLowerCase() === filters.condition.toLowerCase();
      
      const matchesSellerType = !filters.sellerType || listing.sellerType === filters.sellerType;

      return matchesSearch && matchesPrice && matchesCategory && matchesBrand && 
             matchesYear && matchesMileage && matchesLocation && matchesFuel && 
             matchesTransmission && matchesEngine && matchesCondition && matchesSellerType;
    });
  }, [searchQuery, filters, allListings]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredListings.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentListings = filteredListings.slice(startIndex, endIndex);

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1); // Reset to first page when filtering
  };

  const clearFilters = () => {
    setFilters({
      priceMin: '',
      priceMax: '',
      category: '',
      brand: '',
      yearMin: '',
      yearMax: '',
      mileageMax: '',
      location: '',
      fuel: '',
      transmission: '',
      engineMin: '',
      engineMax: '',
      condition: '',
      sellerType: ''
    });
    setSearchQuery('');
    setCurrentPage(1);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
  };

  const ListingRow = ({ listing }: { listing: any }) => (
    <Link
      to={`/anunt/${listing.id}`}
      className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 group border border-gray-100 block"
    >
      <div className="flex">
        <div className="relative w-64 flex-shrink-0">
          <img
            src={listing.image}
            alt={listing.title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
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
        
        <div className="flex-1 p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-nexar-accent transition-colors mb-2">
                {listing.title}
              </h3>
              <div className="text-2xl font-bold text-gray-900 mb-3">€{listing.price.toLocaleString()}</div>
            </div>
            
            <div className="flex items-center space-x-1 bg-gray-50 rounded-lg px-3 py-1">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="text-sm font-semibold">{listing.rating}</span>
            </div>
          </div>
          
          {/* Detailed Information Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Locație:</span>
              <span className="font-semibold text-gray-900">{listing.location}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Stare:</span>
              <span className="font-semibold text-gray-900">{listing.condition}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Vânzător:</span>
              <span className="font-semibold text-gray-900">{listing.sellerType === 'individual' ? 'Individual' : 'Dealer'}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Kilometraj:</span>
              <span className="font-semibold text-gray-900">{listing.mileage.toLocaleString()} km</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Transmisie:</span>
              <span className="font-semibold text-gray-900">{listing.transmission}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Combustibil:</span>
              <span className="font-semibold text-gray-900">{listing.fuel}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Motor:</span>
              <span className="font-semibold text-gray-900">{listing.engine} cc</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">An:</span>
              <span className="font-semibold text-gray-900">{listing.year}</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Vândut de: <span className="font-semibold text-gray-700">{listing.seller}</span>
            </div>
            
            <div className="bg-nexar-accent text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-nexar-gold transition-colors inline-flex items-center space-x-2">
              <span>Vezi Detalii</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            Toate Anunțurile
          </h1>
          <p className="text-gray-600">
            Descoperă {filteredListings.length} motociclete disponibile pentru vânzare
          </p>
        </div>

        {/* Search Bar - Single, prominent */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border border-gray-100">
          <form onSubmit={handleSearch} className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Caută după marcă, model, categorie, locație sau vânzător..."
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-nexar-accent focus:border-transparent text-base"
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              </div>
            </div>
            
            <div className="flex gap-3">
              <button
                type="submit"
                className="bg-nexar-accent text-white px-6 py-3 rounded-lg font-semibold hover:bg-nexar-gold transition-colors flex items-center space-x-2"
              >
                <Search className="h-4 w-4" />
                <span>Caută</span>
              </button>
              
              <button
                type="button"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
              >
                <SlidersHorizontal className="h-4 w-4" />
                <span>{showFilters ? 'Ascunde' : 'Arată'} Filtrele</span>
              </button>
            </div>
          </form>
        </div>

        <div className="flex gap-6">
          {/* Filters Sidebar */}
          <div className={`${showFilters ? 'w-80' : 'w-0'} transition-all duration-300 overflow-hidden`}>
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24 border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                  <Filter className="h-5 w-5" />
                  <span>Filtrează Rezultatele</span>
                </h3>
                <button
                  onClick={() => setShowFilters(false)}
                  className="p-1 hover:bg-gray-100 rounded-lg transition-colors lg:hidden"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto">
                {/* Price Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">💰 Preț (EUR)</label>
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

                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">🏍️ Categorie</label>
                  <select
                    value={filters.category}
                    onChange={(e) => handleFilterChange('category', e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-nexar-accent focus:border-transparent"
                  >
                    <option value="">Toate categoriile</option>
                    <option value="Sport">Sport</option>
                    <option value="Touring">Touring</option>
                    <option value="Cruiser">Cruiser</option>
                    <option value="Adventure">Adventure</option>
                    <option value="Naked">Naked</option>
                    <option value="Enduro">Enduro</option>
                  </select>
                </div>

                {/* Brand */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">🏭 Marcă</label>
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

                {/* Year Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">📅 An fabricație</label>
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

                {/* Engine Capacity */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">⚙️ Capacitate motor (cc)</label>
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

                {/* Mileage */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">🛣️ Kilometraj maxim</label>
                  <input
                    type="number"
                    placeholder="ex: 50000"
                    value={filters.mileageMax}
                    onChange={(e) => handleFilterChange('mileageMax', e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-nexar-accent focus:border-transparent"
                  />
                </div>

                {/* Fuel Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">⛽ Combustibil</label>
                  <select
                    value={filters.fuel}
                    onChange={(e) => handleFilterChange('fuel', e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-nexar-accent focus:border-transparent"
                  >
                    <option value="">Toate tipurile</option>
                    <option value="Benzină">Benzină</option>
                    <option value="Electric">Electric</option>
                    <option value="Hibrid">Hibrid</option>
                  </select>
                </div>

                {/* Transmission */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">🔧 Transmisie</label>
                  <select
                    value={filters.transmission}
                    onChange={(e) => handleFilterChange('transmission', e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-nexar-accent focus:border-transparent"
                  >
                    <option value="">Toate tipurile</option>
                    <option value="Manuală">Manuală</option>
                    <option value="Automată">Automată</option>
                    <option value="Semi-automată">Semi-automată</option>
                  </select>
                </div>

                {/* Condition */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">✨ Starea</label>
                  <select
                    value={filters.condition}
                    onChange={(e) => handleFilterChange('condition', e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-nexar-accent focus:border-transparent"
                  >
                    <option value="">Toate stările</option>
                    <option value="La comandă">La comandă</option>
                    <option value="Excelentă">Excelentă</option>
                    <option value="Foarte bună">Foarte bună</option>
                    <option value="Bună">Bună</option>
                    <option value="Satisfăcătoare">Satisfăcătoare</option>
                  </select>
                </div>

                {/* Seller Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">👤 Tip vânzător</label>
                  <select
                    value={filters.sellerType}
                    onChange={(e) => handleFilterChange('sellerType', e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-nexar-accent focus:border-transparent"
                  >
                    <option value="">Toți vânzătorii</option>
                    <option value="individual">Vânzător Individual</option>
                    <option value="dealer">Dealer Autorizat</option>
                  </select>
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">📍 Locația</label>
                  <select
                    value={filters.location}
                    onChange={(e) => handleFilterChange('location', e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-nexar-accent focus:border-transparent"
                  >
                    <option value="">Toate locațiile</option>
                    <option value="București">București</option>
                    <option value="Cluj-Napoca">Cluj-Napoca</option>
                    <option value="Timișoara">Timișoara</option>
                    <option value="Iași">Iași</option>
                    <option value="Constanța">Constanța</option>
                    <option value="Brașov">Brașov</option>
                  </select>
                </div>

                {/* Clear Filters */}
                <button
                  onClick={clearFilters}
                  className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2"
                >
                  <X className="h-4 w-4" />
                  <span>Șterge Toate Filtrele</span>
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Results */}
            <div className="mb-5">
              <div className="flex justify-between items-center">
                <p className="text-gray-600">
                  Afișez <span className="font-semibold">{startIndex + 1}-{Math.min(endIndex, filteredListings.length)}</span> din <span className="font-semibold">{filteredListings.length}</span> rezultate
                  {searchQuery && (
                    <span className="ml-2 text-nexar-accent">
                      pentru "{searchQuery}"
                    </span>
                  )}
                </p>
                <select className="border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-nexar-accent focus:border-transparent">
                  <option>Sortează după: Cel mai recent</option>
                  <option>Preț: Crescător</option>
                  <option>Preț: Descrescător</option>
                  <option>An: Cel mai nou</option>
                  <option>Kilometraj: Cel mai mic</option>
                  <option>Rating: Cel mai mare</option>
                </select>
              </div>
            </div>

            {/* No Results */}
            {filteredListings.length === 0 && (
              <div className="bg-white rounded-xl shadow-sm p-12 text-center border border-gray-100">
                <Search className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Nu am găsit rezultate</h3>
                <p className="text-gray-600 mb-6">
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

            {/* Listings List */}
            {filteredListings.length > 0 && (
              <div className="space-y-4">
                {currentListings.map((listing) => (
                  <ListingRow key={listing.id} listing={listing} />
                ))}
              </div>
            )}

            {/* Pagination */}
            {filteredListings.length > 0 && totalPages > 1 && (
              <div className="mt-8 flex justify-center">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="flex items-center space-x-1 px-3 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    <span>Anterior</span>
                  </button>
                  
                  {[...Array(totalPages)].map((_, index) => {
                    const page = index + 1;
                    return (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-3 py-2 rounded-lg transition-colors ${
                          currentPage === page
                            ? 'bg-nexar-accent text-white'
                            : 'border border-gray-200 hover:bg-gray-50'
                        }`}
                      >
                        {page}
                      </button>
                    );
                  })}
                  
                  <button
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="flex items-center space-x-1 px-3 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span>Următorul</span>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingsPage;