import { globalVariables } from "./helpers";
import { gsap } from "gsap";

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
