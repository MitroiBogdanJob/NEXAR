import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { User, Settings, Star, Eye, Heart, MessageCircle, Edit, Trash2, Plus, MapPin, Phone, Mail, Calendar, Building, Shield, Camera, ExternalLink, Save, X } from 'lucide-react';

// Tipuri de utilizatori
type UserType = 'privat' | 'dealer';

// Interfață pentru profilul utilizatorului
interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  description?: string;
  memberSince: string;
  rating: number;
  reviews: number;
  verified: boolean;
  avatar: string;
  type: UserType;
  website?: string;
  socialLinks?: {
    facebook?: string;
    instagram?: string;
    youtube?: string;
  };
  stats: {
    activeListings: number;
    soldListings: number;
    views: number;
    favorites: number;
  };
  dealerInfo?: {
    companyName: string;
    cui: string;
    address: string;
    openHours: string;
    services: string[];
    brands: string[];
  };
}

// Interfață pentru anunțuri
interface Listing {
  id: number;
  title: string;
  price: string;
  image: string;
  status: 'active' | 'sold' | 'pending';
  views: number;
  favorites: number;
  messages: number;
  posted: string;
}

// Baza de date simulată cu utilizatori
const usersDatabase: Record<string, UserProfile> = {
  'dealer-1': {
    id: 'dealer-1',
    name: 'Moto Expert SRL',
    email: 'contact@motoexpert.ro',
    phone: '0790 454 647',
    location: 'București, Sector 1',
    description: 'Dealer autorizat pentru mărcile Yamaha, Honda și Suzuki. Oferim servicii complete de vânzare, întreținere și reparații pentru motociclete. Experiență de peste 15 ani pe piața din România.',
    memberSince: 'Ianuarie 2020',
    rating: 4.8,
    reviews: 127,
    verified: true,
    avatar: 'https://images.pexels.com/photos/2116475/pexels-photo-2116475.jpeg',
    type: 'dealer',
    website: 'https://www.motoexpert.ro',
    socialLinks: {
      facebook: 'https://facebook.com/motoexpert',
      instagram: 'https://instagram.com/motoexpert',
      youtube: 'https://youtube.com/motoexpert'
    },
    stats: {
      activeListings: 24,
      soldListings: 156,
      views: 12450,
      favorites: 345
    },
    dealerInfo: {
      companyName: 'Moto Expert SRL',
      cui: 'RO12345678',
      address: 'Bulevardul Aviatorilor 72, București, Sector 1',
      openHours: 'Luni-Vineri: 09:00-18:00, Sâmbătă: 10:00-14:00',
      services: ['Vânzări motociclete noi', 'Vânzări motociclete second-hand', 'Service autorizat', 'Piese și accesorii', 'Finanțare'],
      brands: ['Yamaha', 'Honda', 'Suzuki']
    }
  },
  'dealer-2': {
    id: 'dealer-2',
    name: 'BMW Moto Center',
    email: 'contact@bmwmoto.ro',
    phone: '0745 123 456',
    location: 'Cluj-Napoca',
    description: 'Dealer oficial BMW Motorrad în România. Oferim întreaga gamă de motociclete BMW, echipamente și accesorii originale, precum și servicii complete de întreținere și reparații.',
    memberSince: 'Martie 2019',
    rating: 4.9,
    reviews: 98,
    verified: true,
    avatar: 'https://images.pexels.com/photos/2116475/pexels-photo-2116475.jpeg',
    type: 'dealer',
    website: 'https://www.bmwmoto.ro',
    socialLinks: {
      facebook: 'https://facebook.com/bmwmoto',
      instagram: 'https://instagram.com/bmwmoto'
    },
    stats: {
      activeListings: 18,
      soldListings: 124,
      views: 9870,
      favorites: 278
    },
    dealerInfo: {
      companyName: 'BMW Moto Center SRL',
      cui: 'RO23456789',
      address: 'Calea Turzii 172, Cluj-Napoca',
      openHours: 'Luni-Vineri: 09:00-18:00, Sâmbătă: 10:00-16:00',
      services: ['Vânzări motociclete noi', 'Service autorizat', 'Piese originale', 'Accesorii', 'Finanțare', 'Asigurări'],
      brands: ['BMW']
    }
  },
  'privat-1': {
    id: 'privat-1',
    name: 'Alexandru Popescu',
    email: 'alex.popescu@email.com',
    phone: '0790 454 647',
    location: 'București, România',
    description: 'Pasionat de motociclete de peste 10 ani. Colecționar și rider experimentat, specializat în motociclete sport și naked.',
    memberSince: 'Ianuarie 2023',
    rating: 4.8,
    reviews: 23,
    verified: true,
    avatar: 'https://images.pexels.com/photos/2116475/pexels-photo-2116475.jpeg',
    type: 'privat',
    stats: {
      activeListings: 3,
      soldListings: 7,
      views: 1247,
      favorites: 23
    }
  },
  'privat-2': {
    id: 'privat-2',
    name: 'Maria Ionescu',
    email: 'maria.ionescu@email.com',
    phone: '0756 789 123',
    location: 'Cluj-Napoca, România',
    description: 'Pasionată de motociclete touring și adventure. Călătoresc frecvent prin Europa și împărtășesc experiențele mele pe blog.',
    memberSince: 'Februarie 2023',
    rating: 4.7,
    reviews: 15,
    verified: true,
    avatar: 'https://images.pexels.com/photos/2116475/pexels-photo-2116475.jpeg',
    type: 'privat',
    socialLinks: {
      instagram: 'https://instagram.com/maria_moto_adventures'
    },
    stats: {
      activeListings: 2,
      soldListings: 4,
      views: 876,
      favorites: 15
    }
  }
};

