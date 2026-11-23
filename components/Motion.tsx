"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { useLang } from "@/lib/i18n";

gsap.registerPlugin(ScrollTrigger);

/** Smooth scrolling plus drafted reveals for every section below the hero. */
export default function Motion() {
  const { lang } = useLang();

  // Smooth scroll and anchor links.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => 1 - Math.pow(1 - t, 4),
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.4,
    });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!a) return;
      const id = a.getAttribute("href")!;
      e.preventDefault();
      if (id === "#top") lenis.scrollTo(0);
      else {
        const el = document.querySelector(id) as HTMLElement | null;
        if (el) lenis.scrollTo(el, { offset: id === "#studio" ? 0 : -8 });
      }
    };
    document.addEventListener("click", onClick);

    const onMenu = (e: Event) => ((e as CustomEvent<boolean>).detail ? lenis.stop() : lenis.start());
    window.addEventListener("ga:menu", onMenu);

    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("ga:menu", onMenu);
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  // Reveals. Rebuilt when the language changes because text length changes the layout.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let mmRef: gsap.MatchMedia | undefined;
    const ctx = gsap.context(() => {
      const io = (el: Element, start = "top 86%") => ({ trigger: el, start, once: true });

      gsap.utils.toArray<HTMLElement>(".sheet-label").forEach((el) => {
        const tl = gsap.timeline({ scrollTrigger: io(el, "top 90%") });
        tl.from(el.querySelector(".sheet-label__rule"), { scaleX: 0, transformOrigin: "left center", duration: 1.2, ease: "power3.inOut" })
          .from(el.querySelectorAll(".sheet-label__no, .sheet-label__text, .scale-bar"), { opacity: 0, y: 8, duration: 0.6, stagger: 0.08 }, 0.2);
      });

      gsap.utils.toArray<HTMLElement>("main .section .display").forEach((el) => {
        gsap.fromTo(el.children.length ? el.children : el,
          { yPercent: 105, clipPath: "inset(-15% 0 100% 0)" },
          { yPercent: 0, clipPath: "inset(-15% 0 -25% 0)", duration: 1.25, ease: "power4.out", stagger: 0.1, scrollTrigger: io(el), clearProps: "clipPath" });
      });

      gsap.utils.toArray<HTMLElement>(
        ".lead, .body, .people, .filters, .contact__card, .form, .value__name, .value__text, .project__note, .project__meta, .project__name, .studio__figure figcaption"
      ).forEach((el) => {
        gsap.from(el, { y: 26, opacity: 0, duration: 0.9, ease: "power2.out", scrollTrigger: io(el, "top 92%") });
      });

      gsap.utils.toArray<HTMLElement>(".cropped").forEach((el) => {
        const img = el.querySelector(".photo");
        const tl = gsap.timeline({ scrollTrigger: io(el, "top 88%") });
        tl.fromTo(el, { clipPath: "inset(100% 0% 0% 0% round 50% 50% 0% 0%)" },
          { clipPath: "inset(0% 0% 0% 0% round 0% 0% 0% 0%)", duration: 1.5, ease: "power4.inOut", clearProps: "clipPath" });
        if (img) tl.from(img, { scale: 1.25, duration: 2, ease: "power3.out" }, 0);
        const inner = el.querySelector(".photo img");
        if (inner) gsap.fromTo(inner, { yPercent: -6, scale: 1.12 }, { yPercent: 6, scale: 1.12, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } });
      });

      const mm = gsap.matchMedia();
      mmRef = mm;
      mm.add("(min-width: 1001px) and (min-height: 700px)", () => {
        const sec = document.querySelector("#process") as HTMLElement | null;
        if (!sec) return;
        const steps = gsap.utils.toArray<HTMLElement>(".step");
        const tl = gsap.timeline({ scrollTrigger: { trigger: sec, start: "top top", end: "+=230%", pin: true, scrub: 1, anticipatePin: 1, refreshPriority: 2 } });
        tl.from(sec.querySelectorAll(".dim-line__bar"), { scaleX: 0, ease: "none", duration: 0.6 }, 0);
        steps.forEach((el, i) => {
          const at = 0.2 + i * 0.6;
          const path = el.querySelector(".step__arch path");
          if (path) tl.fromTo(path, { strokeDasharray: 1, strokeDashoffset: 1 }, { strokeDashoffset: 0, ease: "none", duration: 0.7 }, at);
          tl.fromTo(el.querySelector(".step__media .photo"), { clipPath: "inset(100% 0 0 0)" }, { clipPath: "inset(0% 0 0 0)", ease: "power2.inOut", duration: 0.7 }, at + 0.15);
          tl.from(el.querySelectorAll(".step__no, .step__name, .step__text"), { y: 30, opacity: 0, stagger: 0.06, duration: 0.4 }, at + 0.35);
        });
        tl.to({}, { duration: 1.1 }); // hold the finished sheet before releasing
      });
      mm.add("(max-width: 1000px), (max-height: 699px)", () => {
        gsap.utils.toArray<HTMLElement>(".step").forEach((el, i) => {
          const path = el.querySelector(".step__arch path");
          const img = el.querySelector(".step__media .photo");
          const tl = gsap.timeline({ scrollTrigger: io(el, "top 92%"), delay: (i % 2) * 0.12 });
          if (path) tl.fromTo(path, { strokeDasharray: 1, strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.6, ease: "power2.inOut" });
          if (img) tl.from(img, { scale: 1.2, opacity: 0, duration: 1.4, ease: "power3.out" }, 0.3);
          tl.from(el.querySelectorAll(".step__no, .step__name, .step__text"), { y: 20, opacity: 0, stagger: 0.08, duration: 0.8 }, 0.4);
        });
      });

      // studio model drifts slower than the page
      const model = document.querySelector(".studio__figure .photo img");
      if (model) gsap.fromTo(model, { yPercent: -8, scale: 1.16 }, { yPercent: 8, scale: 1.16, ease: "none", scrollTrigger: { trigger: model, start: "top bottom", end: "bottom top", scrub: true } });

      // value numerals rise one after another
      gsap.from(".value__no", { yPercent: 60, opacity: 0, stagger: 0.15, duration: 1, ease: "power3.out", scrollTrigger: io(document.querySelector(".values")!, "top 85%") });

      // project numbers slide in beside their names
      gsap.utils.toArray<HTMLElement>(".project__no").forEach((el) => {
        gsap.from(el, { xPercent: -60, opacity: 0, duration: 1, ease: "power3.out", scrollTrigger: io(el, "top 92%") });
      });

      gsap.utils.toArray<HTMLElement>(".value__bar").forEach((el) => {
        gsap.from(el, { scaleX: 0, transformOrigin: "left center", duration: 1.4, ease: "power3.inOut", scrollTrigger: io(el, "top 90%") });
      });

      gsap.utils.toArray<HTMLElement>(".dim-line").forEach((el) => {
        gsap.from(el.querySelectorAll(".dim-line__bar"), { scaleX: 0, duration: 1.2, ease: "power3.inOut", scrollTrigger: io(el, "top 90%") });
      });

      // footer: the page lifts away, the giant arch draws behind the logo
      const foot = document.querySelector(".footer");
      const contact = document.querySelector("#contact");
      if (foot && contact) {
        const tl = gsap.timeline({ scrollTrigger: { trigger: contact, start: "bottom bottom", end: () => `+=${(foot as HTMLElement).offsetHeight}`, scrub: 0.6 } });
        tl.fromTo(foot.querySelectorAll(".fa--outer, .fa--inner"), { strokeDashoffset: 1 }, { strokeDashoffset: 0, ease: "none", duration: 1 }, 0)
          .fromTo(foot.querySelectorAll(".fa--step"), { strokeDashoffset: 1 }, { strokeDashoffset: 0, ease: "none", duration: 0.5, stagger: 0.12 }, 0.3)
          .fromTo(foot.querySelector(".footer__inner"), { yPercent: 12, opacity: 0.2 }, { yPercent: 0, opacity: 1, ease: "power2.out", duration: 0.8 }, 0.1);
        ScrollTrigger.create({ trigger: contact, start: "bottom 70%", onEnter: () => foot.classList.add("footer--in"), onLeaveBack: () => foot.classList.remove("footer--in") });
      }
    });

    const refresh = () => { ScrollTrigger.sort(); ScrollTrigger.refresh(); };
    window.addEventListener("load", refresh);
    const t = window.setTimeout(refresh, 600);
    return () => {
      window.removeEventListener("load", refresh);
      window.clearTimeout(t);
      mmRef?.revert();
      ctx.revert();
    };
  }, [lang]);

  return null;
}
