class TextScramble {
    constructor(el) {
        this.el = el;
        this.chars = '!<>-_\\/[]{}—=+*^?#________';
        this.update = this.update.bind(this);
    }
    setText(newText) {
        const oldText = this.el.innerText;
        const length = Math.max(oldText.length, newText.length);
        const promise = new Promise((resolve) => this.resolve = resolve);
        this.queue = [];
        for (let i = 0; i < length; i++) {
            const from = oldText[i] || '';
            const to = newText[i] || '';
            const start = Math.floor(Math.random() * 20);
            const end = start + Math.floor(Math.random() * 20);
            this.queue.push({ from, to, start, end });
        }
        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update();
        return promise;
    }
    update() {
        let output = '';
        let complete = 0;
        for (let i = 0, n = this.queue.length; i < n; i++) {
            let { from, to, start, end, char } = this.queue[i];
            if (this.frame >= end) {
                complete++;
                output += to;
            } else if (this.frame >= start) {
                if (!char || Math.random() < 0.28) {
                    char = this.randomChar();
                    this.queue[i].char = char;
                }
                output += `<span class="scramble-char">${char}</span>`;
            } else {
                output += from;
            }
        }
        this.el.innerHTML = output;
        if (complete === this.queue.length) {
            this.resolve();
        } else {
            this.frameRequest = requestAnimationFrame(this.update);
            this.frame++;
        }
    }
    randomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
}

/**
 * Master Main Interfacing Application controller. Handles structural initialization.
 */
document.addEventListener("DOMContentLoaded", () => {
    uiController.init();
    bookingEngine.init();
});

