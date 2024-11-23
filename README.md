
Profile Management Application
Project Overview
A React-based Profile Management Application with TypeScript, routing, form validation, and state management.

Prerequisites:

Node.js (v14+)
npm or yarn

Installation:

Clone the repository

git clone [your-repo-url]
cd profile-management-app
npm install

Create a .env file in the root directory:

VITE_API_BASE_URL_DEV=http://localhost:3001
VITE_API_BASE_URL_PROD=https://api.production-url.com

Running the Project:

npm run dev

This will:
Start the React app on http://localhost:5173 (default Vite port).
Start the JSON Server on http://localhost:3001

npm run start:prod (Start in production mode )

Optimizations:

1. Optimized handleCreate with useCallback
The handleCreate function which is called while creating a profile is wrapped in the useCallback hook to optimize its performance in a React component.

Benefits of useCallback:
React will only recreate the handleCreate function when its dependencies (formData) change. 

2. useProfile Custom Hook
The useProfile hook encapsulates the logic for fetching profile information.







