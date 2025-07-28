const products = [{
    img: 'productsImages/img1.jpg',
    title: '312 3M 9 HTD Timing Belts',
    subtitle: 'BESTORQ',
    code: 'MPN: 312-3M-9',
    text: '312-3M-9 HTD timing / synchronous belts are the third generation of high capacity industrial belts offering reliable, trouble-free and economical alternative to chain drives. Compared to chain drives these belts are cleaner, quitter, lower in cost and lubrication-free. They feature an engineered HTD-type tooth profile providing high performance. • The belts feature high temperature chloroprene polymer throughout. • The helically wound tensile cords are specially engineered, twisted and chemically set stranded fiberglass material. •The high performance, woven, nylon based, fabric facing material has been engineered and tested for highly wear resistant performance. • The backing is precision ground for smooth uniform running.',
    price: 4.50,
    quantity: 100,
    shippingInfo: 2
},
{
    img: 'productsImages/img2.png',
    title: '312-3M-6 Bando HTD Timing Belt',
    subtitle: 'Bando',
    code: 'MPN: 312-3M-6',
    text: '300-3M-6 high torque drive (HTD) timing belts’ curvilinear tooth design improves stress distribution to provide high horsepower ratings over a wide speed range and high torque transmission at low speeds. They are made of highly durable rubber compound with a glass cord tension member. • Belt drives are 99% efficient, leading to significant energy savings on high horsepower applications. • The belts are thin and flexible, so they don’t generate heat build up delivering long service life. • The rounded tooth profile meshes precisely with matching pulley grooves so there is no belt creep or slip to cause speed variation. • Continuous, helically-wound S and Z oriented fiberglass cord is the load-carrying muscle of the belt, resisting elongation and shock loads while providing excellent strength and service life.',
    price: 5.01,
    quantity: 100,
    shippingInfo: 1
},
{
    img: 'productsImages/img3.png',
    title: '612-3M-9 Bando HTD Timing Belt',
    subtitle: 'Bando',
    code: 'MPN: 612-3M-9',
    text: '612-3M-9 high torque drive (HTD) timing belts’ curvilinear tooth design improves stress distribution to provide high horsepower ratings over a wide speed range and high torque transmission at low speeds. They are made of highly durable rubber compound with a glass cord tension member. • Belt drives are 99% efficient, leading to significant energy savings on high horsepower applications. • The belts are thin and flexible, so they don’t generate heat build up delivering long service life. • The rounded tooth profile meshes precisely with matching pulley grooves so there is no belt creep or slip to cause speed variation. • Continuous, helically-wound S and Z oriented fiberglass cord is the load-carrying muscle of the belt, resisting elongation and shock loads while providing excellent strength and service life.',
    price: 6.72,
    quantity: 100,
    shippingInfo: 1
},
{
    img: 'productsImages/img6.jpg',
    title: 'SPZ1237 SK Metric V Belt',
    subtitle: 'Optibelt',
    code: 'MPN: SPZ1237',
    text: 'Optibelt S=C Plus (Set Constant) SPZ1237 Metric V-Belts are engineered for all industrial applications from lightly loaded drives. such as those for pumps, up to heavily loaded mills, and even stone crusher drives. The belt is coated with a durable rubber compound on its fabric cover, providing resistance to oil, extreme temperatures (both hot and cold), and the impacts of dust.',
    price: 12.13,
    quantity: 100,
    shippingInfo: 1
}];

const cart = [];

$(document).ready(function () {
    $.each(products, function (index, product) {
        $('.products').append(`
            <div class="product" data-index="${index}">
                <div class="imgProduct">
                    <img src="${product.img}">
                </div>
                <div class="aboutProduct">
                    <span>${product.title}</span>
                    <a href="#">${product.subtitle}</a>
                    <p>${product.code}</p>
                    <p>${product.text.slice(0, 250)}... <a href='#' class="cartText">Read more</a></p>
                </div>
                <div class="priceProduct">
                    <span>${product.price}</span>
                    <input type="number" class="productsCount" value="1" min="1" max="${product.quantity}">
                    <p>Availability:</p>
                </div>
                <div class="addProduct">
                    <button class="addToCart">ADD TO CART</button>
                    <p class="inStock">In Stock</p>
                    <p><a href="#">Typically ships in: ${product.shippingInfo} days</a></p>
                </div>
            </div>
        `);
    });

    function updateCartCount() {
        const storedCart = sessionStorage.getItem('cart');
        const cart = storedCart ? JSON.parse(storedCart) : [];
        let totalCount = 0;
        cart.forEach(item => {
            totalCount += item.cartQuantity;
        });
        $('.cartCount p').text(totalCount);
    }

    $(document).on('click', '.addToCart', function () {
        const productIndex = $(this).closest('.product').data('index');
        const parent = $(this).closest('.product');
        const cartQuantity = parseInt(parent.find('.productsCount').val());

        const product = products[productIndex];

        let cart = JSON.parse(sessionStorage.getItem('cart')) || [];

        const existingProduct = cart.find(item => item.code === product.code);
        if (existingProduct) {
            existingProduct.cartQuantity += cartQuantity;
        } else {
            cart.push({
                ...product,
                cartQuantity: cartQuantity
            });
        }

        sessionStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();

        const thisButton = $('.addToCart')[productIndex]
        thisButton.disabled = true;
        thisButton.textContent = 'ADDED'
        thisButton.style.backgroundColor = "rgba(255, 0, 0, 0.5)";
        thisButton.style.width = "70px";
        thisButton.style.height = "40px";
        setTimeout(() => {
            thisButton.disabled = false;
            thisButton.textContent = 'ADD TO CART'
            thisButton.style.backgroundColor = "red"
            thisButton.style.width = "113px";
            thisButton.style.height = "69px";
        }, 3000)
    });

});
