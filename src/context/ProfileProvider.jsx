import { useEffect, useState } from 'react'
import { supabase, isSupabaseConfigured } from '../supabase'
import { profile as fallbackProfile } from '../content'
import { ProfileContext } from './ProfileContext'

// Pide el perfil una sola vez y lo comparte entre Header, Hero y Contact.
// Sin Supabase configurado, deja el perfil de respaldo de src/content.js.
export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(fallbackProfile)

  useEffect(() => {
    if (!isSupabaseConfigured) return

    let cancelled = false

    const fetchProfile = async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .maybeSingle()

      if (!cancelled && !error && data) {
        setProfile({ ...fallbackProfile, ...data })
      }
    }

    fetchProfile()

    return () => {
      cancelled = true
    }
  }, [])

  return (
    <ProfileContext.Provider value={profile}>{children}</ProfileContext.Provider>
  )
}
