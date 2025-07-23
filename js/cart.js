$(document).ready(function () {
    const storedCart = sessionStorage.getItem('cart');
    const cart = storedCart ? JSON.parse(storedCart) : [];

    let total = 0;

    if (cart.length === 0) {
        $('.cartItems').append('<p>Your cart is empty</p>');
    } else {
        $('.cartItems').append(`
            <div>
                <h1>Shopping Cart</h1>
            </div>
            <div class='cartItemsButtons dekstop'>
                <button class="btn1">KEEP SHOPPING</button>
                <button class="btn2">CLEAR CART</button>
            </div>
        `);

        $('.cartTables').append(`
            <table class=cart-table>
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
                <tbody class="cartBody">
                </tbody>
            </table>
        `);

        $.each(cart, function (index, cart) {
            const subtotal = cart.price * cart.cartQuantity;
            total += subtotal;

            $('.cartBody').append(`
                <tr data-index="${index}" class="tr">
                    <td data-label="Image"><img src="${cart.img}" alt="${cart.title}" width="100px"></td>
                    <td data-label="Title">${cart.title}</td>
                    <td data-label="Description">${cart.text.slice(0, 250)}...</td>
                    <td data-label="Availability">Typically ships in: ${cart.shippingInfo} days</td>
                    <td data-label="Qty"><input type="number" class="productsCount" value="${cart.cartQuantity}" min="1" max="${cart.quantity}"></td>
                    <td data-label="Unit Price">$${cart.price}</td>
                    <td data-label="Ext. Price">$${subtotal.toFixed(2)}</td>
                    <td data-label="Action"><img src="img/delete.png" class="deleteFromCart" data-code="${cart.code}"></td>
                </tr>
            `);

            $('.cartMobile').append(`
                <div class="cart-mobile" data-index="${index}">
                    <button class="remove-x deleteFromCart" data-code="${cart.code}">&times;</button>
                    <div class="mobile-left">
                        <img src="${cart.img}" alt="belt">
                        <div class="availability">
                            Typically ships in: ${cart.shippingInfo} days
                        </div>
                    </div>
                    <div class="mobile-right">
                        <div class="cart-title">
                            ${cart.title}
                        </div>
                        <div class="cart-meta">
                            MPN: <strong>${cart.subtitle}</strong>
                        </div>
                        <div class="price">
                            $${cart.price}
                        </div>
                        <div class="qty-controls">
                            <input type="number" class="productsCount" value="${cart.cartQuantity}" min="1" max="${cart.quantity}">
                        </div>
                    </div>
                </div>
            `);

            $('.cartMobile').append(`
                <div class="cartMobileButtons cartItemsButtons">
                    <button class="btn1">KEEP SHOPPING</button>
                    <button class="btn2">CLEAR CART</button>
                </div>
            `);
        });

        

        $(document).on('click', '.deleteFromCart', function () {
            const cartIndex = $(this).closest('.tr').data('index');

            if (confirm('Are you sure you want to remove this item from the cart?')) {
                let cart = JSON.parse(sessionStorage.getItem('cart')) || [];

                cart.splice(cartIndex, 1);

                sessionStorage.setItem('cart', JSON.stringify(cart));

                location.reload();
            }
        });

        $(document).on('change', '.productsCount', function () {
            const cartIndex = $(this).closest('.tr').data('index');
            const cartQuantity = parseInt($('.productsCount').val());

            let cart = JSON.parse(sessionStorage.getItem('cart')) || [];
            cart[cartIndex].cartQuantity = cartQuantity

            sessionStorage.setItem('cart', JSON.stringify(cart));

            location.reload();
        })

        $(document).on('click', '.btn2', function () {
            const cartIndex = $(this).closest('.tr').data('index');

            if (confirm('Are you sure you want to clear the cart?')) {
                let cart = []

                sessionStorage.setItem('cart', JSON.stringify(cart));

                location.reload();
            }
        });

        $(document).on('click', '.btn1', function () {
            window.location.href = 'index.html';
        });

        $('.summary').append(`<h3>$${total.toFixed(2)}</h3>`);
    }
});