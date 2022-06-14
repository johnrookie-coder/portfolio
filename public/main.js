'use strict';
const navigation = document.querySelector('.navigation');
const mobileMenu = document.querySelector('.mobile__nav');
const hamburgerMenu = document.querySelector('.hamburger');
const wrapper = document.querySelector('.wrapper');

const btnGetStarted = document.querySelector('.btnGetStarted');
const linksEl = document.querySelector('.navigation__list');
const backToTop = document.querySelector('.container__top ');
const headerSection = document.querySelector('.header');
const skillsSection = document.querySelector('.skills');
const socialContainer = document.querySelector('.contact__social');

const carouselList = document.querySelector('.carousel__list');
const slides = Array.from(carouselList.children);
const spanCounter = document.createElement('span');
const btnNextSlide = document.querySelector('.carousel__btn--right');
const btnPrevSlide = document.querySelector('.carousel__btn--left');
const slideWidth = slides[0].getBoundingClientRect().width; // To make sure that all img has the same width
const carouselNav = document.querySelector('.carousel__nav');
const carouselIndicator = Array.from(
  document.querySelectorAll('.carousel__indicator')
);

let counter = 0;

// Add click event to hamburger menu / mobile version of the website
const navEvent = function () {
  navigation.addEventListener('click', (e) => {
    if (
      e.target.closest('.navigation__icon') ||
      e.target.classList.contains('navigation__icon')
    ) {
      mobileMenu.classList.toggle('is-active');
      hamburgerMenu.classList.toggle('is-active');
    }
  });
};

// Add "click" event to getStartedButton
const btnGetStartedEvent = function () {
  btnGetStarted.addEventListener('click', () => {
    skillsSection.scrollIntoView();
  });
};

// Delegate "click" event to each of the links
const linksEvent = function () {
  linksEl.addEventListener('click', (e) => {
    e.preventDefault();

    if (e.target.classList.contains('navigation__link')) {
      const hash = e.target.getAttribute('href');
      const path = document.querySelector(`${hash}`);

      path.scrollIntoView();
    } else return;
  });
};

const linksElMobile = document.querySelector('.navigation__list--mobile');
linksElMobile.addEventListener('click', (e) => {
  e.preventDefault();

  if (e.target.classList.contains('navigation__link')) {
    const hash = e.target.getAttribute('href');
    const path = document.querySelector(`${hash}`);

    hamburgerMenu.classList.remove('is-active');
    mobileMenu.classList.remove('is-active');

    path.scrollIntoView();
  } else return;
});

/**
 * This function generates the width of each slides, by multiplying the width of the slide[0] based on the index position of the next slide.
 * @param {individualSlide} slide - individual list item / "carousel__slide"
 * @param {indexPosition} idx - index positions of the "carousel__slide"
 */

const slidesWidth = function (slide, idx) {
  slide.style.left = `${slideWidth * idx}px`;
};

/**
 * This function receives three parameter that will be use to identify the movement of the slides.
 * @param {element} list - receives the unordered list / "carousel__list"
 * @param {activeSlide} currentSlide - receives the location of the active slide
 * @param {btn} targetSlide -receives whether it is a previous or next button.
 */

const moveToSlides = function (list, currentSlide, targetSlide) {
  // This will run if the current slide (li element) have nextElement or previousElement.
  if (targetSlide) {
    // Remove the class of "current-slide" to the active slide.
    currentSlide.classList.remove('current-slide');

    // The value of the "translateX" is coming from the left property of the next / previous slide.
    // Slide direction: from left to right (negative value given to "left")
    list.style.transform = `translateX(-${targetSlide.style.left})`;

    // Add the class of "current-slide" to the next slide.
    targetSlide.classList.add('current-slide');
  }
};

/**
 * This function sets the styling and the content of an empty "span" element we created.
 * @param {element} counterEl receives an empty "span" element
 */

const createAndStyleCounter = function (counterEl) {
  // Add the class "carousel__counter"
  counterEl.classList.add('carousel__counter');
  counterEl.textContent = `1/${slides.length}`;
  btnNextSlide.append(counterEl);
};

/**
 * This function add and removes the class of "active" when specific dots have been "click".
 * @param {*} currentDot - receives the location of the "active" dot.
 * @param {*} targetDot - adds a class of active to the "clicked" dot.
 */

const updateDots = function (currentDot, targetDot) {
  if (targetDot) {
    // Remove the class of "active" of the current dot.
    currentDot.classList.remove('active');

    // Add the class of "active" to the targetDot.
    targetDot.classList.add('active');
  }
};

