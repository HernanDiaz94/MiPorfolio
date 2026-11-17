export const profile = {
  full_name: 'Hernan Diaz',
  role: 'Programador · Técnico en Informática',
  bio: 'Programador y Técnico en Informática de Catamarca, Argentina. Me dedico al desarrollo web y a la automatización de procesos con RPA, combinando frontend y backend para construir aplicaciones claras y funcionales.',
  avatar_url: '/avatar.jpg',
  email: 'hernan.diiaz@gmail.com',
  location: 'San Fernando del Valle de Catamarca, Argentina',
  github: 'https://github.com/HernanDiaz94',
  linkedin: 'https://www.linkedin.com/in/hdiaz94/',
}

export const projects = [
  {
    id: 'reservas-canchas',
    nombre: 'Reservas de canchas',
    descripcion:
      'Aplicación web para reservar turnos en canchas: muestra la disponibilidad del día, confirma la reserva y permite consultar los turnos propios ingresando el teléfono.',
    tecnologias: ['JavaScript', 'Supabase', 'API REST', 'Netlify'],
    enlace_github: '',
    enlace_demo: 'https://reservas-canchas.netlify.app/',
  },
  {
    id: 'openworknature',
    nombre: 'Open Work Nature',
    descripcion:
      'Sitio web institucional para Open Work Nature, con secciones de servicios, proyectos y blog, y formulario de contacto con envío de emails.',
    tecnologias: ['HTML', 'CSS', 'JavaScript', 'PHP'],
    enlace_github: 'https://github.com/HernanDiaz94/OpenWorkNature',
    enlace_demo: 'https://hernandiaz94.github.io/OpenWorkNature/',
  },
  {
    id: 'gestion-insumos',
    nombre: 'Sistema de gestión de insumos y oficinas',
    descripcion:
      'Aplicación web con inicio de sesión y ABM de usuarios, oficinas e insumos, además del registro y seguimiento de problemas.',
    tecnologias: ['PHP', 'MySQL', 'JavaScript', 'HTML/CSS'],
    enlace_github: 'https://github.com/HernanDiaz94/TrabajoFinal23',
    enlace_demo: '',
  },
  {
    id: 'portfolio-cv',
    nombre: 'Portfolio y CV web',
    descripcion:
      'Sitio personal desarrollado como proyecto final de Argentina Programa 4.0, con presentación, proyectos y currículum descargable.',
    tecnologias: ['HTML', 'CSS', 'JavaScript'],
    enlace_github:
      'https://github.com/HernanDiaz94/Argentina-programa-pf-HernanDiaz',
    enlace_demo: '',
  },
]

// Cada entrada es una tarjeta de habilidad: el título es el área y
// "detalle" son las etiquetas de tecnologías que se muestran dentro.
export const skills = [
  {
    id: 'skill-1',
    habilidad: 'Desarrollo web',
    nivel: 'Experto',
    detalle: ['HTML', 'CSS', 'JavaScript', 'React', 'PHP', 'MySQL', 'Git', 'Bases de datos'],
  },
  {
    id: 'skill-2',
    habilidad: 'Desarrollo de aplicaciones',
    nivel: 'Intermedio',
    detalle: ['Android Studio', 'Android SDK', 'React Native', 'Bases de datos'],
  },
  {
    id: 'skill-3',
    habilidad: 'Automatización RPA',
    nivel: 'Intermedio',
    detalle: ['UiPath', 'Power Automate', 'n8n'],
  },
  {
    id: 'skill-4',
    habilidad: 'Manejo de herramientas de IA',
    nivel: 'Intermedio',
    detalle: ['Claude', 'OpenCode', 'Ollama', 'Hermes', 'Gemini', 'GPT'],
  },
  {
    id: 'skill-5',
    habilidad: 'Ofimática',
    nivel: 'Intermedio',
    detalle: ['Paquete Office', 'Dactilografía'],
  },
]
