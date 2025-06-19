import React, { useState } from 'react';
import { Database, Check, AlertCircle } from 'lucide-react';

const SupabaseConnect = () => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState('');
  const [credentials, setCredentials] = useState({
    url: '',
    anonKey: ''
  });

  const handleConnect = async () => {
    if (!credentials.url || !credentials.anonKey) {
      setError('Te rog completează toate câmpurile');
      return;
    }

    setIsConnecting(true);
    setError('');

    try {
      // Salvează credențialele în localStorage pentru a fi folosite de aplicație
      localStorage.setItem('supabase_url', credentials.url);
      localStorage.setItem('supabase_anon_key', credentials.anonKey);
      
      // Simulează conectarea
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setIsConnected(true);
      
      // Reîncarcă pagina pentru a aplica noile credențiale
      setTimeout(() => {
        window.location.reload();
      }, 1000);
      
    } catch (err) {
      setError('Eroare la conectare. Verifică credențialele.');
    } finally {
      setIsConnecting(false);
    }
  };

  if (isConnected) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Conectat cu succes!</h3>
          <p className="text-gray-600 mb-4">Aplicația se va reîncărca pentru a aplica setările.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-nexar-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Database className="h-8 w-8 text-nexar-accent" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Conectează la Supabase</h3>
          <p className="text-gray-600">Introdu credențialele proiectului tău Supabase</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              URL Proiect Supabase
            </label>
            <input
              type="url"
              value={credentials.url}
              onChange={(e) => setCredentials(prev => ({ ...prev, url: e.target.value }))}
              placeholder="https://your-project.supabase.co"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-nexar-accent focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Anon Key
            </label>
            <textarea
              value={credentials.anonKey}
              onChange={(e) => setCredentials(prev => ({ ...prev, anonKey: e.target.value }))}
              placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
              rows={3}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-nexar-accent focus:border-transparent"
            />
          </div>

          {error && (
            <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-lg">
              <AlertCircle className="h-4 w-4" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-blue-800 mb-2">Cum găsești credențialele:</h4>
            <ol className="text-sm text-blue-700 space-y-1 list-decimal list-inside">
              <li>Mergi la <a href="https://supabase.com/dashboard" target="_blank" rel="noopener noreferrer" className="underline">dashboard-ul Supabase</a></li>
              <li>Selectează proiectul tău</li>
              <li>Mergi la Settings → API</li>
              <li>Copiază URL-ul și anon key</li>
            </ol>
          </div>

          <button
            onClick={handleConnect}
            disabled={isConnecting}
            className="w-full bg-nexar-accent text-white py-3 rounded-lg font-semibold hover:bg-nexar-gold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isConnecting ? 'Se conectează...' : 'Conectează la Supabase'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SupabaseConnect;