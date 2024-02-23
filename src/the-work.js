/**********
 * The Work Scripts:
 * These are run on the-work page
 *********/
import { gsap } from "gsap";

const maxNumberofVisibleElements = 64; //Trialling this as a limit we will never hit. Let's just limit within webflow.

const filterEl = document.getElementById("easy-filter");
const filters = Array.from(filterEl.querySelectorAll("[data-easy-filter]"));
const filterItems = Array.from(
  filterEl.querySelectorAll("[data-easy-filter-item]")
);

const filterEvent = new Event("filter");

const showCaseStudy = (caseStudy) => {
  caseStudy.classList.remove("hide-case-study");
  caseStudy.removeAttribute("hidden");
};

const hideCaseStudy = (caseStudy) => {
  caseStudy.classList.add("hide-case-study");
  caseStudy.setAttribute("hidden", true);
};

filters.forEach((filter) => {
  filter.addEventListener("click", (e) => {
    e.preventDefault();

    if (e.target.classList.contains("filter-active")) {
      return;
    }

    const category = e.currentTarget.hash.substr(1);

    // styling for active filter
    filterEl.querySelector(".filter-active").classList.remove("filter-active");
    e.currentTarget.classList.add("filter-active");

    filterItems.forEach((caseStudy) => {
      if (
        category === "reset" ||
        caseStudy.getAttribute("data-easy-filter-item") ===
          category.replaceAll("%20", " ")
      ) {
        showCaseStudy(caseStudy);
      } else {
        hideCaseStudy(caseStudy);
      }
    });

    filterEl.dispatchEvent(filterEvent);
  });
});

/*
 * view more functionality
 */
const showVisibleCaseStudies = (selector) => {
  const visibleCaseStudies = gsap.utils.toArray(selector);
  gsap.fromTo(
    visibleCaseStudies,
    {
      y: 50,
      autoAlpha: 0,
    },
    {
      y: 0,
      autoAlpha: 1,
      stagger: 0.05,
    }
  );

  if (visibleCaseStudies.length > maxNumberofVisibleElements - 1) {
    visibleCaseStudies.forEach((caseStudy, index) => {
      if (index > maxNumberofVisibleElements - 1) {
        hideCaseStudy(caseStudy);
      }
    });

    // show view more link
    document.querySelector("[data-view-more-link]").style.display = "block";
  } else {
    document.querySelector("[data-view-more-link]").style.display = "none";
  }
};

showVisibleCaseStudies("[data-case-study]");

filterEl.addEventListener("filter", function (e) {
  showVisibleCaseStudies("[data-case-study]:not(.hide-case-study)");
});

const caseStudies = gsap.utils.toArray("[data-case-study]");

document
  .querySelector("[data-view-more-link]")
  .addEventListener("click", (e) => {
    e.preventDefault();

    caseStudies.forEach((caseStudy) => {
      showCaseStudy(caseStudy);
    });

    e.currentTarget.style.display = "none";
  });
