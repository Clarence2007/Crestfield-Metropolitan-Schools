// CART Open Close

let cartIcon = document.querySelector('#cart-icon');
let cart = document.querySelector('.cart');
let closeCart = document.querySelector('#close-cart');
let btnBuy = document.getElementById('btn-buy')

//NAME AND EMAIL VALIDATION AT THE TOP OF THE SCREEN\
const nameInput = document.getElementById('name-input');
const emailInput = document.getElementById('email-input');
const nameButton = document.getElementById('name-button');
const inputDiv = document.getElementById('input');

nameButton.onclick = () =>{
    if (nameInput.value === '' || emailInput.value === '') {
        alert('Please fill in all fields before submitting your order');
    }
}
document.addEventListener("DOMContentLoaded", function() {
    const nameInput = document.getElementById('name-input');
    const emailInput = document.getElementById('email-input');
    const nameButton = document.getElementById('name-button');
    const inputDiv = document.getElementById('input');


    // Function to display the stored name and email
    function displayStoredData() {
        const storedName = localStorage.getItem('name');
        const storedEmail = localStorage.getItem('email');
        if (storedName && storedEmail) {
            inputDiv.innerHTML = `Hello ${storedName.toUpperCase()}! (${storedEmail.toLowerCase()})`;
            nameInput.value = storedName;
            emailInput.value = storedEmail;
        }
    }

    // Display the stored name and email on page load
    displayStoredData();

    nameButton.addEventListener('click', () => {
        const name = nameInput.value;
        const email = emailInput.value;
        if (name && email) {
            const upperCaseName = name.toUpperCase();
            const lowerCaseEmail = email.toLowerCase();
            inputDiv.innerHTML = `Hello ${upperCaseName}! (${lowerCaseEmail})`;
            localStorage.setItem('name', name);
            localStorage.setItem('email', email);
        } else {
            alert("Please enter both name and email.");
        }
    });
});




// Open Cart
cartIcon.onclick = () => {
    cart.classList.add('card-active');
};

// Close Cart
closeCart.onclick = () => {
    cart.classList.remove('card-active');
};

// Making Add to Cart
if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready);
} else {
    ready();
}

function ready() {
    // Remove Item from the Cart
    var removeCartButtons = document.getElementsByClassName('cart-remove');
    for (var i = 0; i < removeCartButtons.length; i++) {
        var button = removeCartButtons[i];
        button.addEventListener('click', removeCartItem);
    }

    // Quantity Change
    var quantityInputs = document.getElementsByClassName('cart-quantity');
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i];
        input.addEventListener('change', quantityChanged);
    }

    // Add to Cart
    var addCart = document.getElementsByClassName('add-cart');
    for (var i = 0; i < addCart.length; i++) {
        var button = addCart[i];
        button.addEventListener('click', addCartClicked);
    }

    loadCartItems(); // Load cart items from local storage
}

// Remove Cart Item
function removeCartItem(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updateTotal();
    saveCartItems();
    updateCartIcon();
}

// Quantity Changed
function quantityChanged(event) {
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updateTotal();
    saveCartItems();
    updateCartIcon();b
}

// Add Cart Function
function addCartClicked(event) {
    var button = event.target;
    var shopProducts = button.parentElement;
    var title = shopProducts.getElementsByClassName('product-title')[0].innerText;
    var price = shopProducts.getElementsByClassName('price')[0].innerText;
    var productImg = shopProducts.getElementsByClassName('product-img')[0].src;
    addProductToCart(title, price, productImg);
    updateTotal();
    saveCartItems();
    updateCartIcon();
}

function addProductToCart(title, price, productImg) {
    let cartShopBox = document.createElement('div');
    cartShopBox.classList.add('cart-box');

    let cartItems = document.querySelector('.cart-content');
    let cartItemsTitles = cartItems.querySelectorAll('.cart-product-title');

    for (let i = 0; i < cartItemsTitles.length; i++) {
        if (cartItemsTitles[i].innerText === title) {
            alert('You have already added this item to the cart');
            return;
        }
    }

    let cartBoxContent = `
        <img src="${productImg}" alt="Product" class="cart-img">
        <div class="detail-box">
            <div class="cart-product-title">${title}</div>
            <div class="cart-price">${price}</div>
            <input 
                type="number"
                value="1"
                class="cart-quantity"
            />
        </div>
        <!-- Remove Item -->
        <i class="fa-solid fa-trash cart-remove"></i>`;
    
    cartShopBox.innerHTML = cartBoxContent;
    cartItems.appendChild(cartShopBox);

    cartShopBox.querySelector('.cart-remove').addEventListener('click', removeCartItem);
    cartShopBox.querySelector('.cart-quantity').addEventListener('change', quantityChanged);

    updateTotal();
    saveCartItems();
    updateCartIcon();
    
 }
   

 let cartContents = document.getElementById('cart-content');

