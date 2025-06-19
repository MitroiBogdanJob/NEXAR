import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, Phone, MapPin, Building } from 'lucide-react';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    location: '',
    sellerType: 'privat',
    agreeToTerms: false
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    if (isLogin) {
      console.log('Login:', { email: formData.email, password: formData.password });
      // Simulate successful login
      localStorage.setItem('user', JSON.stringify({
        name: formData.name || 'Bogdan',
        email: formData.email,
        sellerType: formData.sellerType,
        isLoggedIn: true
      }));
    } else {
      console.log('Register:', formData);
      // Simulate successful registration
      localStorage.setItem('user', JSON.stringify({
        name: formData.name,
        email: formData.email,
        sellerType: formData.sellerType,
        isLoggedIn: true
      }));
    }
    
    setIsLoading(false);
    // Redirect to home page after successful auth
    navigate('/');
    // Reload to update header state
    window.location.reload();
  };

  const handleGoogleAuth = async () => {
    setIsLoading(true);
    // Simulate Google OAuth
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log('Google authentication');
    
    // Simulate successful Google login
    localStorage.setItem('user', JSON.stringify({
      name: 'Bogdan',
      email: 'bogdan@gmail.com',
      sellerType: 'privat',
      isLoggedIn: true
    }));
    
    setIsLoading(false);
    navigate('/');
    window.location.reload();
  };

  const handleFacebookAuth = async () => {
    setIsLoading(true);
    // Simulate Facebook OAuth
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log('Facebook authentication');
    
    // Simulate successful Facebook login
    localStorage.setItem('user', JSON.stringify({
      name: 'Bogdan',
      email: 'bogdan@facebook.com',
      sellerType: 'privat',
      isLoggedIn: true
    }));
    
    setIsLoading(false);
    navigate('/');
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <img src="/image.png" alt="Logo" className="h-10 w-auto" />
              <div className="flex flex-col">
                <span className="text-xs text-gray-500">Premium Motorcycles</span>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              {isLogin ? 'Conectează-te' : 'Creează Cont'}
            </h2>
            <p className="text-gray-600 mt-2">
              {isLogin 
                ? 'Bun venit înapoi! Conectează-te la contul tău.' 
                : 'Alătură-te comunității Nexar și începe să vinzi sau să cumperi motociclete.'
              }
            </p>
          </div>

          {/* Toggle Buttons */}
          <div className="flex bg-gray-50 rounded-xl p-1 mb-8">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-colors ${
                isLogin 
                  ? 'bg-white text-gray-900 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Conectare
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-colors ${
                !isLogin 
                  ? 'bg-white text-gray-900 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Înregistrare
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nume complet *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-nexar-accent focus:border-transparent transition-colors"
                    placeholder="Bogdan Popescu"
                    required={!isLogin}
                  />
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email *
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-nexar-accent focus:border-transparent transition-colors"
                  placeholder="bogdan@exemplu.com"
                  required
                />
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              </div>
            </div>

            {!isLogin && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Telefon *
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-nexar-accent focus:border-transparent transition-colors"
                      placeholder="0790 45 46 47"
                      required={!isLogin}
                    />
                    <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Locația *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-nexar-accent focus:border-transparent transition-colors"
                      placeholder="București, România"
                      required={!isLogin}
                    />
                    <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tip Vânzător *
                  </label>
                  <div className="relative">
                    <select
                      value={formData.sellerType}
                      onChange={(e) => handleInputChange('sellerType', e.target.value)}
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-nexar-accent focus:border-transparent transition-colors appearance-none"
                      required={!isLogin}
                    >
                      <option value="privat">Vânzător Privat</option>
                      <option value="dealer">Dealer Autorizat</option>
                    </select>
                    <Building className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  </div>
                </div>
              </>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Parolă *
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-nexar-accent focus:border-transparent transition-colors"
                  placeholder="••••••••"
                  required
                />
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirmă parola *
                </label>
                <div className="relative">
                  <input
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-nexar-accent focus:border-transparent transition-colors"
                    placeholder="••••••••"
                    required={!isLogin}
                  />
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                </div>
              </div>
            )}

            {isLogin && (
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-nexar-accent focus:ring-nexar-accent"
                  />
                  <span className="ml-2 text-sm text-gray-600">Ține-mă conectat</span>
                </label>
                <a href="#" className="text-sm text-nexar-accent hover:text-nexar-gold transition-colors">
                  Ai uitat parola?
                </a>
              </div>
            )}

            {!isLogin && (
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  checked={formData.agreeToTerms}
                  onChange={(e) => handleInputChange('agreeToTerms', e.target.checked)}
                  className="mt-1 rounded border-gray-300 text-nexar-accent focus:ring-nexar-accent"
                  required={!isLogin}
                />
                <span className="text-sm text-gray-600">
                  Sunt de acord cu{' '}
                  <a href="#" className="text-nexar-accent hover:text-nexar-gold transition-colors">
                    Termenii și Condițiile
                  </a>{' '}
                  și{' '}
                  <a href="#" className="text-nexar-accent hover:text-nexar-gold transition-colors">
                    Politica de Confidențialitate
                  </a>
                </span>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-nexar-accent text-white py-3 rounded-xl font-semibold hover:bg-nexar-gold transition-colors transform hover:scale-105 duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Se procesează...' : (isLogin ? 'Conectează-te' : 'Creează Cont')}
            </button>
          </form>

          {/* Social Login */}
          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">sau continuă cu</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button 
                onClick={handleGoogleAuth}
                disabled={isLoading}
                className="w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-xl shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span className="ml-2">Google</span>
              </button>

              <button 
                onClick={handleFacebookAuth}
                disabled={isLoading}
                className="w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-xl shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <span className="ml-2">Facebook</span>
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              {isLogin ? 'Nu ai cont?' : 'Ai deja cont?'}{' '}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-nexar-accent hover:text-nexar-gold font-semibold transition-colors"
              >
                {isLogin ? 'Înregistrează-te aici' : 'Conectează-te aici'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;