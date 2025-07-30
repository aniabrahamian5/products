$(document).ready(function () {
    const storedCart = sessionStorage.getItem('cart');
    let cart = storedCart ? JSON.parse(storedCart) : [];

    if (cart.length === 0) {
        renderEmptyCart();
    } else {
        renderCartHeader();
        renderCartMobileItems(cart);
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
        $('.cartButtons').empty();
        $('.cartButtons').append(`
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
        renderCartButtons()
    }

    function renderCartMobileItems(cart) {
        $('.cartMobile').empty();
    cart.forEach((item, index) => {
        const itemTotal = (item.price * item.cartQuantity).toFixed(2);
        $('.cartMobile').append(`
            <div class="cart-mobile" data-index="${index}">
                <button class="remove-x deleteFromCart" data-code="${item.code}">
                    <img src="img/close.svg" alt="close" class="closeImg">
                </button>
                <div class="mobile-left">
                    <img src="${item.img}" alt="${item.title}">
                    <div class="availability"><a href="#">Typically ships in: ${item.shippingInfo} days</a></div>
                </div>
                <div class="mobile-right">
                    <div class="cart-title">${item.title}</div>
                    <div class="cart-meta">
                        <span class="codeSpan">Manufacturer 
                            <span class="productCode codeSpan rexnord">Rexnord</span>
                        </span>
                    </div>
                    <div class="cart-meta">${item.code}</div>
                    <div class="price">$${itemTotal}</div>
                </div>
                <div class="qty-controls">
                    <button class="qty-minus qty-control">
                        <img src="img/minus.svg" alt="minus" class="minusImg">
                    </button>
                    <p class="cartProductsCount">${item.cartQuantity}</p>
                    <button class="qty-plus qty-control">
                        <img src="img/add.svg" alt="add" class="addImg">
                    </button>
                </div>
            </div>
        `);
    });
    }

    function updateCartUI() {
        renderCartMobileItems(cart);
        renderSummary(calculateTotal(cart));
    }

    function updateQuantity(index, delta) {
        if (typeof cart[index] === 'undefined') return;
        const item = cart[index];
        const newQty = item.cartQuantity + delta;
        if (newQty >= 1 && newQty <= item.quantity) {
            item.cartQuantity = newQty;
            sessionStorage.setItem('cart', JSON.stringify(cart));
            updateCartUI();
        }
    }

    let deleteIndex = null;
    let clearAll = false;

    function bindEvents() {
        $(document).on('click', '.qty-minus', function () {
            const index = $(this).closest('.cart-mobile').data('index');
            updateQuantity(index, -1);
        });

        $(document).on('click', '.qty-plus', function () {
            const index = $(this).closest('.cart-mobile').data('index');
            updateQuantity(index, 1);
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
