import { createClient } from '@supabase/supabase-js'
import { v4 as uuidv4 } from 'uuid';

// Verificăm dacă există credențiale salvate în localStorage
const savedUrl = localStorage.getItem('supabase_url');
const savedAnonKey = localStorage.getItem('supabase_anon_key');

// Folosim credențialele din localStorage sau cele din variabilele de mediu
const supabaseUrl = savedUrl || import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co'
const supabaseAnonKey = savedAnonKey || import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key'

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

// Funcții pentru autentificare
export const auth = {
  signUp: async (email: string, password: string, userData: any) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData,
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      }
    })
    
    if (!error && data.user) {
      // Creăm profilul utilizatorului în tabela profiles
      const { error: profileError } = await supabase
        .from('profiles')
        .insert([
          {
            id: uuidv4(),
            user_id: data.user.id,
            name: userData.name,
            email: email,
            phone: userData.phone || '',
            location: userData.location || '',
            seller_type: userData.sellerType || 'individual',
            verified: false
          }
        ])
      
      if (profileError) {
        console.error('Error creating profile:', profileError)
      }
    }
    
    return { data, error }
  },

  signIn: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    
    if (!error && data.user) {
      // Obținem profilul utilizatorului
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', data.user.id)
        .single()
      
      if (!profileError && profileData) {
        // Salvăm datele utilizatorului în localStorage pentru acces rapid
        localStorage.setItem('user', JSON.stringify({
          id: data.user.id,
          name: profileData.name,
          email: profileData.email,
          sellerType: profileData.seller_type,
          isLoggedIn: true
        }))
      }
    }
    
    return { data, error }
  },

  signOut: async () => {
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
    let query = supabase
      .from('listings')
      .select('*')
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
  },

  getById: async (id: string) => {
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
  },

  create: async (listing: Partial<Listing>, images: File[]) => {
    // 1. Încărcăm imaginile în storage
    const imageUrls: string[] = []
    
    for (const image of images) {
      const fileExt = image.name.split('.').pop()
      const fileName = `${uuidv4()}.${fileExt}`
      const filePath = `listings/${fileName}`
      
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
        id: uuidv4()
      }])
      .select()
    
    return { data, error }
  },

  update: async (id: string, updates: Partial<Listing>, newImages?: File[]) => {
    // Dacă avem imagini noi, le încărcăm
    if (newImages && newImages.length > 0) {
      const imageUrls: string[] = []
      
      // Obținem anunțul curent pentru a păstra imaginile existente
      const { data: currentListing } = await supabase
        .from('listings')
        .select('images')
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
        const filePath = `listings/${fileName}`
        
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
  },

  delete: async (id: string) => {
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
        const path = imageUrl.split('/').pop()
        if (path) {
          await supabase.storage
            .from('listing-images')
            .remove([`listings/${path}`])
        }
      }
    }
    
    // Ștergem anunțul
    const { error } = await supabase
      .from('listings')
      .delete()
      .eq('id', id)
    
    return { error }
  },
  
  addToFavorites: async (userId: string, listingId: string) => {
    const { data, error } = await supabase
      .from('favorites')
      .insert([{ user_id: userId, listing_id: listingId }])
      .select()
    
    // Incrementăm numărul de favorite pentru anunț
    if (!error) {
      await supabase
        .from('listings')
        .update({ favorites_count: supabase.rpc('increment', { x: 1 }) })
        .eq('id', listingId)
    }
    
    return { data, error }
  },
  
  removeFromFavorites: async (userId: string, listingId: string) => {
    const { error } = await supabase
      .from('favorites')
      .delete()
      .match({ user_id: userId, listing_id: listingId })
    
    // Decrementăm numărul de favorite pentru anunț
    if (!error) {
      await supabase
        .from('listings')
        .update({ favorites_count: supabase.rpc('decrement', { x: 1 }) })
        .eq('id', listingId)
    }
    
    return { error }
  },
  
  getFavorites: async (userId: string) => {
    const { data, error } = await supabase
      .from('favorites')
      .select('listing_id')
      .eq('user_id', userId)
    
    return { data, error }
  }
}

// Funcții pentru profiluri
export const profiles = {
  getById: async (userId: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', userId)
      .single()
    
    return { data, error }
  },
  
  update: async (userId: string, updates: Partial<User>) => {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('user_id', userId)
      .select()
    
    return { data, error }
  },
  
  uploadAvatar: async (userId: string, file: File) => {
    const fileExt = file.name.split('.').pop()
    const fileName = `${uuidv4()}.${fileExt}`
    const filePath = `avatars/${fileName}`
    
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
  }
}

// Funcții pentru mesaje
export const messages = {
  send: async (senderId: string, receiverId: string, listingId: string, content: string, subject?: string) => {
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
  },
  
  getConversations: async (userId: string) => {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .or(`sender_id.eq.${userId},receiver_id.eq.${userId}`)
      .order('created_at', { ascending: false })
    
    return { data, error }
  },
  
  markAsRead: async (messageId: string) => {
    const { data, error } = await supabase
      .from('messages')
      .update({ read: true })
      .eq('id', messageId)
      .select()
    
    return { data, error }
  }
}

// Funcții pentru recenzii
export const reviews = {
  create: async (reviewerId: string, reviewedId: string, listingId: string, rating: number, comment?: string) => {
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
  },
  
  getForUser: async (userId: string) => {
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .eq('reviewed_id', userId)
      .order('created_at', { ascending: false })
    
    return { data, error }
  }
}

// Funcție pentru a verifica dacă utilizatorul este autentificat
export const isAuthenticated = async () => {
  const { data: { user } } = await supabase.auth.getUser()
  return !!user
}

// Funcție pentru a verifica dacă Supabase este configurat corect
export const checkSupabaseConnection = async () => {
  try {
    const { error } = await supabase.from('profiles').select('count', { count: 'exact', head: true })
    return !error
  } catch (e) {
    return false
  }
}