// Anunțuri pentru utilizatori
const userListings: Record<string, Listing[]> = {
  'dealer-1': [
    {
      id: 1,
      title: "Yamaha YZF-R1 2023",
      price: "€18,500",
      image: "https://images.pexels.com/photos/2116475/pexels-photo-2116475.jpeg",
      status: "active",
      views: 1247,
      favorites: 23,
      messages: 8,
      posted: "Acum 2 zile"
    },
    {
      id: 2,
      title: "Honda CBR600RR 2021",
      price: "€12,800",
      image: "https://images.pexels.com/photos/2116475/pexels-photo-2116475.jpeg",
      status: "sold",
      views: 892,
      favorites: 15,
      messages: 12,
      posted: "Acum 1 săptămână"
    },
    {
      id: 3,
      title: "Kawasaki Ninja 650 2022",
      price: "€8,900",
      image: "https://images.pexels.com/photos/2116475/pexels-photo-2116475.jpeg",
      status: "pending",
      views: 456,
      favorites: 7,
      messages: 3,
      posted: "Acum 3 zile"
    }
  ],
  'dealer-2': [
    {
      id: 4,
      title: "BMW S1000RR 2022",
      price: "€16,800",
      image: "https://images.pexels.com/photos/2116475/pexels-photo-2116475.jpeg",
      status: "active",
      views: 987,
      favorites: 19,
      messages: 6,
      posted: "Acum 5 zile"
    },
    {
      id: 5,
      title: "BMW R1250GS Adventure 2023",
      price: "€19,800",
      image: "https://images.pexels.com/photos/2116475/pexels-photo-2116475.jpeg",
      status: "active",
      views: 1123,
      favorites: 27,
      messages: 9,
      posted: "Acum 1 zi"
    }
  ],
  'privat-1': [
    {
      id: 6,
      title: "KTM 1290 Super Duke R 2022",
      price: "€16,200",
      image: "https://images.pexels.com/photos/2116475/pexels-photo-2116475.jpeg",
      status: "active",
      views: 765,
      favorites: 12,
      messages: 4,
      posted: "Acum 1 săptămână"
    }
  ],
  'privat-2': [
    {
      id: 7,
      title: "Suzuki GSX-R1000R 2021",
      price: "€15,800",
      image: "https://images.pexels.com/photos/2116475/pexels-photo-2116475.jpeg",
      status: "active",
      views: 543,
      favorites: 8,
      messages: 2,
      posted: "Acum 2 săptămâni"
    }
  ]
};

