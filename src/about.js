/**********
 * Swamp Page Scripts:
 * These are run on our-services page
 *********/
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

// Fades in the targets given
function fadeIn(targets) {
  gsap.fromTo(
    targets,
    {
      autoAlpha: 0,
      y: 100,
    },
    {
      autoAlpha: 1,
      y: 0,
      stagger: 0.02,
    }
  );
}

let observer = new IntersectionObserver(
  function (entries, self) {
    let targets = [];

    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        self.unobserve(entry.target);
        targets.push(entry.target);
      }
    });

    // Call our animation function
    if (targets.length) {
      fadeIn(targets);
    }
  },
  { threshold: 0.5 }
);

const teamMembers = gsap.utils.toArray("[data-team-member]");
if (teamMembers.length) {
  teamMembers.forEach((member) => {
    observer.observe(member);
  });
}
