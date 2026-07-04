(function () {
  const CONTACT_CONFIG = {
    // Option 1: Formspree sends the message to your email inbox.
    // Example: "https://formspree.io/f/abcdwxyz"
    formspreeEndpoint: "PASTE_YOUR_FORMSPREE_ENDPOINT_HERE",

    // Option 2: Google Forms stores the message in Google Forms/Sheets.
    // Example: "https://docs.google.com/forms/d/e/FORM_ID/formResponse"
    googleFormEndpoint: "PASTE_YOUR_GOOGLE_FORM_ACTION_URL_HERE",
    googleFields: {
      name: "PASTE_GOOGLE_NAME_ENTRY_ID_HERE",
      email: "PASTE_GOOGLE_EMAIL_ENTRY_ID_HERE",
      mobile: "PASTE_GOOGLE_MOBILE_ENTRY_ID_HERE",
      message: "PASTE_GOOGLE_MESSAGE_ENTRY_ID_HERE"
    }
  };

  const header = document.querySelector("[data-header]");
  const nav = document.querySelector("[data-nav]");
  const menuToggle = document.querySelector("[data-menu-toggle]");
  const statNumbers = document.querySelectorAll("[data-count]");
  const contactForm = document.querySelector("[data-contact-form]");
  const formStatus = document.querySelector("[data-form-status]");

  if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("is-open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    nav.addEventListener("click", (event) => {
      if (event.target.matches("a")) {
        nav.classList.remove("is-open");
        menuToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  if (header) {
    const setHeaderState = () => {
      header.classList.toggle("is-scrolled", window.scrollY > 16);
    };

    setHeaderState();
    window.addEventListener("scroll", setHeaderState, { passive: true });
  }

  const animateCount = (element) => {
    const target = Number(element.dataset.count || 0);
    const duration = 900;
    const start = performance.now();

    const update = (time) => {
      const progress = Math.min((time - start) / duration, 1);
      element.textContent = Math.round(target * progress).toString();

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    };

    requestAnimationFrame(update);
  };

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    statNumbers.forEach((number) => observer.observe(number));
  } else {
    statNumbers.forEach(animateCount);
  }

  const isConfigured = (value) => {
    return value && !value.includes("PASTE_") && !value.includes("_HERE");
  };

  const submitToFormspree = async (data) => {
    if (!isConfigured(CONTACT_CONFIG.formspreeEndpoint)) {
      return { service: "Formspree email", status: "not-configured" };
    }

    const payload = new FormData();
    payload.append("name", data.name);
    payload.append("email", data.email || "Not provided");
    payload.append("mobile", data.mobile || "Not provided");
    payload.append("message", data.message);
    payload.append("_subject", `Portfolio contact request from ${data.name}`);

    const response = await fetch(CONTACT_CONFIG.formspreeEndpoint, {
      method: "POST",
      body: payload,
      headers: {
        Accept: "application/json"
      }
    });

    if (!response.ok) {
      throw new Error("Formspree email submission failed.");
    }

    return { service: "Formspree email", status: "sent" };
  };

  const submitToGoogleForms = async (data) => {
    const fields = CONTACT_CONFIG.googleFields;
    const googleReady = isConfigured(CONTACT_CONFIG.googleFormEndpoint)
      && isConfigured(fields.name)
      && isConfigured(fields.email)
      && isConfigured(fields.mobile)
      && isConfigured(fields.message);

    if (!googleReady) {
      return { service: "Google Forms", status: "not-configured" };
    }

    const payload = new FormData();
    payload.append(fields.name, data.name);
    payload.append(fields.email, data.email || "Not provided");
    payload.append(fields.mobile, data.mobile || "Not provided");
    payload.append(fields.message, data.message);

    await fetch(CONTACT_CONFIG.googleFormEndpoint, {
      method: "POST",
      mode: "no-cors",
      body: payload
    });

    return { service: "Google Forms", status: "sent" };
  };

  if (contactForm && formStatus) {
    contactForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      const formData = new FormData(contactForm);
      const data = {
        name: String(formData.get("name") || "").trim(),
        email: String(formData.get("email") || "").trim(),
        mobile: String(formData.get("mobile") || "").trim(),
        message: String(formData.get("message") || "").trim()
      };
      const submitButton = contactForm.querySelector("button[type='submit']");

      if (!data.name || !data.message) {
        formStatus.textContent = "Please enter your name and message before sending.";
        return;
      }

      if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        formStatus.textContent = "Please enter a valid email address.";
        return;
      }

      formStatus.textContent = "Sending your message...";
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = "Sending...";
      }

      try {
        const results = await Promise.all([
          submitToFormspree(data),
          submitToGoogleForms(data)
        ]);

        const sentServices = results
          .filter((result) => result.status === "sent")
          .map((result) => result.service);

        if (sentServices.length === 0) {
          formStatus.textContent = "Contact form setup is pending. Add your Formspree and Google Forms values in js/app.js. See CONTACT_SETUP.md.";
          return;
        }

        formStatus.textContent = `Thanks ${data.name}. Your message was sent to: ${sentServices.join(" and ")}.`;
        contactForm.reset();
      } catch (error) {
        formStatus.textContent = "Sorry, the message could not be sent. Please check your contact setup values.";
      } finally {
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.textContent = "Send Message";
        }
      }

    });
  }
})();
