# w04-criba — Criba: la prueba ES el CV

Crystal Ball Studio · Semana 4 (AI 2041 ch. 3 "Twin Sparrows") · T2 · lente MONEY · Andrés Álvarez Morphy Namnum.

Muestra de trabajo de 40 minutos para auxiliar contable junior (20 CFDIs clasificados por un agente simulado, 4 mal; la candidata los encuentra y le escribe al cliente) + bitácora pública donde los dueños de despacho registran, anónimamente, si preseleccionarían con ella. Criterio de muerte del Blueprint a la vista: **5 de 20**.

- Live URL: https://w04-criba.vercel.app
- Packet (antes del código): [docs/PACKET.md](docs/PACKET.md) · Charter: [docs/CHARTER.md](docs/CHARTER.md) · Decisiones: [docs/DECISIONS.md](docs/DECISIONS.md) · Rúbrica pública: `/rubrica`

Stack: Next.js 15 + Tailwind 4 + Vercel Blob (un JSON inmutable por respuesta) + Vercel. Sin datos personales, sin cuenta, sin cámara. Datos 100% inventados; IA simulada y etiquetada.

```bash
npm install && npm run dev      # BLOB_READ_WRITE_TOKEN en .env.local (vercel env pull); sin él, memoria etiquetada
```
