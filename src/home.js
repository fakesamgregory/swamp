/**********
 * Home Scripts:
 * These are run on home page
 *********/
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(SplitText, ScrollTrigger);

/* This code seems to be doubled up (or at least a very similar looking fn) in global.js so I'm experimenting with removing it from home.js */
/*
const heroLogoBar = document.querySelector("[data-home-hero-bar]");
const homeHeroAwards = heroLogoBar.querySelectorAll(".w-dyn-item");
const heroTimeline = gsap.timeline({});
heroTimeline.to(
  heroLogoBar,
  {
    autoAlpha: 1,
  },
  "<"
);
heroTimeline.to(
  homeHeroAwards,
  {
    autoAlpha: 1,
    stagger: 0.025,
  },
  "<50%"
);*/
/*****************
 * END: Hero
 ****************/

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
