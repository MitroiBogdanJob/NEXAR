import React, { useState } from 'react';
import { User, Settings, Star, Eye, Heart, MessageCircle, Edit, Trash2, Plus } from 'lucide-react';

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('listings');

  const userProfile = {
    name: "Alexandru Popescu",
    email: "alex.popescu@email.com",
    phone: "0790 45 46 47",
    location: "București, România",
    memberSince: "Ianuarie 2023",
    rating: 4.8,
    reviews: 23,
    verified: true,
    avatar: "https://images.pexels.com/photos/2116475/pexels-photo-2116475.jpeg"
  };

  const userListings = [
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
  ];

  const favoriteListings = [
    {
      id: 4,
      title: "BMW S1000RR 2022",
      price: "€16,800",
      image: "https://images.pexels.com/photos/2116475/pexels-photo-2116475.jpeg",
      seller: "BMW Moto Center",
      location: "Cluj-Napoca"
    },
    {
      id: 5,
      title: "Ducati Panigale V4",
      price: "€22,000",
      image: "https://images.pexels.com/photos/2116475/pexels-photo-2116475.jpeg",
      seller: "Ducati Premium",
      location: "Timișoara"
    }
  ];

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

  return (
    <div className="min-h-screen bg-nexar-light py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Profile Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
              <div className="text-center mb-6">
                <img
                  src={userProfile.avatar}
                  alt={userProfile.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h2 className="text-xl font-bold text-nexar-primary">{userProfile.name}</h2>
                <p className="text-gray-600">{userProfile.location}</p>
                <div className="flex items-center justify-center space-x-1 mt-2">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="font-semibold">{userProfile.rating}</span>
                  <span className="text-gray-600">({userProfile.reviews} recenzii)</span>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Membru din:</span>
                  <span className="font-semibold">{userProfile.memberSince}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Email:</span>
                  <span className="font-semibold">{userProfile.email}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Telefon:</span>
                  <span className="font-semibold">{userProfile.phone}</span>
                </div>
              </div>

              <button className="w-full bg-nexar-primary text-white py-3 rounded-xl font-semibold hover:bg-nexar-secondary transition-colors flex items-center justify-center space-x-2">
                <Settings className="h-4 w-4" />
                <span>Editează Profilul</span>
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Tabs */}
            <div className="bg-white rounded-2xl shadow-lg mb-8">
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8 px-6">
                  <button
                    onClick={() => setActiveTab('listings')}
                    className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === 'listings'
                        ? 'border-nexar-accent text-nexar-accent'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Anunțurile Mele ({userListings.length})
                  </button>
                  <button
                    onClick={() => setActiveTab('favorites')}
                    className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === 'favorites'
                        ? 'border-nexar-accent text-nexar-accent'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Favorite ({favoriteListings.length})
                  </button>
                  <button
                    onClick={() => setActiveTab('messages')}
                    className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === 'messages'
                        ? 'border-nexar-accent text-nexar-accent'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Mesaje (5)
                  </button>
                  <button
                    onClick={() => setActiveTab('reviews')}
                    className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === 'reviews'
                        ? 'border-nexar-accent text-nexar-accent'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Recenzii ({userProfile.reviews})
                  </button>
                </nav>
              </div>

              <div className="p-6">
                {/* My Listings Tab */}
                {activeTab === 'listings' && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h3 className="text-xl font-semibold text-nexar-primary">Anunțurile Mele</h3>
                      <button className="bg-nexar-accent text-white px-4 py-2 rounded-lg font-semibold hover:bg-orange-600 transition-colors flex items-center space-x-2">
                        <Plus className="h-4 w-4" />
                        <span>Anunț Nou</span>
                      </button>
                    </div>

                    <div className="space-y-4">
                      {userListings.map((listing) => (
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
                              
                              <div className="flex items-center space-x-6 text-sm text-gray-600">
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
                            
                            <div className="flex flex-col space-y-2">
                              <button className="p-2 text-nexar-primary hover:bg-nexar-light rounded-lg transition-colors">
                                <Edit className="h-4 w-4" />
                              </button>
                              <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Favorites Tab */}
                {activeTab === 'favorites' && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-nexar-primary">Anunțuri Favorite</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {favoriteListings.map((listing) => (
                        <div key={listing.id} className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
                          <img
                            src={listing.image}
                            alt={listing.title}
                            className="w-full h-48 object-cover"
                          />
                          <div className="p-4">
                            <h4 className="text-lg font-semibold text-nexar-primary mb-2">{listing.title}</h4>
                            <div className="text-xl font-bold text-nexar-accent mb-2">{listing.price}</div>
                            <div className="text-sm text-gray-600 mb-4">
                              <div>Vândut de: {listing.seller}</div>
                              <div>Locație: {listing.location}</div>
                            </div>
                            <div className="flex space-x-2">
                              <button className="flex-1 bg-nexar-primary text-white py-2 rounded-lg font-semibold hover:bg-nexar-secondary transition-colors">
                                Vezi Detalii
                              </button>
                              <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                                <Heart className="h-4 w-4 fill-current" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Messages Tab */}
                {activeTab === 'messages' && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-nexar-primary">Mesaje</h3>
                    <div className="text-center py-12">
                      <MessageCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">Nu ai mesaje noi</p>
                    </div>
                  </div>
                )}

                {/* Reviews Tab */}
                {activeTab === 'reviews' && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-nexar-primary">Recenzii Primite</h3>
                    <div className="text-center py-12">
                      <Star className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">Nu ai recenzii încă</p>
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