"use client";                                              // Client component because it uses hooks & Redux
import React from "react";
import { useSelector, useDispatch } from "react-redux";    // useSelector → read state, useDispatch → send actions
import {
  removeFromCart,
  updateQuantity,
  clearCart,
} from "../redux/cartSlice";                               // Import actions from Redux cart slice
import styles from "../module/Cart.module.css";             // Import CSS module for scoped styles

export default function CartPage() {
  const items = useSelector((state) => state.cart.items || []);  // Get cart items from Redux; fallback to empty array
  const dispatch = useDispatch();                                // Initialize dispatch to trigger actions

  const subtotal = items.reduce(                                 // Compute subtotal: sum of quantity * price for all items
    (sum, item) => sum + item.quantity * item.price,
    0
  );

  return (
    <div className={styles.wrapper}>                             {/* Main wrapper: flex layout for left/right sections */}
      
      {/* LEFT SIDE – CART */}
      <div className={styles.cartSection}>                       {/* Left section container: products + summary */}
        <h2 className={styles.title}>Shopping Cart</h2>         {/* Heading for cart section */}

        {/* TABLE HEADER */}
        <div className={styles.tableHeader}>                     {/* Header row showing column names */}
          <span>Product</span>                                  {/* Column: Product info */}
          <span>Size</span>                                     {/* Column: Product size */}
          <span>Quantity</span>                                 {/* Column: Quantity selector */}
          <span>Total Price</span>                               {/* Column: Total price per item */}
          {items.length > 0 && (                                 // Conditionally render "Clear Cart" button
            <button
              className={styles.clearCartHeaderBtn}              // CSS style for clear button
              onClick={() => dispatch(clearCart())}             // Dispatch Redux action to clear all items
            >
              Clear Cart
            </button>
          )}
        </div>

        {/* EMPTY CART MESSAGE */}
        {items.length === 0 ? (
          <p style={{ textAlign: "center", padding: "20px", color: "#555" }}>
            Your cart is empty                                    {/* Message if no items */}
          </p>
        ) : (
          <div className={styles.cartList}>                     {/* Container for cart items list */}
            {items.map((item) => (                              // Loop through each cart item
              <div key={item.id} className={styles.cartRow}>   {/* Single cart row per item */}

                {/* PRODUCT INFO */}
                <div className={styles.productBox}>            {/* Product image + title + category */}
                  <img
                    src={item.image}                            // Product image URL
                    className={styles.productImg}              // CSS for image size/layout
                    alt={item.title}                            // Alt text for accessibility
                  />
                  <div>
                    <p className={styles.productTitle}>{item.title}</p>   {/* Product name/title */}
                    <h2 className={styles.smallText}>{item.category}</h2> {/* Product category */}
                  </div>
                </div>

                {/* SIZE SELECTION */}
                <select className={styles.selectBox}>           {/* Static size dropdown (not dynamic) */}
                  <option>25 L</option>                         {/* Example size options */}
                  <option>30 L</option>
                  <option>35 L</option>
                </select>

                {/* QUANTITY CONTROL */}
                <div className={styles.qtyBox}>                 {/* Quantity increment/decrement container */}
                  <button
                    onClick={() =>
                      dispatch(
                        updateQuantity({                        // Dispatch Redux action to decrease quantity
                          id: item.id,
                          quantity: item.quantity - 1
                        })
                      )
                    }
                    disabled={item.quantity <= 1}              // Disable button if quantity <= 1 to prevent negative
                  >
                    -                                             {/* Decrement button */}
                  </button>

                  <span>{item.quantity}</span>                  {/* Display current quantity */}

                  <button
                    onClick={() =>
                      dispatch(
                        updateQuantity({                        // Dispatch Redux action to increase quantity
                          id: item.id,
                          quantity: item.quantity + 1
                        })
                      )
                    }
                  >
                    +                                             {/* Increment button */}
                  </button>
                </div>

                {/* TOTAL PRICE PER ITEM */}
                <p className={styles.price}>
                  ${(item.price * item.quantity).toFixed(2)}    {/* Total price = unit price * quantity */}
                </p>

                {/* REMOVE ITEM BUTTON */}
                <button
                  className={styles.removeBtn}                 // CSS for remove button
                  onClick={() => dispatch(removeFromCart(item.id))}  // Dispatch action to remove this product
                >
                  ✕                                              {/* Cross icon */}
                </button>
              </div>
            ))}
          </div>
        )}

        {/* CART SUMMARY */}
        <div className={styles.summaryBox}>                     {/* Summary section: subtotal + shipping + total */}
          <div className={styles.summaryRow}>
            <span>Subtotal:</span>
            <span>${subtotal.toFixed(2)}</span>                {/* Subtotal of all items */}
          </div>

          <div className={styles.summaryRow}>
            <span>Shipping:</span>
            <span>Free</span>                                  {/* Static shipping info */}
          </div>

          <div className={styles.summaryRowTotal}>
            <span>Total:</span>
            <span>${subtotal.toFixed(2)}</span>                {/* Total = subtotal + shipping */}
          </div>
        </div>
      </div>

      {/* RIGHT SIDE – PAYMENT SECTION */}
      <div className={styles.paymentCard}>                     {/* Payment info card */}
        <h3 className={styles.paymentTitle}>Payment Info</h3>  {/* Heading */}

        <div className={styles.paymentBox}>
          <p className={styles.label}>Payment Method</p>       {/* Section label */}

          <label className={styles.radioRow}>
            <input type="radio" name="pay" defaultChecked />    {/* Credit Card option */}
            <span>Credit Card</span>
          </label>

          <label className={styles.radioRow}>
            <input type="radio" name="pay" />                   {/* PayPal option */}
            <span>PayPal</span>
          </label>

          {/* CARD DETAILS INPUT */}
          <label className={styles.label}>Name On Card</label>
          <input type="text" className={styles.input} placeholder="Your Name" />

          <label className={styles.label}>Card Number</label>
          <input type="text" className={styles.input} placeholder="•••• •••• •••• 2153" />

          <div className={styles.rowTwo}>                       {/* Two inputs side by side */}
            <div>
              <label className={styles.label}>Expiration Date</label>
              <input type="text" className={styles.input} placeholder="05 / 2026" />
            </div>
            <div>
              <label className={styles.label}>CVV</label>
              <input type="text" className={styles.input} placeholder="156" />
            </div>
          </div>

          <button className={styles.checkoutBtn}>Check Out</button> {/* Checkout button */}
        </div>
      </div>
    </div>
  );
}
