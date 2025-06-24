import { createClient } from '@supabase/supabase-js'
import { v4 as uuidv4 } from 'uuid';

// Credențialele Supabase pentru proiectul tău
const supabaseUrl = 'https://tidnmzsivsthwwcfdzyo.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRpZG5tenNpdnN0aHd3Y2ZkenlvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA3MjE5NTgsImV4cCI6MjA2NjI5Nzk1OH0.Sr1gSZ2qtoff7gmulkT8uIzB8eL7gqKUUNVj82OqHog'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Tipuri pentru baza de date
export interface Listing {
  id: string
  title: string
  price: number
  year: number
  mileage: number
  location: string
  category: string
  brand: string
  model: string
  engine_capacity: number
  fuel_type: string
  transmission: string
  condition: string
  description: string
  images: string[]
  seller_id: string
  seller_name: string
  seller_type: 'individual' | 'dealer'
  rating: number
  featured: boolean
  created_at: string
  updated_at: string
}

export interface User {
  id: string
  name: string
  email: string
  phone?: string
  location?: string
  avatar_url?: string
  verified: boolean
  created_at: string
}

// Funcție pentru a crea profilul manual dacă nu există
const ensureProfileExists = async (user: any, userData?: any) => {
  try {
    // Verificăm dacă profilul există deja
    const { data: existingProfile, error: checkError } = await supabase
      .from('profiles')
      .select('id')
      .eq('user_id', user.id)
      .single()
    
    if (existingProfile) {
      console.log('Profile already exists for user:', user.email)
      return existingProfile
    }
    
    // Dacă nu există, îl creăm
    console.log('Creating profile for user:', user.email)
    const { data: newProfile, error: createError } = await supabase
      .from('profiles')
      .insert([
        {
          user_id: user.id,
          name: userData?.name || user.user_metadata?.name || user.email?.split('@')[0] || '',
          email: user.email,
          phone: userData?.phone || user.user_metadata?.phone || '',
          location: userData?.location || user.user_metadata?.location || '',
          seller_type: userData?.sellerType || user.user_metadata?.sellerType || 'individual'
        }
      ])
      .select()
      .single()
    
    if (createError) {
      console.error('Error creating profile:', createError)
      return null
    }
    
    console.log('Profile created successfully:', newProfile)
    return newProfile
  } catch (err) {
    console.error('Error in ensureProfileExists:', err)
    return null
  }
}

// Funcții pentru autentificare
export const auth = {
  signUp: async (email: string, password: string, userData: any) => {
    try {
      console.log('Starting signup process for:', email)
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userData,
        }
      })
      
      if (error) {
        console.error('Signup error:', error)
        return { data, error }
      }
      
      if (data.user) {
        console.log('User created, ensuring profile exists...')
        // Asigurăm că profilul este creat
        await ensureProfileExists(data.user, userData)
      }
      
      return { data, error }
    } catch (err) {
      console.error('SignUp error:', err)
      return { data: null, error: err }
    }
  },

  signIn: async (email: string, password: string) => {
    try {
      console.log('Starting signin process for:', email)
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })
      
      if (error) {
        console.error('Signin error:', error)
        return { data, error }
      }
      
      if (data.user) {
        console.log('User signed in, checking profile...')
        
        // Asigurăm că profilul există
        await ensureProfileExists(data.user)
        
        // Obținem profilul utilizatorului
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_id', data.user.id)
          .single()
        
        if (!profileError && profileData) {
          // Salvăm datele utilizatorului în localStorage pentru acces rapid
          const userData = {
            id: data.user.id,
            name: profileData.name,
            email: profileData.email,
            sellerType: profileData.seller_type,
            isLoggedIn: true
          }
          
          localStorage.setItem('user', JSON.stringify(userData))
          console.log('User data saved to localStorage:', userData)
        } else {
          console.error('Error fetching profile:', profileError)
        }
      }
      
      return { data, error }
    } catch (err) {
      console.error('SignIn error:', err)
      return { data: null, error: err }
    }
  },

  signOut: async () => {
    console.log('Signing out user...')
    localStorage.removeItem('user')
    const { error } = await supabase.auth.signOut()
    return { error }
  },

  getCurrentUser: async () => {
    const { data: { user } } = await supabase.auth.getUser()
    return user
  },
  
  resetPassword: async (email: string) => {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    })
    return { data, error }
  }
}

