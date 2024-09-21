const menu = document.getElementById("menu")
const cartbtn = document.getElementById("cart-btn")
const cartModal = document.getElementById("cart-modal")
const cartItems = document.getElementById("cart-items")
const cartTotal = document.getElementById("cart-total")
const checkoutBtn = document.getElementById("checkout-btn")
const closeModalBtn = document.getElementById("close-modal")
const cartCounter = document.getElementById("cart-count")
const addressInput = document.getElementById("address")
const addressWarn = document.getElementById("address-warn")
const addBtn = document.getElementById("add-btn")
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
    updateCartModal()
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
        <p class="font-medium">R$ ${item.price}</p>
        </div>

        
        <div class="flex items-center gap-2">
        <div class="bg-gray-900 px-2 rounded text-white">
            <button class="remove-btn font-bold" data-name="${item.name}">-</button>
        </div>
        <div>
        <p>( ${item.quantity} )</p>
        </div>
        <div class="bg-gray-900 px-2 rounded text-white">
            <button class="add-btn font-bold" data-name="${item.name}">+</button>
        </div>
        </div>
    </div>
    `
        total += item.price * item.quantity;
    cartItems.appendChild(cartItemElement)
    })

    cartTotal.textContent = total.toLocaleString("pt-BR", {
        style: "currency", currency: "BRL"
    });

    cartCounter.innerText = cart.length
}

cartItems.addEventListener("click", function(event) {
    if(event.target.classList.contains("remove-btn")){
        const name = event.target.getAttribute("data-name")

        removeItemCart(name)
        
    }else if(event.target.classList.contains("add-btn")){
        const name = event.target.getAttribute("data-name")
        plusItem(name)
    }
    updateCartModal()
})

function removeItemCart(name){
    const index = cart.findIndex(item => item.name === name)

    if(index !== -1){
        const item = cart[index];

        if(item.quantity > 1){
            item.quantity -= 1;
           updateCartModal();
           return;
        }else{
            cart.splice(index, 1)
            updateCartModal()
        }
    }
}


function plusItem(name){
    const existingItem = cart.find(item => item.name === name);

    if(existingItem){
        existingItem.quantity += 1;
        return
    }
    updateCartModal()
}