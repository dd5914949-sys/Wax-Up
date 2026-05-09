// index.js - Homepage Specific Logic
document.addEventListener("DOMContentLoaded", function() {
    // Smooth scroll for the hero booking button
    const heroBtn = document.getElementById('hero-book-btn');
    if(heroBtn) {
        heroBtn.addEventListener('click', function(e) {
            e.preventDefault();
            // Redirect to your booking portal
            window.location.href = "https://your-booking-link.com";
        });
    }

    // Sticky Header Logic (Changes color when scrolling past banner)
    const header = document.getElementById('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            header.style.backgroundColor = 'rgba(250, 249, 246, 0.95)';
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        } else {
            header.style.backgroundColor = 'transparent';
            header.style.boxShadow = 'none';
        }
    });
});