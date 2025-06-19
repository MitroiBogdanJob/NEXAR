import { createClient } from '@supabase/supabase-js'

// Aceste valori vor fi setate când te conectezi la Supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key'

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
        data: userData
      }
    })
    return { data, error }
  },

  signIn: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    return { data, error }
  },

  signOut: async () => {
    const { error } = await supabase.auth.signOut()
    return { error }
  },

  getCurrentUser: async () => {
    const { data: { user } } = await supabase.auth.getUser()
    return user
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
      if (filters.category) query = query.eq('category', filters.category)
      if (filters.brand) query = query.eq('brand', filters.brand)
      if (filters.priceMin) query = query.gte('price', filters.priceMin)
      if (filters.priceMax) query = query.lte('price', filters.priceMax)
      if (filters.yearMin) query = query.gte('year', filters.yearMin)
      if (filters.yearMax) query = query.lte('year', filters.yearMax)
      if (filters.location) query = query.eq('location', filters.location)
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
    return { data, error }
  },

  create: async (listing: Partial<Listing>) => {
    const { data, error } = await supabase
      .from('listings')
      .insert([listing])
      .select()
    return { data, error }
  },

  update: async (id: string, updates: Partial<Listing>) => {
    const { data, error } = await supabase
      .from('listings')
      .update(updates)
      .eq('id', id)
      .select()
    return { data, error }
  },

  delete: async (id: string) => {
    const { error } = await supabase
      .from('listings')
      .delete()
      .eq('id', id)
    return { error }
  }
}