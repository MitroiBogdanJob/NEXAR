# 🚀 Ghid Complet Configurare Supabase pentru Nexar

## 📋 Pasul 1: Crearea Contului și Proiectului

### 1.1 Creează cont Supabase
1. Mergi la [supabase.com](https://supabase.com)
2. Click pe **"Start your project"**
3. Înregistrează-te cu GitHub, Google sau email
4. Confirmă email-ul dacă este necesar

### 1.2 Creează un proiect nou
1. În dashboard, click pe **"New Project"**
2. Completează:
   - **Organization**: Selectează organizația ta
   - **Name**: `nexar-motorcycle-marketplace`
   - **Database Password**: Generează o parolă sigură (salvează-o!)
   - **Region**: Alege `Europe (Frankfurt)` pentru România
   - **Pricing Plan**: Selectează **Free** pentru început
3. Click pe **"Create new project"**
4. Așteaptă 2-3 minute pentru inițializare

## 🔑 Pasul 2: Obținerea Credențialelor

### 2.1 Găsește credențialele API
1. În dashboard-ul proiectului, mergi la **Settings** → **API**
2. Copiază următoarele:
   - **Project URL**: `https://your-project-id.supabase.co`
   - **anon public key**: Cheia lungă care începe cu `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

### 2.2 Conectează aplicația
1. În aplicația Nexar, click pe butonul **"Connect to Supabase"** din header
2. Introdu:
   - **URL Proiect**: URL-ul copiat mai sus
   - **Anon Key**: Cheia publică copiată mai sus
3. Click pe **"Conectează la Supabase"**

## 🗄️ Pasul 3: Configurarea Bazei de Date

### 3.1 Rulează migrația automată
Aplicația va rula automat migrația pentru a crea tabelele necesare:
- `profiles` - Profiluri utilizatori
- `listings` - Anunțuri motociclete
- `favorites` - Anunțuri favorite
- `messages` - Mesaje între utilizatori
- `reviews` - Recenzii și rating-uri

### 3.2 Verifică tabelele create
1. În Supabase dashboard, mergi la **Table Editor**
2. Verifică că există următoarele tabele:
   - ✅ `profiles`
   - ✅ `listings`
   - ✅ `favorites`
   - ✅ `messages`
   - ✅ `reviews`

## 🔐 Pasul 4: Configurarea Autentificării

### 4.1 Activează providerii de autentificare
1. Mergi la **Authentication** → **Providers**
2. Activează:
   - ✅ **Email** (deja activat)
   - ✅ **Google** (opțional)
   - ✅ **Facebook** (opțional)

### 4.2 Configurează URL-urile de redirect
1. În **Authentication** → **URL Configuration**
2. Adaugă:
   - **Site URL**: `http://localhost:5173` (pentru dezvoltare)
   - **Redirect URLs**: `http://localhost:5173/auth/callback`

## 📊 Pasul 5: Configurarea Row Level Security (RLS)

### 5.1 Verifică politicile RLS
Migrația a configurat automat politicile de securitate:

**Profiles:**
- Toată lumea poate vedea profilurile
- Utilizatorii pot edita doar propriul profil

**Listings:**
- Toată lumea poate vedea anunțurile active
- Utilizatorii pot crea/edita doar propriile anunțuri

**Favorites & Messages:**
- Utilizatorii văd doar propriile favorite/mesaje

### 5.2 Testează securitatea
1. Mergi la **Authentication** → **Users**
2. Creează un utilizator test
3. Testează că politicile funcționează corect

## 🚀 Pasul 6: Testarea Integrării

### 6.1 Testează autentificarea
1. În aplicația Nexar, mergi la `/auth`
2. Înregistrează un cont nou
3. Verifică că utilizatorul apare în **Authentication** → **Users**

### 6.2 Testează funcționalitățile
1. **Creează un anunț** - Mergi la `/adauga-anunt`
2. **Vezi anunțurile** - Mergi la `/anunturi`
3. **Adaugă la favorite** - Click pe inimă la un anunț
4. **Trimite mesaj** - Contactează un vânzător

## 🔧 Pasul 7: Configurări Avansate (Opțional)

### 7.1 Configurează Storage pentru imagini
1. Mergi la **Storage** → **Buckets**
2. Creează un bucket nou: `listing-images`
3. Configurează politicile pentru upload-ul imaginilor

### 7.2 Configurează Realtime (pentru mesaje live)
1. Mergi la **Database** → **Replication**
2. Activează replicarea pentru tabelul `messages`

### 7.3 Configurează Edge Functions (pentru logică avansată)
1. Mergi la **Edge Functions**
2. Creează funcții pentru:
   - Procesarea imaginilor
   - Trimiterea email-urilor de notificare
   - Calcularea rating-urilor

## 📈 Pasul 8: Monitorizare și Optimizare

### 8.1 Monitorizează utilizarea
1. **Dashboard** → **Usage** - Vezi statisticile
2. **Logs** → **Database** - Monitorizează query-urile
3. **Auth** → **Users** - Urmărește înregistrările

### 8.2 Optimizează performanța
1. Adaugă indexuri pentru query-uri frecvente
2. Optimizează politicile RLS
3. Configurează cache-ul pentru query-uri

## 🆘 Depanare Probleme Comune

### Problema: "Invalid API key"
**Soluție**: Verifică că ai copiat corect anon key-ul din Settings → API

### Problema: "Row Level Security policy violation"
**Soluție**: Verifică că utilizatorul este autentificat și politicile RLS sunt configurate corect

### Problema: "Table doesn't exist"
**Soluție**: Rulează din nou migrația sau creează manual tabelele

### Problema: "CORS error"
**Soluție**: Adaugă domeniul tău în Settings → API → CORS

## 📞 Suport și Resurse

- **Documentație Supabase**: [docs.supabase.com](https://docs.supabase.com)
- **Discord Supabase**: [discord.supabase.com](https://discord.supabase.com)
- **GitHub Issues**: Pentru probleme specifice aplicației

## ✅ Checklist Final

- [ ] Cont Supabase creat
- [ ] Proiect configurat
- [ ] Credențiale obținute și introduse în aplicație
- [ ] Tabele create prin migrație
- [ ] Autentificare configurată
- [ ] RLS activat și testat
- [ ] Funcționalități de bază testate
- [ ] Aplicația funcționează complet cu Supabase

**🎉 Felicitări! Aplicația Nexar este acum conectată la Supabase și gata de utilizare!**