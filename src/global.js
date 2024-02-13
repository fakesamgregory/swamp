/**********
 * Global Scripts:
 * These are run on every page
 *********/
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { numberFormat, globalVariables } from "./helpers";

gsap.registerPlugin(ScrollTrigger, SplitText);

gsap.defaults({
  ease: "power2.out",
});

/****************
 * Hero
 ****************/
const heroHeading = document.querySelector(".sub-page-hero-title");

if (heroHeading) {
  const heroTimeline = gsap.timeline({});
  heroTimeline.fromTo(
    heroHeading,
    {
      y: 50,
    },
    {
      y: 0,
      autoAlpha: 1,
    }
  );

  const heroAwards = document.querySelectorAll(".award-bar-inner .w-dyn-item");
  if (heroAwards.length) {
    gsap.to(heroAwards, {
      autoAlpha: 1,
      stagger: 0.025,
    });
  }
}
/****************
 * END: Hero
 ****************/

/****************
 * Services
 ****************/
gsap
  .matchMedia()
  .add(`(min-width: ${globalVariables.breakpoints.mobile.landscape}px)`, () => {
    const services = gsap.utils.toArray("[data-services-perspective]");
    if (services.length) {
      services.forEach((service) => {
        const serviceCol = Array.from(
          service.querySelectorAll("[data-services-perspective-col]")
        );

        if (!serviceCol.length) {
          console.warn('No "[data-services-perspective-col]" found: ', service);
          return;
        }

        serviceCol.forEach((col) => {
          const serviceEl = col.querySelector("[data-services-perspective-el]");

          if (!serviceEl) {
            console.warn('No "[data-services-perspective-el]" found: ', col);
            return;
          }

          const cardWidth = col.offsetWidth;
          const cardHeight = col.offsetHeight;

          const centerX = cardWidth / 2;
          const centerY = cardHeight / 2;

          col.addEventListener("mousemove", function (e) {
            const mouseX = e.offsetX - centerX;
            const mouseY = e.offsetY - centerY;

            const rotationY = (5 * mouseX) / (cardWidth / 2);
            const rotationX = (5 * mouseY) / (cardHeight / 2);

            gsap.to(serviceEl, {
              rotationY,
              rotationX,
              scale: 1.1,
            });
          });

          col.addEventListener("mouseout", function (e) {
            gsap.to(serviceEl, {
              rotationY: 0,
              rotationX: 0,
              scale: 1,
            });
          });
        });
      });
    }
  });
/****************
 * END: Services
 ****************/

/****************
 * Service Blocks
 ****************/
const serviceBlocks = document.getElementById("service-blocks");
if (serviceBlocks) {
  const mouseCursor = document.getElementById("case-study-mouse");
  const serviceBlocksBlocks = serviceBlocks.querySelector(
    ".service-blocks-blocks"
  );
  const serviceBlocksBlock = gsap.utils.toArray(".service-blocks-block");
  const serviceBlocksPatterns = gsap.utils.toArray(".service-blocks-pattern");

  serviceBlocksBlocks.addEventListener("mousemove", function (e) {
    gsap.to(mouseCursor, {
      duration: 0.5,
      x: e.clientX - 75,
      y: e.clientY - 75,
      scale: 1,
      autoAlpha: 1,
      overwrite: true,
    });
  });

  serviceBlocksBlocks.addEventListener("mouseout", function (e) {
    gsap.to(mouseCursor, {
      duration: 0.2,
      x: e.clientX - 75,
      y: e.clientY - 75,
      scale: 0.2,
      autoAlpha: 0,
      delay: 0.3,
    });
  });

  const serviceBlocksTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: serviceBlocks,
      start: "center bottom",
    },
  });

  serviceBlocksTimeline.from(serviceBlocksPatterns[1], {
    xPercent: 100,
  });

  serviceBlocksTimeline.from(
    serviceBlocksBlock,
    {
      xPercent: 100,
      autoAlpha: 0,
      stagger: 0.07,
      ease: "power4.out",
    },
    "<25%"
  );

  serviceBlocksTimeline.from(
    serviceBlocksPatterns[0],
    {
      xPercent: -100,
    },
    "<25%"
  );

  gsap.to(".service-blocks-blocks", {
    x: -(
      (50 + serviceBlocksBlock[0].offsetWidth) * serviceBlocksBlock.length -
      1 -
      window.innerWidth
    ),
    ease: "none",
    scrollTrigger: {
      trigger: serviceBlocks,
      pin: true,
      scrub: 1,
      anticipatePin: 1,
      start: "center center",
      end: () =>
        "+=" + document.querySelector(".service-blocks-blocks").offsetWidth,
    },
  });
}
/****************
 * END: Service Blocks
 ****************/

/****************
 * Number counter
 ****************/
const stats = gsap.utils.toArray(
  document.querySelectorAll("[data-stat-animate]")
);

if (stats.length) {
  stats.forEach((stat) => {
    const number = Array.from(
      stat.querySelectorAll("[data-stat-animate-number]:not(.w-dyn-bind-empty)")
    );

    if (number.length) {
      const statTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: stat,
          start: "top center+=200",
        },
      });

      number.forEach((number) => {
        const endValue = number.innerText.match(/[\d,]+(?:\.\d+)?/g);
        let initialValue = {
          var: Number(stat.getAttribute("data-text")) || 0,
        };

        // get position of decimal point (if exists)
        const decimalPoint =
          endValue[0].indexOf(".") !== -1
            ? endValue[0].split(".")[1].length
            : 0;

        // set the initial value and wrap in span
        number.innerHTML = number.innerHTML.replace(
          endValue[0],
          `<span data-stat-animate-me="">${initialValue.var.toString()}</span>`
        );

        // store the el containing the number
        const animateMe = number.querySelector("[data-stat-animate-me]");

        statTimeline.to(
          initialValue,
          {
            var: Number(endValue[0].replace(",", "")),
            onUpdate: function () {
              const formattedNumber = numberFormat(
                initialValue.var,
                decimalPoint
              );

              animateMe.innerText = formattedNumber;
            },
          },
          "<25%"
        );
      });
    }
  });
}
/****************
 * END: Number counter
 ****************/

