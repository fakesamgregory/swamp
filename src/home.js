/**********
 * Home Scripts:
 * These are run on home page
 *********/
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(SplitText, ScrollTrigger);

/****************
 * Brand Pillars
 * ****************/
const brandPillarsText = gsap.utils.toArray("[data-brand-pillars-text]");
const brandPillarsSplitText = new SplitText(brandPillarsText, {
  type: "words,lines",
  linesClass: "overflow-hidden",
});
gsap.from(
  brandPillarsSplitText.words,
  {
    autoAlpha: 0,
    y: 50,
    stagger: 0.1,
    duration: 1,
    ease: "power2.out",
  },
  "<"
);

/****************
 * Blogs
 ****************/
const blogs = document.querySelector("[data-blogs]");
const blogItems = blogs.querySelectorAll("[data-blog-item]");
gsap.from(blogItems, {
  x: 100,
  autoAlpha: 0,
  stagger: 0.05,
  scrollTrigger: {
    trigger: blogs,
    start: "top bottom-=200",
  },
});
/****************
 * END: Blogs
 ****************/

/****************
 * Intro text
 * ****************/
const introText = gsap.utils.toArray("[data-intro-text]");

introText.forEach((line, index) => {
  gsap.from(line, {
    autoAlpha: 0,
    x: ["-100%", "100%"][index % 2],
    ease: "power4.out",
    scrollTrigger: {
      trigger: introText,
      start: "top bottom-=200",
    },
  });
});
