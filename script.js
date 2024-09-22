const menu = document.getElementById("menu")
const cartbtn = document.getElementById("cart-btn")
const cartModal = document.getElementById("cart-modal")
const cartItems = document.getElementById("cart-items")
const cartTotal = document.getElementById("cart-total")
const checkoutBtn = document.getElementById("checkout-btn")
const closeModalBtn = document.getElementById("close-modal")
const cartCounter = document.getElementById("cart-count")
const nameInput = document.getElementById("name")
const nameWarn = document.getElementById("name-warn")
const addressInput = document.getElementById("address")
const addressWarn = document.getElementById("address-warn")
const addBtn = document.getElementById("add-btn")
const deleteBtn = document.getElementById("delete-btn")
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
        <p> ${item.quantity} </p>
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

addressInput.addEventListener("input", function(event){
    let inputValue = event.target.value;
    if(inputValue !== ""){
        addressInput.classList.remove("border-red-500")
        addressWarn.classList.add("hidden")
    }
    
})

nameInput.addEventListener("input", function(event){
    let inputValue = event.target.value;
    if(inputValue !== ""){
        nameInput.classList.remove("border-red-500")
        nameWarn.classList.add("hidden")
    }
    
})

deleteBtn.addEventListener("click", function(event){
    let parentButton = event.target.closest(".delete-btn")
    if(parentButton){
        cart.length = 0;
        nameInput.value = ""
        addressInput.value = ""
    }
    updateCartModal()
})

checkoutBtn.addEventListener("click", function(){
    const isOpen = checkRestaurantOpen();

    if(!isOpen){
        Toastify({
            text: "O restaurante está fechado!",
            duration: 3000,
            destination: "https://github.com/apvarun/toastify-js",
            newWindow: true,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "left", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
            background: "linear-gradient(to right,red, red, red)",
            }
        }).showToast()
        return;
    }
    
    if(cart.length === 0) return;
        if(addressInput.value === ""){
            addressWarn.classList.remove("hidden")
            addressInput.classList.add("border-red-500")
            
        }
        if(nameInput.value === ""){
            nameWarn.classList.remove("hidden")
            nameInput.classList.add("border-red-500")
            return;
        }

        const cartItemsMap = cart.map((item) => {
            return(
                `*${item.name}* \n *Quantidade:* ${item.quantity} \n *Preço:* R$${item.price}  \n\n`
            )
        }).join("")
        const message = encodeURIComponent(cartItemsMap)
        const phone = "71999715055"

        window.open(`https://wa.me/${phone}?text=${message} `, `Nome: ${nameInput.value} \n Endereço: ${addressInput.value}`, "_blank")

        cart.length = 0;
        nameInput.value = ""
        addressInput.value = ""
        cartModal.style.display = "none";
        updateCartModal()
    })

function checkRestaurantOpen(){
    const data = new Date();
    const hora = data.getHours();
    return hora >= 18 && hora < 22;
}

const spanItem = document.getElementById("date-span")
const isOpen = checkRestaurantOpen();

if(isOpen){
    spanItem.classList.remove("bg-red-500");
    spanItem.classList.add("bg-green-600")
    
}else{
    spanItem.classList.remove("bg-green-600");
    spanItem.classList.add("bg-red-500")
    const ClosedSpan = document.createElement("div");
    ClosedSpan.classList.add("flex", "justify-between", "mb-4", "flex-col")



    ClosedSpan.innerHTML = `
    <div class="flex items-center justify-center text-white">
        <div>
        <p class="font-medium">Fechado</p>
        </div>
        `
    spanItem.appendChild(ClosedSpan)
}