// Email Functionality
function sendEmail(cartItems) {
    var emailBody = "Order Details:\n\n";
    cartItems.forEach(item => {
        emailBody += `Product: ${item.title}\nPrice: ${item.price}\nQuantity: ${item.quantity}\n\n`;
    });

    Email.send({
        Host : "smtp.elasticemail.com",
        Username : "omotaladeclarence@gmail.com",
        Password : "764AA123B03089EBE2C3AAA205B07C7E3B1D",
        To : 'omotaladeclarence@gmail.com',
        From : "omotaladeclarence@gmail.com",
        Subject : 'New Order from '+ nameInput.value +  ' / ' + emailInput.value,
        Body : emailBody
    }).then(
        message => {
          if(message == "OK"){
              Swal.fire({
                  title: "Success!!",
                  text: "You have submitted your order. We will get back to you in less than 24 hours",
                  icon: "success"
                });
          }
        }
      );;
}

btnBuy.addEventListener("click", function() {
    var cartContent = document.getElementById('cart-content');
    var cartBoxes = cartContent.getElementsByClassName('cart-box');
    var cartItems = [];

    for (var i = 0; i < cartBoxes.length; i++) {
        var cartBox = cartBoxes[i];
        var title = cartBox.getElementsByClassName('cart-product-title')[0].innerText;
        var price = cartBox.getElementsByClassName('cart-price')[0].innerText;
        var quantity = cartBox.getElementsByClassName('cart-quantity')[0].value;

        var item = {
            title: title,
            price: price,
            quantity: quantity
        };

        cartItems.push(item);
    }

    sendEmail(cartItems);
});



// Update Total
function updateTotal() {
    var cartContent = document.querySelector('.cart-content');
    var cartBoxes = cartContent.querySelectorAll('.cart-box');
    var total = 0;
    for (var i = 0; i < cartBoxes.length; i++) {
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.querySelector('.cart-price');
        var quantityElement = cartBox.querySelector('.cart-quantity');
        var price = parseFloat(priceElement.innerText.replace('₦', '').replace(',', ''));
        var quantity = quantityElement.value;
        total += price * quantity;
    }

    // If price Contains some cents
    total = Math.round(total * 100) / 100;
    document.querySelector('.total-price').innerHTML = '₦' + total;
    // Save Total to the Local Storage
    localStorage.setItem("cartTotal", total);
}


// Keep the Item in the cart when refreshed or closed with local storage
// Save Cart Items
function saveCartItems() {
    var cartBoxes = document.querySelectorAll('.cart-box');
    var cartItems = [];

    for (var i = 0; i < cartBoxes.length; i++) {
        var cartBox = cartBoxes[i];
        var titleElement = cartBox.querySelector('.cart-product-title');
        var priceElement = cartBox.querySelector('.cart-price');
        var quantityElement = cartBox.querySelector('.cart-quantity');
        var productImg = cartBox.querySelector('.cart-img').src;

        var item = {
            title: titleElement.innerText,
            price: priceElement.innerText,
            quantity: quantityElement.value,
            productImg: productImg,
        };
        cartItems.push(item);
    }
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

// Load Cart Items
function loadCartItems() {
    var cartItems = localStorage.getItem('cartItems');
    if (cartItems) {
        cartItems = JSON.parse(cartItems);

        for (let i = 0; i < cartItems.length; i++) {
            let item = cartItems[i];
            addProductToCart(item.title, item.price, item.productImg);

            let cartBoxes = document.querySelectorAll('.cart-box');
            let cartBox = cartBoxes[cartBoxes.length - 1];
            let quantityElement = cartBox.querySelector('.cart-quantity');
            quantityElement.value = item.quantity;
        }
    }

    let cartTotal = localStorage.getItem('cartTotal');
    if (cartTotal) {
        document.querySelector('.total-price').innerText = '₦' + cartTotal;
        updateCartIcon();
        updateTotal();
    }
}


// Quantity in Cart Item
function updateCartIcon() {
    let cartBoxes = document.querySelectorAll('.cart-box');
    let quantity = 0;

    for (let i = 0; i < cartBoxes.length; i++) {
        let cartBox = cartBoxes[i];
        let quantityElement = cartBox.querySelector('.cart-quantity');
        quantity += parseInt(quantityElement.value) || 0;
    }

    let cartIcon = document.querySelector('#cart-icon');
    cartIcon.setAttribute('data-quantity', quantity);
}


