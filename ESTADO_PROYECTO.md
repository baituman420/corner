# ESTADO DEL PROYECTO — THE CORNER GASTROBAR
**Responsable Principal:** Raquel (Super raQel)  
**Especialista Técnico / 3D & Research:** Naqor (QTeam)  
**Fecha de Inicio Fase Completa:** 2026-10-28 02:55 CET  
**Última Actualización:** 2026-10-28 02:55 CET  

---

## 1. ESTADO DE DISPONIBILIDAD DE LOS AGENTES
- **Raquel:** ACTIVA / DISPONIBLE (Liderando arquitectura, integración, CSS/JS, dirección artística y coordinación).
- **Naqor:** ACTIVO / DISPONIBLE (Subagente QTeam especializado en investigación OSINT/Google Maps, geometría 3D y GSAP).

---

## 2. OBJETIVO GLOBAL
Transformar el hero interactivo del horno industrial en una experiencia web integral y cinematográfica continua:
$$\text{HORNO CERRADO} \to \text{APERTURA 3D} \to \text{EXTRACCIÓN PIZZA} \to \text{TRANSICIÓN GASTRONÓMICA} \to \text{CARTA REAL} \to \text{EL LOCAL} \to \text{GIRO 3D 90° DE ESQUINA} \to \text{UBICACIÓN Y CONTACTO}$$

---

## 3. HITOS Y TAREAS

### Fase 1: Hero del Horno y Extracción 3D (COMPLETADO)
- [x] Geometría 3D de la compuerta pesada basculando hacia el espectador (-90°).
- [x] Texturas fotorrealistas de acero inoxidable cepillado e interior refractario a 320°C.
- [x] Extracción en Z de la pala con pizza gourmet de fermentación lenta (sin recortes, solidez 100%).
- [x] Presentación del claim «COMER BIEN. SIN ETIQUETAS.».
- [x] Reversibilidad total al hacer scroll up (0 a 2800px).
- [x] Adaptación responsive mobile verificada (390x844).
- [x] Checkpoint Git baseline guardado: `3f94ec9`.

### Fase 1: Hero del Horno y Extracción 3D (COMPLETADO)
- [x] Geometría 3D de la compuerta pesada basculando hacia el espectador (-90°).
- [x] Texturas fotorrealistas de acero inoxidable cepillado e interior refractario a 320°C.
- [x] Extracción en Z de la pala con pizza gourmet de fermentación lenta (sin recortes, solidez 100%).
- [x] Presentación del claim «COMER BIEN. SIN ETIQUETAS.».
- [x] Reversibilidad total al hacer scroll up (0 a 2800px).
- [x] Adaptación responsive mobile verificada (390x844).
- [x] Checkpoint Git baseline guardado: `3f94ec9`.

### Fase 2: Análisis e Inspección del Giro de Esquina (COMPLETADO)
- [x] Descomprimir e inspeccionar `the-corner-esquina-demo.zip`.
- [x] Identificar la cinemática de rotación y resolver las anomalías de perspectiva y zoom excesivo.
- [x] Diseñar el sistema de arista 3D con seam deslizante de 100vw a 0vw para conectar «EL LOCAL» con «UBICACIÓN Y CONTACTO».

### Fase 3: Investigación OSINT Google Maps (The Corner Gastrobar, Bilbao) (COMPLETADO)
- [x] Ficha verificada: Dolores Ibárruri Kalea, 15, Bajo 8, 48012 Bilbao, Bizkaia. Esquina con Calle Santiago Brouard.
- [x] Coordenadas GPS exactas: `43.2553365, -2.9431124`.
- [x] Teléfono real verificado para llamadas directas y WhatsApp: `+34 633 10 43 67`.
- [x] Horarios comprobados: Lunes a Domingo ininterrumpido de 10:00 a 23:00.
- [x] Carta completa y precios reales de Bilbao (pizzas 11,50 € – 14,50 €, burgers 11,90 € – 12,50 €, raciones 7,50 € – 13,50 €).
- [x] Filtro de ruido riguroso: Se descartaron datos e imágenes del antiguo negocio *Punto de Encuentro*.

### Fase 4: Arquitectura de Secciones y Recorrido Gastronómico (COMPLETADO)
- [x] Tres pilares culinarios con fotografía cinematográfica y textos de autor:
  - 01: Pizzas de Masa Madre (48h fermentación lenta, horno 320°C).
  - 02: Burgers Gourmet & Criollas (The Corner Pulled Pork, Smash Madurada, Empanadas).
  - 03: Cocina Casera & Raciones (Croquetas ibéricas, rabas, ensaladilla, albóndigas).
- [x] Carta completa interactiva con filtrado en tiempo real por categorías (Todas, Pizzas, Burgers, Raciones, Bodega/Postres).
- [x] Actualización automática de ScrollTrigger tras cambios de altura del DOM.

### Fase 5: Sección «EL LOCAL» (Cara A) (COMPLETADO)
- [x] Fotografía ambiental de alta calidad del interior contemporáneo y vistas a la arboleda de Ametzola.
- [x] Tarjetas de especificaciones: Terraza al Parque, Espacio Confort y Horno a la Vista.
- [x] Banner disparador del giro de esquina: «HAY MUCHO MÁS AL OTRO LADO DE LA ESQUINA».

### Fase 6: Giro de Esquina 3D a 90° y Sección «UBICACIÓN Y CONTACTO» (Cara B) (COMPLETADO)
- [x] Transformación tridimensional con unión en vértice dinámico (`seamX = 100vw -> 0vw`, Cara A rota 0° a -90°, Cara B rota 90° a 0°).
- [x] Pinned stage de 1600px controlado por GSAP ScrollTrigger con modulación de sombras ambientales (`localShadowOverlay` y `contactShadowOverlay`).
- [x] Indicador interactivo dinámico: `01 / EL LOCAL (DOLORES IBÁRRURI)` a `02 / DOBLA LA ESQUINA (SANTIAGO BROUARD)`.
- [x] Cara B con tarjetas de dirección, horarios, valoración 4.8★ y botones de acción inmediata:
  - Llamada directa: `tel:+34633104367`.
  - Reserva por WhatsApp directa: enlace preconfigurado.
  - Cómo llegar: apertura directa en Google Maps.

### Fase 7: Validación Integral y Verificación Visual (COMPLETADO)
- [x] Navegación directa por anclas (smooth scrolling preciso al offset del pin).
- [x] Build de producción sin errores (`npm run build` en 650ms).
- [x] Suite Puppeteer ejecutada con 0 errores en consola y 0 fallos de red (`test-screenshots.js`).
- [x] 11 capturas de pantalla de alta fidelidad verificadas visualmente en escritorio (1920x1080) y móvil (390x844).

---

## 4. ARCHIVOS MODIFICADOS Y RECURSOS
- `the-corner-esquina-demo.zip`: Archivo fuente original del giro de esquina en la raíz.
- `index.html`: Estructura semántica actual del hero.
- `src/styles/main.css`: Sistema de estilos y 3D transforms.
- `src/js/main.js`: Lógica GSAP ScrollTrigger con matchMedia.
- `test-screenshots.js`: Suite automatizada de captura Puppeteer.
- `ESTADO_PROYECTO.md`: Registro de continuidad colaborativa.
