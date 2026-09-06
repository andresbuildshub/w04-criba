import { RUBRICA_VERSION } from '../../lib/muestra'

export default function Rubrica() {
  return (
    <article className="prose-invert max-w-3xl space-y-8">
      <header className="space-y-2">
        <p className="text-sm uppercase tracking-widest text-amber-300">Pública y versionada · {RUBRICA_VERSION}</p>
        <h1 className="text-3xl font-bold">Rúbrica de la muestra</h1>
        <p className="text-neutral-300">Condición 3 del Blueprint: puntuación determinista donde sea posible, rúbrica pública, nadie paga por agregar, quitar o ponderar criterios. Cualquier cambio es una versión nueva, publicada aquí.</p>
      </header>

      <section><h2 className="text-xl font-semibold">La tarea</h2>
        <p className="mt-2 text-neutral-300">20 CFDIs de un mes de un cliente ficticio, ya clasificados por un agente simulado (deducible / categoría). Exactamente 4 clasificaciones están mal. La persona marca cuáles y redacta el mensaje al cliente explicando la corrección y pidiendo la acción.</p></section>

      <section><h2 className="text-xl font-semibold">Los 4 tipos de error (se publican los tipos, no los folios)</h2>
        <ol className="mt-2 list-decimal space-y-1 pl-5 text-neutral-300">
          <li>Gasto pagado en efectivo que no puede deducirse así (combustible; o montos mayores a $2,000).</li>
          <li>Consumo en restaurante clasificado 100% deducible (solo procede el 8.5%).</li>
          <li>Inversión (activo fijo) registrada como gasto del periodo.</li>
          <li>CFDI emitido a un RFC que no es el del cliente.</li>
        </ol>
        <p className="mt-2 text-sm text-neutral-400">Se publican porque la rúbrica debe ser pública (Condición 3). Saber los tipos no resuelve la muestra: hay que encontrar cuáles de los 20 folios los tienen y explicarlo. En v0.2 los folios rotan entre varios juegos de facturas.</p></section>

      <section><h2 className="text-xl font-semibold">Puntuación de la detección (determinista)</h2>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-neutral-300">
          <li><b>Aciertos</b>: folios marcados que sí estaban mal (0–4). <b>Falsos positivos</b>: folios marcados que estaban bien.</li>
          <li><b>Aprobado en esta muestra</b> si aciertos ≥ 3 y falsos positivos ≤ 1. Es un umbral sobre la tarea, no una medida de la persona.</li>
        </ul></section>

      <section><h2 className="text-xl font-semibold">Revisión del mensaje al cliente <span className="ml-2 rounded bg-neutral-800 px-2 py-0.5 text-xs font-normal text-amber-200">SIMULADA</span></h2>
        <p className="mt-2 text-neutral-300">Hoy son reglas de texto, no una IA: longitud 40–220 palabras; para cada error encontrado, que el mensaje lo nombre con el término correcto; que pida una acción concreta; que no culpe al cliente. Devuelve una lista de verificación sí/no, nunca un puntaje. Cuando exista una revisión con modelo de lenguaje real, será una versión nueva y se dirá cómo se validó.</p></section>

      <section><h2 className="text-xl font-semibold">Lo que la constancia afirma y lo que no</h2>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-neutral-300">
          <li>Afirma: fecha, versión, tarea, aciertos, falsos positivos, verificaciones del mensaje, asistencia declarada, condiciones (remota, sin supervisión).</li>
          <li>No afirma: que la persona esté certificada, que sea apta, que haya trabajado sin ayuda, ni predice su desempeño. No existe puntaje de potencial, aptitud ni "empleabilidad", ni ranking.</li>
          <li>La constancia es de la persona: no se guarda en el servidor; ella decide a quién la manda. La ausencia de constancia nunca es evidencia negativa.</li>
          <li>Vigencia informativa de 12 meses: las inferencias caducan.</li>
        </ul></section>

      <section><h2 className="text-xl font-semibold">Condiciones de aplicación</h2>
        <p className="mt-2 text-neutral-300">En español, desde cualquier teléfono, sin cuenta, sin cámara ni detección de trampa por IA. Se pide una declaración de asistencia (ninguna / consulté fuentes / usé IA) que se imprime en la constancia y no se castiga. Una opción de aplicación supervisada no invasiva (presencial en el despacho) es trabajo futuro.</p></section>

      <section><h2 className="text-xl font-semibold">Validez, honestamente</h2>
        <p className="mt-2 text-neutral-300">Esta rúbrica no ha sido validada contra desempeño real en despachos. Hasta que exista ese estudio, la constancia describe una tarea, no predice un empleo. El primer estudio propuesto: 20 auxiliares en activo hacen la muestra y sus dueños califican su desempeño a ciegas.</p></section>

      <section><h2 className="text-xl font-semibold">Historial</h2>
        <ul className="mt-2 list-disc pl-5 text-neutral-300"><li>{RUBRICA_VERSION}: primera versión. 20 CFDIs, 4 errores, regla 3/1, revisión de mensaje por reglas.</li></ul></section>
    </article>
  )
}
