"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";

interface OrderData {
  orderId: string;
  customerEmail: string;
  total: number;
  itemCount: number;
  timestamp: string;
}

export default function SuccessPage() {
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const data = sessionStorage.getItem("orderData");
    if (data) {
      setOrderData(JSON.parse(data));
      sessionStorage.removeItem("orderData");
    }
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent mx-auto mb-3" />
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-lg w-full">
        <div className="bg-card border border-border/60 rounded-xl p-8 md:p-10 text-center shadow-card">
          {/* Success Icon */}
          <div className="w-14 h-14 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check size={24} className="text-emerald-600" strokeWidth={2.5} />
          </div>

          <h1 className="font-serif text-3xl text-foreground mb-3">
            Order Confirmed
          </h1>

          <p className="text-sm text-muted-foreground mb-8 leading-relaxed">
            Thank you for your purchase. Your order has been received and you
            will receive a confirmation email shortly.
          </p>

          {orderData && (
            <div className="bg-secondary/60 border border-border/40 rounded-lg p-5 mb-8 text-left">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-2xs uppercase tracking-widest text-muted-foreground font-medium mb-0.5">
                    Order ID
                  </p>
                  <p className="text-sm font-medium text-foreground">
                    {orderData.orderId}
                  </p>
                </div>
                <div>
                  <p className="text-2xs uppercase tracking-widest text-muted-foreground font-medium mb-0.5">
                    Email
                  </p>
                  <p className="text-sm font-medium text-foreground truncate">
                    {orderData.customerEmail}
                  </p>
                </div>
                <div>
                  <p className="text-2xs uppercase tracking-widest text-muted-foreground font-medium mb-0.5">
                    Items
                  </p>
                  <p className="text-sm font-medium text-foreground tabular-nums">
                    {orderData.itemCount}
                  </p>
                </div>
                <div>
                  <p className="text-2xs uppercase tracking-widest text-muted-foreground font-medium mb-0.5">
                    Total
                  </p>
                  <p className="text-sm font-medium text-foreground tabular-nums">
                    ₹{orderData.total.toLocaleString('en-IN')}
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-3 mb-8">
            <p className="text-sm text-muted-foreground leading-relaxed">
              A confirmation email has been sent to{" "}
              <span className="font-medium text-foreground">
                {orderData?.customerEmail || "your email"}
              </span>
              . Our team will review your order and contact you with shipping
              details soon.
            </p>
            <p className="text-xs text-muted-foreground">
              Expected shipping time: 5-7 business days
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-lg text-sm font-medium border border-border text-foreground hover:bg-secondary smooth-transition"
            >
              Continue Shopping
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-lg text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 smooth-transition"
            >
              Back to Home
              <ArrowRight size={14} strokeWidth={2} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
