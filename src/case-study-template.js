import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

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

caseStudyInfoTimeline.set(caseStudyInfoHeader, {
  autoAlpha: 1,
});

caseStudyInfoTimeline.from(caseStudyInfoHeaderSplit.words, {
  autoAlpha: 0,
  y: 50,
  stagger: 0.1,
});

caseStudyInfoTimeline.fromTo(
  caseStudyInfoBrief,
  {
    autoAlpha: 0,
    y: 50,
  },
  {
    autoAlpha: 1,
    y: 0,
  },
  "<25%"
);

caseStudyInfoTimeline.fromTo(
  caseStudyInfoIdea,
  {
    autoAlpha: 0,
    y: 100,
  },
  {
    autoAlpha: 1,
    y: 0,
  },
  "<25%"
);
