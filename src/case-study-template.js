const videoSlide = document.querySelector("[data-video-slide]");
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