/****************
 * All forms prevent if disabled
 ****************/
const forms = Array.from(document.querySelectorAll("form"));
if (forms.length) {
  forms.forEach((form) => {
    // get all inputs
    const inputs = Array.from(form.querySelectorAll(":valid, :invalid"));

    // add disabled class to button
    const submitButton = form.querySelector("[type=submit]");
    submitButton.classList.add("disabled");

    // every time someone types something, check validity
    form.addEventListener("input", () => {
      const validFields = Array.from(form.querySelectorAll(":valid"));

      if (validFields.length === inputs.length) {
        form.querySelector("[type=submit]").classList.remove("disabled");
      } else {
        form.querySelector("[type=submit]").classList.add("disabled");
      }
    });

    // prevent submitting if button is disabled
    form.addEventListener("submit", (event) => {
      if (submitButton.classList.contains("disabled")) {
        event.preventDefault();
      }
    });
  });
}

/****************
 * Split Text Helper
 ****************/
const splitText = gsap.utils.toArray("[data-split-text]");
if (splitText.length) {
  splitText.forEach((el) => {
    const split = new SplitText(el, {
      type: "lines,words",
      linesClass: "overflow-hidden",
    });

    gsap.from(split.words, {
      autoAlpha: 0,
      y: 50,
      stagger: 0.1,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: el,
        start: "top bottom",
      },
    });
  });
}

/*
 * page scroll links
 */
const hashLinks = Array.from(document.querySelectorAll('[href^="#"]'));
if (hashLinks.length) {
  hashLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const target = document.getElementById(e.currentTarget.hash);
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
        });
      }
    });
  });
}

/*
 * show errons
 */
const inputs = Array.from(document.querySelectorAll(".w-input"));
if (inputs.length) {
  inputs.forEach((input) => {
    const p = document.createElement("p");
    p.innerText = input.getAttribute("data-error-message") || "invalid";
    p.style.fontSize = "14px";
    p.style.color = "var(--brand-colours--red)";
    p.style.display = "none";
    input.after(p);

    input.addEventListener("blur", (e) => {
      if (!e.currentTarget.checkValidity()) {
        e.currentTarget.classList.add("invalid");
        e.currentTarget.nextElementSibling.style.display = "";
      } else {
        e.currentTarget.classList.remove("invalid");
        e.currentTarget.nextElementSibling.style.display = "none";
      }
    });
  });
}
/****************
 * END: All forms prevent if disabled
 ****************/

/****************
 * Quotes
 ****************/
const quotesSection = document.querySelector("[data-quotes]");
if (
  quotesSection &&
  !quotesSection.classList.contains("w-condition-invisible")
) {
  // fade in on scroll
  gsap.to(quotesSection, {
    scrollTrigger: {
      trigger: "[data-quotes]",
      start: "center bottom",
    },
    autoAlpha: 1,
  });

  const quotes = gsap.utils.toArray("[data-quote]");

  // if there are more than one quote, create slider
  if (quotes.length > 1) {
    let quoteMaxHeight = 0;
    let activeIndex = 0;
    const quoteTimeInSeconds =
      quotesSection.getAttribute("data-quote-slider-time") || 8;

    const sliderTimeline = gsap.timeline({});

    // calculate the tallest quote
    quotes.forEach((quote, index) => {
      quoteMaxHeight =
        quote.clientHeight > quoteMaxHeight
          ? quote.clientHeight
          : quoteMaxHeight;

      quote.style.position = "absolute";
      quote.style.top = 0;
      quote.style.left = 0;
      quote.style.width = "100%";
      quote.style.height = "100%";

      if (index !== activeIndex) {
        quote.style.opacity = "0";
      } else {
        quote.classList.add("active");
      }
    });

    quotesSection.style.height = `${quoteMaxHeight}px`;

    window.addEventListener("resize", () => {
      let quoteMaxHeight = 0;

      quotes.forEach((quote) => {
        // calculate the tallest quote
        quoteMaxHeight =
          quote.clientHeight > quoteMaxHeight
            ? quote.clientHeight
            : quoteMaxHeight;
      });

      quotesSection.style.height = `${quoteMaxHeight}px`;
    });

    setInterval(() => {
      const currentActiveSlide = quotes[activeIndex];
      const nextActiveindex =
        activeIndex + 1 === quotes.length ? 0 : activeIndex + 1;
      const nextActiveSlide = quotes[nextActiveindex];

      sliderTimeline.to(currentActiveSlide, {
        autoAlpha: 0,
        onComplete: function () {
          currentActiveSlide.classList.remove("active");
        },
      });

      sliderTimeline.to(nextActiveSlide, {
        autoAlpha: 1,
        onComplete: function () {
          nextActiveSlide.classList.add("active");
        },
      });

      activeIndex = nextActiveindex;
    }, quoteTimeInSeconds * 1000);
  }
}
/****************
 * End: Quotes
 ****************/

/****************
 * Sub-Page Points
 * Experience page intro
 ****************/
const introPoints = document.querySelector("[data-experience-page-intro]");

if (introPoints) {
  const introPointsList = introPoints.querySelectorAll("li");
  gsap.from(introPointsList, {
    x: -50,
    autoAlpha: 0,
    stagger: 0.05,
    scrollTrigger: {
      trigger: introPoints,
      start: "center bottom",
    },
  });
}
