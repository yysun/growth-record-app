# Growth Record App (成长档案)

A mobile-first React application for tracking student growth portfolios, including subject performance, daily habits, and teacher feedback.

## Features

- **Dashboard**: Overview of growth areas (Subjects, Daily Habits, Activities, Reviews).
- **Subject Tracking**: Detailed views for specific subjects (Structure, Card, and Timeline views).
- **Task Details**: View specific assignments, exams, and feedback.
- **Teacher Feedback**: Interactive feedback screens with audio visualization.
- **Responsive Design**: Mobile-first UI using Tailwind CSS.

## Setup & Deployment to GitHub Pages

This project uses [Vite](https://vitejs.dev/) for building the application.

### 1. Install Dependencies
Ensure you have [Node.js](https://nodejs.org/) installed, then run:

```bash
npm install
```

### 2. Local Development
To start the local development server:

```bash
npm run dev
```

### 3. Deploy to GitHub Pages

You can deploy manually by building the project and pushing the output folder.

1.  **Build the project**:
    ```bash
    npm run build
    ```
    This will create a `dist` folder containing the static website.

2.  **Deploy via gh-pages (Recommended)**:
    
    First, install the deploy script:
    ```bash
    npm install --save-dev gh-pages
    ```
    
    Add this script to your `package.json`:
    ```json
    "scripts": {
      "predeploy": "npm run build",
      "deploy": "gh-pages -d dist",
      ...
    }
    ```

    Then run:
    ```bash
    npm run deploy
    ```

3.  **Manual Deployment (Alternative)**:
    *   Commit all your changes to GitHub.
    *   Go to your repository **Settings** -> **Pages**.
    *   Under **Source**, select `GitHub Actions` (if you want to set up a workflow) or deploy from a branch if you pushed the `dist` folder to a specific branch (like `gh-pages`).

Note: This app uses `HashRouter` which ensures routing works correctly on static hosts like GitHub Pages.
