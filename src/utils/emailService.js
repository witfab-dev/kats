// src/utils/emailServices.js
/**
 * Email service utilities for sending notifications and communications
 */

import { schoolInfo } from '../assets/data/constants';

// Email templates
const emailTemplates = {
  admissionConfirmation: (data) => ({
    subject: `Application Received - ${schoolInfo.name}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: ${schoolInfo.colors?.primary || '#003366'}; color: white; padding: 20px; text-align: center; }
          .content { padding: 30px; background: #f9f9f9; }
          .footer { text-align: center; padding: 20px; font-size: 12px; color: #666; }
          .button { display: inline-block; padding: 12px 24px; background: ${schoolInfo.colors?.primary || '#003366'}; color: white; text-decoration: none; border-radius: 4px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>${schoolInfo.name}</h1>
            <p>${schoolInfo.motto}</p>
          </div>
          <div class="content">
            <h2>Application Received</h2>
            <p>Dear ${data.name},</p>
            <p>Thank you for applying to ${schoolInfo.name}. We have received your application for the ${data.program} program.</p>
            
            <h3>Application Details:</h3>
            <ul>
              <li><strong>Application ID:</strong> ${data.applicationId}</li>
              <li><strong>Program:</strong> ${data.program}</li>
              <li><strong>Entry Level:</strong> ${data.level}</li>
              <li><strong>Application Date:</strong> ${new Date(data.date).toLocaleDateString()}</li>
            </ul>
            
            <h3>Next Steps:</h3>
            <ol>
              <li>Document verification (3-5 business days)</li>
              <li>Entrance exam notification (if applicable)</li>
              <li>Interview schedule</li>
              <li>Final admission decision</li>
            </ol>
            
            <p>You can check your application status anytime using your application ID.</p>
            
            <p style="text-align: center;">
              <a href="${data.statusLink}" class="button">Check Application Status</a>
            </p>
            
            <p>If you have any questions, please contact our admissions office.</p>
            
            <p>Best regards,<br>
            Admissions Office<br>
            ${schoolInfo.name}</p>
          </div>
          <div class="footer">
            <p>${schoolInfo.contact.address}</p>
            <p>Phone: ${schoolInfo.contact.phone} | Email: ${schoolInfo.contact.email}</p>
            <p>© ${new Date().getFullYear()} ${schoolInfo.name}. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
      Application Received - ${schoolInfo.name}
      
      Dear ${data.name},
      
      Thank you for applying to ${schoolInfo.name}. We have received your application for the ${data.program} program.
      
      Application Details:
      - Application ID: ${data.applicationId}
      - Program: ${data.program}
      - Entry Level: ${data.level}
      - Application Date: ${new Date(data.date).toLocaleDateString()}
      
      Next Steps:
      1. Document verification (3-5 business days)
      2. Entrance exam notification (if applicable)
      3. Interview schedule
      4. Final admission decision
      
      Check your application status: ${data.statusLink}
      
      If you have any questions, please contact our admissions office.
      
      Best regards,
      Admissions Office
      ${schoolInfo.name}
      
      ${schoolInfo.contact.address}
      Phone: ${schoolInfo.contact.phone}
      Email: ${schoolInfo.contact.email}
    `
  }),

  contactFormSubmission: (data) => ({
    subject: `New Contact Form Submission - ${data.subject}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #003366; color: white; padding: 20px; text-align: center; }
          .content { padding: 30px; background: #f9f9f9; }
          .field { margin-bottom: 15px; }
          .label { font-weight: bold; color: #003366; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>New Contact Form Submission</h2>
          </div>
          <div class="content">
            <div class="field">
              <div class="label">Name:</div>
              <div>${data.name}</div>
            </div>
            <div class="field">
              <div class="label">Email:</div>
              <div>${data.email}</div>
            </div>
            <div class="field">
              <div class="label">Phone:</div>
              <div>${data.phone || 'Not provided'}</div>
            </div>
            <div class="field">
              <div class="label">Department:</div>
              <div>${data.department || 'General Inquiry'}</div>
            </div>
            <div class="field">
              <div class="label">Subject:</div>
              <div>${data.subject}</div>
            </div>
            <div class="field">
              <div class="label">Message:</div>
              <div>${data.message}</div>
            </div>
            <div class="field">
              <div class="label">Submission Time:</div>
              <div>${new Date(data.timestamp).toLocaleString()}</div>
            </div>
            <div class="field">
              <div class="label">User IP:</div>
              <div>${data.ip || 'Not available'}</div>
            </div>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
      New Contact Form Submission
      
      Name: ${data.name}
      Email: ${data.email}
      Phone: ${data.phone || 'Not provided'}
      Department: ${data.department || 'General Inquiry'}
      Subject: ${data.subject}
      Message: ${data.message}
      Submission Time: ${new Date(data.timestamp).toLocaleString()}
      User IP: ${data.ip || 'Not available'}
    `
  }),

  eventRegistration: (data) => ({
    subject: `Event Registration Confirmation - ${data.eventTitle}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #28a745; color: white; padding: 20px; text-align: center; }
          .content { padding: 30px; background: #f9f9f9; }
          .event-details { background: white; padding: 20px; border-radius: 5px; margin: 20px 0; }
          .qr-code { text-align: center; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>Event Registration Confirmed! 🎉</h2>
          </div>
          <div class="content">
            <p>Dear ${data.name},</p>
            <p>Your registration for <strong>${data.eventTitle}</strong> has been confirmed.</p>
            
            <div class="event-details">
              <h3>Event Details</h3>
              <p><strong>Date:</strong> ${new Date(data.eventDate).toLocaleDateString()}</p>
              <p><strong>Time:</strong> ${data.eventTime}</p>
              <p><strong>Location:</strong> ${data.eventLocation}</p>
              <p><strong>Registration ID:</strong> ${data.registrationId}</p>
            </div>
            
            ${data.qrCode ? `
            <div class="qr-code">
              <p><strong>Your QR Code for Check-in:</strong></p>
              <img src="${data.qrCode}" alt="QR Code" style="width: 150px; height: 150px;">
            </div>
            ` : ''}
            
            <p><strong>Important Notes:</strong></p>
            <ul>
              <li>Please arrive 15 minutes before the event starts</li>
              <li>Bring a valid ID for verification</li>
              <li>${data.registrationId ? 'Show your registration ID or QR code at the entrance' : ''}</li>
              ${data.additionalNotes ? `<li>${data.additionalNotes}</li>` : ''}
            </ul>
            
            <p>If you need to cancel or have any questions, please contact us.</p>
            
            <p>We look forward to seeing you at the event!</p>
            
            <p>Best regards,<br>
            Events Team<br>
            ${schoolInfo.name}</p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
      Event Registration Confirmation - ${data.eventTitle}
      
      Dear ${data.name},
      
      Your registration for "${data.eventTitle}" has been confirmed.
      
      Event Details:
      - Date: ${new Date(data.eventDate).toLocaleDateString()}
      - Time: ${data.eventTime}
      - Location: ${data.eventLocation}
      - Registration ID: ${data.registrationId}
      
      Important Notes:
      • Please arrive 15 minutes before the event starts
      • Bring a valid ID for verification
      ${data.registrationId ? '• Show your registration ID or QR code at the entrance' : ''}
      ${data.additionalNotes ? `• ${data.additionalNotes}` : ''}
      
      If you need to cancel or have any questions, please contact us.
      
      We look forward to seeing you at the event!
      
      Best regards,
      Events Team
      ${schoolInfo.name}
    `
  })
};

