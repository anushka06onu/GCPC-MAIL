# 📧 DIU GCPC Email Suite — Premium Interactive Builder

> **A stunning, production-grade HTML Email Builder and Interactive Previewer workspace designed and developed solely by me to streamline outreach for the DIU Girls' Computer Programming Club (DIU GCPC).**

---

## 🌟 Project Overview

As the President of the **DIU Girls' Computer Programming Club (DIU GCPC)**, I designed and built this professional tool to solve a critical challenge: crafting gorgeous, high-converting, and fully responsive academic event invitations that look absolutely flawless on any device and email client (including Gmail, Outlook, Apple Mail, and Samsung Mail).

This interactive suite lets club executives customize event details, see real-time updates in a side-by-side desktop/mobile previewer, and instantly compile/export email-safe, inline-styled HTML ready for deployment.

---

## 🎨 Premium Features I Implemented

### 1. ⚙️ Real-Time Interactive Builder Studio
*   A responsive split-pane editor displaying standard input controls on the left and a live-rendering, fully reactive email preview iframe on the right.
*   **Dual Viewports:** Switch instantly between a **Desktop Preview** and a **Mobile Viewport** with single-tap responsiveness.
*   Dynamic rule builder that lets you add, edit, or remove custom event instructions and eligibility rules in real-time.

### 2. 📅 Premium Registration Deadline Card
*   Renders a beautiful, high-contrast, inline-styled registration deadline block:
    `📅 Registration Closes On: [Month Date, Year (Hour:Minute AM/PM)]`
*   Features a premium soft light background (`#f8fafc`), gold left-accent border (`#e08b00`), and bold slate text (`#0f172a`), creating a clean, modern aesthetic with zero dependency on slow-loading external images or unstable timers.
*   **Dynamic Visibility:** If no deadline is specified in the controls, the card completely omits itself from both the preview and exported HTML.

### 3. 🔒 Robust Light-Mode Style Locking
*   **The Inversion Problem**: Gmail and Apple Mail on dark-mode devices tend to invert background colors aggressively, which often turns the transparent GCPC logo invisible.
*   **My Solution**: 
    *   I locked the entire email template to **permanent light mode** (clean white `#ffffff` body cards and `#f1f5f9` page backdrops) using strict `!important` inline style overrides.
    *   Implemented precise **Gmail Android `[data-ogsc]` dark-mode kill switches** in the `<style>` header.
    *   Designed a custom solid-white logo capsule (`.white-capsule`) that wraps the transparent logos, preventing transparent text from washing out when system-wide dark mode is toggled.

### 4. 🔗 One-Click Code Compilation
*   Compiles and inline-styles all elements into a single email-client-compatible HTML template with a single click of the **"Copy Email HTML"** button.
*   Allows direct template downloading via the **"Download Template"** option.

### 5. 💼 Professional Footer & Branding
*   Swapped in custom circular, high-contrast social badges including Web, Facebook, Instagram, LinkedIn, and Telegram.
*   Preserved original, unmodified green-and-teal varsity colors for Daffodil International University and the CSE Department footer stamps.

---

## 🛠️ Technologies & Tools I Used

To build this email builder from the ground up, I leveraged a sleek, modern, and lightweight technical stack:

1.  **Frontend Core Logic**:
    *   **HTML5**: Used for the structural layout of the editor dashboard and the complex tabular grid system of the responsive email template.
    *   **Vanilla CSS3**: Engineered the premium sidebar layout, dark-mode builder dashboard aesthetic, viewport switching controls, custom micro-animations, and glassmorphism styling.
    *   **Vanilla JavaScript (ES6+)**: Developed the entire state-management engine, real-time iframe preview synchronizer, custom dynamic date parser, and clipboard-copy compiler.
2.  **Backend & Server**:
    *   **Node.js**: Powering the local server runtime.
    *   **Express.js**: Serving static assets, routing index views, and hosting the dashboard locally.
3.  **Local Assets**:
    *   Self-contained official high-resolution assets for GCPC, DIU, and CSE logos stored directly in the `/assets` workspace directory.

---

## 🚀 How to Run My Builder Locally

You can launch this builder locally on your computer in just a few simple steps:

### 1. Install Dependencies
Open your terminal in the project directory and install the lightweight server components:
```bash
npm install
```

### 2. Start the Server
Run the local startup script:
```bash
npm start
```
*The local development server will start successfully on port `5050`.*

### 3. Open the Workspace
Open Google Chrome and navigate to:
```url
http://localhost:5050
```
*The responsive interactive studio will open immediately, loaded with default event presets.*

---

## ✉️ The "Inspect Element" Sending Guide

To send this email directly through Gmail (without using external email marketing platforms like Mailchimp):
1. In the builder, customize your event flyer, text, and details.
2. Click **"Copy Email HTML"** to copy the compiled template code.
3. Open **Gmail** in your browser, click **Compose**, and type a placeholder word in the body text (e.g. `[GCPC_EMAIL]`).
4. Right-click the word `[GCPC_EMAIL]` and select **Inspect** to open Developer Tools.
5. In the DOM tree panel, right-click the `<div>` or `<span>` node containing your placeholder, and choose **Edit as HTML**.
6. Select the placeholder text, paste your copied email template code, and close the Developer Tools panel.
7. *Presto!* The gorgeous, fully compiled light-locked GCPC email template instantly renders inside Gmail, ready to be sent to your mailing lists!

---

## 📁 Project Structure

```
GCPC-MAIL/
├── index.html          # Dynamic Template Builder Studio (HTML5/CSS3/Vanilla JS)
├── server.js           # Lightweight Express web server
├── package.json        # Startup script configurations & dependencies
├── README.md           # This project documentation file
└── assets/             # Brand logos & TrueType Roboto font assets
```

---

Designed and developed with 💙 by **Fateha Hossain Anushka**, President of **DIU Girls' Computer Programming Club**.