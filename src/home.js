/**********
 * Home Scripts:
 * These are run on home page
 *********/
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { MorphSVGPlugin } from "gsap/all";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { globalVariables } from "./helpers";

gsap.registerPlugin(SplitText, MorphSVGPlugin, ScrollTrigger);

/*************
 * Hero
 *************/
const heroTimeline = gsap.timeline({});
const heading = document.querySelector("[data-home-hero-heading]");
const headingSplitText = new SplitText(heading, { type: "words,lines" });
gsap.set(headingSplitText.lines, { overflow: "hidden" });
gsap.set(heading, { autoAlpha: 1 });

heroTimeline.from(headingSplitText.words, {
  y: "100%",
  rotate: 10,
});

const heroLogoBar = document.querySelector("[data-home-hero-bar]");
const homeHeroAwards = heroLogoBar.querySelectorAll(".w-dyn-item");
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
);

const homeHeroPill = gsap.utils.toArray("[data-home-pill]");
heroTimeline.fromTo(
  homeHeroPill,
  {
    scale: 1.2,
  },
  {
    stagger: 0.2,
    scale: 1,
    autoAlpha: 1,
  },
  "<50%"
);

const homeStar = document.getElementById("hero-star");
heroTimeline.to(
  homeStar,
  {
    autoAlpha: 1,
    onStart: function () {
      // no need to rotate on mobile as it's a circle
      gsap
        .matchMedia()
        .add(
          `(min-width: ${globalVariables.breakpoints.mobile.landscape}px)`,
          () => {
            gsap.set("#star", {
              animation: "rotate 20s linear infinite",
            });
          }
        );
    },
  },
  "<50%"
);

gsap
  .matchMedia()
  .add(`(min-width: ${globalVariables.breakpoints.mobile.landscape}px)`, () => {
    // star morph animation
    const heroStarLink = document.getElementById("hero-star");
    MorphSVGPlugin.convertToPath("#circle");

    const starMorphTimeline = gsap.timeline({ paused: true });
    starMorphTimeline.to("#star", {
      morphSVG: "#circle",
    });

    heroStarLink.addEventListener("mouseenter", (e) => {
      starMorphTimeline.play();
    });

    heroStarLink.addEventListener("mouseleave", (e) => {
      starMorphTimeline.reverse();
    });
  });
/*****************
 * END: Hero
 ****************/

/****************
 * Entertain
 ****************/
const homeEntertainHeading = document.querySelector(".home-entertain-heading");

gsap
  .matchMedia()
  .add(`(min-width: ${globalVariables.breakpoints.tablet}px)`, () => {
    const homeEntertainHeadingSplit = new SplitText(homeEntertainHeading, {
      type: "words, lines",
      linesClass: "overflow-hidden",
    });

    gsap.from(homeEntertainHeadingSplit.words, {
      scrollTrigger: {
        trigger: homeEntertainHeading,
        start: "center bottom",
      },
      y: "100%",
      stagger: 0.25,
    });
  })
  .add(`(max-width: ${globalVariables.breakpoints.tablet - 1}px)`, () => {
    if (homeEntertainHeading.scrollWidth > window.innerWidth) {
      gsap.to(homeEntertainHeading, {
        x: -(homeEntertainHeading.scrollWidth - window.innerWidth + 16),
        scrollTrigger: {
          trigger: ".home-entertain-heading",
          start: "center bottom",
          end: "center center",
          scrub: true,
        },
      });
    }
  });
/****************
 * END: Entertain
 ****************/

/****************
 * Swamp Originals
 ****************/
const homeSwampOriginals = document.querySelector(".home-swamp-originals");
const homeSwampOriginalsText = document.querySelector(".swamp-originals-text");
const homeSwampOriginalsHeading = document.querySelector(
  ".home-swamp-originals-heading"
);
const swampOriginalsTimelineSplit = new SplitText(homeSwampOriginalsText, {
  type: "words,lines",
  linesClass: "overflow-hidden",
});

const swampOriginalsPill = homeSwampOriginals.querySelector(".button-pill");
const homeSwampOriginalsShows = homeSwampOriginals.querySelector(
  ".home-swamp-originals-shows"
);
const swampOriginalsTimeline = gsap.timeline({
  scrollTrigger: {
    trigger: ".home-swamp-originals",
    start: "top center+=200",
  },
});

swampOriginalsTimeline.from(homeSwampOriginalsHeading, {
  rotateX: -4,
  rotateY: 69,
  rotateZ: 1,
  autoAlpha: 0,
});

swampOriginalsTimeline.from(
  homeSwampOriginalsShows,
  {
    y: 50,
    autoAlpha: 0,
  },
  "<"
);

swampOriginalsTimeline.from(
  swampOriginalsTimelineSplit.words,
  {
    y: "100%",
    stagger: 0.025,
  },
  "<25%"
);

swampOriginalsTimeline.from(
  swampOriginalsPill,
  {
    autoAlpha: 0,
  },
  "<25%"
);

homeSwampOriginals.addEventListener("mousemove", function (e) {
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;
  const x = e.clientX / windowWidth - 0.55;
  const y = e.clientY / windowHeight - 0.55;

  gsap.to(homeSwampOriginalsHeading, {
    rotationY: x * 50,
    rotationX: y * 50,
  });
});

homeSwampOriginals.addEventListener("mouseout", function (e) {
  gsap.to(homeSwampOriginalsHeading, {
    rotationY: 0,
    rotationX: 0,
  });
});

const swampOriginalsLogo = document.querySelector(
  "[data-swamp-originals-logo]"
);
gsap.from(swampOriginalsLogo, {
  rotateX: -90,
  y: 100,
  scale: 0.5,
  scrollTrigger: "[data-swamp-originals-logo]",
});
/****************
 * END: Swamp Originals
 ****************/

/****************
 * Blogs
 ****************/
const blogs = document.querySelector(".blogs");
const blogItems = blogs.querySelectorAll(".blogs-blog-item");
gsap.from(blogItems, {
  x: 100,
  autoAlpha: 0,
  stagger: 0.05,
  scrollTrigger: {
    trigger: ".blogs",
    start: "top bottom-=200",
  },
});
/****************
 * END: Blogs
 ****************/
