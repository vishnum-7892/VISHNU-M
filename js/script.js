// ============================================================
// LABSALT - COMPLETE JAVASCRIPT
// ============================================================


// ============================================================
// CART
// ============================================================

let cart = {};


// ============================================================
// PRODUCT PRICES
// ============================================================

const prices = {
    "Sodium Chloride": 150,
    "Copper Sulfate": 450,
    "Potassium Chloride": 200
};


// ============================================================
// PRODUCT DETAILS
// ============================================================

const productDetails = {

    "Sodium Chloride": {
        formula: "NaCl",
        grade: "Laboratory Grade",
        purity: "≥ 99.5%",
        pack: "100 g",
        price: 150,
        description: "Sodium chloride is a commonly used laboratory salt suitable for educational and laboratory applications."
    },

    "Copper Sulfate": {
        formula: "CuSO₄",
        grade: "Laboratory Grade",
        purity: "≥ 99.0%",
        pack: "100 g",
        price: 450,
        description: "Copper sulfate is a blue crystalline laboratory chemical commonly used in chemistry experiments and demonstrations."
    },

    "Potassium Chloride": {
        formula: "KCl",
        grade: "Laboratory Grade",
        purity: "≥ 99.0%",
        pack: "100 g",
        price: 200,
        description: "Potassium chloride is a laboratory salt used in chemistry experiments and educational applications."
    }

};


// ============================================================
// CART - ADD PRODUCT
// ============================================================

function addToCart(productName) {

    if (cart[productName]) {
        cart[productName] = cart[productName] + 1;
    } else {
        cart[productName] = 1;
    }

    displayCart();

    alert(productName + " added to cart!");
}


// ============================================================
// DISPLAY CART
// ============================================================

function displayCart() {

    const cartItems = document.getElementById("cart-items");

    let html = "";
    let totalItems = 0;
    let total = 0;

    for (let product in cart) {

        const quantity = cart[product];
        const price = prices[product];
        const itemTotal = price * quantity;

        totalItems = totalItems + quantity;
        total = total + itemTotal;

        html +=
            '<div class="cart-item">' +

                '<div class="cart-item-info">' +

                    '<strong>' + product + '</strong>' +

                    '<p>₹' + price + ' × ' +
                    quantity + ' = ₹' +
                    itemTotal + '</p>' +

                '</div>' +

                '<div class="quantity-controls">' +

                    '<button onclick="decreaseQuantity(\'' +
                    product + '\')">−</button>' +

                    '<span>' + quantity + '</span>' +

                    '<button onclick="increaseQuantity(\'' +
                    product + '\')">+</button>' +

                '</div>' +

                '<button class="remove-button" ' +
                'onclick="removeFromCart(\'' +
                product + '\')">' +

                    'Remove' +

                '</button>' +

            '</div>';
    }

    if (totalItems === 0) {
        html = "<p>Cart is empty</p>";
    }

    cartItems.innerHTML = html;

    document.getElementById("cart-count").innerText =
        totalItems;

    document.getElementById("cart-total").innerText =
        "Total: ₹" + total;
}


// ============================================================
// INCREASE QUANTITY
// ============================================================

function increaseQuantity(productName) {

    if (cart[productName]) {
        cart[productName]++;
    }

    displayCart();
}


// ============================================================
// DECREASE QUANTITY
// ============================================================

function decreaseQuantity(productName) {

    if (cart[productName]) {

        cart[productName]--;

        if (cart[productName] <= 0) {
            delete cart[productName];
        }
    }

    displayCart();
}


// ============================================================
// REMOVE PRODUCT
// ============================================================

function removeFromCart(productName) {

    delete cart[productName];

    displayCart();
}


// ============================================================
// CLEAR CART
// ============================================================

function clearCart() {

    if (Object.keys(cart).length === 0) {
        return;
    }

    const answer =
        confirm("Are you sure you want to clear your cart?");

    if (answer) {

        cart = {};

        displayCart();
    }
}


// ============================================================
// CHECKOUT
// ============================================================

function checkout() {

    if (Object.keys(cart).length === 0) {

        alert("Your cart is empty!");

        return;
    }

    displayCheckoutItems();

    document.getElementById("checkout-modal").style.display =
        "flex";


    // Fill logged-in user details automatically

    const storedUser =
        localStorage.getItem("labsaltUser");

    const loggedIn =
        localStorage.getItem("labsaltLoggedIn");


    if (storedUser && loggedIn === "true") {

        const user = JSON.parse(storedUser);

        document.getElementById("customer-name").value =
            user.name;

        document.getElementById("customer-email").value =
            user.email;
    }
}