// Componenta principală pentru pagina de profil
const ProfilePage = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('listings');
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [userListingsData, setUserListingsData] = useState<Listing[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCurrentUser, setIsCurrentUser] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<Partial<UserProfile>>({});

  useEffect(() => {
    // Simulăm încărcarea datelor
    setIsLoading(true);
    
    setTimeout(() => {
      // Dacă avem un ID în URL, încărcăm profilul respectiv
      if (id && usersDatabase[id]) {
        setUserProfile(usersDatabase[id]);
        setUserListingsData(userListings[id] || []);
        
        // Verificăm dacă este profilul utilizatorului curent
        const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
        setIsCurrentUser(currentUser?.id === id);
      } else {
        // Dacă nu avem ID sau ID-ul nu există, încărcăm profilul utilizatorului curent
        const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
        
        if (currentUser?.isLoggedIn) {
          // Simulăm că utilizatorul curent este Alexandru Popescu
          setUserProfile(usersDatabase['privat-1']);
          setUserListingsData(userListings['privat-1'] || []);
          setIsCurrentUser(true);
        } else {
          // Dacă nu este autentificat, redirecționăm la pagina de autentificare
          navigate('/auth');
        }
      }
      
      setIsLoading(false);
    }, 500);
  }, [id, navigate]);

  const handleEditProfile = () => {
    if (userProfile) {
      setEditForm({
        name: userProfile.name,
        email: userProfile.email,
        phone: userProfile.phone,
        location: userProfile.location,
        description: userProfile.description,
        website: userProfile.website,
        socialLinks: userProfile.socialLinks
      });
      setIsEditing(true);
    }
  };

  const handleSaveProfile = () => {
    if (userProfile) {
      // Simulăm salvarea în baza de date
      const updatedProfile = { ...userProfile, ...editForm };
      setUserProfile(updatedProfile);
      
      // Actualizăm și în "baza de date" simulată
      usersDatabase[userProfile.id] = updatedProfile;
      
      setIsEditing(false);
      
      // Simulăm un mesaj de succes
      alert('Profilul a fost actualizat cu succes!');
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditForm({});
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'sold': return 'bg-gray-100 text-gray-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Activ';
      case 'sold': return 'Vândut';
      case 'pending': return 'În așteptare';
      default: return 'Necunoscut';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-nexar-light flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
          <div className="w-16 h-16 border-4 border-nexar-accent border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Se încarcă profilul...</p>
        </div>
      </div>
    );
  }

  if (!userProfile) {
    return (
      <div className="min-h-screen bg-nexar-light flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md">
          <User className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Profil negăsit</h2>
          <p className="text-gray-600 mb-6">Utilizatorul căutat nu există sau profilul nu este disponibil.</p>
          <button 
            onClick={() => navigate('/')}
            className="bg-nexar-accent text-white px-6 py-3 rounded-lg font-semibold hover:bg-nexar-gold transition-colors"
          >
            Înapoi la pagina principală
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-nexar-light py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Profile Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
              <div className="text-center mb-6">
                <div className="relative inline-block mb-4">
                  <img
                    src={userProfile.avatar}
                    alt={userProfile.name}
                    className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-white shadow-md"
                  />
                  {userProfile.verified && (
                    <div className="absolute bottom-0 right-0 bg-green-500 text-white p-1 rounded-full">
                      <Shield className="h-4 w-4" />
                    </div>
                  )}
                  {isCurrentUser && (
                    <button className="absolute bottom-0 left-0 bg-nexar-accent text-white p-1 rounded-full hover:bg-nexar-gold transition-colors">
                      <Camera className="h-4 w-4" />
                    </button>
                  )}
                </div>
                
                {isEditing ? (
                  <div className="space-y-3">
                    <input
                      type="text"
                      value={editForm.name || ''}
                      onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full text-center text-xl font-bold border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-nexar-accent focus:border-transparent"
                    />
                  </div>
                ) : (
                  <h2 className="text-xl font-bold text-nexar-primary">{userProfile.name}</h2>
                )}
                
                <div className="flex items-center justify-center space-x-1 mt-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="font-semibold">{userProfile.rating}</span>
                  <span className="text-gray-600">({userProfile.reviews} recenzii)</span>
                </div>
                <div className="mt-2 inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  {userProfile.type === 'dealer' ? 'Dealer Autorizat' : 'Vânzător Privat'}
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-nexar-accent flex-shrink-0 mt-0.5" />
                  {isEditing ? (
                    <input
                      type="text"
                      value={editForm.location || ''}
                      onChange={(e) => setEditForm(prev => ({ ...prev, location: e.target.value }))}
                      className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-nexar-accent focus:border-transparent"
                    />
                  ) : (
                    <span className="text-gray-700">{userProfile.location}</span>
                  )}
                </div>
                <div className="flex items-start space-x-3">
                  <Phone className="h-5 w-5 text-nexar-accent flex-shrink-0 mt-0.5" />
                  {isEditing ? (
                    <input
                      type="tel"
                      value={editForm.phone || ''}
                      onChange={(e) => setEditForm(prev => ({ ...prev, phone: e.target.value }))}
                      className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-nexar-accent focus:border-transparent"
                    />
                  ) : (
                    <span className="text-gray-700">{userProfile.phone}</span>
                  )}
                </div>
                <div className="flex items-start space-x-3">
                  <Mail className="h-5 w-5 text-nexar-accent flex-shrink-0 mt-0.5" />
                  {isEditing ? (
                    <input
                      type="email"
                      value={editForm.email || ''}
                      onChange={(e) => setEditForm(prev => ({ ...prev, email: e.target.value }))}
                      className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-nexar-accent focus:border-transparent"
                    />
                  ) : (
                    <span className="text-gray-700">{userProfile.email}</span>
                  )}
                </div>
                <div className="flex items-start space-x-3">
                  <Calendar className="h-5 w-5 text-nexar-accent flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Membru din {userProfile.memberSince}</span>
                </div>
                {(userProfile.website || isEditing) && (
                  <div className="flex items-start space-x-3">
                    <ExternalLink className="h-5 w-5 text-nexar-accent flex-shrink-0 mt-0.5" />
                    {isEditing ? (
                      <input
                        type="url"
                        value={editForm.website || ''}
                        onChange={(e) => setEditForm(prev => ({ ...prev, website: e.target.value }))}
                        placeholder="https://website.com"
                        className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-nexar-accent focus:border-transparent"
                      />
                    ) : (
                      <a 
                        href={userProfile.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-nexar-accent hover:text-nexar-gold transition-colors"
                      >
                        {userProfile.website?.replace(/^https?:\/\//, '')}
                      </a>
                    )}
                  </div>
                )}
              </div>

              {/* Statistici */}
              <div className="bg-gray-50 rounded-xl p-4 mb-6">
                <h3 className="font-semibold text-gray-900 mb-3 text-center">Statistici</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center p-2 bg-white rounded-lg">
                    <div className="font-bold text-nexar-accent">{userProfile.stats.activeListings}</div>
                    <div className="text-xs text-gray-600">Anunțuri active</div>
                  </div>
                  <div className="text-center p-2 bg-white rounded-lg">
                    <div className="font-bold text-nexar-accent">{userProfile.stats.soldListings}</div>
                    <div className="text-xs text-gray-600">Vândute</div>
                  </div>
                  <div className="text-center p-2 bg-white rounded-lg">
                    <div className="font-bold text-nexar-accent">{userProfile.stats.views}</div>
                    <div className="text-xs text-gray-600">Vizualizări</div>
                  </div>
                  <div className="text-center p-2 bg-white rounded-lg">
                    <div className="font-bold text-nexar-accent">{userProfile.stats.favorites}</div>
                    <div className="text-xs text-gray-600">Favorite</div>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              {(userProfile.socialLinks && Object.values(userProfile.socialLinks).some(link => link)) || isEditing ? (
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3 text-center">Social Media</h3>
                  {isEditing ? (
                    <div className="space-y-3">
                      <input
                        type="url"
                        value={editForm.socialLinks?.facebook || ''}
                        onChange={(e) => setEditForm(prev => ({ 
                          ...prev, 
                          socialLinks: { ...prev.socialLinks, facebook: e.target.value }
                        }))}
                        placeholder="Facebook URL"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-nexar-accent focus:border-transparent"
                      />
                      <input
                        type="url"
                        value={editForm.socialLinks?.instagram || ''}
                        onChange={(e) => setEditForm(prev => ({ 
                          ...prev, 
                          socialLinks: { ...prev.socialLinks, instagram: e.target.value }
                        }))}
                        placeholder="Instagram URL"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-nexar-accent focus:border-transparent"
                      />
                      <input
                        type="url"
                        value={editForm.socialLinks?.youtube || ''}
                        onChange={(e) => setEditForm(prev => ({ 
                          ...prev, 
                          socialLinks: { ...prev.socialLinks, youtube: e.target.value }
                        }))}
                        placeholder="YouTube URL"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-nexar-accent focus:border-transparent"
                      />
                    </div>
                  ) : (
                    <div className="flex justify-center space-x-4">
                      {userProfile.socialLinks?.facebook && (
                        <a 
                          href={userProfile.socialLinks.facebook} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 transition-colors"
                        >
                          <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                          </svg>
                        </a>
                      )}
                      {userProfile.socialLinks?.instagram && (
                        <a 
                          href={userProfile.socialLinks.instagram} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-pink-600 hover:text-pink-800 transition-colors"
                        >
                          <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                          </svg>
                        </a>
                      )}
                      {userProfile.socialLinks?.youtube && (
                        <a 
                          href={userProfile.socialLinks.youtube} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-red-600 hover:text-red-800 transition-colors"
                        >
                          <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                          </svg>
                        </a>
                      )}
                    </div>
                  )}
                </div>
              ) : null}

              {isCurrentUser && (
                <div className="space-y-3">
                  {isEditing ? (
                    <div className="flex space-x-2">
                      <button 
                        onClick={handleSaveProfile}
                        className="flex-1 bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
                      >
                        <Save className="h-4 w-4" />
                        <span>Salvează</span>
                      </button>
                      <button 
                        onClick={handleCancelEdit}
                        className="flex-1 bg-gray-500 text-white py-3 rounded-xl font-semibold hover:bg-gray-600 transition-colors flex items-center justify-center space-x-2"
                      >
                        <X className="h-4 w-4" />
                        <span>Anulează</span>
                      </button>
                    </div>
                  ) : (
                    <button 
                      onClick={handleEditProfile}
                      className="w-full bg-nexar-primary text-white py-3 rounded-xl font-semibold hover:bg-nexar-secondary transition-colors flex items-center justify-center space-x-2"
                    >
                      <Settings className="h-4 w-4" />
                      <span>Editează Profilul</span>
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Dealer Info - Doar pentru dealeri */}
            {userProfile.type === 'dealer' && userProfile.dealerInfo && (
              <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-nexar-primary flex items-center">
                    <Building className="h-5 w-5 mr-2 text-nexar-accent" />
                    Informații Dealer
                  </h2>
                  {userProfile.verified && (
                    <div className="flex items-center space-x-1 bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">
                      <Shield className="h-3 w-3" />
                      <span>Verificat</span>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="space-y-3">
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Denumire Companie</h3>
                        <p className="font-medium">{userProfile.dealerInfo.companyName}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">CUI</h3>
                        <p className="font-medium">{userProfile.dealerInfo.cui}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Adresă</h3>
                        <p className="font-medium">{userProfile.dealerInfo.address}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Program</h3>
                        <p className="font-medium">{userProfile.dealerInfo.openHours}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="mb-4">
                      <h3 className="text-sm font-medium text-gray-500 mb-2">Servicii Oferite</h3>
                      <div className="flex flex-wrap gap-2">
                        {userProfile.dealerInfo.services.map((service, index) => (
                          <span key={index} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-xs">
                            {service}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-2">Mărci Reprezentate</h3>
                      <div className="flex flex-wrap gap-2">
                        {userProfile.dealerInfo.brands.map((brand, index) => (
                          <span key={index} className="bg-nexar-accent/10 text-nexar-accent px-3 py-1 rounded-full text-xs font-medium">
                            {brand}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Descriere profil */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <h2 className="text-xl font-bold text-nexar-primary mb-4">Despre {userProfile.type === 'dealer' ? 'Noi' : 'Mine'}</h2>
              {isEditing ? (
                <textarea
                  value={editForm.description || ''}
                  onChange={(e) => setEditForm(prev => ({ ...prev, description: e.target.value }))}
                  rows={4}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-nexar-accent focus:border-transparent"
                  placeholder="Descrie-te pe scurt..."
                />
              ) : (
                <p className="text-gray-700 leading-relaxed">{userProfile.description || 'Nicio descriere adăugată încă.'}</p>
              )}
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-2xl shadow-lg mb-8">
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8 px-6 overflow-x-auto">
                  <button
                    onClick={() => setActiveTab('listings')}
                    className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                      activeTab === 'listings'
                        ? 'border-nexar-accent text-nexar-accent'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Anunțuri ({userListingsData.length})
                  </button>
                  <button
                    onClick={() => setActiveTab('reviews')}
                    className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                      activeTab === 'reviews'
                        ? 'border-nexar-accent text-nexar-accent'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Recenzii ({userProfile.reviews})
                  </button>
                  {isCurrentUser && (
                    <>
                      <button
                        onClick={() => setActiveTab('favorites')}
                        className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                          activeTab === 'favorites'
                            ? 'border-nexar-accent text-nexar-accent'
                            : 'border-transparent text-gray-500 hover:text-gray-700'
                        }`}
                      >
                        Favorite
                      </button>
                      <button
                        onClick={() => setActiveTab('messages')}
                        className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                          activeTab === 'messages'
                            ? 'border-nexar-accent text-nexar-accent'
                            : 'border-transparent text-gray-500 hover:text-gray-700'
                        }`}
                      >
                        Mesaje
                      </button>
                    </>
                  )}
                </nav>
              </div>

              <div className="p-6">
                {/* Listings Tab */}
                {activeTab === 'listings' && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h3 className="text-xl font-semibold text-nexar-primary">
                        {isCurrentUser ? 'Anunțurile Mele' : `Anunțurile ${userProfile.name}`}
                      </h3>
                      {isCurrentUser && (
                        <button className="bg-nexar-accent text-white px-4 py-2 rounded-lg font-semibold hover:bg-nexar-gold transition-colors flex items-center space-x-2">
                          <Plus className="h-4 w-4" />
                          <span>Anunț Nou</span>
                        </button>
                      )}
                    </div>

                    {userListingsData.length === 0 ? (
                      <div className="text-center py-12">
                        <User className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600">
                          {isCurrentUser 
                            ? 'Nu ai anunțuri active. Adaugă primul tău anunț!' 
                            : 'Acest utilizator nu are anunțuri active.'}
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {userListingsData.map((listing) => (
                          <div key={listing.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                            <div className="flex items-center space-x-4">
                              <img
                                src={listing.image}
                                alt={listing.title}
                                className="w-24 h-24 rounded-lg object-cover"
                              />
                              
                              <div className="flex-1">
                                <div className="flex items-start justify-between mb-2">
                                  <h4 className="text-lg font-semibold text-nexar-primary">{listing.title}</h4>
                                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(listing.status)}`}>
                                    {getStatusText(listing.status)}
                                  </span>
                                </div>
                                
                                <div className="text-xl font-bold text-nexar-accent mb-2">{listing.price}</div>
                                
                                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                                  <div className="flex items-center space-x-1">
                                    <Eye className="h-4 w-4" />
                                    <span>{listing.views} vizualizări</span>
                                  </div>
                                  <div className="flex items-center space-x-1">
                                    <Heart className="h-4 w-4" />
                                    <span>{listing.favorites} favorite</span>
                                  </div>
                                  <div className="flex items-center space-x-1">
                                    <MessageCircle className="h-4 w-4" />
                                    <span>{listing.messages} mesaje</span>
                                  </div>
                                  <span>{listing.posted}</span>
                                </div>
                              </div>
                              
                              {isCurrentUser && (
                                <div className="flex flex-col space-y-2">
                                  <button className="p-2 text-nexar-primary hover:bg-nexar-light rounded-lg transition-colors">
                                    <Edit className="h-4 w-4" />
                                  </button>
                                  <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                                    <Trash2 className="h-4 w-4" />
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Reviews Tab */}
                {activeTab === 'reviews' && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-nexar-primary">
                      {isCurrentUser ? 'Recenziile Mele' : `Recenzii pentru ${userProfile.name}`}
                    </h3>
                    
                    {userProfile.reviews === 0 ? (
                      <div className="text-center py-12">
                        <Star className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600">
                          {isCurrentUser 
                            ? 'Nu ai primit recenzii încă.' 
                            : 'Acest utilizator nu are recenzii încă.'}
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        {/* Simulăm câteva recenzii */}
                        <div className="border border-gray-200 rounded-xl p-6">
                          <div className="flex items-start space-x-4">
                            <img 
                              src="https://images.pexels.com/photos/2116475/pexels-photo-2116475.jpeg" 
                              alt="Reviewer" 
                              className="w-12 h-12 rounded-full object-cover"
                            />
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="font-semibold text-gray-900">Mihai Dumitrescu</h4>
                                <div className="flex items-center">
                                  {[...Array(5)].map((_, i) => (
                                    <Star 
                                      key={i} 
                                      className={`h-4 w-4 ${i < 5 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                                    />
                                  ))}
                                </div>
                              </div>
                              <p className="text-gray-700 mb-2">
                                Experiență excelentă! Vânzătorul a fost foarte prompt și profesionist. Motocicleta era exact cum a fost descrisă în anunț. Recomand cu încredere!
                              </p>
                              <div className="text-sm text-gray-500">Acum 2 săptămâni</div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="border border-gray-200 rounded-xl p-6">
                          <div className="flex items-start space-x-4">
                            <img 
                              src="https://images.pexels.com/photos/2116475/pexels-photo-2116475.jpeg" 
                              alt="Reviewer" 
                              className="w-12 h-12 rounded-full object-cover"
                            />
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="font-semibold text-gray-900">Ana Popescu</h4>
                                <div className="flex items-center">
                                  {[...Array(5)].map((_, i) => (
                                    <Star 
                                      key={i} 
                                      className={`h-4 w-4 ${i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                                    />
                                  ))}
                                </div>
                              </div>
                              <p className="text-gray-700 mb-2">
                                Comunicare bună și tranzacție rapidă. Motocicleta avea câteva zgârieturi minore care nu au fost menționate în anunț, dar în rest totul a fost în regulă.
                              </p>
                              <div className="text-sm text-gray-500">Acum 1 lună</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Favorites Tab - Doar pentru utilizatorul curent */}
                {activeTab === 'favorites' && isCurrentUser && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-nexar-primary">Anunțuri Favorite</h3>
                    
                    <div className="text-center py-12">
                      <Heart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">
                        Nu ai anunțuri favorite încă.
                      </p>
                    </div>
                  </div>
                )}

                {/* Messages Tab - Doar pentru utilizatorul curent */}
                {activeTab === 'messages' && isCurrentUser && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-nexar-primary">Mesaje</h3>
                    <div className="text-center py-12">
                      <MessageCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">Nu ai mesaje noi</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;