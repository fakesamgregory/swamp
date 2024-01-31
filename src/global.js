/**********
 * Global Scripts:
 * These are run on every page
 *********/

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { MorphSVGPlugin } from "gsap/all";
import { numberFormat } from "./helpers";

gsap.registerPlugin(ScrollTrigger, MorphSVGPlugin, SplitText);

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
  gsap.to(heroAwards, {
    autoAlpha: 1,
    stagger: 0.025,
  });
}
/****************
 * END: Hero
 ****************/

/****************
 * Intro
 ****************/
const intro = document.querySelector(".experience-page-intro");
if (intro) {
  const introListElements = intro.querySelectorAll("li");

  gsap.from(introListElements, {
    x: -50,
    opacity: 0,
    stagger: 0.05,
    scrollTrigger: {
      trigger: ".experience-page-info-heading",
      start: "top center",
    },
  });
}
/****************
 * END: Intro
 ****************/

/****************
 * Services
 ****************/
const services = gsap.utils.toArray(".home-services-col");
if (services) {
  services.forEach((service) => {
    const serviceContent = service.querySelector(".home-services-heading");

    service.addEventListener("mousemove", function (e) {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      const x = e.clientX / windowWidth - 0.55;
      const y = e.clientY / windowHeight - 0.55;

      gsap.to(serviceContent, {
        rotationY: x * 50,
        rotationX: y * 50,
        perspective: 1000,
      });
    });

    service.addEventListener("mouseout", function (e) {
      gsap.to(serviceContent, {
        rotationY: 0,
        rotationX: 0,
      });
    });
  });
}
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
      stat.querySelectorAll("[data-stat-animate-number]")
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
const quotesSection = document.querySelector(".quotes-list");
if (
  quotesSection &&
  !quotesSection.classList.contains("w-condition-invisible")
) {
  gsap.from(quotesSection, {
    scrollTrigger: {
      trigger: ".quotes-list",
      start: "center bottom",
    },
    autoAlpha: 0,
    duration: 1,
  });

  const quoteItems = gsap.utils.toArray(".quote");
  let quoteMaxHeight = 0;
  let activeIndex = 0;
  const quoteTimeInSeconds =
    quotesSection.getAttribute("data-quote-slider-time") || 8;

  const sliderTimeline = gsap.timeline({});

  if (quoteItems.length > 1) {
    quoteItems.forEach((quote, index) => {
      // calculate the tallest quote
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

      quoteItems.forEach((quote, index) => {
        // calculate the tallest quote
        quoteMaxHeight =
          quote.clientHeight > quoteMaxHeight
            ? quote.clientHeight
            : quoteMaxHeight;
      });

      quotesSection.style.height = `${quoteMaxHeight}px`;
    });

    setInterval(() => {
      const currentActiveSlide = quoteItems[activeIndex];
      const nextActiveindex =
        activeIndex + 1 === quoteItems.length - 1 ? 0 : activeIndex + 1;
      const nextActiveSlide = quoteItems[nextActiveindex];

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
    }, 8 * 1000);
  }
}
/****************
 * End: Quotes
 ****************/
