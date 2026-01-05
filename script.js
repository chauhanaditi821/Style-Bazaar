       const products = [
            {id: 1, name: "Premium Cotton T-Shirt", category: "men", type: "tshirt", price: 599, original: 999, discount: 40, rating: 4.5, color: "#4a90e2", icon: "👕"},
            {id: 2, name: "Slim Fit Denim Jeans", category: "men", type: "jeans", price: 1299, original: 1999, discount: 35, rating: 4.3, color: "#2c3e50", icon: "👖"},
            {id: 3, name: "Floral Summer Dress", category: "women", type: "dress", price: 1499, original: 2499, discount: 40, rating: 4.7, color: "#e74c3c", icon: "👗"},
            {id: 4, name: "Leather Biker Jacket", category: "men", type: "jacket", price: 3999, original: 5999, discount: 33, rating: 4.8, color: "#34495e", icon: "🧥"},
            {id: 5, name: "Running Sneakers", category: "men", type: "shoes", price: 1799, original: 2999, discount: 40, rating: 4.4, color: "#e67e22", icon: "👟"},
            {id: 6, name: "Evening Cocktail Dress", category: "women", type: "dress", price: 2999, original: 4999, discount: 40, rating: 4.9, color: "#8e44ad", icon: "👗"},
            {id: 7, name: "Kids Cartoon T-Shirt", category: "kids", type: "tshirt", price: 399, original: 699, discount: 43, rating: 4.6, color: "#f39c12", icon: "👕"},
            {id: 8, name: "Women's Denim Jacket", category: "women", type: "jacket", price: 2499, original: 3999, discount: 38, rating: 4.5, color: "#3498db", icon: "🧥"},
            {id: 9, name: "Sport Training Shoes", category: "men", type: "shoes", price: 2499, original: 3999, discount: 38, rating: 4.6, color: "#27ae60", icon: "👟"},
            {id: 10, name: "Kids Denim Jeans", category: "kids", type: "jeans", price: 799, original: 1299, discount: 38, rating: 4.4, color: "#16a085", icon: "👖"},
            {id: 11, name: "Polo Neck T-Shirt", category: "men", type: "tshirt", price: 799, original: 1299, discount: 38, rating: 4.3, color: "#c0392b", icon: "👕"},
            {id: 12, name: "Casual Day Dress", category: "women", type: "dress", price: 1799, original: 2999, discount: 40, rating: 4.5, color: "#d35400", icon: "👗"}
        ];

        let cart = [];
        let filteredProducts = [...products];
        let selectedPayment = 'card';

        function renderProducts() {
            const grid = document.getElementById('productsGrid');
            grid.innerHTML = filteredProducts.map(product => {
                const colorDark = adjustColor(product.color, -20);
                return `
                <div class="product-card" style="--product-color: ${product.color}; --product-color-dark: ${colorDark}">
                    <div class="product-image">
                        <div class="discount-badge">${product.discount}% OFF</div>
                        <span style="position: relative; z-index: 1;">${product.icon}</span>
                    </div>
                    <div class="product-info">
                        <div class="product-category">${product.category} • ${product.type}</div>
                        <div class="product-name">${product.name}</div>
                        <div class="rating">
                            <span class="stars">★★★★★</span>
                            <span>${product.rating}</span>
                        </div>
                        <div class="product-price">
                            ₹${product.price}
                            <span class="original-price">₹${product.original}</span>
                        </div>
                        <button class="add-to-cart" onclick="addToCart(${product.id})">
                            Add to Cart
                        </button>
                    </div>
                </div>
            `}).join('');
        }

        function adjustColor(color, amount) {
            const num = parseInt(color.replace("#",""), 16);
            const r = Math.max(0, Math.min(255, (num >> 16) + amount));
            const g = Math.max(0, Math.min(255, ((num >> 8) & 0x00FF) + amount));
            const b = Math.max(0, Math.min(255, (num & 0x0000FF) + amount));
            return "#" + ((r << 16) | (g << 8) | b).toString(16).padStart(6, '0');
        }

        function filterProducts() {
            const category = document.getElementById('categoryFilter').value;
            const type = document.getElementById('typeFilter').value;
            const sort = document.getElementById('sortFilter').value;
            const search = document.getElementById('searchInput').value.toLowerCase();

            filteredProducts = products.filter(p => {
                const matchCategory = category === 'all' || p.category === category;
                const matchType = type === 'all' || p.type === type;
                const matchSearch = p.name.toLowerCase().includes(search) || 
                                  p.category.toLowerCase().includes(search) ||
                                  p.type.toLowerCase().includes(search);
                return matchCategory && matchType && matchSearch;
            });

            if (sort === 'low') filteredProducts.sort((a, b) => a.price - b.price);
            else if (sort === 'high') filteredProducts.sort((a, b) => b.price - a.price);
            else if (sort === 'rating') filteredProducts.sort((a, b) => b.rating - a.rating);

            renderProducts();
        }

        document.getElementById('searchInput').addEventListener('input', filterProducts);

        function addToCart(id) {
            const product = products.find(p => p.id === id);
            const existing = cart.find(item => item.id === id);
            
            if (existing) {
                existing.quantity++;
            } else {
                cart.push({...product, quantity: 1});
            }
            
            updateCartCount();
            
            const btn = event.target;
            btn.textContent = '✓ Added to Cart';
            btn.style.background = '#28a745';
            setTimeout(() => {
                btn.textContent = 'Add to Cart';
                btn.style.background = '';
            }, 1500);
        }

        function removeFromCart(id) {
            cart = cart.filter(item => item.id !== id);
            updateCartCount();
            renderCart();
        }

        function updateCartCount() {
            document.getElementById('cartCount').textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
        }

        function openCart() {
            renderCart();
            document.getElementById('cartModal').style.display = 'flex';
        }

        function closeCart() {
            document.getElementById('cartModal').style.display = 'none';
        }

        function renderCart() {
            const cartContent = document.getElementById('cartContent');
            
            if (cart.length === 0) {
                cartContent.innerHTML = `
                    <div class="empty-cart">
                        <div class="empty-cart-icon">🛒</div>
                        <h3>Your cart is empty</h3>
                        <p>Add items to get started</p>
                    </div>
                `;
                return;
            }
            
            const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            const discount = cart.reduce((sum, item) => sum + ((item.original - item.price) * item.quantity), 0);
            const shipping = subtotal >= 999 ? 0 : 50;
            const total = subtotal + shipping;
            
            cartContent.innerHTML = `
                ${cart.map(item => {
                    const colorDark = adjustColor(item.color, -20);
                    return `
                    <div class="cart-item" style="--item-color: ${item.color}; --item-color-dark: ${colorDark}">
                        <div class="cart-item-image">
                            <span style="position: relative; z-index: 1;">${item.icon}</span>
                        </div>
                        <div class="cart-item-info">
                            <h4>${item.name}</h4>
                            <p>₹${item.price} × ${item.quantity} = ₹${item.price * item.quantity}</p>
                        </div>
                        <button class="remove-item" onclick="removeFromCart(${item.id})">Remove</button>
                    </div>
                `}).join('')}
                
                <div class="cart-summary">
                    <div class="summary-row">
                        <span>Subtotal:</span>
                        <span>₹${subtotal}</span>
                    </div>
                    <div class="summary-row">
                        <span>Discount:</span>
                        <span style="color: #28a745;">-₹${discount}</span>
                    </div>
                    <div class="summary-row">
                        <span>Shipping:</span>
                        <span>${shipping === 0 ? 'FREE' : '₹' + shipping}</span>
                    </div>
                    <div class="summary-row total">
                        <span>Total:</span>
                        <span>₹${total}</span>
                    </div>
                    <button class="checkout-btn" onclick="proceedToCheckout()">Proceed to Checkout</button>
                </div>
            `;
        }

        function proceedToCheckout() {
            closeCart();
            renderCheckoutForm();
            document.getElementById('checkoutModal').style.display = 'flex';
        }

        function closeCheckout() {
            document.getElementById('checkoutModal').style.display = 'none';
        }

        function renderCheckoutForm() {
            const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            const shipping = subtotal >= 999 ? 0 : 50;
            const total = subtotal + shipping;
            
            document.getElementById('checkoutForm').innerHTML = `
                <div class="order-summary">
                    <h3 style="margin-bottom: 15px;">Order Summary</h3>
                    <div class="summary-row">
                        <span>Items (${cart.reduce((s, i) => s + i.quantity, 0)}):</span>
                        <span>₹${subtotal}</span>
                    </div>
                    <div class="summary-row">
                        <span>Shipping:</span>
                        <span>${shipping === 0 ? 'FREE' : '₹' + shipping}</span>
                    </div>
                    <div class="summary-row total" style="font-size: 20px; margin-top: 10px;">
                        <span>Total Amount:</span>
                        <span>₹${total}</span>
                    </div>
                </div>

                <div class="form-section">
                    <h3>Delivery Information</h3>
                    <div class="form-row">
                        <div class="form-group">
                            <label>First Name *</label>
                            <input type="text" id="firstName" required>
                        </div>
                        <div class="form-group">
                            <label>Last Name *</label>
                            <input type="text" id="lastName" required>
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Email Address *</label>
                        <input type="email" id="email" required>
                    </div>
                    <div class="form-group">
                        <label>Phone Number *</label>
                        <input type="tel" id="phone" required>
                    </div>
                    <div class="form-group">
                        <label>Delivery Address *</label>
                        <textarea id="address" rows="3" required></textarea>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label>City *</label>
                            <input type="text" id="city" required>
                        </div>
                        <div class="form-group">
                            <label>PIN Code *</label>
                            <input type="text" id="pincode" required>
                        </div>
                    </div>
                    <div class="form-group">
                        <label>State *</label>
                        <select id="state" required>
                            <option value="">Select State</option>
                            <option value="UP">Uttar Pradesh</option>
                            <option value="MH">Maharashtra</option>
                            <option value="DL">Delhi</option>
                            <option value="KA">Karnataka</option>
                            <option value="TN">Tamil Nadu</option>
                        </select>
                    </div>
                </div>

                <div class="form-section">
                    <h3>Payment Method</h3>
                    <div class="payment-methods">
                        <div class="payment-method selected" onclick="selectPayment('card')">
                            <div class="payment-method-icon">💳</div>
                            <div class="payment-method-name">Card</div>
                        </div>
                        <div class="payment-method" onclick="selectPayment('upi')">
                            <div class="payment-method-icon">📱</div>
                            <div class="payment-method-name">UPI</div>
                        </div>
                        <div class="payment-method" onclick="selectPayment('netbanking')">
                            <div class="payment-method-icon">🏦</div>
                            <div class="payment-method-name">Net Banking</div>
                        </div>
                        <div class="payment-method" onclick="selectPayment('cod')">
                            <div class="payment-method-icon">💵</div>
                            <div class="payment-method-name">Cash on Delivery</div>
                        </div>
                    </div>
                </div>

                <div class="form-section" id="paymentDetails">
                    <h3>Card Details</h3>
                    <div class="form-group">
                        <label>Card Number *</label>
                        <input type="text" id="cardNumber" placeholder="1234 5678 9012 3456" maxlength="19">
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label>Expiry Date *</label>
                            <input type="text" id="expiry" placeholder="MM/YY" maxlength="5">
                        </div>
                        <div class="form-group">
                            <label>CVV *</label>
                            <input type="text" id="cvv" placeholder="123" maxlength="3">
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Cardholder Name *</label>
                        <input type="text" id="cardName">
                    </div>
                </div>

                <button class="place-order-btn" onclick="placeOrder()">Place Order - ₹${total}</button>
                <button class="back-to-cart" onclick="backToCart()">Back to Cart</button>
            `;
        }

        function selectPayment(method) {
            selectedPayment = method;
            document.querySelectorAll('.payment-method').forEach(el => el.classList.remove('selected'));
            event.currentTarget.classList.add('selected');
            
            const paymentDetails = document.getElementById('paymentDetails');
            
            if (method === 'card') {
                paymentDetails.innerHTML = `
                    <h3>Card Details</h3>
                    <div class="form-group">
                        <label>Card Number *</label>
                        <input type="text" id="cardNumber" placeholder="1234 5678 9012 3456" maxlength="19">
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label>Expiry Date *</label>
                            <input type="text" id="expiry" placeholder="MM/YY" maxlength="5">
                        </div>
                        <div class="form-group">
                            <label>CVV *</label>
                            <input type="text" id="cvv" placeholder="123" maxlength="3">
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Cardholder Name *</label>
                        <input type="text" id="cardName">
                    </div>
                `;
            } else if (method === 'upi') {
                paymentDetails.innerHTML = `
                    <h3>UPI Details</h3>
                    <div class="form-group">
                        <label>UPI ID *</label>
                        <input type="text" id="upiId" placeholder="yourname@upi">
                    </div>
                    <p style="color: #666; font-size: 13px; margin-top: 10px;">You will receive a payment request on your UPI app</p>
                `;
            } else if (method === 'netbanking') {
                paymentDetails.innerHTML = `
                    <h3>Net Banking</h3>
                    <div class="form-group">
                        <label>Select Your Bank *</label>
                        <select id="bankName" required>
                            <option value="">Choose Bank</option>
                            <option value="SBI">State Bank of India</option>
                            <option value="HDFC">HDFC Bank</option>
                            <option value="ICICI">ICICI Bank</option>
                            <option value="AXIS">Axis Bank</option>
                            <option value="PNB">Punjab National Bank</option>
                        </select>
                    </div>
                    <p style="color: #666; font-size: 13px; margin-top: 10px;">You will be redirected to your bank's website</p>
                `;
            } else if (method === 'cod') {
                paymentDetails.innerHTML = `
                    <h3>Cash on Delivery</h3>
                    <p style="color: #666; font-size: 14px;">Pay when you receive your order at your doorstep.</p>
                    <p style="color: #ff6b35; font-size: 13px; margin-top: 10px;">Extra charges: ₹40 for COD orders</p>
                `;
            }
        }

        function backToCart() {
            closeCheckout();
            openCart();
        }

        function placeOrder() {
            const firstName = document.getElementById('firstName').value;
            const lastName = document.getElementById('lastName').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const address = document.getElementById('address').value;
            const city = document.getElementById('city').value;
            const pincode = document.getElementById('pincode').value;
            const state = document.getElementById('state').value;

            if (!firstName || !lastName || !email || !phone || !address || !city || !pincode || !state) {
                alert('Please fill all required fields');
                return;
            }

            if (selectedPayment === 'card') {
                const cardNumber = document.getElementById('cardNumber').value;
                const expiry = document.getElementById('expiry').value;
                const cvv = document.getElementById('cvv').value;
                const cardName = document.getElementById('cardName').value;
                
                if (!cardNumber || !expiry || !cvv || !cardName) {
                    alert('Please fill all card details');
                    return;
                }
            } else if (selectedPayment === 'upi') {
                const upiId = document.getElementById('upiId').value;
                if (!upiId) {
                    alert('Please enter your UPI ID');
                    return;
                }
            } else if (selectedPayment === 'netbanking') {
                const bankName = document.getElementById('bankName').value;
                if (!bankName) {
                    alert('Please select your bank');
                    return;
                }
            }

            const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            const orderNumber = 'ORD' + Date.now();
            
            document.getElementById('checkoutForm').innerHTML = `
                <div class="success-modal">
                    <div class="success-icon">✓</div>
                    <h2>Order Placed Successfully!</h2>
                    <p>Thank you for your purchase, ${firstName}!</p>
                    <div style="background: #f8f9fa; padding: 20px; border-radius: 6px; margin: 20px 0;">
                        <p style="margin-bottom: 8px;"><strong>Order Number:</strong> ${orderNumber}</p>
                        <p style="margin-bottom: 8px;"><strong>Total Amount:</strong> ₹${total}</p>
                        <p style="margin-bottom: 8px;"><strong>Payment Method:</strong> ${selectedPayment.toUpperCase()}</p>
                        <p><strong>Delivery Address:</strong> ${address}, ${city}, ${state} - ${pincode}</p>
                    </div>
                    <p>A confirmation email has been sent to ${email}</p>
                    <button class="checkout-btn" onclick="finishOrder()">Continue Shopping</button>
                </div>
            `;
        }

        function finishOrder() {
            cart = [];
            updateCartCount();
            closeCheckout();
        }

        document.getElementById('cartModal').addEventListener('click', function(e) {
            if (e.target === this) closeCart();
        });

        document.getElementById('checkoutModal').addEventListener('click', function(e) {
            if (e.target === this) closeCheckout();
        });

        renderProducts();
    