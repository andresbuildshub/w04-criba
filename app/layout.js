import './globals.css'
import Link from 'next/link'

export const metadata = {
  title: 'Criba — la prueba es el CV',
  description: 'Muestra de trabajo para auxiliar contable junior + bitácora de reconocimiento de despachos. Crystal Ball Studio, semana 4.',
}

const NAV = [['/', 'Inicio'], ['/muestra', 'Muestra'], ['/decision', 'Soy despacho'], ['/tablero', 'Tablero'], ['/rubrica', 'Rúbrica']]

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-neutral-950 text-neutral-100 antialiased">
        <header className="border-b border-neutral-800">
          <nav className="mx-auto flex max-w-5xl flex-wrap items-center gap-x-5 gap-y-2 px-4 py-3 text-sm">
            <Link href="/" className="mr-auto font-bold tracking-tight text-amber-300">🧮 Criba</Link>
            {NAV.slice(1).map(([h, t]) => <Link key={h} href={h} className="text-neutral-300 hover:text-white">{t}</Link>)}
          </nav>
        </header>
        <main className="mx-auto max-w-5xl px-4 py-8">{children}</main>
        <footer className="mx-auto max-w-5xl px-4 pb-10 pt-6 text-xs leading-relaxed text-neutral-500">
          Las facturas y el cliente son inventados para el ejercicio. La clasificación del sistema y la revisión del mensaje son <b>simuladas</b> (reglas, no inteligencia artificial) y así se etiquetan.
          Sin cámara, sin cuenta, sin datos personales. Rúbrica pública v0.1. Proyecto de curso de Andrés Álvarez Morphy (Crystal Ball Studio, 2026).
        </footer>
      </body>
    </html>
  )
}
