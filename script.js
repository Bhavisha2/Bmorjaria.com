document.addEventListener("DOMContentLoaded", function () {
    // Dynamic Greeting
    function updateGreeting() {
        const greeting = document.getElementById("greeting");
        if (!greeting) return; // Prevent error if element is missing

        const hour = new Date().getHours();
        let message = "Hello!";

        if (hour < 12) {
            message = "Good Morning! ☀️";
        } else if (hour < 18) {
            message = "Good Afternoon! 🌤️";
        } else {
            message = "Good Evening! 🌙";
        }

        greeting.innerText = message;
    }

    // Live Clock Function
    function updateClock() {
        const clock = document.getElementById("live-clock");
        if (!clock) return;

        setInterval(() => {
            const now = new Date();
            clock.innerText = now.toLocaleTimeString();
        }, 1000);
    }

    // Theme Toggle
    const themeToggle = document.getElementById("theme-toggle");
    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            document.body.classList.toggle("dark-mode");
            localStorage.setItem("theme", document.body.classList.contains("dark-mode") ? "dark" : "light");
        });

        // Load saved theme preference
        if (localStorage.getItem("theme") === "dark") {
            document.body.classList.add("dark-mode");
        }
    }

    // Portfolio Filtering
    const projects = [
        { id: 1, title: "Web App", category: "Web", description: "A cool web project.", image: "project1.jpg" },
        { id: 2, title: "AI Model", category: "AI", description: "An AI-powered tool.", image: "project2.jpg" },
        { id: 3, title: "Data Dashboard", category: "Data", description: "A data visualization dashboard.", image: "project3.jpg" },
    ];

    function loadPortfolio(category = "All") {
        const portfolioContainer = document.getElementById("portfolio-gallery");
        if (!portfolioContainer) return;

        portfolioContainer.innerHTML = "";

        const filteredProjects = category === "All" ? projects : projects.filter(p => p.category === category);

        filteredProjects.forEach(project => {
            const div = document.createElement("div");
            div.classList.add("project");
            div.innerHTML = `
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <img src="${project.image}" alt="${project.title}" class="portfolio-img">
            `;
            portfolioContainer.appendChild(div);
        });

        // Attach click event for lightbox
        document.querySelectorAll(".portfolio-img").forEach(img => {
            img.addEventListener("click", function () {
                openLightbox(this.src);
            });
        });
    }

    // Lightbox Functions
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const closeBtn = document.querySelector(".close");

    function openLightbox(imgSrc) {
        if (!lightbox || !lightboxImg) return;
        lightbox.style.display = "flex";
        lightboxImg.src = imgSrc;
    }

    if (closeBtn) {
        closeBtn.addEventListener("click", () => {
            lightbox.style.display = "none";
        });
    }

    if (lightbox) {
        lightbox.addEventListener("click", (e) => {
            if (e.target !== lightboxImg) {
                lightbox.style.display = "none";
            }
        });
    }

    // Blog Section (Dynamic Load)
    const blogPosts = [
        { title: "My First Blog", content: "This is an awesome blog post!" },
        { title: "Learning JavaScript", content: "JavaScript makes web pages interactive!" },
        { title: "Building Projects", content: "Building projects helps you learn!" }
    ];

    function loadBlogPosts() {
        const blogContainer = document.getElementById("blog-list");
        if (!blogContainer) return;

        blogContainer.innerHTML = "";

        blogPosts.forEach(post => {
            const article = document.createElement("article");
            article.classList.add("blog-post");
            article.innerHTML = `<h3>${post.title}</h3><p>${post.content}</p>`;
            blogContainer.appendChild(article);
        });
    }

    // Form Validation
    const contactForm = document.getElementById("contact-form");
    if (contactForm) {
        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();
            let valid = true;

            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const message = document.getElementById("message").value.trim();

            if (name === "") {
                alert("Please enter your name.");
                valid = false;
            }

            if (email === "" || !/\S+@\S+\.\S+/.test(email)) {
                alert("Please enter a valid email.");
                valid = false;
            }

            if (message === "") {
                alert("Message cannot be empty.");
                valid = false;
            }

            if (valid) {
                alert("Form submitted successfully!");
                contactForm.reset();
            }
        });
    }

    // Smooth Scrolling
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener("click", function (event) {
            event.preventDefault();
            const section = document.querySelector(this.getAttribute("href"));
            if (section) {
                section.scrollIntoView({ behavior: "smooth" });
            }
        });
    });

    // Highlight Active Section (Scrollspy)
    window.addEventListener("scroll", () => {
        const sections = document.querySelectorAll("section");
        const scrollPosition = window.scrollY;

        sections.forEach(sec => {
            if (scrollPosition >= sec.offsetTop - 60 && scrollPosition < sec.offsetTop + sec.offsetHeight) {
                document.querySelectorAll("nav a").forEach(link => link.classList.remove("active"));
                const activeLink = document.querySelector(`nav a[href="#${sec.id}"]`);
                if (activeLink) {
                    activeLink.classList.add("active");
                }
            }
        });
    });

    // Run all functions after DOM is loaded
    updateGreeting();
    updateClock();
    loadPortfolio();
    loadBlogPosts();
});