// Funcții pentru anunțuri
export const listings = {
  getAll: async (filters?: any) => {
    try {
      let query = supabase
        .from('listings')
        .select('*')
        .eq('status', 'active')
        .order('created_at', { ascending: false })

      if (filters) {
        if (filters.category) query = query.eq('category', filters.category.toLowerCase())
        if (filters.brand) query = query.eq('brand', filters.brand)
        if (filters.priceMin) query = query.gte('price', filters.priceMin)
        if (filters.priceMax) query = query.lte('price', filters.priceMax)
        if (filters.yearMin) query = query.gte('year', filters.yearMin)
        if (filters.yearMax) query = query.lte('year', filters.yearMax)
        if (filters.location) query = query.ilike('location', `%${filters.location}%`)
        if (filters.sellerType) query = query.eq('seller_type', filters.sellerType)
        if (filters.condition) query = query.eq('condition', filters.condition)
        if (filters.fuel) query = query.eq('fuel_type', filters.fuel)
        if (filters.transmission) query = query.eq('transmission', filters.transmission)
        if (filters.engineMin) query = query.gte('engine_capacity', filters.engineMin)
        if (filters.engineMax) query = query.lte('engine_capacity', filters.engineMax)
        if (filters.mileageMax) query = query.lte('mileage', filters.mileageMax)
      }

      const { data, error } = await query
      return { data, error }
    } catch (err) {
      console.error('Error fetching listings:', err)
      return { data: null, error: err }
    }
  },

  getById: async (id: string) => {
    try {
      const { data, error } = await supabase
        .from('listings')
        .select('*')
        .eq('id', id)
        .single()
      
      // Incrementăm numărul de vizualizări
      if (data && !error) {
        await supabase
          .from('listings')
          .update({ views_count: (data.views_count || 0) + 1 })
          .eq('id', id)
      }
      
      return { data, error }
    } catch (err) {
      console.error('Error fetching listing:', err)
      return { data: null, error: err }
    }
  },

  create: async (listing: Partial<Listing>, images: File[]) => {
    try {
      // 1. Încărcăm imaginile în storage
      const imageUrls: string[] = []
      
      for (const image of images) {
        const fileExt = image.name.split('.').pop()
        const fileName = `${uuidv4()}.${fileExt}`
        const filePath = `${listing.seller_id}/${fileName}`
        
        const { error: uploadError, data } = await supabase.storage
          .from('listing-images')
          .upload(filePath, image)
        
        if (uploadError) {
          console.error('Error uploading image:', uploadError)
          continue
        }
        
        // Obținem URL-ul public pentru imagine
        const { data: { publicUrl } } = supabase.storage
          .from('listing-images')
          .getPublicUrl(filePath)
        
        imageUrls.push(publicUrl)
      }
      
      // 2. Creăm anunțul cu URL-urile imaginilor
      const { data, error } = await supabase
        .from('listings')
        .insert([{
          ...listing,
          images: imageUrls,
          id: uuidv4(),
          status: 'active'
        }])
        .select()
      
      return { data, error }
    } catch (err) {
      console.error('Error creating listing:', err)
      return { data: null, error: err }
    }
  },

  update: async (id: string, updates: Partial<Listing>, newImages?: File[]) => {
    try {
      // Dacă avem imagini noi, le încărcăm
      if (newImages && newImages.length > 0) {
        const imageUrls: string[] = []
        
        // Obținem anunțul curent pentru a păstra imaginile existente
        const { data: currentListing } = await supabase
          .from('listings')
          .select('images, seller_id')
          .eq('id', id)
          .single()
        
        // Păstrăm imaginile existente
        if (currentListing && currentListing.images) {
          imageUrls.push(...currentListing.images)
        }
        
        // Adăugăm imaginile noi
        for (const image of newImages) {
          const fileExt = image.name.split('.').pop()
          const fileName = `${uuidv4()}.${fileExt}`
          const filePath = `${currentListing?.seller_id}/${fileName}`
          
          const { error: uploadError } = await supabase.storage
            .from('listing-images')
            .upload(filePath, image)
          
          if (uploadError) {
            console.error('Error uploading image:', uploadError)
            continue
          }
          
          // Obținem URL-ul public pentru imagine
          const { data: { publicUrl } } = supabase.storage
            .from('listing-images')
            .getPublicUrl(filePath)
          
          imageUrls.push(publicUrl)
        }
        
        // Actualizăm anunțul cu noile imagini
        updates.images = imageUrls
      }
      
      const { data, error } = await supabase
        .from('listings')
        .update(updates)
        .eq('id', id)
        .select()
      
      return { data, error }
    } catch (err) {
      console.error('Error updating listing:', err)
      return { data: null, error: err }
    }
  },

  delete: async (id: string) => {
    try {
      // Obținem anunțul pentru a șterge imaginile
      const { data: listing } = await supabase
        .from('listings')
        .select('images')
        .eq('id', id)
        .single()
      
      // Ștergem imaginile din storage
      if (listing && listing.images) {
        for (const imageUrl of listing.images) {
          // Extragem path-ul din URL
          const urlParts = imageUrl.split('/')
          const fileName = urlParts[urlParts.length - 1]
          const sellerFolder = urlParts[urlParts.length - 2]
          const filePath = `${sellerFolder}/${fileName}`
          
          await supabase.storage
            .from('listing-images')
            .remove([filePath])
        }
      }
      
      // Ștergem anunțul
      const { error } = await supabase
        .from('listings')
        .delete()
        .eq('id', id)
      
      return { error }
    } catch (err) {
      console.error('Error deleting listing:', err)
      return { error: err }
    }
  },
  
  addToFavorites: async (userId: string, listingId: string) => {
    try {
      const { data, error } = await supabase
        .from('favorites')
        .insert([{ user_id: userId, listing_id: listingId }])
        .select()
      
      return { data, error }
    } catch (err) {
      console.error('Error adding to favorites:', err)
      return { data: null, error: err }
    }
  },
  
  removeFromFavorites: async (userId: string, listingId: string) => {
    try {
      const { error } = await supabase
        .from('favorites')
        .delete()
        .match({ user_id: userId, listing_id: listingId })
      
      return { error }
    } catch (err) {
      console.error('Error removing from favorites:', err)
      return { error: err }
    }
  },
  
  getFavorites: async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('favorites')
        .select('listing_id')
        .eq('user_id', userId)
      
      return { data, error }
    } catch (err) {
      console.error('Error fetching favorites:', err)
      return { data: null, error: err }
    }
  }
}

