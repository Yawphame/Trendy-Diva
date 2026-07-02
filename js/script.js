/* ==========================================
   Trendy Diva - Premium Fashion Store JavaScript
   ========================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ==========================================
       Fade Up Animation
    ========================================== */
    const fadeElements = document.querySelectorAll(".fade-up");
    if (fadeElements.length) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        fadeElements.forEach(element => observer.observe(element));
    }

    /* ==========================================
       Sticky Navbar
    ========================================== */
    const navbar = document.querySelector(".navbar");
    if (navbar) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 40) {
                navbar.classList.add("scrolled");
            } else {
                navbar.classList.remove("scrolled");
            }
        });
    }

    /* ==========================================
       Mobile Hamburger Menu
    ========================================== */
    const hamburger = document.getElementById("hamburger");
    const navLinks = document.getElementById("navLinks");
    if (hamburger && navLinks) {
        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("active");
            navLinks.classList.toggle("active");
        });
        navLinks.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                hamburger.classList.remove("active");
                navLinks.classList.remove("active");
            });
        });
    }

    /* ==========================================
       Search Modal
    ========================================== */
    const searchTrigger = document.querySelector(".search-trigger");
    const searchModal = document.getElementById("searchModal");
    const closeSearch = document.querySelector(".close-search");
    const searchInput = searchModal?.querySelector("input");

    if (searchTrigger && searchModal && closeSearch) {
        searchTrigger.addEventListener("click", (e) => {
            e.preventDefault();
            searchModal.style.display = "flex";
            requestAnimationFrame(() => {
                searchModal.classList.add("show");
                searchInput.focus();
            });
        });

        closeSearch.addEventListener("click", () => {
            searchModal.classList.remove("show");
            setTimeout(() => { searchModal.style.display = "none"; }, 400);
        });

        searchModal.addEventListener("click", (e) => {
            if (e.target === searchModal) {
                searchModal.classList.remove("show");
                setTimeout(() => { searchModal.style.display = "none"; }, 400);
            }
        });

        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && searchModal.classList.contains("show")) {
                searchModal.classList.remove("show");
                setTimeout(() => { searchModal.style.display = "none"; }, 400);
            }
        });
    }

    /* ==========================================
       Back To Top Button
    ========================================== */
    const backToTop = document.getElementById("backToTop");
    if (backToTop) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 400) {
                backToTop.classList.add("show");
            } else {
                backToTop.classList.remove("show");
            }
        });
        backToTop.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    /* ==========================================
       Wishlist Button (Heart Toggle)
    ========================================== */
    const wishlistButtons = document.querySelectorAll(".wishlist-btn");
    wishlistButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            e.preventDefault();
            const icon = button.querySelector("i");
            button.classList.toggle("active");
            if (button.classList.contains("active")) {
                icon.classList.remove("fa-regular");
                icon.classList.add("fa-solid");
            } else {
                icon.classList.remove("fa-solid");
                icon.classList.add("fa-regular");
            }
        });
    });

    /* ==========================================
       NEWSLETTER FORM
    ========================================== */
    const newsletterForm = document.getElementById("newsletterForm");
    if (newsletterForm) {
        newsletterForm.addEventListener("submit", function(e){
            e.preventDefault();
            const email = this.querySelector("input[type='email']");
            const value = email.value.trim();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if(!emailRegex.test(value)){
                alert("Please enter a valid email address.");
                email.focus();
                return;
            }
            alert("Thank you for subscribing!");
            this.reset();
        });
    }

    /* ==========================================
       BUTTON RIPPLE EFFECT
    ========================================== */
    const rippleButtons = document.querySelectorAll(".btn-primary, .btn-secondary");
    rippleButtons.forEach(button => {
        button.addEventListener("click", function(e){
            const ripple = document.createElement("span");
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = size + "px";
            ripple.style.height = size + "px";
            ripple.style.left = e.clientX - rect.left - size/2 + "px";
            ripple.style.top = e.clientY - rect.top - size/2 + "px";
            ripple.classList.add("ripple");
            this.appendChild(ripple);
            setTimeout(() => { ripple.remove(); }, 600);
        });
    });

    /* ==========================================
       ADD TO CART + LOCALSTORAGE
    ========================================== */
    const products = [
        { id: 1, name: "Striped Shirt & Jeans", price: 65, image: "images/dresses.JPG" },
        { id: 2, name: "Sunshine Floral Maxi", price: 89, image: "images/dresses1.JPG" },
        { id: 3, name: "Cozy Floral Set", price: 55, image: "images/sets1.JPG" },
        { id: 4, name: "Black Floral Tie Dress", price: 75, image: "images/sets.JPG" },
        { id: 5, name: "Azure Elegance Set", price: 150, image: "images/productbl .JPG" },
        { id: 6, name: "Serenity Jumpsuit", price: 200, image: "images/productp .JPG" },
        { id: 7, name: "Cloud Nine Denim Set", price: 45, image: "images/productw .JPG" },
        { id: 8, name: "Midnight Muse Set", price: 70, image: "images/productb.JPG" }
    ];

    function addToCart(productId) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const product = products.find(p => p.id === productId);
        if (!product) return;

        const existing = cart.find(item => item.id === product.id);
        if (existing) {
            existing.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();

        // Button feedback
        const btn = event.currentTarget;
        const originalText = btn.textContent;
        btn.textContent = "Added ✓";
        btn.style.backgroundColor = "#2e7d32";

        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.backgroundColor = "";
        }, 1500);
    }

    function updateCartCount() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        document.querySelectorAll('.cart-count').forEach(el => {
            el.textContent = cart.length;
        });
    }

    // Attach Add to Cart listeners
    const addToCartButtons = document.querySelectorAll(".add-to-cart");
    addToCartButtons.forEach((button, index) => {
        button.addEventListener("click", (e) => {
            addToCart(index + 1);
        });
    });

    // Initialize cart count
    updateCartCount();

});