const uiController = {
    activeFilter: "all",
    searchQuery: "",

    init() {
        cartEngine.init();
        this.renderFilters();
        this.renderCatalog("all");
        this.renderCartPanel();
        this.setupEventListeners();
        this.setupScrollSpy();
        this.triggerTextScramble();
        
        const searchInput = document.getElementById("menu-search");
        if (searchInput) searchInput.value = "";

        if (cartEngine.state.length > 0) {
            this.addTerminalLog("success", `Restored checkout buffer with ${cartEngine.state.length} active allocation(s).`);
        } else {
            this.addTerminalLog("info", "Operational pipeline active. Awaiting inputs.");
        }
    },

    triggerTextScramble() {
        const logo = document.querySelector(".brand-identity");
        if (logo) {
            logo.classList.add("is-scrambling");
            const fx = new TextScramble(logo);
            fx.setText("BROADDA").then(() => {
                logo.innerHTML = `BRO<span class="neon-accent">ADDA</span>`;
                logo.classList.remove("is-scrambling");
            });
        }

        const heroTitle = document.getElementById("hero-title");
        if (heroTitle) {
            heroTitle.classList.add("is-scrambling");
            const fx = new TextScramble(heroTitle);
            fx.setText("BROADDA").then(() => {
                heroTitle.classList.remove("is-scrambling");
            });
        }
    },

    setupScrollSpy() {
        const sections = document.querySelectorAll("section[id]");
        const navLinks = document.querySelectorAll(".site-nav .nav-link");

        const observerOptions = {
            root: null,
            rootMargin: "-25% 0px -55% 0px",
            threshold: 0
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute("id");
                    navLinks.forEach(link => {
                        link.classList.remove("active");
                        if (link.getAttribute("href") === `#${id}`) {
                            link.classList.add("active");
                        }
                    });
                }
            });
        }, observerOptions);

        sections.forEach(section => observer.observe(section));

        navLinks.forEach(link => {
            link.addEventListener("click", (e) => {
                navLinks.forEach(l => l.classList.remove("active"));
                e.currentTarget.classList.add("active");
            });
        });
    },

    setupEventListeners() {
        const cursor = document.getElementById("custom-cursor");
        
        // Touch device detection and fallback
        if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
            document.body.classList.add("use-system-cursor");
            if (cursor) cursor.style.display = "none";
        } else {
            let mouseX = window.innerWidth / 2;
            let mouseY = window.innerHeight / 2;
            let cursorX = mouseX;
            let cursorY = mouseY;
            let cursorScale = 1;

            document.addEventListener("mousemove", (e) => {
                mouseX = e.clientX;
                mouseY = e.clientY;
            });

            const tick = () => {
                const ease = 0.16;
                cursorX += (mouseX - cursorX) * ease;
                cursorY += (mouseY - cursorY) * ease;
                if (cursor) {
                    cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) translate(-50%, -50%) scale(${cursorScale})`;
                }
                requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);

            // Event hooks for structural hover animations
            document.addEventListener("mouseover", (e) => {
                if (e.target.closest("a, button, select, input, .artifact-card")) {
                    cursorScale = 2.2;
                    if (cursor) {
                        cursor.style.backgroundColor = "var(--neon-magenta)";
                        cursor.style.boxShadow = "0 0 15px var(--neon-magenta)";
                    }
                }
            });

            document.addEventListener("mouseout", (e) => {
                if (e.target.closest("a, button, select, input, .artifact-card")) {
                    cursorScale = 1;
                    if (cursor) {
                        cursor.style.backgroundColor = "var(--neon-cyan)";
                        cursor.style.boxShadow = "0 0 15px var(--neon-cyan)";
                    }
                }
            });
        }

        // Interactive scramble triggers
        const logo = document.querySelector(".brand-identity");
        if (logo) {
            logo.addEventListener("mouseenter", () => {
                if (logo.classList.contains("is-scrambling")) return;
                logo.classList.add("is-scrambling");
                const fx = new TextScramble(logo);
                fx.setText("BROADDA").then(() => {
                    logo.innerHTML = `BRO<span class="neon-accent">ADDA</span>`;
                    logo.classList.remove("is-scrambling");
                });
            });
        }

        const heroTitle = document.getElementById("hero-title");
        if (heroTitle) {
            heroTitle.addEventListener("mouseenter", () => {
                if (heroTitle.classList.contains("is-scrambling")) return;
                heroTitle.classList.add("is-scrambling");
                const fx = new TextScramble(heroTitle);
                fx.setText("BROADDA").then(() => {
                    heroTitle.classList.remove("is-scrambling");
                });
            });
        }
    },

    renderFilters() {
        const filterDeck = document.getElementById("category-filters");
        if (!filterDeck) return;
        
        categoryConfig.forEach((cat, index) => {
            const btn = document.createElement("button");
            btn.className = `filter-btn ${index === 0 ? 'active' : ''}`;
            btn.type = "button";
            btn.innerText = cat.label;
            btn.setAttribute("data-target", cat.key);
            btn.setAttribute("aria-pressed", index === 0 ? "true" : "false");
            btn.onclick = (e) => {
                document.querySelectorAll(".filter-btn").forEach(b => {
                    b.classList.remove("active");
                    b.setAttribute("aria-pressed", "false");
                });
                e.currentTarget.classList.add("active");
                e.currentTarget.setAttribute("aria-pressed", "true");
                this.renderCatalog(cat.key);
            };
            filterDeck.appendChild(btn);
        });
    },

    renderCatalog(filterKey) {
        if (filterKey !== undefined) {
            this.activeFilter = filterKey;
        }

        const container = document.getElementById("menu-display");
        if (!container) return;
        container.innerHTML = "";

        let dataPool = this.activeFilter === "all" ? menuDatabase : menuDatabase.filter(i => i.category === this.activeFilter);

        if (this.searchQuery.trim() !== "") {
            const query = this.searchQuery.toLowerCase().trim();
            dataPool = dataPool.filter(item => 
                item.name.toLowerCase().includes(query) ||
                item.desc.toLowerCase().includes(query) ||
                item.tags.some(t => t.toLowerCase().includes(query))
            );
        }

        if (dataPool.length === 0) {
            container.innerHTML = `<div class="terminal-empty" style="grid-column: 1/-1;">No culinary match found for your search signature.</div>`;
            return;
        }

        dataPool.forEach(item => {
            const tagsHTML = `<div class="card-tags-inline">${item.tags.map(t => `<span class="card-tag">${t}</span>`).join('')}</div>`;
            const cuisineLabel = item.category === 'burgers' ? 'Signature Burgers' : item.category === 'mains' ? 'Main Course' : item.category === 'appetizers' ? 'Starter & Sides' : item.category === 'desserts' ? 'Dessert Special' : item.category === 'beverages' ? 'Crafted Beverage' : 'Featured Dish';
            const structure = `
                <article class="menu-card" aria-label="${item.name}">
                    <div class="menu-card-header">
                        <div>
                            <p class="menu-card-cuisine">${cuisineLabel}</p>
                            <h3 class="menu-card-title">${item.name}</h3>
                        </div>
                        ${tagsHTML}
                    </div>
                    <p class="menu-card-description">${item.desc}</p>
                    <div class="menu-card-foot">
                        <span class="menu-price">₹${item.price}</span>
                        <div class="order-action-wrap">
                            <div class="order-feedback" aria-live="polite"></div>
                            <button class="action-btn" type="button" onclick="cartEngine.addItem('${item.id}', this)">
                                Add to Order
                            </button>
                        </div>
                    </div>
                </article>
            `;
            container.insertAdjacentHTML("beforeend", structure);
        });
    },

    handleSearch(event) {
        this.searchQuery = event.target.value;
        this.renderCatalog();
    },

    setCartProcessingState(isProcessing) {
        const checkoutBtn = document.querySelector(".fire-checkout-btn");
        if (checkoutBtn) {
            if (isProcessing) {
                checkoutBtn.disabled = true;
                checkoutBtn.innerHTML = `PROCESSING HANDSHAKE... <i class="fa-solid fa-spinner fa-spin"></i>`;
            } else {
                checkoutBtn.disabled = false;
                checkoutBtn.innerHTML = `SECURE PAYMENT & CONFIRM <i class="fa-solid fa-bolt-lightning"></i>`;
            }
        }
        const qtyBtns = document.querySelectorAll(".cart-qty-btn");
        qtyBtns.forEach(btn => {
            btn.disabled = isProcessing;
        });
    },

    renderCartPanel() {
        const container = document.getElementById("order-items");
        const badge = document.getElementById("global-cart-badge");
        if (!container) return;

        container.innerHTML = "";
        
        if (cartEngine.state.length === 0) {
            container.innerHTML = `<p class="terminal-empty">Stream empty. Awaiting operational input...</p>`;
        }

        cartEngine.state.forEach(item => {
            const entry = document.createElement("div");
            entry.className = "cart-item-row";
            entry.innerHTML = `
                <div class="cart-item-info">
                    <h5 class="cart-item-name">${item.name}</h5>
                    <div class="cart-item-qty-control">
                        <button class="cart-qty-btn decrease" onclick="cartEngine.changeQuantity('${item.id}', -1)">-</button>
                        <span class="cart-qty-val">${item.quantity}</span>
                        <button class="cart-qty-btn increase" onclick="cartEngine.changeQuantity('${item.id}', 1)">+</button>
                    </div>
                </div>
                <span class="cart-item-price">₹${item.price * item.quantity}</span>
            `;
            container.appendChild(entry);
        });

        const totals = cartEngine.getCalculations();
        document.getElementById("calc-subtotal").innerText = `₹${totals.subtotal}.00`;
        document.getElementById("calc-total").innerText = `₹${totals.total}.00`;
        badge.innerText = cartEngine.state.reduce((a, b) => a + b.quantity, 0);
    },

    toggleCart() {
        const panel = document.getElementById("order-panel");
        if (panel) {
            panel.classList.toggle("open");
        }
    },

    openCart() {
        const panel = document.getElementById("order-panel");
        if (panel && !panel.classList.contains("open")) {
            panel.classList.add("open");
        }
    },

    showCheckoutConfirmation() {
        const container = document.getElementById("order-items");
        const panel = document.getElementById("order-panel");
        if (!container || !panel) return;

        container.innerHTML = `
            <div class="terminal-runner">
                <div class="terminal-line">> Secure payment handshake established</div>
                <div class="terminal-line">> Kitchen dispatch queued</div>
                <div class="terminal-line success">> Order confirmed. Your meal is on the way.</div>
            </div>
        `;
        panel.classList.add("open");

        setTimeout(() => {
            this.hideCheckoutConfirmation();
        }, 2200);
    },

    hideCheckoutConfirmation() {
        const container = document.getElementById("order-items");
        const panel = document.getElementById("order-panel");
        if (!container) return;

        container.innerHTML = `<p class="terminal-empty">Awaiting next command...</p>`;
        panel?.classList.remove("open");
    },

    showOrderFeedback(item, sourceButton) {
        const card = sourceButton?.closest('.menu-card');
        const feedback = card?.querySelector('.order-feedback');
        if (!feedback) return;

        feedback.textContent = `✓ ${item.name} queued`;
        feedback.classList.add('active');
        sourceButton.classList.add('is-added');

        setTimeout(() => {
            feedback.classList.remove('active');
            sourceButton.classList.remove('is-added');
        }, 1400);
    },

    triggerToast(message) {
        const stack = document.getElementById("toast-stack");
        const node = document.createElement("div");
        node.className = "toast-node";
        node.innerHTML = `<i class="fa-solid fa-circle-info" style="color:var(--neon-cyan)"></i> ${message}`;
        stack.appendChild(node);
        setTimeout(() => {
            node.style.opacity = "0";
            node.style.transform = "translateX(50px)";
            node.style.transition = "all 0.4s ease";
            setTimeout(() => node.remove(), 400);
        }, 3500);
    },

    addTerminalLog(type, message) {
        const logBox = document.getElementById("terminal-sys-log");
        if (!logBox) return;

        const time = new Date().toLocaleTimeString([], { hour12: false });
        const line = document.createElement("div");
        line.className = `log-line ${type}`;
        
        let prefix = "[SYS]";
        if (type === "info") prefix = "[INFO]";
        if (type === "success") prefix = "[OK]";
        if (type === "warn") prefix = "[WARN]";
        if (type === "error") prefix = "[ERR]";

        line.innerText = `[${time}] ${prefix} ${message}`;
        logBox.appendChild(line);
        logBox.scrollTop = logBox.scrollHeight;

        while (logBox.children.length > 25) {
            logBox.removeChild(logBox.firstChild);
        }
    }
};

const bookingEngine = {
    availableTables: Array.from({ length: 10 }, (_, index) => index + 1),

    init() {
        const input = document.getElementById("book-time");
        if (input) {
            const now = new Date();
            const year = now.getFullYear();
            const month = String(now.getMonth() + 1).padStart(2, '0');
            const day = String(now.getDate()).padStart(2, '0');
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            input.min = `${year}-${month}-${day}T${hours}:${minutes}`;
        }
        this.renderActiveBookings();
    },

    getBookings() {
        try {
            const saved = localStorage.getItem("broadda_bookings");
            return saved ? JSON.parse(saved) : [];
        } catch (e) {
            console.error("Failed to load bookings", e);
            return [];
        }
    },

    saveBookings(bookings) {
        try {
            localStorage.setItem("broadda_bookings", JSON.stringify(bookings));
        } catch (e) {
            console.error("Failed to save bookings", e);
        }
    },

    getNextTable(bookings) {
        const busyTables = new Set(bookings.map(b => Number(b.tableNumber)));
        const nextTable = this.availableTables.find(table => !busyTables.has(table));
        return nextTable || null;
    },

    renderActiveBookings() {
        const section = document.getElementById("active-bookings-section");
        const container = document.getElementById("bookings-display");
        if (!section || !container) return;

        const bookings = this.getBookings();
        if (bookings.length === 0) {
            section.style.display = "none";
            container.innerHTML = "";
            return;
        }

        section.style.display = "block";
        container.innerHTML = "";

        bookings.forEach(booking => {
            let timeStr = booking.time;
            try {
                const date = new Date(booking.time);
                timeStr = date.toLocaleString([], { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
            } catch (e) {}

            const card = document.createElement("div");
            card.className = "booking-item-card";
            card.innerHTML = `
                <div class="booking-card-head">
                    <span class="booking-card-table">Table ${booking.tableNumber}</span>
                    <button class="booking-cancel-btn" onclick="bookingEngine.cancelBooking('${booking.id}')" aria-label="Cancel table reservation">
                        <i class="fa-solid fa-trash-can"></i> Cancel
                    </button>
                </div>
                <div class="booking-card-details">
                    <div class="booking-detail-row">
                        <i class="fa-solid fa-user"></i>
                        <span>${booking.name}</span>
                    </div>
                    <div class="booking-detail-row">
                        <i class="fa-solid fa-users"></i>
                        <span>${booking.size}</span>
                    </div>
                    <div class="booking-detail-row">
                        <i class="fa-solid fa-clock"></i>
                        <span>${timeStr}</span>
                    </div>
                </div>
            `;
            container.appendChild(card);
        });
    },

    cancelBooking(id) {
        let bookings = this.getBookings();
        const booking = bookings.find(b => b.id === id);
        if (!booking) return;

        bookings = bookings.filter(b => b.id !== id);
        this.saveBookings(bookings);
        this.renderActiveBookings();
        uiController.triggerToast(`🔓 Booking at Table ${booking.tableNumber} cancelled.`);
    },

    handleSubmission(event) {
        event.preventDefault();
        const name = document.getElementById("book-name").value.trim();
        const size = document.getElementById("book-size").value;
        const time = document.getElementById("book-time").value;

        const selectedTime = new Date(time);
        const now = new Date();
        if (selectedTime <= now) {
            uiController.triggerToast("⚠️ Invalid Time: Please select a future date and time.");
            return;
        }

        const bookings = this.getBookings();
        const tableNumber = this.getNextTable(bookings);

        if (!tableNumber) {
            uiController.triggerToast("⚠️ BroAdda is fully reserved for the selected slot. Please try another time.");
            document.getElementById("reservation-form").reset();
            return;
        }

        const newBooking = {
            id: 'bk-' + Math.random().toString(36).substr(2, 9),
            name: name,
            size: size,
            time: time,
            tableNumber: tableNumber
        };

        bookings.push(newBooking);
        this.saveBookings(bookings);
        this.renderActiveBookings();

        uiController.triggerToast(`🔒 Allocation Secured: Table ${tableNumber} reserved for ${size} under assignment [${name.toUpperCase()}].`);
        document.getElementById("reservation-form").reset();
    }
};