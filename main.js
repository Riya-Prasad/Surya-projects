gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smooth: true,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Custom Cursor
var cursor = $(".cursor"),
  follower = $(".cursor-follower");

var posX = 0,
  posY = 0,
  mouseX = 0,
  mouseY = 0;

TweenMax.to({}, 0.016, {
  repeat: -1,
  onRepeat: function () {
    posX += (mouseX - posX) / 9;
    posY += (mouseY - posY) / 9;

    TweenMax.set(follower, {
      css: {
        left: posX - 20,
        top: posY - 20,
      },
    });

    TweenMax.set(cursor, {
      css: {
        left: mouseX,
        top: mouseY,
      },
    });
  },
});

$(document).on("mousemove", function (e) {
  mouseX = e.pageX;
  mouseY = e.pageY;
});

$(".project").on("mouseenter", function () {
  $(".cursor").addClass("click-text");
});
$(".project").on("mouseleave", function () {
  $(".cursor").removeClass("click-text");
});

// parallax images

var image = document.getElementsByClassName("parallax-img");
new simpleParallax(image, {
  delay: 1,
  scale: 1.3,
  transition: "cubic-bezier(0,0,0,1)",
});

// HERO
const hero = document.querySelector(".hero-section");
const images = [
  'url("assets/hero-bg1.jpg")',
  'url("assets/hero-bg2.jpg")',
  'url("assets/hero-bg3.jpg")',
];
let index = 0;

function nextBg() {
  index = (index + 1) % images.length;
  hero.style.backgroundImage = images[index];
}

hero.style.backgroundImage = images[0];
setInterval(nextBg, 3000);

// Services animation
gsap.utils.toArray(".service-row").forEach((row, index) => {
  gsap.fromTo(
    row,
    {
      opacity: 0,
      y: 120,
      skewY: 6,
      zIndex: 10 - index,
    },
    {
      opacity: 1,
      y: 0,
      skewY: 0,
      zIndex: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: row,
        start: "top 85%",
        toggleActions: "play none none reset",
      },
    }
  );
});


// EXPERTISE section scroll animation
const expertiseSlides = gsap.utils.toArray(".expertise-slide");

// Set initial state
gsap.set(expertiseSlides, { opacity: 0, y: 60 });

// Timeline for animating slides inside pinned section
const expertiseTL = gsap.timeline({
  scrollTrigger: {
    trigger: ".expertise-sticky-section",
    start: "top top",
    end: () => `+=${window.innerHeight * expertiseSlides.length}`,
    scrub: true,
    pin: true,
    anticipatePin: 1,
  },
});

// Animate each slide in and out
expertiseSlides.forEach((slide, i) => {
  expertiseTL.to(slide, { opacity: 1, y: 0, duration: 1, ease: "power2.out" });
  expertiseTL.to(
    slide,
    { opacity: 0, y: -40, duration: 1, ease: "power2.inOut" },
    "+=0.5"
  );
});

// Keep the last slide visible before unpinning
expertiseTL.to(expertiseSlides[expertiseSlides.length - 1], {
  opacity: 1,
  y: 0,
  duration: 0.5,
});

// VISION

// ScrollTrigger.create({
//   trigger: ".vision-section .grid",
//   start: "top top",
//   end: () => `+=${document.querySelector(".numbers").scrollHeight}`,
//   pin: ".vision-text",
//   scrub: true,
//   anticipatePin: 1,
// });

// Animate each .number as it scrolls into view
gsap.utils.toArray(".number").forEach((el) => {
  gsap.from(el, {
    opacity: 0,
    y: 60,
    duration: 1,
    ease: "power2.out",
    scrollTrigger: {
      trigger: el,
      start: "top 85%",
      toggleActions: "play none none reset",
    },
  });
});

const medias = document.querySelectorAll(".scrolly-images img");
const sectionHeight = window.innerHeight * 4;

ScrollTrigger.create({
  trigger: ".team-sec",
  start: "top top",
  end: `+=${sectionHeight}`,
  pin: ".scrolly-container",
  scrub: true,
});

