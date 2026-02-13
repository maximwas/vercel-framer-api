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

3.  **Get API Key**:
    - Go to [Google AI Studio](https://aistudio.google.com/app/apikey).
    - Create a new API key.

4.  **Local Testing**:
    - For details, see [TESTING.md](TESTING.md).
    - Quick test: `npx ts-node test-gemini.ts`
    - Full server: `vercel dev`

## Deployment

1.  Push your code to a Git repository (GitHub, GitLab, Bitbucket).
2.  Import the project into Vercel.
3.  **Important**: In the Vercel Project Settings, go to **Environment Variables** and add `GEMINI_API_KEY` with your API key value.
4.   The Cron job will be automatically configured based on `vercel.json` once deployed to production.

## API Endpoints

-   `GET /api` or `POST /api`: Generates content. Accepts a `prompt` query parameter or JSON body.
-   `GET /api/cron`: The cron job handler (runs daily by default).

## GitHub Actions Deployment

If you prefer to deploy using GitHub Actions:

1.  **Get Vercel Credentials**:
    -   `VERCEL_TOKEN`: Account Settings > Tokens.
    -   `VERCEL_ORG_ID` & `VERCEL_PROJECT_ID`: Run `vc link` locally or check `.vercel/project.json` (after linking).
2.  **Add Secrets to GitHub**:
    -   Go to your repository Settings > Secrets > Actions.
    -   Add `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`.
