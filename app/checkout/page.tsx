"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import {
  Check,
  ChevronRight,
  Lock,
  X,
  QrCode,
  MessageCircle,
  Mail,
  Clock,
  ShieldCheck,
  Phone,
  ShoppingBag,
} from "lucide-react";
import { phonepeQr } from "@/app/assets/images";

const FREE_SHIPPING_THRESHOLD = 1000;
const SHIPPING_CHARGE = 120;

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

/* ─── Payment QR Modal ─── */

function PaymentModal({
  total,
  onConfirmPayment,
  onCancel,
  isProcessing,
}: {
  total: number;
  onConfirmPayment: () => void;
  onCancel: () => void;
  isProcessing: boolean;
}) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape" && !isProcessing) onCancel();
    },
    [onCancel, isProcessing]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [handleKeyDown]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={!isProcessing ? onCancel : undefined}
      />

      {/* Modal */}
      <div className="relative bg-background border border-border rounded-2xl shadow-2xl w-full max-w-md max-h-[90dvh] overflow-y-auto animate-in zoom-in-95 fade-in duration-200">
        {/* Close button */}
        {!isProcessing && (
          <button
            onClick={onCancel}
            className="absolute top-4 right-4 z-10 p-1.5 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg smooth-transition"
            aria-label="Close"
          >
            <X size={18} strokeWidth={1.75} />
          </button>
        )}

        <div className="p-6 sm:p-8">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <QrCode size={22} className="text-primary" strokeWidth={1.75} />
            </div>
            <h2 className="font-serif text-2xl text-foreground mb-2">
              Complete Your Payment
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Thank you for placing your order with us! To complete your
              purchase, please scan the QR code below using any UPI app
              (PhonePe, Google Pay, Paytm, etc.)
            </p>
          </div>

          {/* Amount */}
          <div className="bg-secondary/60 border border-border/40 rounded-xl p-4 mb-5 text-center">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1 font-medium">
              Amount to Pay
            </p>
            <p className="text-2xl font-semibold text-foreground tabular-nums">
              {formatINR(total)}
            </p>
          </div>

          {/* QR Code */}
          <div className="flex justify-center mb-5">
            <div className="bg-white rounded-xl p-3 border border-border/40 shadow-sm">
              <Image
                src={phonepeQr}
                alt="Scan to pay via UPI"
                width={220}
                height={220}
                className="rounded-lg"
                priority
              />
            </div>
          </div>

          {/* Important Notes */}
          <div className="space-y-3 mb-6">
            <div className="flex gap-3 items-start">
              <ShieldCheck
                size={16}
                className="text-primary mt-0.5 flex-shrink-0"
                strokeWidth={1.75}
              />
              <p className="text-xs text-muted-foreground leading-relaxed">
                Your order will be processed and shipped once we confirm
                your payment. This typically happens within a few hours.
              </p>
            </div>

            <div className="flex gap-3 items-start">
              <Clock
                size={16}
                className="text-primary mt-0.5 flex-shrink-0"
                strokeWidth={1.75}
              />
              <p className="text-xs text-muted-foreground leading-relaxed">
                You will receive a confirmation email and WhatsApp message
                within <span className="font-medium text-foreground">1-3 hours</span> of
                your payment.
              </p>
            </div>

            <div className="flex gap-3 items-start">
              <MessageCircle
                size={16}
                className="text-primary mt-0.5 flex-shrink-0"
                strokeWidth={1.75}
              />
              <p className="text-xs text-muted-foreground leading-relaxed">
                If you don&apos;t receive a confirmation, please reach out to us
                on WhatsApp at{" "}
                <a
                  href="https://wa.me/917014186406"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-primary hover:text-primary/80 smooth-transition"
                >
                  +91 70141 86406
                </a>
                {" "}and we&apos;ll be happy to assist you.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2.5">
            <button
              onClick={onConfirmPayment}
              disabled={isProcessing}
              className="w-full bg-primary text-primary-foreground py-3 rounded-lg text-sm font-medium hover:bg-primary/90 smooth-transition disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary-foreground border-t-transparent" />
                  Confirming your order...
                </>
              ) : (
                <>
                  <Check size={16} strokeWidth={2} />
                  I&apos;ve Completed the Payment
                </>
              )}
            </button>

            {!isProcessing && (
              <button
                onClick={onCancel}
                className="w-full py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary smooth-transition"
              >
                Cancel Order
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Order Confirmed View ─── */

function OrderConfirmed({
  email,
  customerName,
  orderId,
}: {
  email: string;
  customerName: string;
  orderId: string;
}) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-lg w-full">
        {/* Success Icon */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-5">
            <Check size={28} className="text-emerald-600" strokeWidth={2} />
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-foreground mb-2">
            Thank You, {customerName}!
          </h1>
          <p className="text-sm text-muted-foreground">
            Your order{" "}
            <span className="font-semibold text-foreground">{orderId}</span> has
            been placed successfully.
          </p>
        </div>

        {/* Order Details Card */}
        <div className="bg-card border border-border/60 rounded-xl p-5 sm:p-6 shadow-card mb-6">
          <h2 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-4 font-sans">
            What Happens Next
          </h2>
          <div className="space-y-4">
            <div className="flex gap-3 items-start">
              <div className="w-7 h-7 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-semibold text-primary">1</span>
              </div>
              <div>
                <p className="text-sm font-medium text-foreground mb-0.5">
                  Payment Verification
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  We&apos;ll verify your UPI payment. This usually takes just a
                  few hours.
                </p>
              </div>
            </div>

            <div className="flex gap-3 items-start">
              <div className="w-7 h-7 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-semibold text-primary">2</span>
              </div>
              <div>
                <p className="text-sm font-medium text-foreground mb-0.5">
                  Order Confirmation
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Once confirmed, we&apos;ll start preparing your items with
                  care and attention to detail.
                </p>
              </div>
            </div>

            <div className="flex gap-3 items-start">
              <div className="w-7 h-7 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-semibold text-primary">3</span>
              </div>
              <div>
                <p className="text-sm font-medium text-foreground mb-0.5">
                  Shipping & Delivery
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Your order will be carefully packed and shipped within 4-5
                  business days. We&apos;ll share tracking details once
                  dispatched.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Communication Info */}
        <div className="bg-secondary/60 border border-border/40 rounded-xl p-5 mb-6 space-y-3">
          <div className="flex gap-3 items-start">
            <Mail
              size={16}
              className="text-primary mt-0.5 flex-shrink-0"
              strokeWidth={1.75}
            />
            <p className="text-xs text-muted-foreground leading-relaxed">
              A confirmation email will be sent to{" "}
              <span className="font-medium text-foreground">{email}</span>{" "}
              within 1-3 hours of payment verification.
            </p>
          </div>
          <div className="flex gap-3 items-start">
            <MessageCircle
              size={16}
              className="text-primary mt-0.5 flex-shrink-0"
              strokeWidth={1.75}
            />
            <p className="text-xs text-muted-foreground leading-relaxed">
              You&apos;ll also receive a WhatsApp confirmation with your order
              details and tracking information.
            </p>
          </div>
          <div className="flex gap-3 items-start">
            <Phone
              size={16}
              className="text-primary mt-0.5 flex-shrink-0"
              strokeWidth={1.75}
            />
            <p className="text-xs text-muted-foreground leading-relaxed">
              Didn&apos;t receive a confirmation? No worries — just drop us a
              message on WhatsApp at{" "}
              <a
                href="https://wa.me/917014186406"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-primary hover:text-primary/80 smooth-transition"
              >
                +91 70141 86406
              </a>{" "}
              and we&apos;ll sort it out right away.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center space-y-3">
          <Link
            href="/products"
            className="inline-flex items-center justify-center gap-2 w-full sm:w-auto bg-primary text-primary-foreground px-8 py-3 rounded-lg text-sm font-medium hover:bg-primary/90 smooth-transition"
          >
            <ShoppingBag size={16} strokeWidth={2} />
            Continue Shopping
          </Link>
          <p className="text-xs text-muted-foreground">
            We truly appreciate your support. Happy gaming!
          </p>
        </div>
      </div>
    </div>
  );
}