// Spread images across the screen in different directions
medias.forEach((img, i) => {
  const screenWidth = window.innerWidth;
  const baseY = window.innerHeight;

  // Different entry directions and landing spots
  const directions = [
    {
      fromX: -screenWidth,
      toX: screenWidth * 0.15,
      fromY: baseY + 200,
      toY: 100,
    },
    {
      fromX: screenWidth,
      toX: screenWidth * 0.55,
      fromY: baseY + 300,
      toY: 300,
    },
    {
      fromX: -screenWidth,
      toX: screenWidth * 0.25,
      fromY: baseY + 500,
      toY: 500,
    },
    {
      fromX: screenWidth,
      toX: screenWidth * 0.6,
      fromY: baseY + 700,
      toY: 700,
    },
  ];

  const dir = directions[i % directions.length];

  gsap.set(img, {
    x: dir.fromX,
    y: dir.fromY,
    opacity: 0,
    scale: 0.6,
    position: "absolute",
  });

  gsap.to(img, {
    x: dir.toX,
    y: dir.toY,
    opacity: 1,
    scale: 1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".team-sec",
      start: `top+=${i * 300} top`,
      end: `top+=${(i + 1) * 300} top`,
      scrub: true,
    },
  });

  gsap.to(img, {
    x: dir.toX + (i % 2 === 0 ? 300 : -300), // shift sideways
    y: dir.toY - 800,
    opacity: 0,
    scale: 0.8,
    ease: "power3.inOut",
    scrollTrigger: {
      trigger: ".team-sec",
      start: `top+=${(i + 1) * 300} top`,
      end: `top+=${(i + 2) * 300} top`,
      scrub: true,
    },
  });
});

// COLOR
// const colorSlides = gsap.utils.toArray(".color-slide");
// const colorWrapper = document.querySelector(".color-scroll-wrapper");
// const colorImg = document.getElementById("colorSlideImg");

// gsap.set(colorSlides, { opacity: 0, y: 50 });

// const colorTL = gsap.timeline({
//   scrollTrigger: {
//     trigger: "#colorScroll",
//     start: "top top",
//     end: () => `+=${window.innerHeight * colorSlides.length}`,
//     scrub: true,
//     pin: true,
//   },
// });

// colorSlides.forEach((slide, i) => {
//   const bgColor = slide.dataset.color;
//   const imgSrc = slide.dataset.img;

//   // Change background color
//   colorTL.to(
//     colorWrapper,
//     {
//       backgroundColor: bgColor,
//       duration: 1,
//     },
//     "+=0.2"
//   );

//   // Animate in the text
//   colorTL.to(
//     slide,
//     {
//       opacity: 1,
//       y: 0,
//       duration: 1,
//       ease: "power2.out",
//     },
//     "<"
//   );

//   // Animate in the image (fade in from bottom)
//   colorTL.fromTo(
//     colorImg,
//     { opacity: 0, y: 50 },
//     {
//       opacity: 1,
//       y: 0,
//       duration: 1,
//       ease: "power2.out",
//       onStart: () => {
//         colorImg.src = imgSrc;
//       },
//     },
//     "<"
//   );

//   // Animate out (only if NOT the last slide)
//   if (i !== colorSlides.length - 1) {
//     // Fade out text
//     colorTL.to(
//       slide,
//       {
//         opacity: 0,
//         y: -40,
//         duration: 1,
//         ease: "power2.in",
//       },
//       "+=1"
//     );

//     // Fade out image
//     colorTL.to(
//       colorImg,
//       {
//         opacity: 0,
//         y: -40,
//         duration: 1,
//         ease: "power2.in",
//       },
//       "<"
//     );
//   }
// });

// gsap.utils.toArray(".color-slide").forEach((slide) => {
//   const bgColor = slide.dataset.color;
//   const imgSrc = slide.dataset.img;

//   ScrollTrigger.create({
//     trigger: slide,
//     start: "top center",
//     end: "bottom center",
//     scrub: true,
//     onEnter: () => {
//       gsap.to(".color-scroll-wrapper", {
//         backgroundColor: bgColor,
//         duration: 0.5,
//       });
//       gsap.to("#colorSlideImg", {
//         opacity: 0,
//         y: 50,
//         duration: 0.3,
//         onComplete: () => {
//           document.getElementById("colorSlideImg").src = imgSrc;
//           gsap.to("#colorSlideImg", { opacity: 1, y: 0, duration: 0.3 });
//         },
//       });
//     },
//     onEnterBack: () => {
//       gsap.to(".color-scroll-wrapper", {
//         backgroundColor: bgColor,
//         duration: 0.5,
//       });
//       gsap.to("#colorSlideImg", {
//         opacity: 0,
//         y: 50,
//         duration: 0.3,
//         onComplete: () => {
//           document.getElementById("colorSlideImg").src = imgSrc;
//           gsap.to("#colorSlideImg", { opacity: 1, y: 0, duration: 0.3 });
//         },
//       });
//     },
//   });
// });

