const slides = document.querySelectorAll('.slide');
let currentIndex = 0;

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
    });
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
}

showSlide(currentIndex);
setInterval(nextSlide, 5000);




//RESPONSIVE NAVBAR
document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.querySelector('.hamburger');
    const navbar = document.querySelector('.navbar');
    const closeBtn = document.querySelector('.close-btn');
    const navItems = document.querySelectorAll('.nav-item');

    hamburger.addEventListener('click', function () {
        navbar.classList.toggle('active');
    });

    closeBtn.addEventListener('click', function () {
        navbar.classList.remove('active');
    });

    navItems.forEach(item => {
        item.addEventListener('click', function () {
            item.classList.toggle('active');
        });
    });
});

//Responsive Navbar Option
let cartIcon = document.querySelector('#cart-icon');
let cart = document.querySelector('.cart');
let closeCart = document.querySelector('#close-cart');
// Open Cart

cartIcon.onclick = () => {
    cart.classList.add('card-active');
};

// Close Cart
closeCart.onclick = () => {
    cart.classList.remove('card-active');
};
