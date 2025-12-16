// Import Firebase SDK modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js"
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js"
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA4rVMYJC0pN-fecleCQ_AINIo3FlEA2mY",
  authDomain: "portfolio-fadd1.firebaseapp.com",
  projectId: "portfolio-fadd1",
  storageBucket: "portfolio-fadd1.firebasestorage.app",
  messagingSenderId: "493020884434",
  appId: "1:493020884434:web:5262c22412f09d1488ac0b",
  measurementId: "G-Z74N114LSS",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const analytics = getAnalytics(app)

console.log("[v0] Firebase initialized successfully")

// Handle contact form submission
document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contact-form")

  if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault()

      // Get form values
      const name = document.getElementById("name").value
      const email = document.getElementById("email").value
      const phone = document.getElementById("phone").value || "Not provided"
      const subject = document.getElementById("subject").value || "No subject"
      const message = document.getElementById("message").value

      // Get submit button
      const submitBtn = contactForm.querySelector(".btn")
      const originalBtnText = submitBtn.textContent

      try {
        // Disable button and show loading state
        submitBtn.textContent = "Sending..."
        submitBtn.disabled = true

        // Add document to Firestore
        const docRef = await addDoc(collection(db, "contacts"), {
          name: name,
          email: email,
          phone: phone,
          subject: subject,
          message: message,
          timestamp: serverTimestamp(),
          status: "new",
        })

        console.log("[v0] Document written with ID:", docRef.id)

        // Show success message
        alert("✅ Thank you for your message! I will get back to you soon.")

        // Reset form
        contactForm.reset()
      } catch (error) {
        console.error("[v0] Error adding document:", error)
        alert(
          "❌ Sorry, there was an error sending your message. Please try again or email me directly at gaurav121212kush@gmail.com",
        )
      } finally {
        // Re-enable button
        submitBtn.textContent = originalBtnText
        submitBtn.disabled = false
      }
    })
  }
})