// Button: NextSlide
btnNextSlide.addEventListener('click', () => {
  // Get the location of the "current-slide"
  const currentSlide = carouselList.querySelector('.current-slide');
  // Get the location of the "next sibling / li" after the "current-slide"
  const nextSlide = currentSlide.nextElementSibling;
  // Get the location of the active dot
  const currentDot = carouselNav.querySelector('.active');
  // Get the next dot
  const nextDot = currentDot.nextElementSibling;

  if (counter !== slides.length - 1) {
    counter++;
    spanCounter.textContent = `${counter + 1}/${slides.length}`;
    moveToSlides(carouselList, currentSlide, nextSlide);
    updateDots(currentDot, nextDot);
    btnPrevSlide.classList.remove('carousel__btn--disabled');
  }

  if (counter === slides.length - 1)
    btnNextSlide.classList.add('carousel__btn--disabled');
});

// Button: PrevSlide
btnPrevSlide.addEventListener('click', () => {
  const currentSlide = carouselList.querySelector('.current-slide');
  const prevSlide = currentSlide.previousElementSibling;
  const currentDot = carouselNav.querySelector('.active');
  const prevDot = currentDot.previousElementSibling;

  if (counter >= 1) {
    counter--;
    spanCounter.textContent = `${counter + 1}/${slides.length}`;
    moveToSlides(carouselList, currentSlide, prevSlide);
    updateDots(currentDot, prevDot);
    btnNextSlide.classList.remove('carousel__btn--disabled');
  }

  if (counter === 0) btnPrevSlide.classList.add('carousel__btn--disabled');
});

// Add click event for each dots
carouselIndicator.forEach((indicator, idx) => {
  indicator.addEventListener('click', (e) => {
    // Get the location of the target dot
    const targetDot = e.target.closest('button');

    // Get the location of the "current-slide"
    const currentSlide = carouselList.querySelector('.current-slide');

    // Get the location of the "active dot"
    const currentDot = carouselNav.querySelector('.active');

    // Get the left property of the "click" dot
    const targetSlide = slides[idx];

    // Set the counter to index position of the "click" "carousel__indicator"
    counter = idx;
    moveToSlides(carouselList, currentSlide, targetSlide);
    updateDots(currentDot, targetDot);

    if (counter === 0) {
      btnPrevSlide.classList.add('carousel__btn--disabled');
      btnNextSlide.classList.remove('carousel__btn--disabled');
      spanCounter.textContent = `${counter + 1}/${slides.length}`;
    } else if (counter === slides.length - 1) {
      btnPrevSlide.classList.remove('carousel__btn--disabled');
      btnNextSlide.classList.add('carousel__btn--disabled');
      spanCounter.textContent = `${counter + 1}/${slides.length}`;
    } else {
      btnPrevSlide.classList.remove('carousel__btn--disabled');
      btnNextSlide.classList.remove('carousel__btn--disabled');
      spanCounter.textContent = `${counter + 1}/${slides.length}`;
    }
  });
});

// Back to top
backToTop.addEventListener('click', function () {
  headerSection.scrollIntoView();
});

// Intersection Observer
const callbackFn = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) {
    wrapper.style.position = 'fixed';
    navigation.style.position = 'fixed';

    backToTop.classList.add('active');
  }

  if (entry.isIntersecting) {
    wrapper.style.position = 'absolute';
    navigation.style.position = 'absolute';
    backToTop.classList.remove('active');
  }
};

const options = {
  root: null,
  threshold: 0,
  rootMargin: '-90px',
};

const headerObserver = new IntersectionObserver(callbackFn, options);
headerObserver.observe(headerSection);

// Contact Details "click" event
socialContainer.addEventListener('click', (e) => {
  console.log(e.target);
  if (
    e.target.classList.contains('contact__social') ||
    e.target.classList.contains('contact__item')
  )
    return;

  if (e.target.classList.contains('contact__social')) {
    const url = e.target.children[1].children[0].getAttribute('href');
    window.open(url);
  }

  if (e.target.classList.contains('icon__img')) {
    const designLink = e.target
      .closest('.contact__item')
      .children[1].children[0].getAttribute('href');
    window.open(designLink);
  }
});

// IIFE
(function () {
  AOS.init();

  navEvent();
  linksEvent();
  btnGetStartedEvent();

  slides.forEach(slidesWidth);
  createAndStyleCounter(spanCounter);
})();
