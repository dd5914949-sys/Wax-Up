// landing.js - Menu Specific Logic
document.addEventListener("DOMContentLoaded", function() {
    // Dynamic Booking Link generation based on service clicked
    const bookButtons = document.querySelectorAll('.book-btn');
    
    bookButtons.forEach(button => {
        button.addEventListener('click', function() {
            const serviceType = this.getAttribute('data-service');
            console.log("User selected to book: " + serviceType);
            
            // Example: Route to specific service in Vagaro/MindBody
            // window.location.href = "https://your-booking-link.com/service=" + serviceType;
            alert("Redirecting to booking portal for: " + serviceType);
        });
    });
});