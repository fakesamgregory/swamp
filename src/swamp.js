/**********
 * Swamp Page Scripts:
 * These are run on our-services page
 *********/
import { globalVariables } from "./helpers";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(SplitText, ScrollTrigger);

const ourServicesIntroText = document.querySelector(".our-services-intro-text");
const ourServicesIntroTextSplit = new SplitText(ourServicesIntroText, {
  type: "lines, words",
  linesClass: "overflow-hidden",
});
gsap.set(ourServicesIntroText, { autoAlpha: 1 });
gsap.from(ourServicesIntroTextSplit.words, {
  y: "100%",
  stagger: 0.025,
  scrollTrigger: {
    trigger: ".our-services-intro-text",
    start: "bottom bottom",
  },
});

gsap
  .matchMedia()
  .add(`(min-width: ${globalVariables.breakpoints.tablet}px)`, () => {
    const ourServicesServices = gsap.utils.toArray(".about-services-service");

    gsap.fromTo(
      ourServicesServices,
      {
        rotateY: -90,
        x: 100,
        autoAlpha: 0,
      },
      {
        x: 0,
        rotateY: 0,
        autoAlpha: 1,
        stagger: 0.075,
        scrollTrigger: {
          trigger: ".our-services-section",
          start: "center bottom",
        },
        onComplete: () => {
          // reset origin because it currently opens like a book
          gsap.set(ourServicesServices, { transformOrigin: "center center" });

          ourServicesServices.forEach((service) => {
            const cardWidth = service.offsetWidth;
            const cardHeight = service.offsetHeight;

            const centerX = cardWidth / 2;
            const centerY = cardHeight / 2;

            service.addEventListener("mousemove", (e) => {
              console.log(e);
              const mouseX = e.offsetX - centerX;
              const mouseY = e.offsetY - centerY;

              const rotationY = (25 * mouseX) / (cardWidth / 2);
              const rotationX = (25 * mouseY) / (cardHeight / 2);

              gsap.to(service, {
                rotationY,
                rotationX,
                zIndex: 2,
              });
            });

            service.addEventListener("mouseout", () => {
              gsap.to(service, {
                rotationY: 0,
                rotationX: 0,
                zIndex: 1,
              });
            });
          });
        },
      }
    );

    gsap.from(".our-services-section-heading", {
      y: "100vh",
      scrollTrigger: {
        trigger: ".our-services-section",
        scrub: true,
        start: "top bottom",
        end: "center center",
      },
    });
  });

const servicesGallery = gsap.utils.selector("[data-services-gallery]");
const galleryImages = servicesGallery("img");
const viewMoreLink = servicesGallery("[data-services-gallery-view-more]")[0];
const maxImages = 8;

if (galleryImages.length > maxImages) {
  galleryImages.forEach((image, index) => {
    if (index > maxImages - 1) {
      image.style.visibility = "hidden";
      image.style.opacity = 0;
      image.style.display = "none";
      image.classList.add("hidden-image");
    }
  });

  viewMoreLink.style.display = "block";

  viewMoreLink.querySelector("a").addEventListener("click", () => {
    const hiddenImages = servicesGallery(".hidden-image");

    gsap.fromTo(
      hiddenImages,
      {
        y: 50,
        onComplete: function () {
          viewMoreLink.style.display = "none";
        },
      },
      {
        y: 0,
        autoAlpha: 1,
        display: "block",
        stagger: 0.05,
      }
    );
  });
}

const ourServicesGallery = gsap.utils.toArray(
  ".our-services-gallery-image:not(.hidden-image)"
);
gsap.from(ourServicesGallery, {
  y: 50,
  autoAlpha: 0,
  stagger: 0.05,
  scrollTrigger: {
    trigger: ".our-services-gallery",
    start: "top bottom-=25%",
  },
});
