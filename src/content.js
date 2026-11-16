// Contenido de respaldo.
// Se usa cuando Supabase no está configurado (o si una consulta falla).
// Edita estos datos si prefieres un portfolio 100% estático.

export const profile = {
  full_name: 'Tu Nombre',
  role: 'Desarrollador Web',
  bio: 'Creo experiencias web increíbles con React, Node.js y tecnologías modernas.',
  avatar_url: '',
  email: 'tu@email.com',
  phone: '+57 300 000 0000',
  location: 'Bogotá, Colombia',
  github: 'https://github.com/tuusuario',
  linkedin: 'https://linkedin.com/in/tuusuario',
}

export const projects = [
  {
    id: 'demo-1',
    nombre: 'Panel de administración',
    descripcion:
      'Aplicación con autenticación, roles y CRUD completo para gestionar clientes y pedidos.',
    tecnologias: ['React', 'Supabase', 'Tailwind'],
    enlace_github: 'https://github.com/tuusuario',
    enlace_demo: '',
  },
  {
    id: 'demo-2',
    nombre: 'API de tareas',
    descripcion:
      'API REST con autenticación por token, validación de datos y documentación interactiva.',
    tecnologias: ['Node.js', 'Express', 'PostgreSQL'],
    enlace_github: 'https://github.com/tuusuario',
    enlace_demo: '',
  },
  {
    id: 'demo-3',
    nombre: 'Landing de producto',
    descripcion:
      'Sitio de una sola página, optimizado para rendimiento y posicionamiento en buscadores.',
    tecnologias: ['Vite', 'React', 'Tailwind'],
    enlace_github: 'https://github.com/tuusuario',
    enlace_demo: '',
  },
]

export const skills = [
  { id: 'skill-1', habilidad: 'JavaScript', nivel: 'Experto' },
  { id: 'skill-2', habilidad: 'React', nivel: 'Experto' },
  { id: 'skill-3', habilidad: 'Node.js', nivel: 'Intermedio' },
  { id: 'skill-4', habilidad: 'CSS / Tailwind', nivel: 'Experto' },
  { id: 'skill-5', habilidad: 'PostgreSQL', nivel: 'Intermedio' },
  { id: 'skill-6', habilidad: 'Git', nivel: 'Experto' },
]
