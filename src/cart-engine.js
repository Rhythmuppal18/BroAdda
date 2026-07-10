/**
 * State Management Core System Module for Cart Actions
 */
const cartEngine = {
    state: [],
    isProcessing: false,

    init() {
        try {
            const saved = localStorage.getItem("broadda_cart");
            if (saved) {
                this.state = JSON.parse(saved);
            }
        } catch (e) {
            console.error("Failed to load cart state", e);
        }
    },
    
    addItem(itemId, sourceButton) {
        if (this.isProcessing) return;
        const item = menuDatabase.find(p => p.id === itemId);
        if (!item) return;

        const record = this.state.find(entry => entry.id === itemId);
        if (record) {
            record.quantity += 1;
            uiController.addTerminalLog("info", `Increased '${item.name}' qty to ${record.quantity}.`);
        } else {
            this.state.push({ ...item, quantity: 1 });
            uiController.addTerminalLog("success", `Pushed '${item.name}' allocation to buffer stack.`);
        }
        
        this.dispatchUpdate();
        uiController.hideCheckoutConfirmation();
        uiController.showOrderFeedback(item, sourceButton);
        uiController.triggerToast(`${item.name} added to your checkout.`);
    },

    changeQuantity(itemId, adjustment) {
        if (this.isProcessing) return;
        const record = this.state.find(entry => entry.id === itemId);
        if (!record) return;

        record.quantity += adjustment;
        if (record.quantity <= 0) {
            this.state = this.state.filter(entry => entry.id !== itemId);
            uiController.addTerminalLog("warn", `Flushed '${record.name}' allocation from matrix.`);
        } else {
            uiController.addTerminalLog("info", `Updated '${record.name}' quantity: [${record.quantity}].`);
        }
        this.dispatchUpdate();
    },

    getCalculations() {
        const subtotal = this.state.reduce((acc, obj) => acc + (obj.price * obj.quantity), 0);
        return { subtotal, total: subtotal };
    },

    dispatchUpdate() {
        try {
            localStorage.setItem("broadda_cart", JSON.stringify(this.state));
        } catch (e) {
            console.error("Failed to save cart state", e);
        }
        uiController.renderCartPanel();
    },

    processCheckout() {
        if (this.isProcessing) return;
        if (this.state.length === 0) {
            uiController.triggerToast("Checkout paused: your basket is empty.");
            uiController.addTerminalLog("error", "Checkout error: Empty allocation buffer.");
            return;
        }

        this.isProcessing = true;
        uiController.setCartProcessingState(true);
        uiController.addTerminalLog("info", "Establishing payment handshake & matrix verify...");

        uiController.showCheckoutConfirmation();
        uiController.triggerToast("Payment confirmed. Your order is now being prepared.");
        setTimeout(() => {
            uiController.addTerminalLog("success", "Handshake authorized. Checkout compiled successfully!");
            this.state = [];
            this.isProcessing = false;
            this.dispatchUpdate();
            uiController.setCartProcessingState(false);
        }, 2200);
    }
};