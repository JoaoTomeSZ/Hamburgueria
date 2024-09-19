const menu = document.getElementById("menu")
const cartbtn = document.getElementById("cart-btn")
const cartModal = document.getElementById("cart-modal")
const cartItems = document.getElementById("cart-items")
const cartTotal = document.getElementById("cart-total")
const checkoutBtn = document.getElementById("checkout-btn")
const closeModalBtn = document.getElementById("close-modal")
const countCounter = document.getElementById("cart-count")
const addressInput = document.getElementById("address")
const addressWarn = document.getElementById("address-warn")

let cart = [];

cartbtn.addEventListener("click", function(){
    cartModal.style.display = "flex";
    updateCartModal()
})

cartModal.addEventListener("click", function(event){
        if(event.target === cartModal || event.target === closeModalBtn){
            cartModal.style.display = "none";
        }
})

menu.addEventListener("click", function(event){
    let parentButton = event.target.closest(".add-to-cart-btn")
    if(parentButton){
        const name = parentButton.getAttribute("data-name")
        const price = parseFloat(parentButton.getAttribute("data-price"))
        addToCart(name, price)
    }
})

function addToCart(name, price){
    const existingItem = cart.find(item => item.name === name);

    if(existingItem){
        existingItem.quantity += 1;
        return
    }else{
        cart.push({
            name,
            price,
            quantity: 1,
    })
    }
    updateCartModal()
}

function updateCartModal(){
    cartItems.innerHTML = "";
    let total = 0

    cart.forEach(item => {
    const cartItemElement = document.createElement("div");
    cartItemElement.classList.add("flex", "justify-between", "mb-4", "flex-col")
    cartItemElement.innerHTML = `
    <div class="flex items-center justify-between">
        <div>
        <p class="font-medium">${item.name}</p>
        </div>
        <div>
        <p>${item.quantity}</p>
        </div>
        <div>
        <p class="font-medium">R$ ${item.price}</p>
        </div>

        <div>
            <button>Remover</button>
        </div>
    </div>
    `

    cartItems.appendChild(cartItemElement)
    })
}
