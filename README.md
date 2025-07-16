# Gastos del Hogar

Una aplicación PWA moderna para llevar el control mensual de los gastos del hogar, desarrollada con tecnologías de vanguardia y diseñada para brindar una experiencia rápida, responsiva y confiable.

---

## Características principales

* **React + TypeScript + Vite**: Combina la productividad de Vite con la robustez de React y tipado estático con TypeScript para un desarrollo ultrarrápido y seguro.
* **PWA Ready**: Configuración de `vite-plugin-pwa` para instalación en dispositivos, uso offline y actualizaciones automáticas a través de service worker. ([raw.githubusercontent.com](https://raw.githubusercontent.com/jairrodriguezm/gastos-hogar-realtime/main/vite.config.ts))
* **GraphQL con Apollo Client**: Integración con Hasura GraphQL para operaciones CRUD. Incluye mutación optimizada `ADD_EXPENSE` y consulta eficiente `GET_EXPENSES` para consultar gastos ordenados por fecha. ([raw.githubusercontent.com](https://raw.githubusercontent.com/jairrodriguezm/gastos-hogar-realtime/main/src/graphql/mutations.ts), [raw.githubusercontent.com](https://raw.githubusercontent.com/jairrodriguezm/gastos-hogar-realtime/main/src/graphql/queries.ts))
* **Actualizaciones en tiempo real**: Arquitectura preparada para suscripciones GraphQL que reflejan al instante los cambios en los gastos.
* **Eliminación con long-press**: Hook personalizado `useLongPress` que detecta toques prolongados (>1s) para confirmar y eliminar ítems de la lista de gastos.
* **Optimistic UI**: Actualiza la interfaz inmediatamente al eliminar o agregar gastos, mejorando la sensación de rapidez.
* **SCSS Modular y Glassmorphism**: Estilos mantenibles con SCSS que incluyen efectos de "glassmorphism" y variables para theming.
* **Mobile-first y accesible**: Diseño y componentes optimizados para pantallas pequeñas, con soporte táctil y consideraciones de accesibilidad.
* **Despliegue automático en Vercel**: URL pública con despliegue continuo en Vercel. ([github.com](https://github.com/jairrodriguezm/gastos-hogar-realtime))

---

## Tecnologías y Herramientas

* **Lenguaje**: TypeScript
* **Framework**: React
* **Bundler**: Vite con HMR
* **PWA**: vite-plugin-pwa
* **Estilos**: SCSS
* **GraphQL**: Hasura + Apollo Client
* **Gestión de estado**: Apollo Client cache y mutaciones optimistas
* **Hook personalizado**: `useLongPress` para interacción táctil
* **Despliegue**: Vercel

---

## Instalación y Ejecución

```bash
# Clona el repositorio
git clone https://github.com/jairrodriguezm/gastos-hogar-realtime.git
cd gastos-hogar-realtime

# Instala dependencias
npm install

# Configura variables de entorno
# Crea un archivo .env y define el endpoint de GraphQL:
# VITE_GRAPHQL_API_URL=https://tu-hasura-endpoint

# Inicia en modo desarrollo
npm run dev
```

La aplicación se ejecutará en `http://localhost:5173/` con recarga en caliente.

---

## Despliegue

Para generar la versión de producción:

```bash
npm run build
```

Vercel detecta automáticamente el proyecto y lo despliega en cada push al repositorio.

---

## Contribuciones

¡Las contribuciones son bienvenidas! Por favor abre un *issue* o un *pull request* describiendo tus cambios.

---

## Licencia

MIT © Jair Rodríguez
