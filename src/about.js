/**********
 * Swamp Page Scripts:
 * These are run on our-services page
 *********/
import { globalVariables } from "./helpers";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(SplitText, ScrollTrigger);

const heroTimeline = gsap.timeline({});
const heroImage = document.querySelector("[data-about-hero-image]");
const heading = document.querySelector("[data-about-hero-heading]");
const text = document.querySelector("[data-about-hero-text]");
const headingSplitText = new SplitText(heading, {
  type: "words,lines",
  linesClass: "overflow-hidden",
});

heroTimeline.from(heroImage, {
  scale: "1.2",
  opacity: 0,
  duration: 1.5,
  ease: "power3.out",
});

heroTimeline.from(
  headingSplitText.words,
  {
    autoAlpha: 0,
    y: 50,
    stagger: 0.1,
    duration: 1,
    ease: "power2.out",
  },
  "<"
);

heroTimeline.from(
  text,
  {
    autoAlpha: 0,
  },
  "<25%"
);
