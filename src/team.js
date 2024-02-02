/**********
 * Team Page Scripts:
 * These are run on our-services page
 *********/
import { gsap } from "gsap";

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

teamMembers.forEach((member) => {
  observer.observe(member);
});
