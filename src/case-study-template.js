import { globalVariables } from "./helpers";
import { gsap } from "gsap";
import { MorphSVGPlugin } from "gsap/all";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, MorphSVGPlugin, SplitText);

const videoSlide = document.querySelector(
  "[data-video-slide]:not(.w-condition-invisible)"
);
if (videoSlide) {
  const caseStudyImageSlide = document.querySelector(
    ".image-slider .image-slider-item"
  );

  const newVideoSlide = document.createElement("div");
  newVideoSlide.className = caseStudyImageSlide.className;
  newVideoSlide.style.background = "black";
  newVideoSlide.innerHTML = videoSlide.innerHTML;

  caseStudyImageSlide.before(newVideoSlide);
}

const homeStar = document.getElementById("hero-star");
gsap.to(
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
    MorphSVGPlugin.convertToPath("#circle");
    const starMorphTimeline = gsap.timeline({ paused: true });
    starMorphTimeline.to("#star", {
      morphSVG: "#circle",
    });
    homeStar.addEventListener("mouseenter", (e) => {
      console.log("eter");
      starMorphTimeline.play();
    });
    homeStar.addEventListener("mouseleave", (e) => {
      starMorphTimeline.reverse();
    });
  });

const caseStudyInfoHeader = document.querySelector(
  "[data-case-study-info-header]"
);
const caseStudyInfoHeaderSplit = new SplitText(caseStudyInfoHeader, {
  type: "lines,words",
  linesClass: "overflow-hidden",
});

const caseStudyInfoBrief = document.querySelector(
  "[data-case-study-info-brief]"
);
const caseStudyInfoIdea = document.querySelector("[data-case-study-info-idea]");
const caseStudyInfoTimeline = gsap.timeline({
  scrollTrigger: {
    trigger: caseStudyInfoHeader,
    start: "top bottom-=200",
  },
});

caseStudyInfoTimeline.from(caseStudyInfoHeaderSplit.words, {
  autoAlpha: 0,
  y: 50,
  stagger: 0.1,
});

caseStudyInfoTimeline.from(
  caseStudyInfoBrief,
  {
    autoAlpha: 0,
    y: 50,
  },
  "<25%"
);

caseStudyInfoTimeline.from(
  caseStudyInfoIdea,
  {
    autoAlpha: 0,
    y: 100,
  },
  "<25%"
);
