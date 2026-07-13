"use strict";

document.addEventListener("DOMContentLoaded", () => {

    const header = document.getElementById("header");
    const themeToggle = document.getElementById("themeToggle");
    const menuToggle = document.getElementById("menuToggle");
    const navLinksContainer = document.getElementById("navLinks");
    const navLinks = document.querySelectorAll(".nav-link");
    const backToTop = document.getElementById("backToTop");

    initializeTheme();
    initializeTypingAnimation();
    initializeRevealAnimations();
    initializeCounters();
    initializeSkillProgress();
    initializeContactForm();

    window.addEventListener("scroll", handlePageScroll);

    themeToggle.addEventListener("click", toggleTheme);
    menuToggle.addEventListener("click", toggleMobileMenu);
    backToTop.addEventListener("click", scrollToTop);

    navLinks.forEach(link => {

        link.addEventListener("click", () => {
            closeMobileMenu();
        });

    });

    function initializeTheme() {

        const savedTheme = localStorage.getItem("portfolioTheme");

        if (savedTheme === "light") {
            document.body.classList.add("light-theme");
        }

        updateThemeIcon();

    }

    function toggleTheme() {

        document.body.classList.toggle("light-theme");

        const currentTheme =
            document.body.classList.contains("light-theme")
                ? "light"
                : "dark";

        localStorage.setItem("portfolioTheme", currentTheme);

        updateThemeIcon();

    }

    function updateThemeIcon() {

        const icon = themeToggle.querySelector("i");

        if (document.body.classList.contains("light-theme")) {

            icon.className = "fa-solid fa-sun";

        } else {

            icon.className = "fa-solid fa-moon";

        }

    }

    function toggleMobileMenu() {

        const isOpen =
            navLinksContainer.classList.toggle("open");

        document.body.classList.toggle("menu-open", isOpen);

        const icon = menuToggle.querySelector("i");

        icon.className = isOpen
            ? "fa-solid fa-xmark"
            : "fa-solid fa-bars";

    }

    function closeMobileMenu() {

        navLinksContainer.classList.remove("open");
        document.body.classList.remove("menu-open");

        const icon = menuToggle.querySelector("i");

        icon.className = "fa-solid fa-bars";

    }

    function handlePageScroll() {

        const scrollPosition = window.scrollY;

        header.classList.toggle(
            "scrolled",
            scrollPosition > 30
        );

        backToTop.classList.toggle(
            "visible",
            scrollPosition > 500
        );

        updateActiveNavigation();

    }

    function updateActiveNavigation() {

        const sections =
            document.querySelectorAll("section[id]");

        let currentSection = "home";

        sections.forEach(section => {

            const sectionTop =
                section.offsetTop - 150;

            const sectionHeight =
                section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionTop + sectionHeight
            ) {
                currentSection = section.id;
            }

        });

        navLinks.forEach(link => {

            link.classList.remove("active");

            if (
                link.getAttribute("href") ===
                `#${currentSection}`
            ) {
                link.classList.add("active");
            }

        });

    }

    function scrollToTop() {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }

    function initializeTypingAnimation() {

        const typingElement =
            document.getElementById("typingText");

       const roles = [
    "Web Developer",
    "Java Developer",
    "Final-Year CSE Student",
    "Problem Solver"
];

        let roleIndex = 0;
        let characterIndex = 0;
        let isDeleting = false;

        function type() {

            const currentRole = roles[roleIndex];

            if (isDeleting) {

                typingElement.textContent =
                    currentRole.substring(
                        0,
                        characterIndex - 1
                    );

                characterIndex--;

            } else {

                typingElement.textContent =
                    currentRole.substring(
                        0,
                        characterIndex + 1
                    );

                characterIndex++;

            }

            let typingSpeed = isDeleting ? 55 : 105;

            if (
                !isDeleting &&
                characterIndex === currentRole.length
            ) {

                typingSpeed = 1500;
                isDeleting = true;

            } else if (
                isDeleting &&
                characterIndex === 0
            ) {

                isDeleting = false;

                roleIndex =
                    (roleIndex + 1) % roles.length;

                typingSpeed = 350;

            }

            setTimeout(type, typingSpeed);

        }

        type();

    }

    function initializeRevealAnimations() {

        const revealElements =
            document.querySelectorAll(".reveal");

        const observer =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add(
                                "visible"
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.15
                }
            );

        revealElements.forEach(element => {
            observer.observe(element);
        });

    }

    function initializeCounters() {

        const counters =
            document.querySelectorAll(".counter");

        const counterObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (!entry.isIntersecting) {
                            return;
                        }

                        animateCounter(entry.target);

                        counterObserver.unobserve(
                            entry.target
                        );

                    });

                },
                {
                    threshold: 0.6
                }
            );

        counters.forEach(counter => {
            counterObserver.observe(counter);
        });

    }

    function animateCounter(counter) {

        const target =
            Number(counter.dataset.target);

        const duration = 1200;
        const startTime = performance.now();

        function updateCounter(currentTime) {

            const elapsed =
                currentTime - startTime;

            const progress =
                Math.min(elapsed / duration, 1);

            const currentValue =
                Math.floor(progress * target);

            counter.textContent = currentValue;

            if (progress < 1) {

                requestAnimationFrame(
                    updateCounter
                );

            } else {

                counter.textContent = target;

            }

        }

        requestAnimationFrame(updateCounter);

    }

    function initializeSkillProgress() {

        const skillCards =
            document.querySelectorAll(".skill-card");

        const skillObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add(
                                "progress-active"
                            );

                            skillObserver.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.4
                }
            );

        skillCards.forEach(card => {
            skillObserver.observe(card);
        });

    }

    function initializeContactForm() {

        const contactForm =
            document.getElementById("contactForm");

        const formMessage =
            document.getElementById("formMessage");

        contactForm.addEventListener(
            "submit",
            event => {

                event.preventDefault();

                const name =
                    document.getElementById("name")
                        .value.trim();

                const email =
                    document.getElementById("email")
                        .value.trim();

                const subject =
                    document.getElementById("subject")
                        .value.trim();

                const message =
                    document.getElementById("message")
                        .value.trim();

                if (
                    !name ||
                    !email ||
                    !subject ||
                    !message
                ) {

                    showFormMessage(
                        "Please complete all fields.",
                        false
                    );

                    return;

                }

                const mailSubject =
                    encodeURIComponent(subject);

                const mailBody =
                    encodeURIComponent(
                        `Name: ${name}\n` +
                        `Email: ${email}\n\n` +
                        `${message}`
                    );

                showFormMessage(
                    "Opening your email application...",
                    true
                );

                window.location.href =
                    `mailto:johncse2005@gmail.com` +
                    `?subject=${mailSubject}` +
                    `&body=${mailBody}`;

                contactForm.reset();

            }
        );

        function showFormMessage(
            message,
            isSuccess
        ) {

            formMessage.textContent = message;

            formMessage.style.color =
                isSuccess
                    ? "#22c55e"
                    : "#ef4444";

        }

    }

});     