// Funcții pentru profiluri
export const profiles = {
  getById: async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', userId)
        .single()
      
      return { data, error }
    } catch (err) {
      console.error('Error fetching profile:', err)
      return { data: null, error: err }
    }
  },
  
  update: async (userId: string, updates: Partial<User>) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('user_id', userId)
        .select()
      
      return { data, error }
    } catch (err) {
      console.error('Error updating profile:', err)
      return { data: null, error: err }
    }
  },
  
  uploadAvatar: async (userId: string, file: File) => {
    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${uuidv4()}.${fileExt}`
      const filePath = `${userId}/${fileName}`
      
      const { error: uploadError } = await supabase.storage
        .from('profile-images')
        .upload(filePath, file)
      
      if (uploadError) {
        return { error: uploadError }
      }
      
      // Obținem URL-ul public pentru avatar
      const { data: { publicUrl } } = supabase.storage
        .from('profile-images')
        .getPublicUrl(filePath)
      
      // Actualizăm profilul cu noul avatar
      const { data, error } = await supabase
        .from('profiles')
        .update({ avatar_url: publicUrl })
        .eq('user_id', userId)
        .select()
      
      return { data, error }
    } catch (err) {
      console.error('Error uploading avatar:', err)
      return { data: null, error: err }
    }
  }
}

// Funcții pentru mesaje
export const messages = {
  send: async (senderId: string, receiverId: string, listingId: string, content: string, subject?: string) => {
    try {
      const { data, error } = await supabase
        .from('messages')
        .insert([{
          sender_id: senderId,
          receiver_id: receiverId,
          listing_id: listingId,
          content,
          subject,
          id: uuidv4()
        }])
        .select()
      
      return { data, error }
    } catch (err) {
      console.error('Error sending message:', err)
      return { data: null, error: err }
    }
  },
  
  getConversations: async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .or(`sender_id.eq.${userId},receiver_id.eq.${userId}`)
        .order('created_at', { ascending: false })
      
      return { data, error }
    } catch (err) {
      console.error('Error fetching conversations:', err)
      return { data: null, error: err }
    }
  },
  
  markAsRead: async (messageId: string) => {
    try {
      const { data, error } = await supabase
        .from('messages')
        .update({ read: true })
        .eq('id', messageId)
        .select()
      
      return { data, error }
    } catch (err) {
      console.error('Error marking message as read:', err)
      return { data: null, error: err }
    }
  }
}

// Funcții pentru recenzii
export const reviews = {
  create: async (reviewerId: string, reviewedId: string, listingId: string, rating: number, comment?: string) => {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .insert([{
          reviewer_id: reviewerId,
          reviewed_id: reviewedId,
          listing_id: listingId,
          rating,
          comment,
          id: uuidv4()
        }])
        .select()
      
      // Actualizăm rating-ul mediu pentru utilizatorul evaluat
      if (!error) {
        // Obținem toate recenziile pentru utilizator
        const { data: userReviews } = await supabase
          .from('reviews')
          .select('rating')
          .eq('reviewed_id', reviewedId)
        
        if (userReviews) {
          // Calculăm media
          const avgRating = userReviews.reduce((sum, review) => sum + review.rating, 0) / userReviews.length
          
          // Actualizăm profilul
          await supabase
            .from('profiles')
            .update({ 
              rating: parseFloat(avgRating.toFixed(2)),
              reviews_count: userReviews.length
            })
            .eq('user_id', reviewedId)
        }
      }
      
      return { data, error }
    } catch (err) {
      console.error('Error creating review:', err)
      return { data: null, error: err }
    }
  },
  
  getForUser: async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('reviewed_id', userId)
        .order('created_at', { ascending: false })
      
      return { data, error }
    } catch (err) {
      console.error('Error fetching reviews:', err)
      return { data: null, error: err }
    }
  }
}

// Funcție pentru a verifica dacă utilizatorul este autentificat
export const isAuthenticated = async () => {
  try {
    const { data: { user } } = await supabase.auth.getUser()
    return !!user
  } catch (err) {
    console.error('Error checking authentication:', err)
    return false
  }
}

// Funcție pentru a verifica dacă Supabase este configurat corect
export const checkSupabaseConnection = async () => {
  try {
    const { error } = await supabase.from('profiles').select('count', { count: 'exact', head: true })
    return !error
  } catch (e) {
    console.error('Supabase connection error:', e)
    return false
  }
}

// Funcție pentru testarea conexiunii complete
export const testConnection = async () => {
  try {
    console.log('🔍 Testing Supabase connection...')
    
    // Test 1: Conexiunea de bază
    const { data: healthCheck, error: healthError } = await supabase
      .from('profiles')
      .select('count', { count: 'exact', head: true })
    
    if (healthError) {
      console.error('❌ Health check failed:', healthError)
      return { success: false, error: 'Database connection failed' }
    }
    
    console.log('✅ Database connection successful')
    
    // Test 2: Verificăm tabelele
    const tables = ['profiles', 'listings', 'favorites', 'messages', 'reviews']
    for (const table of tables) {
      const { error } = await supabase
        .from(table)
        .select('count', { count: 'exact', head: true })
      
      if (error) {
        console.error(`❌ Table ${table} not found:`, error)
        return { success: false, error: `Table ${table} missing` }
      }
      console.log(`✅ Table ${table} exists`)
    }
    
    // Test 3: Verificăm storage buckets
    const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets()
    
    if (bucketsError) {
      console.error('❌ Storage check failed:', bucketsError)
      return { success: false, error: 'Storage not accessible' }
    }
    
    const requiredBuckets = ['listing-images', 'profile-images']
    const existingBuckets = buckets?.map(b => b.name) || []
    
    for (const bucket of requiredBuckets) {
      if (!existingBuckets.includes(bucket)) {
        console.warn(`⚠️ Bucket ${bucket} not found`)
      } else {
        console.log(`✅ Bucket ${bucket} exists`)
      }
    }
    
    console.log('🎉 All tests passed! Supabase is ready to use.')
    return { success: true, message: 'All systems operational' }
    
  } catch (err) {
    console.error('❌ Connection test failed:', err)
    return { success: false, error: 'Unexpected error during testing' }
  }
}

// Funcție pentru a crea profilul manual pentru utilizatorul existent
export const createMissingProfile = async (userId: string, email: string) => {
  try {
    console.log('Creating missing profile for user:', email)
    
    const { data, error } = await supabase
      .from('profiles')
      .insert([
        {
          user_id: userId,
          name: email.split('@')[0], // Folosim partea din email ca nume implicit
          email: email,
          phone: '',
          location: '',
          seller_type: 'individual'
        }
      ])
      .select()
      .single()
    
    if (error) {
      console.error('Error creating missing profile:', error)
      return { data: null, error }
    }
    
    console.log('Missing profile created successfully:', data)
    return { data, error: null }
  } catch (err) {
    console.error('Error in createMissingProfile:', err)
    return { data: null, error: err }
  }
}