/* ─── Checkout Page ─── */

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const shipping = total >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_CHARGE;
  const grandTotal = total + shipping;
  const amountToFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - total);

  const [isLoading, setIsLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [confirmedOrderId, setConfirmedOrderId] = useState("");
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

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setShowPaymentModal(true);
  };

  const handleCancelPayment = () => {
    setShowPaymentModal(false);
  };

  const handleConfirmPayment = async () => {
    setIsLoading(true);
    setError("");

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
        customer_phone: formData.phone,
        shipping_address: `${formData.address}, ${formData.city}, ${formData.state} ${formData.zipCode}`,
        items_text: itemsText,
        items_html: itemsHtml,
        order_total: formatINR(grandTotal),
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

      setShowPaymentModal(false);
      setConfirmedOrderId(orderId);
      setOrderPlaced(true);
      clearCart();
    } catch (err) {
      setError("Something went wrong. Please try again or contact us on WhatsApp.");
      setShowPaymentModal(false);
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
      <OrderConfirmed
        email={formData.email}
        customerName={formData.firstName}
        orderId={confirmedOrderId}
      />
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
              <form onSubmit={handlePlaceOrder} className="space-y-6">
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
                        placeholder="Rahul"
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
                        placeholder="Sharma"
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
                        placeholder="rahul.sharma@gmail.com"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className={inputClasses}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                        Phone
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        placeholder="+91 98765 43210"
                        required
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
                      placeholder="42, MG Road, Indiranagar"
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
                        placeholder="Bengaluru"
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
                        placeholder="Karnataka"
                        required
                        value={formData.state}
                        onChange={handleChange}
                        className={inputClasses}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                        PIN Code
                      </label>
                      <input
                        type="text"
                        name="zipCode"
                        placeholder="560038"
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
                  className="w-full bg-primary text-primary-foreground py-3 rounded-lg text-sm font-medium hover:bg-primary/90 smooth-transition flex items-center justify-center gap-2"
                >
                  <Lock size={14} strokeWidth={2} />
                  Place Order &mdash; {formatINR(grandTotal)}
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
                      {formatINR(total)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Shipping</span>
                    {shipping === 0 ? (
                      <span className="text-emerald-600 font-medium">Free</span>
                    ) : (
                      <span className="tabular-nums">{formatINR(shipping)}</span>
                    )}
                  </div>
                  <div className="flex justify-between text-sm font-semibold text-foreground pt-2.5 border-t border-border">
                    <span>Total</span>
                    <span className="tabular-nums">
                      {formatINR(grandTotal)}
                    </span>
                  </div>
                </div>

                {/* Free shipping nudge */}
                {amountToFreeShipping > 0 && (
                  <div className="mt-4 bg-amber-50 border border-amber-200/60 rounded-lg px-3.5 py-2.5">
                    <p className="text-xs text-amber-800 leading-relaxed">
                      Add{" "}
                      <span className="font-semibold">
                        {formatINR(amountToFreeShipping)}
                      </span>{" "}
                      more to get{" "}
                      <span className="font-semibold">free shipping!</span>
                    </p>
                    <Link
                      href="/products"
                      className="text-xs font-medium text-amber-700 hover:text-amber-900 underline underline-offset-2 smooth-transition mt-1 inline-block"
                    >
                      Browse products
                    </Link>
                  </div>
                )}

                {shipping === 0 && (
                  <div className="mt-4 bg-emerald-50 border border-emerald-200/60 rounded-lg px-3.5 py-2.5">
                    <p className="text-xs text-emerald-700 font-medium">
                      You&apos;ve unlocked free shipping!
                    </p>
                  </div>
                )}

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

      {/* Payment QR Modal */}
      {showPaymentModal && (
        <PaymentModal
          total={grandTotal}
          onConfirmPayment={handleConfirmPayment}
          onCancel={handleCancelPayment}
          isProcessing={isLoading}
        />
      )}
    </div>
  );
}