// ============================================================
// DISPLAY CHECKOUT ITEMS
// ============================================================

function displayCheckoutItems() {

    const checkoutItems =
        document.getElementById("checkout-items");

    let html = "";
    let total = 0;


    for (let product in cart) {

        const quantity = cart[product];

        const itemTotal =
            prices[product] * quantity;

        total = total + itemTotal;


        html +=
            '<div class="checkout-item">' +

                '<span>' +
                    product +
                '</span>' +

                '<span>' +
                    '× ' + quantity +
                '</span>' +

                '<strong>' +
                    '₹' + itemTotal +
                '</strong>' +

            '</div>';
    }


    checkoutItems.innerHTML = html;


    document.getElementById("checkout-total").innerText =
        "Total: ₹" + total;
}


// ============================================================
// CLOSE CHECKOUT
// ============================================================

function closeCheckout() {

    document.getElementById("checkout-modal").style.display =
        "none";
}


// ============================================================
// PLACE ORDER
// ============================================================

function placeOrder() {

    const name =
        document.getElementById("customer-name")
        .value.trim();

    const email =
        document.getElementById("customer-email")
        .value.trim();

    const phone =
        document.getElementById("customer-phone")
        .value.trim();

    const address =
        document.getElementById("customer-address")
        .value.trim();


    // Check empty fields

    if (
        name === "" ||
        email === "" ||
        phone === "" ||
        address === ""
    ) {

        alert(
            "Please fill in all customer details."
        );

        return;
    }


    // Check email

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if (!emailPattern.test(email)) {

        alert("Please enter a valid email address.");

        return;
    }


    // Check phone

    const phonePattern =
        /^[0-9]{10}$/;


    if (!phonePattern.test(phone)) {

        alert(
            "Please enter a valid 10-digit phone number."
        );

        return;
    }


    // Calculate total

    let total = 0;


    for (let product in cart) {

        total =
            total +
            prices[product] * cart[product];
    }


    // Generate order ID

    const randomNumber =
        Math.floor(
            100000 + Math.random() * 900000
        );


    const orderId =
        "LAB-" + randomNumber;


    // Date

    const orderDate =
        new Date().toLocaleDateString("en-IN");


    // Time

    const orderTime =
        new Date().toLocaleTimeString(
            "en-IN",
            {
                hour: "2-digit",
                minute: "2-digit"
            }
        );


    // Create order object

    const order = {

        id: orderId,

        date: orderDate,

        time: orderTime,

        customerName: name,

        customerEmail: email,

        customerPhone: phone,

        customerAddress: address,

        items: { ...cart },

        total: total,

        status: "Order Placed"
    };


    // Get old orders

    let orders =
        JSON.parse(
            localStorage.getItem("labsaltOrders")
        ) || [];


    // Add new order

    orders.push(order);


    // Save orders

    localStorage.setItem(
        "labsaltOrders",
        JSON.stringify(orders)
    );


    // Show order ID

    document.getElementById("order-id").innerText =
        "Order ID: " + orderId;


    // Close checkout

    closeCheckout();


    // Show success popup

    document.getElementById(
        "order-success-modal"
    ).style.display = "flex";


    // Clear cart

    cart = {};

    displayCart();


    // Clear customer form

    document.getElementById("customer-name").value = "";

    document.getElementById("customer-email").value = "";

    document.getElementById("customer-phone").value = "";

    document.getElementById("customer-address").value = "";


    // Refresh orders

    displayOrders();
}


// ============================================================
// MY ORDERS
// ============================================================

function displayOrders() {

    const ordersList =
        document.getElementById("orders-list");


    const orders =
        JSON.parse(
            localStorage.getItem("labsaltOrders")
        ) || [];


    if (orders.length === 0) {

        ordersList.innerHTML =
            "<p>No orders yet.</p>";

        return;
    }


    let html = "";


    // Show newest order first

    for (
        let i = orders.length - 1;
        i >= 0;
        i--
    ) {

        const order = orders[i];

        let itemsHTML = "";


        for (let product in order.items) {

            const quantity =
                order.items[product];

            const itemTotal =
                prices[product] * quantity;


            itemsHTML +=

                '<div class="order-item">' +

                    '<span>' +
                        product +
                    '</span>' +

                    '<span>' +
                        '× ' + quantity +
                    '</span>' +

                    '<strong>' +
                        '₹' + itemTotal +
                    '</strong>' +

                '</div>';
        }


        html +=

            '<div class="order-card">' +

                '<div class="order-header">' +

                    '<h3>📦 ' +
                        order.id +
                    '</h3>' +

                    '<span class="order-status">' +
                        order.status +
                    '</span>' +

                '</div>' +

                '<p>' +
                    '<strong>Date:</strong> ' +
                    order.date +
                '</p>' +

                '<p>' +
                    '<strong>Time:</strong> ' +
                    order.time +
                '</p>' +

                '<p>' +
                    '<strong>Customer:</strong> ' +
                    order.customerName +
                '</p>' +

                '<div class="order-items">' +

                    '<h4>Items</h4>' +

                    itemsHTML +

                '</div>' +

                '<p class="order-total">' +

                    '<strong>Total: ₹' +
                    order.total +
                    '</strong>' +

                '</p>' +

            '</div>';
    }


    ordersList.innerHTML = html;
}


