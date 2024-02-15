/**********
 * Home Scripts:
 * These are run on home page
 *********/
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(SplitText, ScrollTrigger);

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
const introText = document.querySelector("[data-intro-text]");
const introTextSplit = new SplitText(introText, {
  type: "lines",
});

gsap.from(introTextSplit.lines, {
  autoAlpha: 0,
  stagger: 0.1,
  scrollTrigger: {
    trigger: introText,
    start: "top bottom-=200",
  },
});
