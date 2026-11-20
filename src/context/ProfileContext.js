import { createContext } from 'react'
import { profile as fallbackProfile } from '../content'

export const ProfileContext = createContext(fallbackProfile)