// ============================================================
// ORDER SUCCESS
// ============================================================

function closeOrderSuccess() {

    document.getElementById(
        "order-success-modal"
    ).style.display = "none";


    document.getElementById(
        "orders"
    ).scrollIntoView({
        behavior: "smooth"
    });
}


// ============================================================
// BUY NOW
// ============================================================

function buyNow(productName) {

    // Start with selected product only

    cart = {};

    cart[productName] = 1;


    // Update cart

    displayCart();


    // Open checkout

    checkout();
}


// ============================================================
// SEARCH PRODUCTS
// ============================================================

function searchProducts() {

    const searchText =
        document.getElementById("search")
        .value
        .toLowerCase()
        .trim();


    const products =
        document.querySelectorAll(".product");


    products.forEach(function(product) {

        const name =
            product
            .querySelector(".product-name")
            .innerText
            .toLowerCase();


        if (name.includes(searchText)) {

            product.style.display = "flex";

        } else {

            product.style.display = "none";
        }

    });
}


// ============================================================
// CATEGORY FILTER
// ============================================================

function filterCategory(category) {

    const products =
        document.querySelectorAll(".product");


    products.forEach(function(product) {

        if (
            product.dataset.category ===
            category
        ) {

            product.style.display = "flex";

        } else {

            product.style.display = "none";
        }

    });


    document.getElementById(
        "products"
    ).scrollIntoView({
        behavior: "smooth"
    });
}


// ============================================================
// SHOW ALL PRODUCTS
// ============================================================

function showAllProducts() {

    const products =
        document.querySelectorAll(".product");


    products.forEach(function(product) {

        product.style.display = "flex";

    });


    document.getElementById("search").value = "";
}


// ============================================================
// CATEGORY MESSAGE
// ============================================================

function showCategoryMessage(category) {

    alert(
        category +
        " products will be added soon!"
    );
}


// ============================================================
// HERO
// ============================================================

function scrollToProducts() {

    document.getElementById(
        "products"
    ).scrollIntoView({
        behavior: "smooth"
    });
}


// ============================================================
// PRODUCT DETAILS
// ============================================================

function showProductDetails(productName) {

    const product =
        productDetails[productName];


    if (!product) {
        return;
    }


    document.getElementById(
        "modal-product-name"
    ).innerText = productName;


    document.getElementById(
        "modal-formula"
    ).innerText =
        "Formula: " +
        product.formula;


    document.getElementById(
        "modal-grade"
    ).innerText =
        "Grade: " +
        product.grade;


    document.getElementById(
        "modal-purity"
    ).innerText =
        "Purity: " +
        product.purity;


    document.getElementById(
        "modal-pack"
    ).innerText =
        "Pack Size: " +
        product.pack;


    document.getElementById(
        "modal-price"
    ).innerText =
        "Price: ₹" +
        product.price;


    document.getElementById(
        "modal-description"
    ).innerText =
        product.description;


    document.getElementById(
        "modal-cart-button"
    ).onclick = function() {

        addToCart(productName);

        closeProductDetails();
    };


    document.getElementById(
        "product-modal"
    ).style.display = "flex";
}


// ============================================================
// CLOSE PRODUCT DETAILS
// ============================================================

function closeProductDetails() {

    document.getElementById(
        "product-modal"
    ).style.display = "none";
}


// ============================================================
// LOGIN / REGISTER
// ============================================================


// OPEN LOGIN

function openLogin() {

    document.getElementById(
        "login-modal"
    ).style.display = "flex";


    showLogin();
}


// CLOSE LOGIN

function closeLogin() {

    document.getElementById(
        "login-modal"
    ).style.display = "none";
}


// SHOW LOGIN

