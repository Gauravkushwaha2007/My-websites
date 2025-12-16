// Menu Icon Toggle
const menuIcon = document.querySelector("#menu-icon")
const navbar = document.querySelector(".navbar")

menuIcon.onclick = () => {
  menuIcon.classList.toggle("bx-x")
  navbar.classList.toggle("active")
}

// Scroll Sections Active Link
const sections = document.querySelectorAll("section")
const navLinks = document.querySelectorAll("header nav a")

window.onscroll = () => {
  sections.forEach((sec) => {
    const top = window.scrollY
    const offset = sec.offsetTop - 150
    const height = sec.offsetHeight
    const id = sec.getAttribute("id")

    if (top >= offset && top < offset + height) {
      navLinks.forEach((links) => {
        links.classList.remove("active")
        document.querySelector("header nav a[href*=" + id + "]").classList.add("active")
      })
    }
  })

  // Sticky Navbar
  const header = document.querySelector(".header")
  header.classList.toggle("sticky", window.scrollY > 100)

  // Remove Menu Icon on Scroll
  menuIcon.classList.remove("bx-x")
  navbar.classList.remove("active")
}

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()

    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }

    // Close mobile menu after clicking
    menuIcon.classList.remove("bx-x")
    navbar.classList.remove("active")
  })
})

// Typing Animation
const typedTextSpan = document.querySelector(".multiple-text")
const textArray = ["Frontend Developer", "Web Designer", "UI/UX Enthusiast", "Problem Solver"]
const typingDelay = 100
const erasingDelay = 50
const newTextDelay = 2000
let textArrayIndex = 0
let charIndex = 0

function type() {
  if (charIndex < textArray[textArrayIndex].length) {
    typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex)
    charIndex++
    setTimeout(type, typingDelay)
  } else {
    setTimeout(erase, newTextDelay)
  }
}

function erase() {
  if (charIndex > 0) {
    typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1)
    charIndex--
    setTimeout(erase, erasingDelay)
  } else {
    textArrayIndex++
    if (textArrayIndex >= textArray.length) textArrayIndex = 0
    setTimeout(type, typingDelay + 1100)
  }
}

document.addEventListener("DOMContentLoaded", () => {
  if (textArray.length) setTimeout(type, newTextDelay + 250)
})

// Skill Bars Animation
function animateSkillBars() {
  const skillBars = document.querySelectorAll(".skills-content .progress .bar span")

  skillBars.forEach((bar) => {
    const barPosition = bar.getBoundingClientRect().top
    const screenPosition = window.innerHeight

    if (barPosition < screenPosition) {
      bar.style.width = bar.style.width
    }
  })
}

window.addEventListener("scroll", animateSkillBars)
window.addEventListener("load", animateSkillBars)

// Scroll Reveal Animation
function reveal() {
  const reveals = document.querySelectorAll(".education-content, .skills-content")

  reveals.forEach((element) => {
    const windowHeight = window.innerHeight
    const elementTop = element.getBoundingClientRect().top
    const elementVisible = 150

    if (elementTop < windowHeight - elementVisible) {
      element.style.opacity = "1"
      element.style.transform = "translateY(0)"
    }
  })
}

// Set initial state for reveal elements
document.addEventListener("DOMContentLoaded", () => {
  const revealElements = document.querySelectorAll(".education-content, .skills-content")
  revealElements.forEach((element) => {
    element.style.opacity = "0"
    element.style.transform = "translateY(50px)"
    element.style.transition = "all 0.5s ease"
  })
})

window.addEventListener("scroll", reveal)
reveal() // Call once on load
