/* ==========================================
   Trendy Diva
   Premium Fashion Store JavaScript
   ========================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* Fade Up Animation */
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

    /* Sticky Navbar */
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

    /* Mobile Hamburger Menu */
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

    /* Search Modal */
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
            setTimeout(() => {
                searchModal.style.display = "none";
            }, 400);
        });

        searchModal.addEventListener("click", (e) => {
            if (e.target === searchModal) {
                searchModal.classList.remove("show");
                setTimeout(() => {
                    searchModal.style.display = "none";
                }, 400);
            }
        });

        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && searchModal.classList.contains("show")) {
                searchModal.classList.remove("show");
                setTimeout(() => {
                    searchModal.style.display = "none";
                }, 400);
            }
        });
    }

    /* Back To Top Button */
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
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

    /* Smooth Scrolling */
    const navItems = document.querySelectorAll('a[href^="#"]');
    navItems.forEach((item) => {
        item.addEventListener("click", function (e) {
            const target = document.querySelector(this.getAttribute("href"));
            if (!target) return;
            e.preventDefault();
            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        });
    });

   /* Wishlist Button */
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

    /* Cart Counter */
    const cartCount = document.querySelector(".cart-count");
    const addToCartButtons = document.querySelectorAll(".add-to-cart");
    let cart = 0;

    addToCartButtons.forEach(button => {
        button.addEventListener("click", () => {
            cart++;
            if (cartCount) {
                cartCount.textContent = cart;
                cartCount.animate([
                    { transform: "scale(1)" },
                    { transform: "scale(1.35)" },
                    { transform: "scale(1)" }
                ], { duration: 300 });
            }
            button.textContent = "Added ✓";
            button.classList.add("added");
            setTimeout(() => {
                button.textContent = "Add to Cart";
                button.classList.remove("added");
            }, 1500);
        });
    });

    /* Quick View */
    const quickViewButtons = document.querySelectorAll(".quick-view-btn");
    quickViewButtons.forEach(button => {
        button.addEventListener("click", () => {
            alert("Quick View feature will be connected to your product database later.");
        });
    });

});

/* Newsletter Form */
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

/* Button Ripple Effect */
const rippleButtons = document.querySelectorAll(".btn-primary, .btn-secondary");
rippleButtons.forEach(button=>{
    button.addEventListener("click",function(e){
        const ripple=document.createElement("span");
        const rect=this.getBoundingClientRect();
        const size=Math.max(rect.width,rect.height);
        ripple.style.width=size+"px";
        ripple.style.height=size+"px";
        ripple.style.left=e.clientX-rect.left-size/2+"px";
        ripple.style.top=e.clientY-rect.top-size/2+"px";
        ripple.classList.add("ripple");
        this.appendChild(ripple);
        setTimeout(()=>{ ripple.remove(); },600);
    });
});

/* Page Loading Animation */
window.addEventListener("load",()=>{
    document.body.classList.add("loaded");
});

/* Image Lazy Loading */
const images=document.querySelectorAll("img");
const imageObserver=new IntersectionObserver((entries,observer)=>{
    entries.forEach(entry=>{
        if(entry.isIntersecting){
            const img=entry.target;
            img.classList.add("image-loaded");
            observer.unobserve(img);
        }
    });
});
images.forEach(img=>{ imageObserver.observe(img); });
