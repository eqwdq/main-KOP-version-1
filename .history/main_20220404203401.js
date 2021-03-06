if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
    console.log('loading');
} else {
    ready()
}
setTimeout(ready, 3000)
function ready () {
    console.log('ready');
    var removeCartItemButtons = document.getElementsByClassName('btn-outline-danger')
    for(var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }
    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for(var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }
    var addToCartButtons = document.getElementsByClassName('shop-item-button')
    console.log(addToCartButtons.length);
    for(var i = 0; i < addToCartButtons.length; i++) {

        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }
    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
}

function purchaseClicked() {
    alert('Dakujeme za nákup')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
}

function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.parentElement.remove()
    updateCartTotal()
}

function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}

function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement.parentElement
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
    console.log(title, price, imageSrc)
    addItemToCart(title, price, imageSrc)
    updateCartTotal()
}

var cartBadge = document.getElementsByClassName('badge rounded-pill bg-danger');

function addItemToCart(title, price, imageSrc) {
    var cartRow = document.createElement('div')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    cartBadge[0].innerHTML = cartItemNames.length + 1;
    for (var i = 0; i< cartItemNames.length; i++){
        if(cartItemNames[i].innerText == title){
            alert('tento produkt máte v košíku')
            return
        }
    }
    var cartRowContents = `
    <div class="col cart-row">
        <div class="card shadow-sm bg-light mb-2 cart-item">
            <img src="${imageSrc}" class="img-fluid" alt="">
            <div class="card-body text-center">
                <h6 class="cart-item-title">${title}</h6>
            </div>
            <div class="card-footer">
                <p class="float-start cart-price">${price}</p>
                <button class="btn btn-outline-danger btn-sm float-end">Vymazať</button>
                <input type="number" value="10" class="float-end cart-quantity-input">
            </div>
        </div>
    </div>
    `
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-outline-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}

function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    for(var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('€',''))
        var quantity = quantityElement.value
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText =  total + "€"
}






