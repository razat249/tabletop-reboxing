import nodemailer from "nodemailer";
import { NextRequest, NextResponse } from "next/server";

interface CheckoutData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
  }>;
  total: number;
}

// Initialize Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASSWORD,
  },
});

export async function POST(request: NextRequest) {
  try {
    const data: CheckoutData = await request.json();

    // Validate required fields
    if (!data.firstName || !data.lastName || !data.email || !data.address) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Format order summary
    const itemsList = data.items
      .map(
        (item) =>
          `- ${item.name} x${item.quantity} = $${(
            item.price * item.quantity
          ).toFixed(2)}`
      )
      .join("\n");

    // Email to business
    const businessEmailHtml = `
      <h2>New Order Received</h2>
      <p><strong>Order ID:</strong> ${Date.now()}</p>
      
      <h3>Customer Information</h3>
      <p>
        <strong>Name:</strong> ${data.firstName} ${data.lastName}<br>
        <strong>Email:</strong> ${data.email}<br>
        <strong>Phone:</strong> ${data.phone || "N/A"}<br>
        <strong>Address:</strong> ${data.address}<br>
        <strong>City:</strong> ${data.city}, ${data.state} ${data.zipCode}
      </p>

      <h3>Order Items</h3>
      <table style="width:100%; border-collapse: collapse;">
        <tr style="border: 1px solid #ddd;">
          <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Product</th>
          <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Quantity</th>
          <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Price</th>
          <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Total</th>
        </tr>
        ${data.items
          .map(
            (item) => `
          <tr style="border: 1px solid #ddd;">
            <td style="border: 1px solid #ddd; padding: 8px;">${item.name}</td>
            <td style="border: 1px solid #ddd; padding: 8px;">${
              item.quantity
            }</td>
            <td style="border: 1px solid #ddd; padding: 8px;">$${item.price.toFixed(
              2
            )}</td>
            <td style="border: 1px solid #ddd; padding: 8px;">$${(
              item.price * item.quantity
            ).toFixed(2)}</td>
          </tr>
        `
          )
          .join("")}
      </table>

      <h3 style="margin-top: 20px;">Order Total: $${data.total.toFixed(2)}</h3>
    `;

    // Email to customer
    const customerEmailHtml = `
      <h2>Order Confirmation</h2>
      <p>Thank you for your order! We've received your purchase and will process it shortly.</p>
      
      <p><strong>Order ID:</strong> ${Date.now()}</p>
      
      <h3>Your Order</h3>
      <table style="width:100%; border-collapse: collapse;">
        <tr style="border: 1px solid #ddd;">
          <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Product</th>
          <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Quantity</th>
          <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Price</th>
          <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Total</th>
        </tr>
        ${data.items
          .map(
            (item) => `
          <tr style="border: 1px solid #ddd;">
            <td style="border: 1px solid #ddd; padding: 8px;">${item.name}</td>
            <td style="border: 1px solid #ddd; padding: 8px;">${
              item.quantity
            }</td>
            <td style="border: 1px solid #ddd; padding: 8px;">$${item.price.toFixed(
              2
            )}</td>
            <td style="border: 1px solid #ddd; padding: 8px;">$${(
              item.price * item.quantity
            ).toFixed(2)}</td>
          </tr>
        `
          )
          .join("")}
      </table>

      <h3 style="margin-top: 20px;">Total: $${data.total.toFixed(2)}</h3>
      
      <p style="margin-top: 20px; color: #666;">
        We'll send you a shipping confirmation email once your order is on its way.
      </p>
    `;

    // Send emails
    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: "razat249@gmail.com",
      subject: `New Order #${Date.now()}`,
      html: businessEmailHtml,
    });

    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: data.email,
      subject: "Order Confirmation - Tabletop Re-Boxing",
      html: customerEmailHtml,
    });

    return NextResponse.json(
      { success: true, orderId: Date.now() },
      { status: 200 }
    );
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Failed to process checkout" },
      { status: 500 }
    );
  }
}
