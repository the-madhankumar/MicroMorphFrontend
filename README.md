# MicroMorph AI - Frontend

The frontend for the MicroMorph platform is a React-based web application that provides a user-friendly interface for real-time marine micro-organism analysis and water quality monitoring[cite: 307, 354].

## 🚀 Features
* **Live Analysis:** Supports both Live Capture via a USB microscope and manual image uploads[cite: 346].
* **Data Visualization:** Integrated dashboards with Bar, Pie, Line, and Gauge charts to visualize organism counts and ecological trends[cite: 305].
* **Environmental Monitoring:** Tracks real-time water quality parameters including pH, Temperature, Turbidity, and Salinity[cite: 359, 368].
* **Species Dataset:** View and manage identified species and "Unknown" organisms detected by the system[cite: 339, 340].

## 🛠️ Tech Stack
* **Framework:** React.js [cite: 307]
* **Routing:** React Router DOM [cite: 337]
* **Backend Integration:** Firebase (Realtime Database & Remote Config) [cite: 366, 367]
* **Styling:** CSS3 (including responsive grid layouts) [cite: 348, 352]
* **Charts:** Chart.js / Recharts (implied by directory structure) [cite: 305]

## 🚦 Getting Started
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app)[cite: 307].

### Available Scripts
In the project directory, you can run:
* `npm start`: Runs the app in development mode at [http://localhost:3000](http://localhost:3000)[cite: 308].
* `npm test`: Launches the test runner[cite: 310].
* `npm run build`: Builds the app for production to the `build` folder[cite: 311].

## 📁 Project Structure
* `src/components/UserInput`: Handles image input via webcam or file upload[cite: 306, 340].
* `src/components/ShowImages`: Contains various chart components for data visualization[cite: 305].
* `src/components/FirebaseService`: Manages connection to Firebase for sensor data and logs[cite: 366, 368].
* `src/Data/home.js`: Contains the step-by-step user guide for the platform[cite: 343].

## 🌐 Vision
To make advanced marine micro-organism analysis accessible and field-deployable to support researchers in protecting ocean health[cite: 361].
