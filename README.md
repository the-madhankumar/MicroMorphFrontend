# MicroMorph AI - Frontend

The frontend for the MicroMorph platform is a React-based web application that provides a user-friendly interface for real-time marine micro-organism analysis and water quality monitoring[cite: 307, 354].

## 🚀 Features
* **Live Analysis:** Supports both Live Capture via a USB microscope and manual image uploads.
* **Data Visualization:** Integrated dashboards with Bar, Pie, Line, and Gauge charts to visualize organism counts and ecological trends.
* **Environmental Monitoring:** Tracks real-time water quality parameters including pH, Temperature, Turbidity, and Salinity.
* **Species Dataset:** View and manage identified species and "Unknown" organisms detected by the system.

## 🛠️ Tech Stack
* **Framework:** React.js 
* **Routing:** React Router DOM 
* **Backend Integration:** Firebase (Realtime Database & Remote Config) 
* **Styling:** CSS3 (including responsive grid layouts) 
* **Charts:** Chart.js / Recharts (implied by directory structure) 

## 🚦 Getting Started
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Available Scripts
In the project directory, you can run:
* `npm start`: Runs the app in development mode at [http://localhost:3000](http://localhost:3000).
* `npm test`: Launches the test runner.
* `npm run build`: Builds the app for production to the `build` folder.

## 📁 Project Structure
* `src/components/UserInput`: Handles image input via webcam or file upload.
* `src/components/ShowImages`: Contains various chart components for data visualization.
* `src/components/FirebaseService`: Manages connection to Firebase for sensor data and logs.
* `src/Data/home.js`: Contains the step-by-step user guide for the platform.

## 🌐 Vision
To make advanced marine micro-organism analysis accessible and field-deployable to support researchers in protecting ocean health[cite: 361].
