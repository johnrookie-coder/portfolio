// Practice version
"use strict";

const carouselList = document.querySelector(".carousel__list");
const slides = Array.from(carouselList.children);
const spanCounter = document.createElement("span");
const btnNextSlide = document.querySelector(".carousel__btn--right");
const btnPrevSlide = document.querySelector(".carousel__btn--left");
const slideWidth = slides[0].getBoundingClientRect().width; // To make sure that all img has the same width
const carouselNav = document.querySelector(".carousel__nav");
const carouselIndicator = Array.from(
  document.querySelectorAll(".carousel__indicator")
);
console.log(carouselIndicator);

let counter = 0;

spanCounter.classList.add("carousel__counter");
spanCounter.textContent = `${counter + 1} / ${slides.length}`;
btnNextSlide.appendChild(spanCounter);

/**
 * This function generates "left" property for each individual slides based on the slideWidth.
 * @param {array} slides - receives an array of "carousel__slide"
 */
const setSlidesPosition = function (slides) {
  // Based on the logic in the CSS, the last "carousel__slide" is the visible part (stacked on top of each other)
  // We generate the "left" property for each iteration which results to "slide[0] left is set to 0px" which begins our starting point since the carousel__container has an "overflow: hidden;"
  slides.forEach((slide, idx) => {
    slide.style.left = `${slideWidth * idx}px`;
  });
};

/**
 *
 * @param {ul} list - receives the "carousel__list element"
 * @param {activeSlide} currentSlide - receives the list item on which the "current-slide" is placed.
 * @param {element} targetSlide - receives the "nextElement or previousElementSibling"
 */
const moveToSlides = function (list, currentSlide, targetSlide) {
  // If the "currentSlide" has an previousElementSibling or nextElementSibling
  if (targetSlide) {
    // Removes the "current-slide" on the active slide.
    currentSlide.classList.remove("current-slide");

    // Moves to slides
    // nextSlide.style.left = we are getting the "left property of the nextElementSibling" of the active slide and use it as a value of the "transform:translateX()"
    // Todo: explain negative value in translateX
    list.style.transform = `translateX(-${targetSlide.style.left})`;

    // Add the "current-slide" class to the  targetSlide (next or prev sibling)
    targetSlide.classList.add("current-slide");
  }
};

const updateDots = function (currentDot, targetDot) {
  carouselIndicator[currentDot].classList.remove("active");
  targetDot.classList.add("active");
};

// Button: Next
btnNextSlide.addEventListener("click", () => {
  // From the carouselList, select the element with a class of "current-slide"
  const currentSlide = carouselList.querySelector(".current-slide");
  const nextSlide = currentSlide.nextElementSibling;

  // Moves to slides
  if (counter !== slides.length - 1) {
    counter++;
    moveToSlides(carouselList, currentSlide, nextSlide);
    spanCounter.textContent = `${counter + 1} / ${slides.length}`;
    btnPrevSlide.classList.remove("carousel__btn--disabled");
  }

  if (counter === slides.length - 1)
    btnNextSlide.classList.add("carousel__btn--disabled");
});

// Button: Previous
btnPrevSlide.addEventListener("click", () => {
  // From the carouselList, select the element with a class of "current-slide"
  const currentSlide = carouselList.querySelector(".current-slide");
  const prevSlide = currentSlide.previousElementSibling;

  if (counter >= 1) {
    counter--;
    moveToSlides(carouselList, currentSlide, prevSlide);
    spanCounter.textContent = `${counter + 1} / ${slides.length}`;
    btnNextSlide.classList.remove("carousel__btn--disabled");
  }

  if (counter === 0) btnPrevSlide.classList.add("carousel__btn--disabled");
});

carouselIndicator.forEach((indicator, idx) => {
  indicator.addEventListener("click", (e) => {
    const targetDot = e.target.closest("button");
    const currentDot = carouselIndicator.findIndex((nav) =>
      nav.classList.contains("active")
    );
    const currentSlide = carouselList.querySelector(".current-slide");
    const targetSlide = slides[idx];

    moveToSlides(carouselList, currentSlide, targetSlide);
    updateDots(currentDot, targetDot);

    carouselIndicator[currentDot].classList.remove("active");
    targetDot.classList.add("active");
  });
});
// const reloadBreakpoints = function () {
//   const width = window.screen.width;

//   // if (width > 992 && !window.location.hash) {
//   //   // console.log("less");
//   //   window.location = window.location + "#loaded";
//   //   window.location.reload();
//   // }

//   if (width < 992 && !window.location.hash) {
//     slides.forEach((slide, idx) => {
//       slide.style.left = `0px`;
//     });

//     window.location = window.location + "#loaded";
//     window.location.reload();
//   }
// };

// reloadBreakpoints();
// Animate on scroll
AOS.init();
setSlidesPosition(slides);