// Email service configuration
const emailConfig = {
  apiKey: process.env.REACT_APP_EMAIL_API_KEY,
  apiUrl: process.env.REACT_APP_EMAIL_API_URL || 'https://api.emailservice.com',
  fromEmail: process.env.REACT_APP_FROM_EMAIL || 'noreply@katss.ac.rw',
  fromName: process.env.REACT_APP_FROM_NAME || schoolInfo.name,
  replyTo: process.env.REACT_APP_REPLY_TO || schoolInfo.contact.email
};

// Main email sending function
export const sendEmail = async (templateName, data, recipients, options = {}) => {
  try {
    // Get template
    const template = emailTemplates[templateName];
    if (!template) {
      throw new Error(`Email template "${templateName}" not found`);
    }

    // Prepare email data
    const emailData = template(data);
    const emailPayload = {
      to: Array.isArray(recipients) ? recipients : [recipients],
      from: {
        email: options.from || emailConfig.fromEmail,
        name: options.fromName || emailConfig.fromName
      },
      subject: options.subject || emailData.subject,
      html: emailData.html,
      text: emailData.text,
      reply_to: options.replyTo || emailConfig.replyTo,
      attachments: options.attachments || [],
      tags: options.tags || ['automated'],
      metadata: {
        template: templateName,
        timestamp: new Date().toISOString(),
        ...options.metadata
      }
    };

    // Send email based on environment
    if (process.env.NODE_ENV === 'production') {
      return await sendProductionEmail(emailPayload);
    } else {
      return await sendDevelopmentEmail(emailPayload);
    }
  } catch (error) {
    console.error('Email sending error:', error);
    throw error;
  }
};

