import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import { Resend } from 'resend';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Enable CORS and parse JSON
app.use(cors());
app.use(express.json());

app.post('/api/contact', async (req, res) => {
  const { name, email, subject, message } = req.body;

  // 1. Validation Checks
  if (!name?.trim() || !email?.trim() || !subject?.trim() || !message?.trim()) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  const emailRegex = /^\S+@\S+\.\S+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Please enter a valid email address.' });
  }

  const now = new Date();
  const dateStr = now.toLocaleDateString();
  const timeStr = now.toLocaleTimeString();

  // 2. Prepare Email Metadata & Contents
  const adminEmail = 'rajpurohitabhijit543@gmail.com';
  const adminSubject = '📩 New Portfolio Contact Request';
  const adminText = `You have received a new contact request from your portfolio website.

Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}

Submitted On:
${dateStr} ${timeStr}

Please reply directly to the sender if required.`;

  const visitorSubject = 'Thank You for Contacting Abhijit Rajpurohit';
  const visitorHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Thank You for Contacting Abhijit Rajpurohit</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #0b0f19;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      color: #1f2937;
    }
    .wrapper {
      width: 100%;
      background-color: #0b0f19;
      padding: 40px 20px;
      box-sizing: border-box;
    }
    .card {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 24px;
      overflow: hidden;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
    }
    .header {
      background: linear-gradient(135deg, #7c3aed 0%, #06b6d4 100%);
      padding: 40px 30px;
      text-align: center;
    }
    .header h1 {
      margin: 0;
      color: #ffffff;
      font-size: 24px;
      font-weight: 800;
      letter-spacing: -0.5px;
    }
    .header p {
      margin: 8px 0 0;
      color: rgba(255, 255, 255, 0.85);
      font-size: 14px;
      font-weight: 500;
    }
    .content {
      padding: 40px 30px;
      line-height: 1.6;
      font-size: 15px;
      color: #374151;
    }
    .content p {
      margin: 0 0 16px;
    }
    .content strong {
      color: #111827;
    }
    .highlight-card {
      background-color: #f5f3ff;
      border: 1px solid #ddd6fe;
      border-radius: 16px;
      padding: 20px;
      margin: 24px 0;
    }
    .highlight-card p {
      margin: 0;
      font-weight: 600;
      color: #6d28d9;
      font-size: 14px;
      text-align: center;
    }
    .signature {
      margin-top: 32px;
      border-top: 1px solid #f3f4f6;
      padding-top: 24px;
    }
    .signature strong {
      font-size: 16px;
      display: block;
    }
    .signature span {
      display: block;
      font-size: 13px;
      color: #6b7280;
      margin-top: 2px;
    }
    .footer {
      text-align: center;
      padding: 30px;
      font-size: 11px;
      color: #4b5563;
      background-color: #0b0f19;
      line-height: 1.5;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="card">
      <div class="header">
        <h1>Abhijit Rajpurohit</h1>
        <p>Quality Assurance Engineer</p>
      </div>
      <div class="content">
        <p>Hello <strong>${name}</strong>,</p>
        <p>Thank you for contacting me through my portfolio website.</p>
        <p>I have successfully received your message and appreciate your interest.</p>
        <p>Your message has been added to my inbox, and I will review it carefully.</p>
        
        <div class="highlight-card">
          <p>⏳ I typically respond within 24–48 hours.</p>
        </div>
        
        <p>In the meantime, feel free to explore my portfolio and connect with me on LinkedIn.</p>
        <p>Thank you once again for your time.</p>
        
        <div class="signature">
          <strong>Best Regards,</strong>
          <strong>Abhijit Rajpurohit</strong>
          <span>QA Engineer</span>
          <span>📧 <a href="mailto:rajpurohitabhijit543@gmail.com" style="color: #7c3aed; text-decoration: none;">rajpurohitabhijit543@gmail.com</a></span>
        </div>
      </div>
    </div>
    <div class="footer">
      <p>This is an automated confirmation email. Please do not reply to this email.</p>
      <p>&copy; 2026 Abhijit Rajpurohit. All Rights Reserved.</p>
    </div>
  </div>
</body>
</html>`;

  // 3. Dispatch Emails via FormSubmit AJAX Endpoint (no passwords or credentials required)
  try {
    const formSubmitUrl = `https://formsubmit.co/ajax/rajpurohitabhijit543@gmail.com`;

    console.log('Routing contact request securely through FormSubmit API...');
    const response = await fetch(formSubmitUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        email: email,
        subject: subject,
        message: message,
        _subject: `📩 New Portfolio Contact Request: ${subject}`,
        _autoresponse: `Hello ${name},\n\nThank you for reaching out through my portfolio website.\n\nI have successfully received your message and will review it carefully. I typically respond within 24 to 48 hours.\n\nIn the meantime, feel free to connect with me on LinkedIn.\n\nBest Regards,\nAbhijit Rajpurohit\nQA Engineer`
      })
    });

    const data = await response.json();

    if (response.ok) {
      console.log(`Dispatched contact emails successfully:`, data);
      return res.status(200).json({ success: true, message: 'Message sent successfully.' });
    } else {
      throw new Error(data.message || 'FormSubmit failed to route the email.');
    }

  } catch (error) {
    console.error('Mail dispatch error:', error);
    return res.status(500).json({ error: error.message || 'Failed to dispatch email notification.' });
  }
});

// Fallback Route
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found.' });
});

app.listen(PORT, () => {
  console.log(`[Backend Active] Server is running on port ${PORT}`);
});
