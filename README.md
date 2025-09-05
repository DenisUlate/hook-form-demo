# Welcome Wizard - React Hook Form Practice Project

Un proyecto moderno de formulario multi-paso construido con **React Hook Form** para practicar la gestión de formularios complejos en React/Next.js.

## 🎯 Descripción del Proyecto

**Welcome Wizard** es una aplicación de onboarding interactiva que guía a los usuarios a través de un proceso de registro de 4 pasos:

1. **Información Personal** - Datos básicos del usuario
2. **Preferencias** - Configuración personalizada de la experiencia
3. **Configuración de Perfil** - Setup completo del perfil con avatar
4. **Revisión** - Vista final para revisar y confirmar todos los datos

## ✨ Características Principales

- ✅ **Formulario Multi-Paso** con navegación fluida
- ✅ **Validación en Tiempo Real** usando Zod schemas
- ✅ **Persistencia de Datos** entre pasos
- ✅ **Upload de Archivos** con preview de imagen
- ✅ **UI Moderna** con componentes reutilizables
- ✅ **Responsive Design** para todos los dispositivos
- ✅ **Estados de Loading** y feedback visual
- ✅ **Edición desde Review** antes del envío final

## 🛠️ Stack Tecnológico

| Tecnología          | Propósito                               |
| ------------------- | --------------------------------------- |
| **Next.js 14**      | Framework de React con App Router       |
| **React Hook Form** | Gestión de formularios performante      |
| **Zod**             | Validación de esquemas TypeScript-first |
| **Tailwind CSS**    | Framework de estilos utility-first      |
| **shadcn/ui**       | Componentes UI modernos y accesibles    |
| **Lucide React**    | Iconografía consistente y moderna       |
| **TypeScript**      | Tipado estático para mejor DX           |

## 🚀 Instalación y Setup

### Prerequisitos

- Node.js 18+
- npm, yarn, pnpm o bun

### Pasos de Instalación

1. **Clonar el repositorio**

```bash
git clone <repository-url>
cd hook-form-demo
```

2. **Instalar dependencias**

```bash
npm install
# o
yarn install
# o
pnpm install
```

3. **Instalar dependencias específicas del proyecto**

```bash
npm install react-hook-form @hookform/resolvers zod
```

4. **Ejecutar en desarrollo**

```bash
npm run dev
```

5. **Abrir en el navegador**
   - Navega a [http://localhost:3000](http://localhost:3000)

## 📁 Estructura del Proyecto

```
src/
├── app/
│   ├── globals.css          # Estilos globales con Tailwind
│   ├── layout.tsx           # Layout principal de la app
│   └── page.tsx             # Página principal
├── components/
│   ├── ui/                  # Componentes base de shadcn/ui
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   └── ...
│   ├── forms/               # Formularios específicos
│   │   ├── PersonalInfoForm.tsx
│   │   ├── PreferencesForm.tsx
│   │   ├── ProfileSetupForm.tsx
│   │   └── ReviewForm.tsx
│   ├── ProgressIndicator.tsx # Indicador de progreso
│   ├── StepNavigation.tsx   # Navegación entre pasos
│   └── welcome-wizard.tsx   # Componente principal
└── lib/
    └── validation.ts        # Esquemas de validación Zod
```

## 🎨 Proceso de Desarrollo

### Fase 1: Diseño y Estructura (UI First)

1. **Setup del proyecto** con Next.js y dependencias
2. **Diseño del layout principal** con componentes base
3. **Creación del sistema de navegación** entre pasos
4. **Implementación del indicador de progreso** visual

### Fase 2: Formularios Individuales

1. **Esquemas de validación** con Zod para cada paso
2. **Formulario de Información Personal** con validación básica
3. **Formulario de Preferencias** con checkboxes, radio buttons y selects
4. **Formulario de Profile Setup** con file upload y textarea

### Fase 3: Integración y Review

1. **Gestión de estado global** para persistir datos
2. **Formulario de Review** con vista organizada de todos los datos
3. **Navegación inteligente** y edición desde review
4. **Estado final de confirmación** post-envío

## 🧪 Características de React Hook Form Practicadas

- **useForm Hook** - Configuración y gestión básica
- **register()** - Registro de inputs tradicionales
- **Controller** - Componentes controlados (selects, checkboxes)
- **handleSubmit()** - Manejo de envío de formularios
- **formState** - Estados de validación y errores
- **watch()** - Observación de valores en tiempo real
- **setValue()** - Actualización programática de valores
- **defaultValues** - Valores iniciales y persistencia
- **mode: "onChange"** - Validación en tiempo real
- **Zod Resolver** - Integración con validación de esquemas

## 🎯 Conceptos Aprendidos

### React Hook Form

- Gestión performante de formularios sin re-renders innecesarios
- Validación declarativa con esquemas
- Manejo de diferentes tipos de inputs
- Persistencia de datos entre componentes

### UI/UX Patterns

- Multi-step form navigation
- Progress indication
- Error states y feedback visual
- Responsive form layouts
- File upload con preview

### TypeScript Integration

- Type safety con formularios
- Inferencia de tipos desde esquemas Zod
- Props typing para componentes reutilizables

## 🚀 Próximos Pasos (Mejoras Posibles)

- [ ] **Persistencia en localStorage** para recuperar datos
- [ ] **Integración con API** para envío real de datos
- [ ] **Animaciones** entre transiciones de pasos
- [ ] **Testing** unitario e integración
- [ ] **Internacionalización** (i18n) multi-idioma
- [ ] **Modo oscuro** toggle
- [ ] **Validación asíncrona** (verificar email disponible)

## 📚 Recursos de Aprendizaje

- [React Hook Form Documentation](https://react-hook-form.com/)
- [Zod Documentation](https://zod.dev/)
- [shadcn/ui Components](https://ui.shadcn.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [Next.js App Router](https://nextjs.org/docs/app)

## 👨‍💻 Desarrollo

Este proyecto fue desarrollado siguiendo una metodología **design-first**, construyendo primero la interfaz y componentes, luego implementando la funcionalidad paso a paso.

**Tiempo de desarrollo:** ~2 horas  
**Nivel:** Intermedio  
**Propósito:** Práctica de React Hook Form y patrones de formularios complejos

---

¿Necesitas ayuda o tienes preguntas sobre el proyecto? ¡No dudes en preguntar!
