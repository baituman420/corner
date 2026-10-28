import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ==========================================================================
// 1. DOM ELEMENTS SELECTION
// ==========================================================================
const heroExperience = document.getElementById('heroExperience');
const doorAssembly = document.getElementById('doorAssembly');
const doorPerimeterGlow = document.getElementById('doorPerimeterGlow');
const lightWashLower = document.getElementById('lightWashLower');
const doorInnerReflection = document.getElementById('doorInnerReflection');
const chamberHeatGlow = document.getElementById('chamberHeatGlow');
const scrollCue = document.getElementById('scrollCue');
const digitalTemp = document.getElementById('digitalTemp');

// Pizza Peel and Hero Claim Elements
const pizzaPeelAssembly = document.getElementById('pizzaPeelAssembly');
const peelWarm = document.getElementById('peelWarm');
const peelCrisp = document.getElementById('peelCrisp');
const peelDoorShadow = document.getElementById('peelDoorShadow');
const heroClaimLayer = document.getElementById('heroClaimLayer');
const ovenBrandCenter = document.querySelector('.oven-brand-center');

// Modal Elements
const gastroModal = document.getElementById('gastroModal');
const modalBackdrop = document.getElementById('modalBackdrop');
const modalBody = document.getElementById('modalBody');
const modalCloseBtn = document.getElementById('modalCloseBtn');

const TOTAL_SCROLL = 2800;

// ==========================================================================
// 2. MASTER GSAP SCROLL TIMELINE: DOOR, PIZZA PEEL & CLAIM
// ==========================================================================
function initHeroTimeline() {
  const mm = gsap.matchMedia();

  mm.add({
    isDesktop: "(min-width: 901px)",
    isMobile: "(max-width: 900px)"
  }, (context) => {
    const { isMobile } = context.conditions;

    const peelTargetZ = isMobile ? 80 : 240;
    const peelTargetY = isMobile ? 10 : 35;
    const peelTargetX = isMobile ? 0 : 15;
    const peelTargetScale = isMobile ? 1.08 : 0.98;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: heroExperience,
        start: "top top",
        end: `+=${TOTAL_SCROLL}`,
        scrub: 1.2, // Smooth weighted physical inertia
        pin: heroExperience,
        pinSpacing: true,
        anticipatePin: 1
      }
    });

    // FASE 0: Desvanecimiento de Cues iniciales (0.00 -> 0.08)
    tl.to(scrollCue, {
      opacity: 0,
      y: 15,
      duration: 0.08,
      ease: "power1.out"
    }, 0);

    tl.to(doorPerimeterGlow, {
      opacity: 0,
      duration: 0.06,
      ease: "power1.out"
    }, 0.02);

    // FASE 1: Apertura 3D de Compuerta hacia el espectador (0.06 -> 0.44)
    tl.to(doorAssembly, {
      rotateX: -90,
      duration: 0.38,
      ease: "power2.inOut",
      transformOrigin: "center bottom 0px"
    }, 0.06);

    tl.to(lightWashLower, {
      opacity: 0.95,
      duration: 0.30,
      ease: "power2.out"
    }, 0.15);

    tl.to(doorInnerReflection, {
      opacity: 0.95,
      duration: 0.32,
      ease: "power1.inOut"
    }, 0.18);

    tl.to(chamberHeatGlow, {
      opacity: 1,
      scale: 1.06,
      duration: 0.35,
      ease: "power1.inOut"
    }, 0.15);

    // Revelación de la pizza horneándose en la solera conforme la puerta bascula
    tl.to(pizzaPeelAssembly, {
      opacity: 1,
      duration: 0.10,
      ease: "power1.in"
    }, 0.08);

    // Conmutación de Z-Index en el cruce de la boca:
    // Al avanzar hacia el exterior (t >= 0.44), zIndex=35 (vuela limpiamente sobre compuerta y chasis).
    tl.set(pizzaPeelAssembly, { zIndex: 35 }, 0.44);

    // FASE 2: Extracción y Vuelo 3D de la Pala (0.38 -> 0.90)
    tl.to(pizzaPeelAssembly, {
      translateZ: peelTargetZ,
      y: peelTargetY,
      x: peelTargetX,
      scale: peelTargetScale,
      rotateX: 5.5,
      rotateZ: -1.0,
      duration: 0.52,
      ease: "power2.inOut"
    }, 0.38);

    // Sombra de contacto proyectada en la compuerta interior (0.42 -> 0.78)
    tl.fromTo(peelDoorShadow, 
      { opacity: 0, y: -40, scale: 0.8 }, 
      { opacity: 0.75, y: 35, scale: 1.15, duration: 0.28, ease: "power2.out" }, 
      0.42
    );
    tl.to(peelDoorShadow, {
      opacity: 0.15,
      filter: "blur(22px)",
      duration: 0.18,
      ease: "power1.out"
    }, 0.70);

    // Transición lumínica de radiación térmica a luz gastronómica nítida (0.50 -> 0.76)
    // peelCrisp se superpone sobre peelWarm manteniendo 100% de solidez física sin transparencia
    tl.to(peelCrisp, {
      opacity: 1,
      duration: 0.26,
      ease: "power1.inOut"
    }, 0.50);

    // FASE 3: Presentación Final del Claim Hero (0.78 -> 1.00)
    // Desvanecimiento del logotipo central para ceder el protagonismo al claim
    if (ovenBrandCenter) {
      tl.to(ovenBrandCenter, {
        opacity: 0,
        duration: 0.20,
        ease: "power1.inOut"
      }, 0.78);
    }

    tl.fromTo(heroClaimLayer, 
      {
        opacity: 0,
        y: isMobile ? 12 : 22,
        filter: "blur(8px)",
        scale: 0.95
      }, 
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        scale: 1,
        duration: 0.22,
        ease: "power2.out"
      }, 
      0.78
    );

    return () => {
      tl.kill();
    };
  });
}

