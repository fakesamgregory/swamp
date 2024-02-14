/**********
 * The Work Scripts:
 * These are run on the-work page
 *********/
import { gsap } from "gsap";

const maxNumberofVisibleElements = 11;

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
      if (index > maxNumberofVisibleElements - 1) {
        item.classList.add("hide-case-study");
        item.style.opacity = 0;
        item.style.visibility = "hidden";
        item.setAttribute("hidden", true);
      } else {
        if (
          category === "reset" ||
          item.getAttribute("data-easy-filter-item") === category
        ) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
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
  caseStudies.forEach((caseStudy, index) => {
    if (index > maxNumberofVisibleElements - 1) {
      caseStudy.style.opacity = 0;
      caseStudy.style.visibility = "hidden";
      caseStudy.classList.add("hide-case-study");
      caseStudy.setAttribute("hidden", true);
    }
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

  const visibleElements = Array.from(
    document.querySelectorAll("[data-easy-filter-item]")
  ).filter((item) => item.style.display !== "none");

  if (visibleElements.length > maxNumberofVisibleElements - 1) {
    filterItems.forEach((caseStudy, index) => {
      console.log(index, index - 1, maxNumberofVisibleElements - 1);
      if (index > maxNumberofVisibleElements - 1) {
        caseStudy.classList.add("hide-case-study");
        caseStudy.style.opacity = 0;
        caseStudy.style.visibility = "hidden";
        caseStudy.setAttribute("hidden", true);
      } else {
        caseStudy.classList.remove("hide-case-study");
        caseStudy.style.opacity = 1;
        caseStudy.style.visibility = "visible";
        caseStudy.removeAttribute("hidden");
      }
    });
    document.querySelector("[data-view-more-link]").style.display = "block";
  } else {
    document.querySelector("[data-view-more-link]").style.display = "none";
  }
});

document
  .querySelector("[data-view-more-link]")
  .addEventListener("click", (e) => {
    e.preventDefault();

    caseStudies.forEach((caseStudy) => {
      caseStudy.classList.remove("hide-case-study");
      caseStudy.style.opacity = 1;
      caseStudy.style.visibility = "visible";
      caseStudy.removeAttribute("hidden");
    });

    e.currentTarget.style.display = "none";
  });
