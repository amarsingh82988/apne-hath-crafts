import dotenv from "dotenv";

dotenv.config();

const num = (value, fallback) => (value ? Number(value) : fallback);

export const env = {
  port: num(process.env.PORT, 5000),
  nodeEnv: process.env.NODE_ENV || "development",
  clientUrl: process.env.CLIENT_URL || "http://localhost:8080",
  mongoUri: process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/apne-hath-crochet",
  jwtSecret: process.env.JWT_SECRET || "dev-only-secret-change-me",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "7d",
  otpTtlMinutes: num(process.env.OTP_TTL_MINUTES, 10),
  adminEmail: process.env.ADMIN_EMAIL || "admin@apnehathcrochet.com",
  adminPassword: process.env.ADMIN_PASSWORD || "Admin@12345",
  razorpay: {
    keyId: process.env.RAZORPAY_KEY_ID || "",
    keySecret: process.env.RAZORPAY_KEY_SECRET || "",
    webhookSecret: process.env.RAZORPAY_WEBHOOK_SECRET || "",
  },
  smtp: {
    host: process.env.SMTP_HOST || "",
    port: num(process.env.SMTP_PORT, 587),
    user: process.env.SMTP_USER || "",
    pass: process.env.SMTP_PASS || "",
    from: process.env.MAIL_FROM || "Apne Hath Crochet <no-reply@apnehathcrochet.com>",
  },
  drive: {
    folderId: process.env.GOOGLE_DRIVE_FOLDER_ID || "",
    clientEmail: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || "",
    privateKey: (process.env.GOOGLE_PRIVATE_KEY || "").replace(/\\n/g, "\n"),
  },
};

export const isConfigured = {
  razorpay: Boolean(env.razorpay.keyId && env.razorpay.keySecret),
  smtp: Boolean(env.smtp.host && env.smtp.user && env.smtp.pass),
  drive: Boolean(env.drive.clientEmail && env.drive.privateKey && env.drive.folderId),
};