function showLogin() {

    document.getElementById(
        "login-form"
    ).style.display = "block";


    document.getElementById(
        "register-form"
    ).style.display = "none";
}


// SHOW REGISTER

function showRegister() {

    document.getElementById(
        "login-form"
    ).style.display = "none";


    document.getElementById(
        "register-form"
    ).style.display = "block";
}


// ============================================================
// REGISTER
// ============================================================

function registerUser() {

    const name =
        document.getElementById(
            "register-name"
        ).value.trim();


    const email =
        document.getElementById(
            "register-email"
        ).value.trim()
        .toLowerCase();


    const password =
        document.getElementById(
            "register-password"
        ).value;


    const confirmPassword =
        document.getElementById(
            "register-confirm-password"
        ).value;


    if (
        name === "" ||
        email === "" ||
        password === "" ||
        confirmPassword === ""
    ) {

        alert(
            "Please fill in all fields."
        );

        return;
    }


    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if (!emailPattern.test(email)) {

        alert(
            "Please enter a valid email address."
        );

        return;
    }


    if (password.length < 6) {

        alert(
            "Password must contain at least 6 characters."
        );

        return;
    }


    if (password !== confirmPassword) {

        alert(
            "Passwords do not match."
        );

        return;
    }


    // Save user

    localStorage.setItem(
        "labsaltUser",
        JSON.stringify({

            name: name,

            email: email,

            password: password

        })
    );


    alert(
        "Registration successful! Please login."
    );


    // Clear form

    document.getElementById(
        "register-name"
    ).value = "";

    document.getElementById(
        "register-email"
    ).value = "";

    document.getElementById(
        "register-password"
    ).value = "";

    document.getElementById(
        "register-confirm-password"
    ).value = "";


    showLogin();
}


// ============================================================
// LOGIN
// ============================================================

function loginUser() {

    const email =
        document.getElementById(
            "login-email"
        ).value.trim()
        .toLowerCase();


    const password =
        document.getElementById(
            "login-password"
        ).value;


    const storedUser =
        localStorage.getItem(
            "labsaltUser"
        );


    if (!storedUser) {

        alert(
            "No account found. Please register first."
        );

        return;
    }


    const user =
        JSON.parse(storedUser);


    if (
        email === user.email &&
        password === user.password
    ) {

        localStorage.setItem(
            "labsaltLoggedIn",
            "true"
        );


        alert(
            "Welcome back, " +
            user.name +
            "!"
        );


        document.getElementById(
            "login-email"
        ).value = "";

        document.getElementById(
            "login-password"
        ).value = "";


        closeLogin();

        updateLoginButton();

    } else {

        alert(
            "Incorrect email or password."
        );
    }
}


// ============================================================
// UPDATE LOGIN BUTTON
// ============================================================

function updateLoginButton() {

    const button =
        document.getElementById(
            "login-button"
        );


    const storedUser =
        localStorage.getItem(
            "labsaltUser"
        );


    const loggedIn =
        localStorage.getItem(
            "labsaltLoggedIn"
        );


    if (
        storedUser &&
        loggedIn === "true"
    ) {

        const user =
            JSON.parse(storedUser);


        button.innerText =
            "Welcome, " +
            user.name;


        // Remove HTML inline onclick

        button.removeAttribute("onclick");


        button.onclick =
            logoutUser;

    } else {

        button.innerText = "Login";


        button.onclick =
            openLogin;
    }
}


// ============================================================
// LOGOUT
// ============================================================

function logoutUser() {

    localStorage.removeItem(
        "labsaltLoggedIn"
    );


    alert(
        "You have been logged out."
    );


    updateLoginButton();
}


// ============================================================
// CLOSE MODALS WHEN CLICKING OUTSIDE
// ============================================================

window.addEventListener(
    "click",
    function(event) {

        const productModal =
            document.getElementById(
                "product-modal"
            );

        const loginModal =
            document.getElementById(
                "login-modal"
            );

        const checkoutModal =
            document.getElementById(
                "checkout-modal"
            );

        const successModal =
            document.getElementById(
                "order-success-modal"
            );


        if (
            event.target === productModal
        ) {

            closeProductDetails();
        }


        if (
            event.target === loginModal
        ) {

            closeLogin();
        }


        if (
            event.target === checkoutModal
        ) {

            closeCheckout();
        }


        if (
            event.target === successModal
        ) {

            closeOrderSuccess();
        }

    }
);


// ============================================================
// PAGE LOAD
// ============================================================

window.addEventListener(
    "DOMContentLoaded",
    function() {

        displayCart();

        updateLoginButton();

        displayOrders();

    }
);