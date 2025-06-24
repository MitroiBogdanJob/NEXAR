import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, Phone, MapPin, Building, AlertTriangle } from 'lucide-react';
import { auth, supabase } from '../lib/supabase';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    location: '',
    sellerType: 'individual',
    agreeToTerms: false
  });

  useEffect(() => {
    // Verificăm dacă utilizatorul este deja autentificat
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        navigate('/');
      }
    };
    
    checkAuth();
  }, [navigate]);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Resetăm erorile când utilizatorul începe să tasteze
    if (error) setError('');
  };

  const validateForm = () => {
    if (isLogin) {
      if (!formData.email) return 'Email-ul este obligatoriu';
      if (!formData.password) return 'Parola este obligatorie';
    } else {
      if (!formData.name) return 'Numele este obligatoriu';
      if (!formData.email) return 'Email-ul este obligatoriu';
      if (!formData.password) return 'Parola este obligatorie';
      if (formData.password.length < 6) return 'Parola trebuie să aibă cel puțin 6 caractere';
      if (formData.password !== formData.confirmPassword) return 'Parolele nu coincid';
      if (!formData.phone) return 'Telefonul este obligatoriu';
      if (!formData.location) return 'Locația este obligatorie';
      if (!formData.agreeToTerms) return 'Trebuie să accepți termenii și condițiile';
    }
    return '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validăm formularul
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }
    
    setIsLoading(true);
    setError('');
    setSuccessMessage('');
    
    try {
      if (isLogin) {
        // Login
        const { data, error } = await auth.signIn(formData.email, formData.password);
        
        if (error) {
          if (error.message.includes('Invalid login credentials')) {
            setError('Email sau parolă incorectă');
          } else if (error.message.includes('Email not confirmed')) {
            setError('Te rugăm să-ți confirmi email-ul înainte de a te conecta');
          } else {
            setError(error.message);
          }
        } else if (data?.user) {
          // Login successful - redirect will happen via auth state change
          console.log('Login successful for:', data.user.email);
        }
      } else {
        // Register
        const { data, error } = await auth.signUp(
          formData.email, 
          formData.password, 
          {
            name: formData.name,
            phone: formData.phone,
            location: formData.location,
            sellerType: formData.sellerType
          }
        );
        
        if (error) {
          if (error.message.includes('already registered')) {
            setError('Acest email este deja înregistrat');
          } else {
            setError(error.message);
          }
        } else if (data?.user) {
          // Check if email confirmation is required
          if (!data.session) {
            setSuccessMessage('Cont creat cu succes! Verifică-ți email-ul pentru a confirma contul înainte de a te conecta.');
          } else {
            setSuccessMessage('Cont creat cu succes! Ești acum conectat.');
            // Redirect will happen via auth state change
          }
          
          // Resetăm formularul
          setFormData({
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            phone: '',
            location: '',
            sellerType: 'individual',
            agreeToTerms: false
          });
        }
      }
    } catch (err: any) {
      console.error('Authentication error:', err);
      setError('A apărut o eroare. Te rugăm să încerci din nou.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!formData.email) {
      setError('Introdu adresa de email pentru a reseta parola');
      return;
    }
    
    setIsLoading(true);
    
    try {
      const { error } = await auth.resetPassword(formData.email);
      
      if (error) {
        setError(error.message);
      } else {
        setSuccessMessage('Un email pentru resetarea parolei a fost trimis. Verifică-ți căsuța de email.');
      }
    } catch (err) {
      console.error('Password reset error:', err);
      setError('A apărut o eroare. Te rugăm să încerci din nou.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6 sm:space-y-8">
        <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8">
          {/* Header */}
          <div className="text-center mb-6 sm:mb-8">
            <div className="flex items-center justify-center space-x-2 sm:space-x-3 mb-4">
              <img src="/Nexar - logo_black & red.png" alt="Logo" className="h-8 sm:h-10 w-auto" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
              {isLogin ? 'Conectează-te' : 'Creează Cont'}
            </h2>
            <p className="text-gray-600 mt-2 text-sm sm:text-base">
              {isLogin 
                ? 'Bun venit înapoi! Conectează-te la contul tău.' 
                : 'Alătură-te comunității și începe să vinzi sau să cumperi motociclete.'
              }
            </p>
          </div>

          {/* Success Message */}
          {successMessage && (
            <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-green-700 flex items-center">
                <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {successMessage}
              </p>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-700 flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2" />
                {error}
              </p>
            </div>
          )}

          {/* Toggle Buttons */}
          <div className="flex bg-gray-50 rounded-xl p-1 mb-6 sm:mb-8">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2.5 sm:py-3 px-4 rounded-lg font-semibold transition-colors text-sm sm:text-base ${
                isLogin 
                  ? 'bg-white text-gray-900 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Conectare
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2.5 sm:py-3 px-4 rounded-lg font-semibold transition-colors text-sm sm:text-base ${
                !isLogin 
                  ? 'bg-white text-gray-900 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Înregistrare
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
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
                    className="w-full pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-nexar-accent focus:border-transparent transition-colors text-sm sm:text-base"
                    placeholder="Bogdan Popescu"
                    required={!isLogin}
                  />
                  <User className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 sm:h-5 sm:w-5" />
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
                  className="w-full pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-nexar-accent focus:border-transparent transition-colors text-sm sm:text-base"
                  placeholder="bogdan@exemplu.com"
                  required
                />
                <Mail className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 sm:h-5 sm:w-5" />
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
                      className="w-full pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-nexar-accent focus:border-transparent transition-colors text-sm sm:text-base"
                      placeholder="0790 45 46 47"
                      required={!isLogin}
                    />
                    <Phone className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 sm:h-5 sm:w-5" />
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
                      className="w-full pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-nexar-accent focus:border-transparent transition-colors text-sm sm:text-base"
                      placeholder="București, România"
                      required={!isLogin}
                    />
                    <MapPin className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 sm:h-5 sm:w-5" />
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
                      className="w-full pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-nexar-accent focus:border-transparent transition-colors appearance-none text-sm sm:text-base"
                      required={!isLogin}
                    >
                      <option value="individual">Vânzător Privat</option>
                      <option value="dealer">Dealer Autorizat</option>
                    </select>
                    <Building className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 sm:h-5 sm:w-5" />
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
                  className="w-full pl-10 sm:pl-12 pr-10 sm:pr-12 py-2.5 sm:py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-nexar-accent focus:border-transparent transition-colors text-sm sm:text-base"
                  placeholder="••••••••"
                  required
                />
                <Lock className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 sm:h-5 sm:w-5" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4 sm:h-5 sm:w-5" /> : <Eye className="h-4 w-4 sm:h-5 sm:w-5" />}
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
                    className="w-full pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-nexar-accent focus:border-transparent transition-colors text-sm sm:text-base"
                    placeholder="••••••••"
                    required={!isLogin}
                  />
                  <Lock className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 sm:h-5 sm:w-5" />
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
                <button 
                  type="button"
                  onClick={handleForgotPassword}
                  className="text-sm text-nexar-accent hover:text-nexar-gold transition-colors"
                >
                  Ai uitat parola?
                </button>
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
                  <a href="/termeni" className="text-nexar-accent hover:text-nexar-gold transition-colors">
                    Termenii și Condițiile
                  </a>{' '}
                  și{' '}
                  <a href="/confidentialitate" className="text-nexar-accent hover:text-nexar-gold transition-colors">
                    Politica de Confidențialitate
                  </a>
                </span>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-nexar-accent text-white py-2.5 sm:py-3 rounded-xl font-semibold hover:bg-nexar-gold transition-colors transform hover:scale-105 duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
            >
              {isLoading ? 'Se procesează...' : (isLogin ? 'Conectează-te' : 'Creează Cont')}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 sm:mt-8 text-center">
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