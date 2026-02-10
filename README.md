# Vercel Server with Gemini & Cron

This project is a Vercel serverless function setup with Google Gemini AI integration and a Cron job.

## Setup

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Environment Variables**:
    - Copy `.env.example` to `.env`:
        ```bash
        cp .env.example .env
        ```
    - Open `.env` and paste your Google Gemini API Key.

3.  **Local Testing**:
    - You can test functionality with the included script:
        ```bash
        npx ts-node test-gemini.ts
        ```
    - Or run the Vercel dev server (requires Vercel CLI):
        ```bash
        vercel dev
        ```

## Deployment

1.  Push your code to a Git repository (GitHub, GitLab, Bitbucket).
2.  Import the project into Vercel.
3.  **Important**: In the Vercel Project Settings, go to **Environment Variables** and add `GEMINI_API_KEY` with your API key value.
4.   The Cron job will be automatically configured based on `vercel.json` once deployed to production.

## API Endpoints

-   `GET /api` or `POST /api`: Generates content. Accepts a `prompt` query parameter or JSON body.
-   `GET /api/cron`: The cron job handler (runs daily by default).