// Send email in production (using actual email service)
const sendProductionEmail = async (emailPayload) => {
  // Using SendGrid as an example
  const response = await fetch(`${emailConfig.apiUrl}/send`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${emailConfig.apiKey}`
    },
    body: JSON.stringify(emailPayload)
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Email service error: ${error}`);
  }

  const result = await response.json();
  
  // Log success
  console.log('Email sent successfully:', {
    messageId: result.messageId,
    to: emailPayload.to,
    template: emailPayload.metadata?.template
  });

  return result;
};

// Send email in development (log to console)
const sendDevelopmentEmail = async (emailPayload) => {
  console.group('📧 Email Simulation (Development Mode)');
  console.log('To:', emailPayload.to);
  console.log('Subject:', emailPayload.subject);
  console.log('Template:', emailPayload.metadata?.template);
  console.log('HTML Preview:', emailPayload.html.substring(0, 200) + '...');
  console.groupEnd();

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  return {
    success: true,
    messageId: `dev_${Date.now()}`,
    development: true,
    preview: {
      html: emailPayload.html,
      text: emailPayload.text
    }
  };
};

// Batch email sending
export const sendBatchEmails = async (templateName, dataArray, options = {}) => {
  const results = [];
  const errors = [];

  for (const [index, data] of dataArray.entries()) {
    try {
      const result = await sendEmail(templateName, data, data.email, {
        ...options,
        metadata: {
          ...options.metadata,
          batchIndex: index,
          totalInBatch: dataArray.length
        }
      });
      results.push(result);
    } catch (error) {
      errors.push({
        index,
        data,
        error: error.message
      });
    }

    // Rate limiting delay
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  return {
    total: dataArray.length,
    success: results.length,
    failed: errors.length,
    results,
    errors
  };
};

// Email validation and sanitization
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const sanitizeEmailContent = (content) => {
  // Remove potentially dangerous HTML/scripts
  const tempDiv = document.createElement('div');
  tempDiv.textContent = content;
  return tempDiv.innerHTML;
};

// Email tracking (open rates, click rates)
export const trackEmailOpen = (messageId, recipient) => {
  // This would be called from a tracking pixel in the email
  console.log('Email opened:', { messageId, recipient, timestamp: new Date().toISOString() });
  
  // Send to analytics
  fetch('/api/email-tracking/open', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messageId, recipient, timestamp: new Date().toISOString() })
  });
};

export const trackEmailClick = (messageId, recipient, link) => {
  console.log('Email link clicked:', { messageId, recipient, link, timestamp: new Date().toISOString() });
  
  fetch('/api/email-tracking/click', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messageId, recipient, link, timestamp: new Date().toISOString() })
  });
};

// Email queue management
const emailQueue = [];
let isProcessingQueue = false;

export const addToEmailQueue = (templateName, data, recipients, options = {}) => {
  emailQueue.push({
    id: `email_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    templateName,
    data,
    recipients,
    options,
    status: 'queued',
    createdAt: new Date().toISOString()
  });

  if (!isProcessingQueue) {
    processEmailQueue();
  }
};

const processEmailQueue = async () => {
  if (isProcessingQueue || emailQueue.length === 0) return;
  
  isProcessingQueue = true;
  
  while (emailQueue.length > 0) {
    const emailJob = emailQueue.shift();
    
    try {
      emailJob.status = 'processing';
      emailJob.startedAt = new Date().toISOString();
      
      const result = await sendEmail(
        emailJob.templateName,
        emailJob.data,
        emailJob.recipients,
        emailJob.options
      );
      
      emailJob.status = 'sent';
      emailJob.result = result;
      emailJob.completedAt = new Date().toISOString();
      
    } catch (error) {
      emailJob.status = 'failed';
      emailJob.error = error.message;
      emailJob.attempts = (emailJob.attempts || 0) + 1;
      
      // Retry logic (max 3 attempts)
      if (emailJob.attempts < 3) {
        emailQueue.push(emailJob); // Add back to queue
      }
    }
    
    // Delay between emails
    await new Promise(resolve => setTimeout(resolve, 200));
  }
  
  isProcessingQueue = false;
};

// Export all email functions
export default {
  sendEmail,
  sendBatchEmails,
  addToEmailQueue,
  validateEmail,
  sanitizeEmailContent,
  trackEmailOpen,
  trackEmailClick,
  templates: emailTemplates
};