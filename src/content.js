// Contenido del portfolio.
// Los proyectos y habilidades se tomaron de repositorios reales.
// Niveles de habilidad: Experto / Intermedio / Principiante.

export const profile = {
  full_name: 'Hernan Diaz',
  role: 'Programador · Técnico en Informática',
  bio: 'Programador y Técnico en Informática de Catamarca, Argentina. Me dedico al desarrollo web, combinando frontend y backend para construir aplicaciones claras y funcionales.',
  avatar_url: '',
  email: 'hernan.diiaz@gmail.com',
  location: 'San Fernando del Valle de Catamarca, Argentina',
  github: 'https://github.com/HernanDiaz94',
  linkedin: 'https://www.linkedin.com/in/hdiaz94/',
}

export const projects = [
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

export const skills = [
  { id: 'skill-1', habilidad: 'HTML y CSS', nivel: 'Experto' },
  { id: 'skill-2', habilidad: 'JavaScript', nivel: 'Intermedio' },
  { id: 'skill-3', habilidad: 'PHP', nivel: 'Intermedio' },
  { id: 'skill-4', habilidad: 'MySQL', nivel: 'Intermedio' },
  { id: 'skill-5', habilidad: 'React', nivel: 'Intermedio' },
  { id: 'skill-6', habilidad: 'Git', nivel: 'Intermedio' },
]
