$(document).ready(function () {
    const storedCart = sessionStorage.getItem('cart');
    let cart = storedCart ? JSON.parse(storedCart) : [];
    let total = 0;

    if (cart.length === 0) {
        renderEmptyCart();
    } else {
        renderCartHeader();
        renderCartTable();
        renderCartItems(cart);
        renderCartMobileItems(cart);
        renderCartButtons();
        renderSummary(total);

        bindEvents(cart);
    }


    function renderEmptyCart() {
        $('.cartItems').append('<p>Your cart is empty</p>');
    }

    function renderCartHeader() {
        $('.cartItems').append(`
            <div>
                <h1>Shopping Cart</h1>
            </div>
        `);
    }

    function renderCartButtons() {
        $('.cartItems').append(`
            <div class='cartItemsButtons desktop'>
                <button class="btn1">KEEP SHOPPING</button>
                <button class="btn2">CLEAR CART</button>
            </div>
        `);
        $('.cartMobile').append(`
            <div class="cartMobileButtons cartItemsButtons">
                <button class="btn1">KEEP SHOPPING</button>
                <button class="btn2">CLEAR CART</button>
            </div>
        `);
    }

    function renderCartTable() {
        $('.cartTables').append(`
            <table class="cart-table">
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Title</th>
                        <th>Item Description</th>
                        <th>Availability</th>
                        <th>Qty</th>
                        <th>Unit Price</th>
                        <th>Ext. Price</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody class="cartBody"></tbody>
            </table>
        `);
    }

    function renderCartItems(cart) {
        total = 0;
        cart.forEach((item, index) => {
            const subtotal = item.price * item.cartQuantity;
            total += subtotal;

            $('.cartBody').append(`
                <tr data-index="${index}" class="tr">
                    <td data-label="Image"><img src="${item.img}" alt="${item.title}" width="100px"></td>
                    <td data-label="Title">${item.title}</td>
                    <td data-label="Description">${item.text.slice(0, 250)}...</td>
                    <td data-label="Availability">Typically ships in: ${item.shippingInfo} days</td>
                    <td data-label="Qty"><input type="number" class="productsCount" value="${item.cartQuantity}" min="1" max="${item.quantity}"></td>
                    <td data-label="Unit Price">$${item.price}</td>
                    <td data-label="Ext. Price">$${subtotal.toFixed(2)}</td>
                    <td data-label="Action"><img src="img/delete.png" class="deleteFromCart" data-code="${item.code}"></td>
                </tr>
            `);
        });
    }

    function renderCartMobileItems(cart) {
        $('.cartMobile').empty();
        cart.forEach((item, index) => {
            $('.cartMobile').append(`
                <div class="cart-mobile" data-index="${index}">
                    <button class="remove-x deleteFromCart" data-code="${item.code}">&times;</button>
                    <div class="mobile-left">
                        <img src="${item.img}" alt="${item.title}">
                        <div class="availability">Typically ships in: ${item.shippingInfo} days</div>
                    </div>
                    <div class="mobile-right">
                        <div class="cart-title">${item.title}</div>
                        <div class="cart-meta">MPN: <strong>${item.subtitle}</strong></div>
                        <div class="price">$${item.price}</div>
                        <div class="qty-controls">
                            <input type="number" class="productsCount" value="${item.cartQuantity}" min="1" max="${item.quantity}">
                        </div>
                    </div>
                </div>
            `);
        });
    }

    function renderSummary(total) {
        $('.summary').empty();
        $('.summary').append(`<h3>$${total.toFixed(2)}</h3>`);
    }

    function bindEvents(cart) {
        $(document).on('click', '.deleteFromCart', function () {
            const cartIndex = $(this).closest('[data-index]').data('index');

            if (confirm('Are you sure you want to remove this item from the cart?')) {
                cart.splice(cartIndex, 1);
                sessionStorage.setItem('cart', JSON.stringify(cart));
                location.reload();
            }
        });

        $(document).on('change', '.productsCount', function () {
            const cartIndex = $(this).closest('[data-index]').data('index');
            const cartQuantity = parseInt($(this).val());

            if (cartQuantity > 0 && cartQuantity <= cart[cartIndex].quantity) {
                cart[cartIndex].cartQuantity = cartQuantity;
                sessionStorage.setItem('cart', JSON.stringify(cart));
                location.reload();
            } else {
                alert('Invalid quantity');
                $(this).val(cart[cartIndex].cartQuantity);
            }
        });

        $(document).on('click', '.btn2', function () {
            if (confirm('Are you sure you want to clear the cart?')) {
                sessionStorage.setItem('cart', JSON.stringify([]));
                location.reload();
            }
        });

        $(document).on('click', '.btn1', function () {
            window.location.href = 'index.html';
        });
    }
});