// ==========================================================================
// 3. INTERACTIVE MODAL & NAVIGATION
// ==========================================================================
const modalContents = {
  'modal-carta': `
    <h3>La Carta</h3>
    <span class="modal-subtitle">THE CORNER GASTROBAR · AMETZOLA, BILBAO</span>
    <p style="color: #c7cdd6; font-size: 14px; line-height: 1.6; margin-bottom: 20px;">
      Pizzas de autor con fermentación lenta 48h, hamburguesas maduradas y raciones caseras de temporada preparadas en nuestro horno industrial.
    </p>
  `,
  'modal-local': `
    <h3>El Local</h3>
    <span class="modal-subtitle">UN ESPACIO INDUSTRIAL Y CÁLIDO</span>
    <p style="color: #c7cdd6; font-size: 14px; line-height: 1.6; margin-bottom: 20px;">
      Situado en el corazón de Ametzola, Bilbao. El punto de encuentro donde el fuego y el acero se unen a la buena gastronomía sin etiquetas.
    </p>
  `,
  'modal-reservas': `
    <h3>Reservar Mesa</h3>
    <span class="modal-subtitle">THE CORNER GASTROBAR</span>
    <p style="color: #c7cdd6; font-size: 14px; line-height: 1.6; margin-bottom: 20px;">
      Disfruta de la experiencia completa en nuestro local. Reserva online o llámanos directamente.
    </p>
  `,
  'modal-contacto': `
    <h3>Contacto</h3>
    <span class="modal-subtitle">BILBAO (BIZKAIA)</span>
    <p style="color: #c7cdd6; font-size: 14px; line-height: 1.6;">
      Parque de Ametzola, Bilbao.<br>
      Teléfono: +34 944 123 456<br>
      Email: hola@thecornergastrobar.com
    </p>
  `
};

function openModal(modalId) {
  if (modalContents[modalId]) {
    modalBody.innerHTML = modalContents[modalId];
    gastroModal.classList.add('is-active');
    gastroModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal() {
  gastroModal.classList.remove('is-active');
  gastroModal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

document.querySelectorAll('[data-modal]').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const modalId = link.getAttribute('data-modal');
    openModal(modalId);
  });
});

if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && gastroModal.classList.contains('is-active')) {
    closeModal();
  }
});

// Click on scroll cue scrolls down to open the door
if (scrollCue) {
  scrollCue.addEventListener('click', () => {
    window.scrollTo({
      top: 1200,
      behavior: 'smooth'
    });
  });
}

// Micro-flicker on 320°C LED readout
setInterval(() => {
  if (digitalTemp) {
    const isTempJitter = Math.random() < 0.08;
    const tempDigits = digitalTemp.querySelector('.temp-digits');
    if (tempDigits) {
      tempDigits.textContent = isTempJitter ? '321' : '320';
    }
  }
}, 3500);

// ==========================================================================
// 4. INITIALIZE
// ==========================================================================
window.addEventListener('DOMContentLoaded', () => {
  initHeroTimeline();
});
