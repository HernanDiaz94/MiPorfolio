# Portfolio de Hernan Diaz

Portfolio personal de **Hernan Diaz**, Programador y Técnico en Informática
(Catamarca, Argentina). Construido con **Vite + React 19 + Tailwind CSS** y
desplegado en Netlify: https://miporfoliohd.netlify.app/

Los datos (perfil, proyectos y habilidades) están en `src/content.js` o pueden
venir de **Supabase**.

## Requisitos

- Node.js 22 o superior
- npm

## Desarrollo

```bash
npm install
cp .env.example .env   # en Windows: copy .env.example .env
npm run dev
```

El sitio queda disponible en http://localhost:3000.

> Sin variables de entorno el sitio funciona igual, usando el contenido de
> `src/content.js`. Supabase es opcional.

## Scripts

| Script | Descripción |
| --- | --- |
| `npm run dev` | Servidor de desarrollo con HMR |
| `npm run build` | Build de producción en `dist/` |
| `npm run preview` | Sirve el build de producción |
| `npm run lint` | Ejecuta Oxlint |

## Variables de entorno

| Variable | Descripción |
| --- | --- |
| `VITE_SUPABASE_URL` | URL del proyecto Supabase |
| `VITE_SUPABASE_ANON_KEY` | Clave anónima (pública) de Supabase |

Las credenciales se leen en `src/supabase.js`. La clave `anon` es pública por
diseño; la seguridad depende de las políticas RLS de Supabase.

## Estructura

```
index.html              Metadatos, SEO y formulario oculto de Netlify Forms
netlify.toml            Configuración de build, redirects y headers
src/
  main.jsx              Punto de entrada
  App.js                Layout general y animaciones al hacer scroll
  content.js            Contenido de respaldo (editable)
  supabase.js           Cliente de Supabase (opcional)
  index.css             Tailwind + estilos base
  components/
    Header.js           Navegación sticky con menú móvil
    Hero.js             Presentación y llamadas a la acción
    Projects.js         Grilla de proyectos
    Skills.js           Habilidades con barra de nivel
    Contact.js          Datos de contacto y formulario
```

## Personalizar

1. **Sin Supabase:** editá `src/content.js` (perfil, proyectos y habilidades).
2. **Con Supabase:** completá `.env` y cargá los datos en las tablas de abajo.
3. Reemplazá "Tu Nombre", el email y el teléfono de `src/content.js`.
4. Actualizá el `<title>`, la descripción y las etiquetas Open Graph en
   `index.html`, incluida la `canonical` con tu dominio real.
5. Para el formulario de contacto, Netlify Forms lo detecta solo: los envíos
   aparecen en **Site configuration → Forms**. Solo funciona con el sitio
   desplegado en Netlify; en local el envío puede fallar (es lo esperado).

### Esquema de Supabase

```sql
create table public.profiles (
  id uuid primary key default gen_random_uuid(),
  full_name text,
  role text,
  bio text,
  avatar_url text,
  email text,
  phone text,
  location text,
  github text,
  linkedin text
);

create table public.projects (
  id uuid primary key default gen_random_uuid(),
  nombre text not null,
  descripcion text,
  imagen_url text,
  tecnologias text[],
  enlace_github text,
  enlace_demo text,
  created_at timestamptz not null default now()
);

create table public.skills (
  id uuid primary key default gen_random_uuid(),
  habilidad text not null,
  nivel text check (nivel in ('Experto', 'Intermedio', 'Principiante'))
);

alter table public.profiles enable row level security;
alter table public.projects enable row level security;
alter table public.skills enable row level security;

create policy "lectura pública" on public.profiles for select using (true);
create policy "lectura pública" on public.projects for select using (true);
create policy "lectura pública" on public.skills for select using (true);
```

## Deploy en Netlify

### Opción A — desde Git (recomendado)

1. Creá el repositorio y subí el proyecto:
   ```bash
   git init
   git add .
   git commit -m "Portfolio listo para producción"
   git remote add origin <URL_DEL_REPO>
   git push -u origin main
   ```
2. En Netlify: **Add new site → Import an existing project** y elegí el repo.
3. Netlify lee `netlify.toml`: build `npm run build`, publish `dist`.
4. En **Site configuration → Environment variables** agregá
   `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY`.
5. Deploy. Cada push a `main` publica automáticamente.

### Opción B — deploy manual

```bash
npm run build
```

Luego arrastrá la carpeta `dist` en https://app.netlify.com/drop.

### Verificación posterior

- El sitio carga en la raíz y los anchors (#proyectos, #habilidades, #contacto)
  funcionan.
- En **Forms** aparece el formulario `contacto` y los envíos se registran.
- En DevTools → Console no hay errores de Supabase.
