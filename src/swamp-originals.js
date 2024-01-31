/**********
 * Swamp Originals Scripts
 *********/

import { gsap } from "gsap";
import { globalVariables } from "./helpers";

gsap.matchMedia().add(
  {
    isDesktop: `(min-width: ${globalVariables.breakpoints.tablet + 1}px)`,
    isMobile: `(max-width: ${globalVariables.breakpoints.tablet}px)`,
  },
  (context) => {
    let { isDesktop, isMobile, reduceMotion } = context.conditions;

    const caseStudyElement = document.querySelector(".case-study-list");
    const caseStudies = gsap.utils.toArray(".case-study-item");

    caseStudies.forEach((caseStudy, index) => {
      if (!index) {
        // start with first open
        caseStudy.classList.add("open");
        caseStudy.querySelector(".case-study-item-active-content").style.width =
          "100%";
      }
      caseStudy
        .querySelector(".case-study-book-spine")
        .addEventListener("click", (e) => {
          e.preventDefault();

          const isAlreadyOpen = e.currentTarget.parents(".open");

          // prevent animation if first item is open and first item is clicked
          if (caseStudies[0].classList.contains("open") && isAlreadyOpen) {
            return;
          }

          const targetItem = isAlreadyOpen
            ? caseStudies[0]
            : e.currentTarget.parents(".case-study-item");

          const bookTimeline = gsap.timeline({
            defaults: {
              ease: "none",
              duration: isDesktop ? 0.75 : 0.5,
            },
            onStart: function () {
              caseStudyElement.querySelector(".open").classList.remove("open");
              targetItem.classList.add("open");
            },
          });

          bookTimeline.to(
            targetItem.querySelector(".case-study-item-active-content"),
            {
              ...(isDesktop ? { width: "100%" } : { height: "auto" }),
            }
          );

          bookTimeline.to(
            caseStudyElement.querySelector(
              ".open .case-study-item-active-content"
            ),
            {
              ...(isDesktop ? { width: 0 } : { height: 0 }),
            },
            "<"
          );
        });
    });
  }
);
