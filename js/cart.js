$(document).ready(function () {
    const storedCart = sessionStorage.getItem('cart');
    let cart = storedCart ? JSON.parse(storedCart) : [];

    if (cart.length === 0) {
        renderEmptyCart();
    } else {
        renderCartHeader();
        renderCartMobileItems(cart);
        renderCartButtons();
        renderSummary(calculateTotal(cart));
        bindEvents();
    }

    function renderEmptyCart() {
        $('.cartItems').append('<p>Your cart is empty</p>');
    }

    function renderCartHeader() {
        $('.cartItems').append(`<div><h1>Shopping Cart</h1></div>`);
    }

    function renderCartButtons() {
        $('.cartMobile').append(`
            <div class="cartMobileButtons cartItemsButtons">
                <button class="btn1">KEEP SHOPPING</button>
                <button class="btn2">CLEAR CART</button>
            </div>
        `);
    }

    function calculateTotal(cart) {
        return cart.reduce((sum, item) => sum + item.cartQuantity * item.price, 0);
    }

    function renderSummary(total) {
        $('.summary').empty().append(`<h3>Total: $${total.toFixed(2)}</h3>`);
    }

    function renderCartMobileItems(cart) {
        $('.cartMobile').empty();
        cart.forEach((item, index) => {
            const itemTotal = (item.price * item.cartQuantity).toFixed(2);
            $('.cartMobile').append(`
                <div class="cart-mobile" data-index="${index}">
                    <button class="remove-x deleteFromCart" data-code="${item.code}">X</button>
                    <div class="mobile-left">
                        <img src="${item.img}" alt="${item.title}">
                        <div class="availability"><a href="#">Typically ships in: ${item.shippingInfo} days</a></div>
                    </div>
                    <div class="mobile-right">
                        <div class="cart-title">${item.title}</div>
                        <div class="cart-meta"><span class="codeSpan">Manufacturer <span class="productCode codeSpan rexnord">Rexnord</span></span></div>
                        <div class="cart-meta"><strong>${item.code}</strong></div>
                        <div class="price">$${itemTotal}</div>
                    </div>
                    <div class="qty-controls">
                        <button class="qty-minus">−</button>
                        <input type="number" class="productsCount cartProductsCount" value="${item.cartQuantity}" min="1" max="${item.quantity}">
                        <button class="qty-plus">+</button>
                    </div>
                </div>
            `);
        });
    }

    function updateCartUI() {
        renderCartMobileItems(cart);
        renderSummary(calculateTotal(cart));
    }

    let deleteIndex = null;
    let clearAll = false;

    function bindEvents() {
        $(document).on('click', '.qty-minus', function () {
            const index = $(this).closest('.cart-mobile').data('index');
            if (cart[index].cartQuantity > 1) {
                cart[index].cartQuantity--;
                sessionStorage.setItem('cart', JSON.stringify(cart));
                updateCartUI();
            }
        });

        $(document).on('click', '.qty-plus', function () {
            const index = $(this).closest('.cart-mobile').data('index');
            if (cart[index].cartQuantity < cart[index].quantity) {
                cart[index].cartQuantity++;
                sessionStorage.setItem('cart', JSON.stringify(cart));
                updateCartUI();
            }
        });

        $(document).on('change', '.productsCount', function () {
            const index = $(this).closest('.cart-mobile').data('index');
            const newQty = parseInt($(this).val());
            if (newQty > 0 && newQty <= cart[index].quantity) {
                cart[index].cartQuantity = newQty;
                sessionStorage.setItem('cart', JSON.stringify(cart));
                updateCartUI();
            } else {
                alert("Invalid quantity");
                $(this).val(cart[index].cartQuantity);
            }
        });

        $(document).on('click', '.deleteFromCart', function () {
            deleteIndex = $(this).closest('[data-index]').data('index');
            clearAll = false;
            $('#deleteModal').fadeIn();
        });

        $(document).on('click', '.btn2', function () {
            clearAll = true;
            $('#deleteModal').fadeIn();
        });

        $('#modalCancel').on('click', function () {
            $('#deleteModal').fadeOut();
            deleteIndex = null;
            clearAll = false;
        });

        $('#modalConfirm').on('click', function () {
            if (clearAll) {
                sessionStorage.setItem('cart', JSON.stringify([]));
                location.reload();
            } else if (deleteIndex !== null) {
                cart.splice(deleteIndex, 1);
                sessionStorage.setItem('cart', JSON.stringify(cart));
                updateCartUI();
                if (cart.length === 0) location.reload();
            }
            $('#deleteModal').fadeOut();
        });

        $(document).on('click', '.btn1', function () {
            window.location.href = 'index.html';
        });
    }
});