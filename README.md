# Delimenu × Qitchen: ejemplo de menú con la API de Delimenu

Un menú de sushi hecho con **Next.js** que lee sus datos de la
[API pública de Delimenu](https://delimenu.co/developers). El diseño replica la
plantilla de Framer [Qitchen](https://qitchen-template.framer.website/menu), y el
contenido es el del restaurante [Qitchen en Delimenu](https://delimenu.co/qitchen).

Es el segundo ejemplo. El primero, con otro diseño, es
[delimenu-maison-example](https://github.com/JuandaGarcia/delimenu-maison-example).

## Cómo funciona

Toda la integración está en [`lib/delimenu.ts`](lib/delimenu.ts). Es un único `fetch`:

```ts
const res = await fetch('https://delimenu.co/api/v1/menus/qitchen', {
  next: { revalidate: 300 },
})
const { restaurant, categories } = await res.json()
```

- **Sin API key:** leer el menú publicado es público.
- **Datos de la API:**
  - Las pestañas y las secciones salen de `categories`.
  - Cada fila (foto, nombre, precio y descripción) sale de `products`.
  - La foto grande es `restaurant.banner_url`.
  - "Book a table" abre WhatsApp al número del restaurante.
- **Precios:** vienen en unidades mayores de la moneda del restaurante (`5` = US$5), nunca en centavos.
- **Actualización:** la página se regenera como máximo cada 5 minutos (ISR).
- **Errores:** si la API responde 404 (no existe) o 403 (restaurante sin plan activo), la página muestra "menú no disponible".

## Correrlo

```bash
pnpm install
pnpm dev
```

Abre http://localhost:3000/menu. Para usar otro restaurante, copia `.env.example`
a `.env.local` y cambia `DELIMENU_MENU`.

## Assets

- **Fotos, logo y textura:** vienen de la plantilla Qitchen (Framer), que se usa con licencia.
- **Fuentes:** Forum sale de Google Fonts. Satoshi sale de [Fontshare](https://www.fontshare.com/fonts/satoshi) (ITF Free Font License) y está en `app/fonts`.
