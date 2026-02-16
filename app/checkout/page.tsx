"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { Check, ChevronRight, Lock } from "lucide-react";

const EMAILJS_SERVICE_ID = "service_k00i427";
const EMAILJS_TEMPLATE_ID = "template_order";
const EMAILJS_PUBLIC_KEY = "A5xzuca3qOi9L7JUT";

function formatINR(amount: number): string {
  return `₹${amount.toLocaleString("en-IN")}`;
}

function generateOrderId(): string {
  const now = new Date();
  const datePart = now.toISOString().slice(2, 10).replace(/-/g, "");
  const randomPart = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `TRB-${datePart}-${randomPart}`;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { items, total, clearCart } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const orderId = generateOrderId();
      const orderDate = new Date().toLocaleString("en-IN", {
        dateStyle: "full",
        timeStyle: "short",
        timeZone: "Asia/Kolkata",
      });

      const itemsText = items
        .map(
          (item) =>
            `${item.name} x${item.quantity} — ${formatINR(
              item.price
            )} each = ${formatINR(item.price * item.quantity)}`
        )
        .join("\n");

      const itemsHtml = items
        .map(
          (item) => `
          <tr>
            <td style="padding:10px 14px;border-bottom:1px solid #e5e7eb;font-size:14px;color:#1f2937;">${
              item.name
            }</td>
            <td style="padding:10px 14px;border-bottom:1px solid #e5e7eb;text-align:center;font-size:14px;color:#6b7280;">${
              item.quantity
            }</td>
            <td style="padding:10px 14px;border-bottom:1px solid #e5e7eb;text-align:right;font-size:14px;color:#6b7280;">${formatINR(
              item.price
            )}</td>
            <td style="padding:10px 14px;border-bottom:1px solid #e5e7eb;text-align:right;font-size:14px;color:#1f2937;font-weight:600;">${formatINR(
              item.price * item.quantity
            )}</td>
          </tr>`
        )
        .join("");

      const templateParams = {
        order_id: orderId,
        order_date: orderDate,
        customer_name: `${formData.firstName} ${formData.lastName}`,
        customer_email: formData.email,
        customer_phone: formData.phone || "Not provided",
        shipping_address: `${formData.address}, ${formData.city}, ${formData.state} ${formData.zipCode}`,
        items_text: itemsText,
        items_html: itemsHtml,
        order_total: formatINR(total),
        to_email: "razat249@gmail.com",
      };

      try {
        const response = await fetch(
          "https://api.emailjs.com/api/v1.0/email/send",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              service_id: EMAILJS_SERVICE_ID,
              template_id: EMAILJS_TEMPLATE_ID,
              user_id: EMAILJS_PUBLIC_KEY,
              template_params: templateParams,
            }),
          }
        );

        if (!response.ok) {
          const errorText = await response.text();
          console.error("EmailJS response:", response.status, errorText);
        }
      } catch (emailErr) {
        console.error("Email send failed (order still placed):", emailErr);
      }

      setOrderPlaced(true);
      clearCart();
      setTimeout(() => router.push("/"), 3000);
    } catch (err) {
      setError("Failed to process your order. Please try again.");
      console.error("Order error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const inputClasses =
    "w-full px-3.5 py-2.5 bg-background border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 smooth-transition";

  if (items.length === 0 && !orderPlaced) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="font-serif text-3xl text-foreground mb-3">
            Your cart is empty
          </h1>
          <p className="text-sm text-muted-foreground mb-6">
            Add some products before checking out.
          </p>
          <Link
            href="/products"
            className="inline-block bg-primary text-primary-foreground px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-primary/90 smooth-transition"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-14 h-14 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-5">
            <Check size={24} className="text-emerald-600" strokeWidth={2} />
          </div>
          <h1 className="font-serif text-3xl text-foreground mb-2">
            Order Placed
          </h1>
          <p className="text-sm text-muted-foreground mb-1.5">
            Thank you for your purchase. A confirmation email has been sent to{" "}
            <span className="font-medium text-foreground">
              {formData.email}
            </span>
          </p>
          <p className="text-sm text-muted-foreground mb-6">
            We&apos;ll send you a shipping confirmation once your order is on
            its way.
          </p>
          <p className="text-xs text-muted-foreground">
            Redirecting to home in a few seconds...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Breadcrumb */}
      <div className="border-b border-border/60 bg-secondary/30">
        <div className="page-container py-3">
          <nav className="flex items-center gap-1.5 text-sm">
            <Link
              href="/"
              className="text-muted-foreground hover:text-foreground smooth-transition"
            >
              Home
            </Link>
            <ChevronRight
              size={14}
              strokeWidth={1.5}
              className="text-muted-foreground/50"
            />
            <span className="text-foreground font-medium">Checkout</span>
          </nav>
        </div>
      </div>

      <div className="section-padding">
        <div className="page-container max-w-4xl">
          <h1 className="font-serif text-3xl sm:text-4xl text-foreground mb-10">
            Checkout
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2 space-y-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="bg-card border border-border/60 rounded-xl p-5 sm:p-6 shadow-card">
                  <h2 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-5 font-sans">
                    Personal Information
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-3.5">
                    <div>
                      <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                        First Name
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        placeholder="John"
                        required
                        value={formData.firstName}
                        onChange={handleChange}
                        className={inputClasses}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        placeholder="Doe"
                        required
                        value={formData.lastName}
                        onChange={handleChange}
                        className={inputClasses}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        placeholder="john@example.com"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className={inputClasses}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                        Phone (optional)
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        placeholder="(555) 123-4567"
                        value={formData.phone}
                        onChange={handleChange}
                        className={inputClasses}
                      />
                    </div>
                  </div>
                </div>

                {/* Address */}
                <div className="bg-card border border-border/60 rounded-xl p-5 sm:p-6 shadow-card">
                  <h2 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-5 font-sans">
                    Shipping Address
                  </h2>
                  <div className="mb-3.5">
                    <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                      Street Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      placeholder="123 Main St"
                      required
                      value={formData.address}
                      onChange={handleChange}
                      className={inputClasses}
                    />
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
                    <div>
                      <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                        City
                      </label>
                      <input
                        type="text"
                        name="city"
                        placeholder="New York"
                        required
                        value={formData.city}
                        onChange={handleChange}
                        className={inputClasses}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                        State
                      </label>
                      <input
                        type="text"
                        name="state"
                        placeholder="NY"
                        required
                        value={formData.state}
                        onChange={handleChange}
                        className={inputClasses}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                        ZIP Code
                      </label>
                      <input
                        type="text"
                        name="zipCode"
                        placeholder="10001"
                        required
                        value={formData.zipCode}
                        onChange={handleChange}
                        className={inputClasses}
                      />
                    </div>
                  </div>
                </div>

                {error && (
                  <div className="bg-destructive/5 border border-destructive/20 text-destructive px-4 py-3 rounded-lg text-sm">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-primary text-primary-foreground py-3 rounded-lg text-sm font-medium hover:bg-primary/90 smooth-transition disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  <Lock size={14} strokeWidth={2} />
                  {isLoading
                    ? "Processing..."
                    : `Place Order \u2014 ₹${total.toLocaleString("en-IN")}`}
                </button>
              </form>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-card border border-border/60 rounded-xl p-5 sticky top-20 shadow-card">
                <h2 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-5 font-sans">
                  Order Summary
                </h2>

                <div className="space-y-3 mb-5">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-3 pb-3 border-b border-border/40 last:border-b-0 last:pb-0"
                    >
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-secondary">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground line-clamp-1">
                          {item.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Qty: {item.quantity}
                        </p>
                        <p className="text-sm font-medium text-foreground mt-0.5 tabular-nums">
                          ₹
                          {(item.price * item.quantity).toLocaleString("en-IN")}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-border pt-4 space-y-2">
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Subtotal</span>
                    <span className="tabular-nums">
                      ₹{total.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Shipping</span>
                    <span className="text-emerald-600 font-medium">Free</span>
                  </div>
                  <div className="flex justify-between text-sm font-semibold text-foreground pt-2.5 border-t border-border">
                    <span>Total</span>
                    <span className="tabular-nums">
                      ₹{total.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>

                <Link
                  href="/products"
                  className="block w-full text-center text-primary hover:text-primary/80 text-sm font-medium mt-5 smooth-transition"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
