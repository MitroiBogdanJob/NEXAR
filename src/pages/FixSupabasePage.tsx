import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Database, Shield, RefreshCw, CheckCircle, XCircle, AlertTriangle, ArrowRight } from 'lucide-react';
import FixSupabaseButton from '../components/FixSupabaseButton';
import { checkAndFixSupabaseConnection, fixCurrentUserProfile } from '../lib/fixSupabase';

const FixSupabasePage = () => {
  const [isFixingConnection, setIsFixingConnection] = useState(false);
  const [isFixingProfile, setIsFixingProfile] = useState(false);
  const [connectionResult, setConnectionResult] = useState<{success?: boolean; message?: string}>({});
  const [profileResult, setProfileResult] = useState<{success?: boolean; message?: string}>({});
  const [allFixed, setAllFixed] = useState(false);

  const handleFixConnection = async () => {
    setIsFixingConnection(true);
    setConnectionResult({});
    
    try {
      const success = await checkAndFixSupabaseConnection();
      
      setConnectionResult({
        success,
        message: success 
          ? 'Conexiunea la Supabase a fost reparată cu succes!' 
          : 'Nu s-a putut repara conexiunea la Supabase'
      });
    } catch (error) {
      console.error('Eroare la repararea conexiunii:', error);
      setConnectionResult({
        success: false,
        message: 'A apărut o eroare neașteptată'
      });
    } finally {
      setIsFixingConnection(false);
    }
  };

  const handleFixProfile = async () => {
    setIsFixingProfile(true);
    setProfileResult({});
    
    try {
      const result = await fixCurrentUserProfile();
      
      setProfileResult({
        success: result.success,
        message: result.success 
          ? 'Profilul a fost reparat cu succes!' 
          : `Eroare la repararea profilului: ${result.error}`
      });
    } catch (error) {
      console.error('Eroare la repararea profilului:', error);
      setProfileResult({
        success: false,
        message: 'A apărut o eroare neașteptată'
      });
    } finally {
      setIsFixingProfile(false);
    }
  };

  const handleFixAll = async () => {
    // Repară conexiunea
    await handleFixConnection();
    
    // Dacă conexiunea a fost reparată cu succes, repară și profilul
    if (connectionResult.success) {
      await handleFixProfile();
      
      // Dacă ambele au fost reparate cu succes, setăm allFixed = true
      if (profileResult.success) {
        setAllFixed(true);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-nexar-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Database className="h-8 w-8 text-nexar-accent" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Reparare Conexiune Supabase</h1>
            <p className="text-gray-600">
              Această pagină te ajută să repari problemele de conexiune la Supabase
            </p>
          </div>

          {/* Avertisment */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="h-6 w-6 text-yellow-600 mt-0.5" />
              <div>
                <h3 className="font-semibold text-yellow-800 mb-2">Atenție</h3>
                <p className="text-yellow-700">
                  Această pagină este destinată reparării conexiunii la Supabase și a profilului utilizatorului.
                  Folosește-o doar dacă întâmpini probleme de conectare sau dacă vezi mesajul "Deconectat" în aplicație.
                </p>
              </div>
            </div>
          </div>

          {/* Opțiuni de reparare */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Reparare Conexiune */}
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Database className="h-6 w-6 text-nexar-accent" />
                <h3 className="text-lg font-semibold text-gray-900">Reparare Conexiune</h3>
              </div>
              
              <p className="text-gray-600 mb-6">
                Repară conexiunea la Supabase și politicile RLS care cauzează erori.
              </p>
              
              <button
                onClick={handleFixConnection}
                disabled={isFixingConnection}
                className="w-full flex items-center justify-center space-x-2 bg-nexar-accent text-white px-4 py-3 rounded-lg font-semibold hover:bg-nexar-gold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isFixingConnection ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Se repară...</span>
                  </>
                ) : (
                  <>
                    <RefreshCw className="h-5 w-5" />
                    <span>Repară Conexiunea</span>
                  </>
                )}
              </button>
              
              {connectionResult.message && (
                <div className={`mt-4 p-3 rounded-lg ${
                  connectionResult.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  <div className="flex items-center space-x-2">
                    {connectionResult.success ? (
                      <CheckCircle className="h-5 w-5" />
                    ) : (
                      <XCircle className="h-5 w-5" />
                    )}
                    <span>{connectionResult.message}</span>
                  </div>
                </div>
              )}
            </div>
            
            {/* Reparare Profil */}
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Shield className="h-6 w-6 text-nexar-accent" />
                <h3 className="text-lg font-semibold text-gray-900">Reparare Profil</h3>
              </div>
              
              <p className="text-gray-600 mb-6">
                Repară profilul utilizatorului curent dacă lipsește sau este incomplet.
              </p>
              
              <button
                onClick={handleFixProfile}
                disabled={isFixingProfile}
                className="w-full flex items-center justify-center space-x-2 bg-nexar-accent text-white px-4 py-3 rounded-lg font-semibold hover:bg-nexar-gold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isFixingProfile ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Se repară...</span>
                  </>
                ) : (
                  <>
                    <RefreshCw className="h-5 w-5" />
                    <span>Repară Profilul</span>
                  </>
                )}
              </button>
              
              {profileResult.message && (
                <div className={`mt-4 p-3 rounded-lg ${
                  profileResult.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  <div className="flex items-center space-x-2">
                    {profileResult.success ? (
                      <CheckCircle className="h-5 w-5" />
                    ) : (
                      <XCircle className="h-5 w-5" />
                    )}
                    <span>{profileResult.message}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Reparare Completă */}
          <div className="bg-nexar-accent/10 rounded-xl p-6 mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <Shield className="h-6 w-6 text-nexar-accent" />
              <h3 className="text-lg font-semibold text-gray-900">Reparare Completă</h3>
            </div>
            
            <p className="text-gray-600 mb-6">
              Repară atât conexiunea la Supabase, cât și profilul utilizatorului într-un singur pas.
            </p>
            
            <FixSupabaseButton onSuccess={() => setAllFixed(true)} />
          </div>

          {/* Succes */}
          {allFixed && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8 animate-scale-in">
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-6 w-6 text-green-600 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-green-800 mb-2">Reparare Completă!</h3>
                  <p className="text-green-700 mb-4">
                    Conexiunea la Supabase și profilul utilizatorului au fost reparate cu succes.
                    Acum poți continua să folosești aplicația fără probleme.
                  </p>
                  
                  <Link
                    to="/"
                    className="inline-flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                  >
                    <span>Mergi la Pagina Principală</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Instrucțiuni pentru Admin */}
          <div className="border-t border-gray-200 pt-6 mt-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Instrucțiuni pentru Administrator</h3>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <p className="text-blue-700 mb-4">
                Dacă ești administrator și vrei să repari problemele pentru toți utilizatorii, urmează acești pași:
              </p>
              
              <ol className="list-decimal list-inside space-y-2 text-blue-700">
                <li>Mergi la <strong>Supabase Dashboard</strong> → <strong>SQL Editor</strong></li>
                <li>Copiază și rulează script-ul SQL din fișierul <strong>SUPABASE_FINAL_FIX.md</strong></li>
                <li>Verifică că toate tabelele și politicile au fost create corect</li>
                <li>Testează aplicația pentru a te asigura că totul funcționează</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FixSupabasePage;