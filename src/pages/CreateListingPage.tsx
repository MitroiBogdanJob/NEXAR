import React, { useState } from 'react';
import { Upload, X, Plus, Check, Building, User } from 'lucide-react';

const CreateListingPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [images, setImages] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    brand: '',
    model: '',
    year: '',
    mileage: '',
    engine: '',
    fuel: '',
    transmission: '',
    color: '',
    condition: '',
    price: '',
    location: '',
    description: '',
    features: [] as string[],
    phone: '',
    email: '',
    sellerType: 'privat'
  });

  const steps = [
    { id: 1, title: 'Informații de bază', description: 'Detalii despre motocicletă' },
    { id: 2, title: 'Fotografii', description: 'Adaugă până la 5 poze' },
    { id: 3, title: 'Descriere și preț', description: 'Detalii complete' },
    { id: 4, title: 'Contact', description: 'Informații de contact' }
  ];

  const categories = ['Sport', 'Touring', 'Cruiser', 'Adventure', 'Naked', 'Scooter', 'Enduro', 'Chopper'];
  const brands = [
    'Yamaha', 'Honda', 'Suzuki', 'Kawasaki', 'BMW', 'Ducati', 'KTM', 'Aprilia', 
    'Triumph', 'Harley-Davidson', 'MV Agusta', 'Benelli', 'Moto Guzzi', 'Indian',
    'Zero', 'Energica', 'Husqvarna', 'Beta', 'Sherco', 'GasGas'
  ];
  const fuelTypes = ['Benzină', 'Electric', 'Hibrid'];
  const transmissionTypes = ['Manual', 'Automat', 'Semi-automat'];
  const conditions = ['Nouă', 'Excelentă', 'Foarte bună', 'Bună', 'Satisfăcătoare'];
  
  const availableFeatures = [
    'ABS', 'Control tracțiune', 'Suspensie reglabilă', 'Frâne Brembo',
    'Quickshifter', 'Sistem de navigație', 'Încălzire mânere', 'LED complet',
    'Bluetooth', 'USB', 'Geantă laterală', 'Parbriz reglabil',
    'Scaun încălzit', 'Tempomat', 'Sistem anti-furt', 'Jante aliaj'
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFeatureToggle = (feature: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature]
    }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && images.length < 5) {
      const newImages = Array.from(files).slice(0, 5 - images.length);
      newImages.forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            setImages(prev => [...prev, e.target!.result as string]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = () => {
    console.log('Submitting listing:', formData, images);
    alert('Anunțul a fost publicat cu succes!');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Adaugă Anunț Nou
          </h1>
          <p className="text-gray-600 text-lg">
            Completează formularul pentru a-ți publica motocicleta
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors ${
                  currentStep >= step.id 
                    ? 'bg-gray-900 border-gray-900 text-white' 
                    : 'border-gray-300 text-gray-400'
                }`}>
                  {currentStep > step.id ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <span className="font-semibold">{step.id}</span>
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-full h-1 mx-4 transition-colors ${
                    currentStep > step.id ? 'bg-gray-900' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="mt-4 text-center">
            <h2 className="text-xl font-semibold text-gray-900">
              {steps[currentStep - 1].title}
            </h2>
            <p className="text-gray-600">{steps[currentStep - 1].description}</p>
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {/* Step 1: Basic Information */}
          {currentStep === 1 && (
            <div className="space-y-6 animate-fade-in">
              {/* Seller Type Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  Tip Vânzător *
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div 
                    onClick={() => handleInputChange('sellerType', 'privat')}
                    className={`p-6 border-2 rounded-xl cursor-pointer transition-all ${
                      formData.sellerType === 'privat' 
                        ? 'border-nexar-accent bg-nexar-accent/5' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center space-x-3 mb-3">
                      <User className="h-8 w-8 text-nexar-accent" />
                      <h3 className="text-lg font-semibold">Vânzător Privat</h3>
                    </div>
                    <p className="text-gray-600 text-sm">
                      Vând motocicleta personală. Ideal pentru vânzări ocazionale.
                    </p>
                  </div>
                  
                  <div 
                    onClick={() => handleInputChange('sellerType', 'dealer')}
                    className={`p-6 border-2 rounded-xl cursor-pointer transition-all ${
                      formData.sellerType === 'dealer' 
                        ? 'border-nexar-accent bg-nexar-accent/5' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center space-x-3 mb-3">
                      <Building className="h-8 w-8 text-nexar-accent" />
                      <h3 className="text-lg font-semibold">Dealer Autorizat</h3>
                    </div>
                    <p className="text-gray-600 text-sm">
                      Reprezint un dealer sau service autorizat. Vânzări profesionale.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Titlu anunț *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                    placeholder="ex: Yamaha YZF-R1 2023"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Categorie *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  >
                    <option value="">Selectează categoria</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Marcă *
                  </label>
                  <select
                    value={formData.brand}
                    onChange={(e) => handleInputChange('brand', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  >
                    <option value="">Selectează marca</option>
                    {brands.map(brand => (
                      <option key={brand} value={brand}>{brand}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Model *
                  </label>
                  <input
                    type="text"
                    value={formData.model}
                    onChange={(e) => handleInputChange('model', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                    placeholder="ex: YZF-R1"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    An fabricație *
                  </label>
                  <input
                    type="number"
                    value={formData.year}
                    onChange={(e) => handleInputChange('year', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                    placeholder="2023"
                    min="1990"
                    max="2024"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Kilometraj *
                  </label>
                  <input
                    type="number"
                    value={formData.mileage}
                    onChange={(e) => handleInputChange('mileage', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                    placeholder="25000"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Capacitate motor (cc) *
                  </label>
                  <input
                    type="number"
                    value={formData.engine}
                    onChange={(e) => handleInputChange('engine', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                    placeholder="998"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Combustibil *
                  </label>
                  <select
                    value={formData.fuel}
                    onChange={(e) => handleInputChange('fuel', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  >
                    <option value="">Selectează combustibilul</option>
                    {fuelTypes.map(fuel => (
                      <option key={fuel} value={fuel}>{fuel}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Transmisie *
                  </label>
                  <select
                    value={formData.transmission}
                    onChange={(e) => handleInputChange('transmission', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  >
                    <option value="">Selectează transmisia</option>
                    {transmissionTypes.map(trans => (
                      <option key={trans} value={trans}>{trans}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Culoare *
                  </label>
                  <input
                    type="text"
                    value={formData.color}
                    onChange={(e) => handleInputChange('color', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                    placeholder="ex: Albastru Racing"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Starea *
                  </label>
                  <select
                    value={formData.condition}
                    onChange={(e) => handleInputChange('condition', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  >
                    <option value="">Selectează starea</option>
                    {conditions.map(condition => (
                      <option key={condition} value={condition}>{condition}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Locația *
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                    placeholder="ex: București, Sector 1"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Images */}
          {currentStep === 2 && (
            <div className="space-y-6 animate-fade-in">
              <div className="text-center">
                <p className="text-gray-600 mb-6">
                  Adaugă până la 5 fotografii de calitate pentru a atrage mai mulți cumpărători
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {images.map((image, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={image}
                      alt={`Upload ${index + 1}`}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <button
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-4 w-4" />
                    </button>
                    {index === 0 && (
                      <div className="absolute bottom-2 left-2 bg-gray-900 text-white px-2 py-1 rounded text-xs font-semibold">
                        Foto principală
                      </div>
                    )}
                  </div>
                ))}
                
                {images.length < 5 && (
                  <label className="border-2 border-dashed border-gray-300 rounded-lg h-48 flex flex-col items-center justify-center cursor-pointer hover:border-gray-900 transition-colors">
                    <Upload className="h-8 w-8 text-gray-400 mb-2" />
                    <span className="text-gray-600">Adaugă fotografie</span>
                    <span className="text-sm text-gray-400">({images.length}/5)</span>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-2">Sfaturi pentru fotografii de calitate:</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Fotografiază în lumină naturală</li>
                  <li>• Include imagini din toate unghiurile</li>
                  <li>• Arată detaliile importante și eventualele defecte</li>
                  <li>• Prima fotografie va fi cea principală</li>
                </ul>
              </div>
            </div>
          )}

          {/* Step 3: Description and Price */}
          {currentStep === 3 && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preț (EUR) *
                </label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => handleInputChange('price', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-gray-900 focus:border-transparent text-2xl font-bold"
                  placeholder="18500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Descriere detaliată *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={8}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  placeholder="Descrie motocicleta în detaliu: starea tehnică, istoricul, modificările, etc."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  Dotări și caracteristici
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {availableFeatures.map(feature => (
                    <label key={feature} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.features.includes(feature)}
                        onChange={() => handleFeatureToggle(feature)}
                        className="rounded border-gray-300 text-gray-900 focus:ring-gray-900"
                      />
                      <span className="text-sm">{feature}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Contact */}
          {currentStep === 4 && (
            <div className="space-y-6 animate-fade-in">
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Informații de contact
                </h3>
                <p className="text-gray-600">
                  Aceste informații vor fi vizibile cumpărătorilor interesați
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Număr de telefon *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                    placeholder="0790 45 46 47"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                    placeholder="contact@exemplu.com"
                  />
                </div>
              </div>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h4 className="font-semibold text-green-800 mb-4">Rezumat anunț:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-green-700 font-medium">Titlu:</span>
                    <span className="ml-2">{formData.title || 'Necompletat'}</span>
                  </div>
                  <div>
                    <span className="text-green-700 font-medium">Preț:</span>
                    <span className="ml-2">€{formData.price || '0'}</span>
                  </div>
                  <div>
                    <span className="text-green-700 font-medium">Tip vânzător:</span>
                    <span className="ml-2">{formData.sellerType === 'dealer' ? 'Dealer' : 'Privat'}</span>
                  </div>
                  <div>
                    <span className="text-green-700 font-medium">Fotografii:</span>
                    <span className="ml-2">{images.length}/5</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-8 border-t border-gray-200">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className={`px-6 py-3 rounded-xl font-semibold transition-colors ${
                currentStep === 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Înapoi
            </button>
            
            {currentStep < 4 ? (
              <button
                onClick={nextStep}
                className="px-6 py-3 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 transition-colors"
              >
                Continuă
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="px-8 py-3 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 transition-colors flex items-center space-x-2"
              >
                <span>Publică Anunțul</span>
                <Check className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateListingPage;