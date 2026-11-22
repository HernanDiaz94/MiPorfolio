export const profile = {
  full_name: 'Hernan Diaz',
  role: 'Programador · Técnico en Informática',
  bio: 'Programador y Técnico en Informática de Catamarca, Argentina. Me dedico al desarrollo web y a la automatización de procesos con RPA, combinando frontend y backend para construir aplicaciones claras y funcionales.',
  avatar_url: '/avatar.jpg',
  email: 'hernan.diiaz@gmail.com',
  phone: '+54 9 383 426-3475',
  whatsapp_message:
    'Hola Hernan, te escribo desde tu portfolio. Me gustaría recibir información para desarrollar un sitio web.',
  location: 'San Fernando del Valle de Catamarca, Argentina',
  github: 'https://github.com/HernanDiaz94',
  linkedin: 'https://www.linkedin.com/in/hdiaz94/',
}

export const projects = [
  {
    id: 'atilio-bar',
    nombre: 'Bar Atilio',
    descripcion:
      'Sistema web para un bar: mesas, pedidos, ventas, cobro y caja, con apertura de turno, control de stock y reportes.',
    tecnologias: ['PHP', 'MySQL', 'JavaScript', 'Bootstrap'],
    imagen_url: '/atilio-bar.jpg',
    enlace_github: 'https://github.com/HernanDiaz94/atilio-bar',
    enlace_demo: '/demo-atilio.html',
  },
  {
    id: 'confecat-rrhh',
    nombre: 'Confecat S.A. — Gestión de Personal',
    descripcion:
      'Sistema interno de legajo digital: altas y bajas de empleados, datos laborales, catálogos de sectores y puestos, importación masiva desde Excel e historial de cambios.',
    tecnologias: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Supabase'],
    imagen_url: '/confecat-rrhh.jpg',
    enlace_github: 'https://github.com/HernanDiaz94/confecat-rrhh',
    enlace_demo: '/demo-confecat.html',
  },
  {
    id: 'tienda-nys',
    nombre: 'NyS Indumentaria',
    descripcion:
      'Tienda online mobile-first para una marca urbana: catálogo con filtros y búsqueda, detalle de producto, bolsa sin registro, stock real y panel privado con CRUD completo.',
    tecnologias: ['React', 'Vite', 'Supabase', 'JavaScript'],
    imagen_url: '/tienda-nys.jpg',
    enlace_github: 'https://github.com/HernanDiaz94/TiendaNyS',
    enlace_demo: 'https://tienda-nys.vercel.app/',
  },
  {
    id: 'reservas-canchas',
    nombre: 'Reservas de canchas',
    descripcion:
      'App móvil para reservar turnos en canchas: consultá la disponibilidad del día, reservá tu turno y gestioná tus reservas desde el celular, con panel para complejos y administración.',
    tecnologias: ['React Native', 'Expo', 'Node.js', 'PostgreSQL', 'JWT'],
    imagen_url: '/reservas-canchas.jpg',
    enlace_github: 'https://github.com/HernanDiaz94/reservas-canchas',
    enlace_demo: '/demo-reservas.html',
  },
  {
    id: 'openworknature',
    nombre: 'Open Work Nature',
    descripcion:
      'Sitio web institucional para Open Work Nature, con secciones de servicios, proyectos y blog, y formulario de contacto con envío de emails.',
    tecnologias: ['HTML', 'CSS', 'JavaScript', 'PHP'],
    imagen_url: '/open-work-nature.jpg',
    enlace_github: 'https://github.com/HernanDiaz94/OpenWorkNature',
    enlace_demo: 'https://hernandiaz94.github.io/OpenWorkNature/',
  },
  {
    id: 'gestion-insumos',
    nombre: 'Sistema de gestión de insumos y oficinas',
    descripcion:
      'Aplicación web con inicio de sesión y ABM de usuarios, oficinas e insumos, además del registro y seguimiento de problemas.',
    tecnologias: ['PHP', 'MySQL', 'JavaScript', 'HTML/CSS'],
    imagen_url: '/gestion-insumos.jpg',
    enlace_github: 'https://github.com/HernanDiaz94/TrabajoFinal23',
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
