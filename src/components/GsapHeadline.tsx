"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Word-mask reveal — walks the headline's text nodes, wraps each word in a
 * masked span, then animates them up on scroll. Preserves nested colour
 * spans (e.g. text-white/40) because we only touch text nodes.
 */
export default function GsapHeadline({
  children,
  className = "",
  as: Tag = "h2",
  stagger = 0.05,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3";
  stagger?: number;
  delay?: number;
}) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Walk text nodes, replace each with masked-word spans
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    const textNodes: Text[] = [];
    let n: Node | null;
    while ((n = walker.nextNode())) textNodes.push(n as Text);

    const wordEls: HTMLElement[] = [];
    textNodes.forEach((node) => {
      const text = node.nodeValue ?? "";
      if (!text.trim()) return;
      const frag = document.createDocumentFragment();
      text.split(/(\s+)/).forEach((tok) => {
        if (!tok) return;
        if (tok.trim() === "") {
          frag.appendChild(document.createTextNode(tok));
          return;
        }
        const mask = document.createElement("span");
        mask.style.display = "inline-block";
        mask.style.overflow = "hidden";
        mask.style.verticalAlign = "bottom";
        mask.style.lineHeight = "0.9";
        const word = document.createElement("span");
        word.style.display = "inline-block";
        word.style.willChange = "transform";
        word.textContent = tok;
        mask.appendChild(word);
        frag.appendChild(mask);
        wordEls.push(word);
      });
      node.parentNode?.replaceChild(frag, node);
    });

    gsap.set(wordEls, { yPercent: 115 });
    const tw = gsap.to(wordEls, {
      yPercent: 0,
      duration: 1.05,
      ease: "expo.out",
      stagger,
      delay,
      scrollTrigger: { trigger: el, start: "top 85%", once: true },
    });

    return () => {
      tw.scrollTrigger?.kill();
      tw.kill();
    };
  }, [delay, stagger]);

  return (
    <Tag ref={ref as React.Ref<HTMLHeadingElement>} className={className}>
      {children}
    </Tag>
  );
}
