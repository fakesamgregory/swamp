/**********
 * The Work Scripts:
 * These are run on the-work page
 *********/
import { gsap } from "gsap";

const filterEl = document.getElementById("easy-filter");
const filters = Array.from(filterEl.querySelectorAll("[data-easy-filter]"));

const filterItems = Array.from(
  filterEl.querySelectorAll("[data-easy-filter-item]")
);

const filterEvent = new Event("filter");

filters.forEach((filter) => {
  filter.addEventListener("click", (e) => {
    e.preventDefault();
    const category = e.currentTarget.hash.substr(1);

    filterEl.querySelector(".filter-active").classList.remove("filter-active");
    e.currentTarget.classList.add("filter-active");

    filterItems.forEach((item, index) => {
      if (index > 10) {
        item.classList.add("hide-case-study");
        item.style.opacity = 0;
        item.style.visibility = "hidden";
      } else {
        if (category === "reset") {
          item.style.display = "block";
        } else if (item.getAttribute("data-easy-filter-item") !== category) {
          item.style.display = "none";
        } else {
          item.style.display = "block";
        }
      }
    });

    filterEl.dispatchEvent(filterEvent);
  });
});

/*
 * view more functionality
 */
const caseStudies = gsap.utils.toArray("[data-case-study]");

if (caseStudies.length > 11) {
  caseStudies.forEach((caseStudy) => {
    caseStudy.style.opacity = 0;
    caseStudy.style.visibility = "hidden";
    caseStudy.classList.add("hide-case-study");
  });

  // show view more link
  document.querySelector("[data-view-more-link]").style.display = "block";
}

const caseStudiesTimeline = gsap.timeline({});
caseStudiesTimeline.fromTo(
  caseStudies.filter(
    (caseStudy) => !caseStudy.classList.contains("hide-case-study")
  ),
  {
    y: 50,
  },
  {
    y: 0,
    autoAlpha: 1,
    stagger: 0.05,
  }
);

filterEl.addEventListener("filter", function (e) {
  caseStudiesTimeline.restart();
});

document
  .querySelector("[data-view-more-link]")
  .addEventListener("click", (e) => {
    e.preventDefault();

    caseStudies.forEach((caseStudy) => {
      caseStudy.classList.remove("hide-case-study");
      filterEl.dispatchEvent(filterEvent);
    });
  });
