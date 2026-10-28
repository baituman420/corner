import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
window.ScrollTrigger = ScrollTrigger;
window.gsap = gsap;

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
// 3. MASTER GSAP SCROLL TIMELINE: EL GIRO DE ESQUINA 3D (90°)
// ==========================================================================
function initCornerTimeline() {
  const cornerStage = document.getElementById('cornerStage');
  const fA = document.querySelector('.face-local');
  const fB = document.querySelector('.face-contact');
  const localShadowOverlay = document.getElementById('localShadowOverlay');
  const contactShadowOverlay = document.getElementById('contactShadowOverlay');
  const cornerStepIndicator = document.getElementById('cornerStepIndicator');

  if (!cornerStage || !fA || !fB) return;

  ScrollTrigger.create({
    trigger: cornerStage,
    start: "top top",
    end: "+=1600",
    pin: cornerStage,
    pinSpacing: true,
    anticipatePin: 1,
    scrub: 1.2,
    onUpdate: (self) => {
      const p = self.progress;

      // Cálculo del vértice de esquina 3D:
      // A y B se unen en la arista seamX (de 100vw a 0vw)
      const seamX = 100 - (p * 100);
      const leftA = seamX - 100;
      const leftB = seamX;

      const rotA = -p * 90;
      const rotB = 90 - (p * 90);

      const opA = p > 0.88 ? Math.max(0, (1 - p) / 0.12) : 1;
      const opB = p < 0.12 ? Math.max(0, p / 0.12) : 1;

      fA.style.left = `${leftA}vw`;
      fB.style.left = `${leftB}vw`;

      fA.style.transform = `perspective(1400px) rotateY(${rotA.toFixed(2)}deg)`;
      fB.style.transform = `perspective(1400px) rotateY(${rotB.toFixed(2)}deg)`;

      fA.style.opacity = opA.toFixed(3);
      fB.style.opacity = opB.toFixed(3);

      // Modulación física de sombras ambientales al doblar la esquina
      if (localShadowOverlay) {
        localShadowOverlay.style.opacity = (p * 0.85).toFixed(3);
      }
      if (contactShadowOverlay) {
        contactShadowOverlay.style.opacity = Math.max(0, (1 - p) * 0.85).toFixed(3);
      }

      // Actualización del indicador espacial de navegación
      if (cornerStepIndicator) {
        if (p < 0.5) {
          cornerStepIndicator.textContent = '01 / EL LOCAL (DOLORES IBÁRRURI)';
          cornerStepIndicator.style.borderColor = 'rgba(255, 170, 51, 0.4)';
        } else {
          cornerStepIndicator.textContent = '02 / DOBLA LA ESQUINA (SANTIAGO BROUARD)';
          cornerStepIndicator.style.borderColor = 'rgba(37, 211, 102, 0.6)';
        }
      }
    }
  });
}

// ==========================================================================
// 4. CARTA INTERACTIVA: FILTRADO POR CATEGORÍAS
// ==========================================================================
function initMenuFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const menuItems = document.querySelectorAll('.menu-item');

  if (!filterButtons.length || !menuItems.length) return;

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');

      const filterCategory = btn.getAttribute('data-filter');

      menuItems.forEach(item => {
        const itemCat = item.getAttribute('data-category');
        if (filterCategory === 'all' || itemCat === filterCategory) {
          item.style.display = 'flex';
          gsap.fromTo(item, 
            { opacity: 0, y: 12, scale: 0.98 }, 
            { opacity: 1, y: 0, scale: 1, duration: 0.35, ease: "power2.out" }
          );
        } else {
          item.style.display = 'none';
        }
      });

      // Actualizar offsets de ScrollTrigger ante el cambio de altura dinámica de la carta
      ScrollTrigger.refresh();
    });
  });
}

// ==========================================================================
// 5. NAVEGACIÓN Y SMOOTH SCROLL POR ANCLAS
// ==========================================================================
function initNavigation() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (!targetId || targetId === '#') return;

      const targetEl = document.querySelector(targetId);
      if (!targetEl) return;

      e.preventDefault();

      // Si el objetivo es reservas o contacto dentro de la Cara B del edificio 3D,
      // desplazamos hacia el final del pin de cornerStage para que la esquina esté completamente rotada (90°)
      if (targetId === '#contacto' || targetId === '#reservas') {
        const cornerStage = document.getElementById('cornerStage');
        if (cornerStage) {
          const cornerST = ScrollTrigger.getAll().find(st => st.trigger === cornerStage);
          const targetY = cornerST ? (cornerST.start + 1550) : (cornerStage.offsetTop + 1550);
          window.scrollTo({
            top: targetY,
            behavior: 'smooth'
          });
          return;
        }
      }

      // Si el objetivo es el local (Cara A), desplazamos al inicio de cornerStage
      if (targetId === '#el-local') {
        const cornerStage = document.getElementById('cornerStage');
        if (cornerStage) {
          const cornerST = ScrollTrigger.getAll().find(st => st.trigger === cornerStage);
          const targetY = cornerST ? cornerST.start : cornerStage.offsetTop;
          window.scrollTo({
            top: targetY,
            behavior: 'smooth'
          });
          return;
        }
      }

      // Scroll estándar suave
      const targetTop = targetEl.getBoundingClientRect().top + window.pageYOffset - 40;
      window.scrollTo({
        top: targetTop,
        behavior: 'smooth'
      });
    });
  });

  // Micro-interacción del scroll cue inicial
  if (scrollCue) {
    scrollCue.addEventListener('click', () => {
      window.scrollTo({
        top: 1400,
        behavior: 'smooth'
      });
    });
  }

  // Micro-flicker analógico del display LED de 320°C
  setInterval(() => {
    if (digitalTemp) {
      const isTempJitter = Math.random() < 0.08;
      const tempDigits = digitalTemp.querySelector('.temp-digits');
      if (tempDigits) {
        tempDigits.textContent = isTempJitter ? '321' : '320';
      }
    }
  }, 3500);
}

// ==========================================================================
// 6. INITIALIZE MASTER CONTROLLER
// ==========================================================================
window.addEventListener('DOMContentLoaded', () => {
  initHeroTimeline();
  initCornerTimeline();
  initMenuFilters();
  initNavigation();
});
