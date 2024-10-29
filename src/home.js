/**********
 * Home Scripts:
 * These are run on home page
 *********/
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(SplitText, ScrollTrigger);

/****************
 * Brand Pillars + Intro Text
 * ****************/
const brandPillarsAndIntroTimeline = gsap.timeline({});
const brandPillarsText = gsap.utils.toArray("[data-brand-pillars-text]");
const brandPillarsSplitText = new SplitText(brandPillarsText, {
  type: "words",
  linesClass: "overflow-hidden",
});
const introText = document.querySelector("[data-intro-text]");


brandPillarsAndIntroTimeline.from(
  brandPillarsSplitText.words,
  {
    autoAlpha: 0,
    y: 50,
    stagger: 0.5,
    duration: 1,
    ease: "power2.out",
    scrollTrigger: {
      trigger: brandPillarsText,
      start: "top bottom-=200",
    },
  },
  "<"
);

brandPillarsAndIntroTimeline.from(
  introText,
  {
    autoAlpha: 0,
  },
  "<25%"
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