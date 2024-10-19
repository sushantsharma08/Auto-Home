# Home Automation

A project to automate your home, blending **Electronics** with **Computer Science**. This is a simplified version of the original project, with certain code changes for data security. Developers looking to adapt this can easily make minor modifications to fit their own requirements.

## Description

Welcome to the Home Automation project! This project connects household electronics using an ESP-32 (System On a Chip) and a relay module, controlled via a web interface. The website updates data on a MongoDB server, allowing remote control and automation of various devices.

## Features
- ESP-32 microcontroller integration
- Relay modules for device control
- Full-stack web application for remote access
- MongoDB database for data storage

## Tools, Libraries, and Frameworks

### Frontend:
- **Vite** – Fast build tool
- **@tanstack/react-query** – For data synchronization and caching
- **axios** – Promise-based HTTP client
- **react-router-dom** – Declarative routing
- **react-hot-toast** – Notifications
- **TailwindCSS** - for styling

### Backend:
- **bcryptjs** – Password hashing
- **cors** – Middleware for Cross-Origin Resource Sharing
- **express** – Web framework for Node.js
- **mongoose** – MongoDB object modeling
- **nodemon** – For automatic server restarting during development

### Hardware:
- **ESP-32** – Microcontroller used for automation
- **Relay Modules** – To control electrical devices

## Project Plan

![Project Workflow](./assets/workflow.jpg)

## How to Make This Project Your Own

### Follow these simple steps to get started:

1. **Download the code** from this repository.

2. **Backend Configuration:**
   - Install the required dependencies:
     ```bash
     npm install
     ```
   - Connect to MongoDB:
     Insert your MongoDB connection string in the appropriate format. Ensure that the username and password are correct.

     ![DB Config](./assets/db_config.png)

   - Set up environment variables:
     - In the `.env` file, add your `DB_USERNAME`, `DB_PASSWORD`, `PORT`, and `HASH_SALT` (recommended: 8-12).
     - If deploying, make sure to provide these values as environment variables.

3. **Frontend Configuration:**
   - Set the origin URL:
     Open the `Relay.tsx` file in the `src/components` folder, and paste your backend's deployment URL under the `Origin` field.
     Example: `https://home_automation_backend.com`

     ![URL Config](./assets/url_config.png)

4. **ESP32 Configuration:**
   - Set the origin URL in the ESP32 code:
     Update the URL field in the ESP32 code to point to your backend's deployment.

     ![ESP32 URL Config](./assets/espurl_config.png)

   - Add your Wi-Fi credentials:
     Insert your Wi-Fi network details to ensure the ESP32 can connect to the internet.

     ![WiFi Config](./assets/wifi_config.png)

   - Set up the ESP32 and Relay:
     Connect the relay pins according to the pin mappings specified in the code.

## Final Project Preview

Here's a snapshot of the final project:

![Final Preview](./assets/Complete.jpeg)

