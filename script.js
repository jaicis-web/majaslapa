// Apģērbu saraksts ar to informāciju
const products = [
    {
        id: 1,
        name: "Džinsa jaka",
        price: 59.99,
        category: "jackets",
        image: "./images/jacket1.jpg"
    },
    {
        id: 2,
        name: "Melns T-krekls",
        price: 19.99,
        category: "shirts",
        image: "./images/shirt1.jpg"
    },
    {
        id: 3,
        name: "Džinsi",
        price: 49.99,
        category: "pants",
        image: "./images/pants1.jpg"
    },
    {
        id: 4,
        name: "Žakete",
        price: 79.99,
        category: "jackets",
        image: "./images/jacket2.jpg"
    },
    {
        id: 5,
        name: "Bēšs T-krekls",
        price: 19.99,
        category: "shirts",
        image: "./images/shirt2.jpg"
    },
    {
        id: 6,
        name: "Šorti",
        price: 15.99,
        category: "pants",
        image: "./images/pants2.jpg"
    },
    {
        id: 7,
        name: "Ziemas jaka",
        price: 119.99,
        category: "jackets",
        image: "./images/jacket3.jpg"
    },{
        id: 8,
        name: "Mētelis",
        price: 99.99,
        category: "jackets",
        image: "./images/jacket4.jpg"
    },

];

// Iepirkumu groza masīvs
let cart = [];

// Funkcija apģērbu attēlošanai
function displayProducts(productsToShow = products) {
    const productsContainer = document.getElementById('products');
    productsContainer.innerHTML = '';

    productsToShow.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'product-card';
        productElement.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" style="width: 100%; height: 100%; object-fit: cover;">
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-price">€${product.price}</p>
                <button onclick="addToCart(${product.id})">Pievienot grozam</button>
            </div>
        `;
        productsContainer.appendChild(productElement);
    });
}

// Funkcija apģērbu filtrēšanai
function filterProducts() {
    const categoryFilter = document.getElementById('category-filter').value;
    const priceFilter = document.getElementById('price-filter').value;

    let filteredProducts = products;

    // Filtrēšana pēc kategorijas
    if (categoryFilter !== 'all') {
        filteredProducts = filteredProducts.filter(product => product.category === categoryFilter);
    }

    // Filtrēšana pēc cenas
    if (priceFilter !== 'all') {
        const [min, max] = priceFilter.split('-').map(num => parseInt(num));
        filteredProducts = filteredProducts.filter(product => {
            if (max) {
                return product.price >= min && product.price <= max;
            } else {
                return product.price >= min;
            }
        });
    }

    displayProducts(filteredProducts);
}

// Funkcija preces pievienošanai grozam
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCart();
}

// Funkcija groza atjaunināšanai
function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const cartTotal = document.getElementById('cart-total');
    
    cartItems.innerHTML = '';
    let total = 0;
    let count = 0;

    cart.forEach(item => {
        count += item.quantity;
        total += item.price * item.quantity;
        
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `
            <div>
                <p>${item.name}</p>
                <p>€${item.price} x ${item.quantity}</p>
            </div>
            <button onclick="removeFromCart(${item.id})">X</button>
        `;
        cartItems.appendChild(itemElement);
    });

    cartCount.textContent = count;
    cartTotal.textContent = `€${total.toFixed(2)}`;
}

// Funkcija preces izņemšanai no groza
function removeFromCart(productId) {
    const itemIndex = cart.findIndex(item => item.id === productId);
    if (itemIndex > -1) {
        if (cart[itemIndex].quantity > 1) {
            cart[itemIndex].quantity -= 1;
        } else {
            cart.splice(itemIndex, 1);
        }
    }
    updateCart();
}

// Funkcija groza rādīšanai/slēpšanai
function toggleCart() {
    const cartSidebar = document.getElementById('cart-sidebar');
    const cartOverlay = document.getElementById('cart-overlay');
    cartSidebar.classList.toggle('active');
    cartOverlay.classList.toggle('active');
}

// Funkcija pasūtījuma noformēšanai
function checkout() {
    if (cart.length === 0) {
        alert('Grozs ir tukšs!');
        return;
    }
    alert('Paldies par pirkumu!');
    cart = [];
    updateCart();
    toggleCart();
}

// Sākotnējā apģērbu attēlošana
displayProducts();