// generic.js - Hygiene Page Logic
document.addEventListener("DOMContentLoaded", function() {
    // Subtle fade-in animation for info cards to signal 'calm' and 'cleanliness'
    const cards = document.querySelectorAll('.info-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 200 * index); // Stagger the fade in
    });
});