// colorTL.to(colorSlides[colorSlides.length - 1], {
//   opacity: 1,
//   y: 0,
//   duration: 1,
// });

// COLOR SCROLL SECTION ANIMATION
const colorSlides = gsap.utils.toArray(".color-slide");
const colorWrapper = document.querySelector(".color-scroll-wrapper");
const colorImg = document.getElementById("colorSlideImg");

// Initial state
gsap.set(colorSlides, { opacity: 0, y: 50 });

// Pin and scroll timeline
const colorTL = gsap.timeline({
  scrollTrigger: {
    trigger: "#colorScroll",
    start: "top top",
    end: `+=${window.innerHeight * colorSlides.length}`,
    scrub: true,
    pin: true,
    anticipatePin: 1,
  },
});

colorSlides.forEach((slide, i) => {
  const bgColor = slide.dataset.color;
  const imgSrc = slide.dataset.img;

  // Change background color
  colorTL.to(
    colorWrapper,
    { backgroundColor: bgColor, duration: 0.5 },
    "+=0.2"
  );

  // Slide text in
  colorTL.to(
    slide,
    {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.out",
    },
    "<"
  );

  // Slide image in
  colorTL.fromTo(
    colorImg,
    { opacity: 0, y: 50 },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out",
      onStart: () => {
        colorImg.src = imgSrc;
      },
    },
    "<"
  );

  // Slide + image out if not last
  if (i !== colorSlides.length - 1) {
    colorTL.to(
      slide,
      {
        opacity: 0,
        y: -40,
        duration: 0.8,
        ease: "power2.in",
      },
      "+=1"
    );

    colorTL.to(
      colorImg,
      {
        opacity: 0,
        y: -40,
        duration: 0.8,
        ease: "power2.in",
      },
      "<"
    );
  }
});

// Ensure last slide is fully visible before unpinning
colorTL.to(colorSlides[colorSlides.length - 1], {
  opacity: 1,
  y: 0,
  duration: 0.5,
});

// Reveal Text Animation
window.addEventListener("load", function () {
  let revealText = document.querySelectorAll(".reveal-text");
  let results = Splitting({ target: revealText, by: "lines" });

  results.forEach((splitResult) => {
    const wrappedLines = splitResult.lines
      .map(
        (wordsArr) => `
        <span class="line"><div class="words">
          ${wordsArr
            .map(
              (word) => `${word.outerHTML}<span class="whitespace"> 
         </span>`
            )
            .join("")}
        </div></span>`
      )
      .join("");
    splitResult.el.innerHTML = wrappedLines;
  });

  let revealLines = revealText.forEach((element) => {
    const lines = element.querySelectorAll(".line .words");

    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        toggleActions: "restart none none reset",
        start: "top 90%",
      },
    });
    tl.set(revealText, { autoAlpha: 1 });
    tl.from(lines, 1, {
      yPercent: 200,
      ease: Power3.easeOut,
      stagger: 0.25,
      delay: 0.2,
    });
  });
});

jQuery(document).ready(function () {
  let splitLines = jQuery("[data-line]");
  splitLines.each(function (i, j) {
    let x = new SplitText(j, {
      type: j.getAttribute("data-line"),
      linesClass: "line",
      wordsClass: "word",
      charsClass: "char",
    });
    let delay = j.getAttribute("data-delay");

    x.chars.forEach((ele, index) => {
      if (delay) {
        gsap.to(ele, { "--delay": index + parseInt(delay) + "s" });
      } else {
        gsap.to(ele, { "--delay": index + "s" });
      }
    });
  });
  let splitLines2 = jQuery("[data-line-no-animation]");
  splitLines2.each(function (i, j) {
    new SplitText(j, {
      type: j.getAttribute("data-line-no-animation"),
      linesClass: "line",
      wordsClass: "word",
      charsClass: "char",
    });
  });

  let splitLines3 = jQuery("[data-line-within-line]");
  splitLines3.each(function (i, j) {
    let x = new SplitText(j, { type: "lines", linesClass: "line-inner" });
    new SplitText(jQuery(j).find(".line-inner"), {
      type: "lines",
      linesClass: "line-mask",
    });
    let delay = j.getAttribute("data-delay");

    x.lines.forEach((ele, index) => {
      if (delay) {
        let delaytamp = index + parseInt(delay);
        gsap.to(ele, { "--delay": delaytamp + "s" });
      } else {
        gsap.to(ele, { "--delay": index + "s" });
      }
    });
  });
});

jQuery(window).on("load", function () {
  document.body.classList.add("loaded");
});
