import nodemailer from "nodemailer";
import { DailyDigestOptions } from "../types/email.types";
import { config } from "../config/env.config";


export class EmailService {
  private static transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: config.SMTP_USER,
      pass: config.SMTP_PASS,
    },
  });

  static async sendDailyDigest({
    to,
    name,
    purchases,
  }: DailyDigestOptions): Promise<void> {
    const subject = "Your Daily Book Purchase Summary";

    const htmlBody = `
      <h3>Hello ${name},</h3>
      <p>Here are your book purchases in the past day:</p>
      <ul>
        ${purchases
          .map(
            (p) => `
            <li>
              <strong>${(p.bookId as any)?.title}</strong> bought by 
              ${(p.userId as any)?.name} — 
              Qty: ${p.quantity}, Total: ₹${p.price} <br/>
              On: ${new Date(p.createdAt).toLocaleString()}
            </li>
          `
          )
          .join("")}
      </ul>
      <p>Keep writing great books!</p>
    `;

    await this.transporter.sendMail({
      from: config.EMAIL_FROM,
      to,
      subject,
      html: htmlBody,
    });

    console.log(`Sent daily digest to ${to}`);
  }

  static async sendMonthlyRevenueSummary({
    to,
    name,
    month,
    year,
    amount,
  }: {
    to: string;
    name: string;
    month: string;
    year: number;
    amount: number;
  }): Promise<void> {
    const subject = `Your Revenue Summary for ${month} ${year}`;

    const htmlBody = `
      <h3>Hello ${name},</h3>
      <p>Here is your revenue summary for <strong>${month} ${year}</strong>:</p>
      <ul>
        <li>Total Revenue: <strong>₹${amount.toFixed(2)}</strong></li>
      </ul>
      <p>Thank you for your contributions!</p>
    `;

    await this.transporter.sendMail({
      from: config.EMAIL_FROM,
      to,
      subject,
      html: htmlBody,
    });

    console.log(`Sent monthly revenue summary to ${to}`);
  }

  static async sendNewBookRelease({
    to,
    name,
    books,
  }: {
    to: string;
    name: string;
    books: { title: string; author: string }[];
  }): Promise<void> {
    const subject = `New Book Releass Available Now`;

    const bookListHTML = books
      .map(
        (book) => `
        <li><strong>${book.title}</strong> by ${book.author}</li>
      `
      )
      .join("");

      const htmlBody = `
      <h3>Hello ${name},</h3>
      <p>We're excited to share the latest book releases with you:</p>
      <ul>${bookListHTML}</ul>
      <p>Check them out today and enjoy reading!</p>
      <br/>
      <p>Happy Reading!</p>
    `;

    await this.transporter.sendMail({
      from: config.EMAIL_FROM,
      to,
      subject,
      html: htmlBody,
    });

    console.log(`Sent new book email to ${to}`);
  }
}
