import { useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import styles from "../../styles/newsletter-registration.module.css";

function NewsletterRegistration() {
  const emailInputRef = useRef();

  function registrationHandler(event) {
    event.preventDefault();

    const email = emailInputRef.current.value;

    // submit emailId
    fetch("/api/newsletter", {
      method: "POST",
      body: JSON.stringify({ email: email }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.status == 201) {
        toast.success("Signed up successfully...");
      }
      if (response.status == 400) {
        toast.warn("User already registered!");
      }
      if (response.status == 500) {
        toast.error("Internal Server Error...");
      }
      console.log(response.status);
      emailInputRef.current.value = "";
      response.json();
    });
  }

  return (
    <section className={styles.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={styles.control}>
          <input
            ref={emailInputRef}
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
          />
          <button>Register</button>
        </div>
      </form>
      <ToastContainer autoClose={3000} />
    </section>
  );
}

export default NewsletterRegistration;
