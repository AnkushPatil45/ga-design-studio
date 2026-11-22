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
    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
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
    const ctx = gsap.context(() => {
      const io = (el: Element, start = "top 86%") => ({ trigger: el, start, once: true });

      gsap.utils.toArray<HTMLElement>(".sheet-label").forEach((el) => {
        const tl = gsap.timeline({ scrollTrigger: io(el, "top 90%") });
        tl.from(el.querySelector(".sheet-label__rule"), { scaleX: 0, transformOrigin: "left center", duration: 1.2, ease: "power3.inOut" })
          .from(el.querySelectorAll(".sheet-label__no, .sheet-label__text, .scale-bar"), { opacity: 0, y: 8, duration: 0.6, stagger: 0.08 }, 0.2);
      });

      gsap.utils.toArray<HTMLElement>("main .section .display").forEach((el) => {
        gsap.from(el.children.length ? el.children : el, { yPercent: 40, opacity: 0, duration: 1.1, ease: "power3.out", stagger: 0.12, scrollTrigger: io(el) });
      });

      gsap.utils.toArray<HTMLElement>(
        ".lead, .body, .people, .filters, .city-list li, .contact__card, .form, .value, .step__no, .step__name, .step__text, .project__body, .studio__figure figcaption"
      ).forEach((el) => {
        gsap.from(el, { y: 26, opacity: 0, duration: 0.9, ease: "power2.out", scrollTrigger: io(el, "top 92%") });
      });

      gsap.utils.toArray<HTMLElement>(".cropped").forEach((el) => {
        const img = el.querySelector("img");
        const tl = gsap.timeline({ scrollTrigger: io(el, "top 88%") });
        tl.fromTo(el, { clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)", duration: 1.3, ease: "power4.inOut", clearProps: "clipPath" });
        if (img) tl.from(img, { scale: 1.18, duration: 1.8, ease: "power3.out" }, 0);
        tl.from(el.querySelectorAll(".crop"), { opacity: 0, scale: 0.4, duration: 0.5, stagger: 0.05 }, 0.9);
      });

      gsap.utils.toArray<HTMLElement>(".step").forEach((el, i) => {
        const path = el.querySelector(".step__arch path");
        const img = el.querySelector(".step__media img");
        const tl = gsap.timeline({ scrollTrigger: io(el, "top 88%"), delay: (i % 4) * 0.12 });
        if (path) tl.fromTo(path, { strokeDasharray: 1, strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.6, ease: "power2.inOut" });
        if (img) tl.from(img, { scale: 1.2, opacity: 0, duration: 1.4, ease: "power3.out" }, 0.3);
      });

      gsap.utils.toArray<HTMLElement>(".value__bar").forEach((el) => {
        gsap.from(el, { scaleX: 0, transformOrigin: "left center", duration: 1.4, ease: "power3.inOut", scrollTrigger: io(el, "top 90%") });
      });

      gsap.utils.toArray<HTMLElement>(".dim-line").forEach((el) => {
        gsap.from(el.querySelectorAll(".dim-line__bar"), { scaleX: 0, duration: 1.2, ease: "power3.inOut", scrollTrigger: io(el, "top 90%") });
      });

      const map = document.querySelector(".map");
      if (map) {
        const tl = gsap.timeline({ scrollTrigger: io(map, "top 80%") });
        tl.from(map.querySelectorAll(".map__graticule, .map__tick, .map__frame"), { opacity: 0, duration: 0.8, stagger: 0.02 })
          .fromTo(map.querySelector(".map__coast"), { strokeDasharray: 1, strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.6, ease: "power2.inOut" }, 0.2)
          .from(map.querySelectorAll(".map__city"), { scale: 0, opacity: 0, transformOrigin: "center", duration: 0.6, ease: "back.out(2)", stagger: 0.15 }, 0.8)
          .fromTo(map.querySelectorAll(".map__route"), { strokeDasharray: "1 0", strokeDashoffset: 1 }, {
            strokeDashoffset: 0, duration: 1.2, ease: "power2.inOut", stagger: 0.2,
            onComplete() { gsap.set(map.querySelectorAll(".map__route"), { clearProps: "strokeDasharray,strokeDashoffset" }); },
          }, 1.2);
      }

      gsap.utils.toArray<HTMLElement>(".footer__steps span").forEach((el, i) => {
        gsap.from(el, { scaleX: 0, duration: 1.2, delay: i * 0.12, ease: "power3.inOut", scrollTrigger: io(el, "top 98%") });
      });
    });

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    const t = window.setTimeout(refresh, 600);
    return () => {
      window.removeEventListener("load", refresh);
      window.clearTimeout(t);
      ctx.revert();
    };
  }, [lang]);

  return null;
}
