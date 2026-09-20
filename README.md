# MandiMap Frontend

MandiMap is a Kerala mandi discovery web app that helps users explore local mandi restaurants by district, view featured spots, and manage mandi listings.

This repository contains the frontend application built with React + Vite. The backend is maintained in a separate repository named `mandiMap-backend`.

## Live Demo

- Frontend: deploy this repo on Vercel or your preferred static hosting platform
- Backend API: connect to your deployed backend from `mandiMap-backend`

## Tech Stack

- React
- Vite
- React Router
- Axios
- Lucide React
- CSS modules / custom CSS

## Backend Repository

This frontend depends on the backend repo:

- `mandiMap-backend`

Make sure the backend is running and its API base URL is configured correctly in the frontend.

## Project Structure

```bash
src/
  components/
  data/
  pages/
  services/
  App.jsx
  main.jsx
```

## Features

- District-based browsing
- Explore page for mandi discovery
- Featured mandi cards
- Add / edit / delete mandi entries
- Admin dashboard support
- API-driven data fetching from backend

## Getting Started

### 1. Clone the repository

```bash
git clone <frontend-repo-url>
cd frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

The app will run locally in the browser, usually at:

```bash
http://localhost:5173
```

## Environment Configuration

If your backend URL is not hardcoded, set it in an environment variable. For example:

```bash
VITE_API_URL=http://localhost:5000
```

Then use that variable in the frontend API service file instead of a fixed URL.

## Production Build

```bash
npm run build
```

To preview the production build:

```bash
npm run preview
```

## API Integration

The frontend currently calls the backend API through the service layer in `src/services/mandiAPI.js`.

Example endpoint pattern:

```bash
https://your-backend-domain.com/mandis
```

The backend repository should expose endpoints such as:

- `GET /mandis`
- `GET /mandis/:id`
- `POST /mandis`
- `PUT /mandis/:id`
- `DELETE /mandis/:id`

## Deployment Notes

- Deploy the frontend to Vercel
- Deploy the backend repo separately (for example Render, Railway, Fly.io, or another hosting provider)
- Update the backend URL in the frontend when moving from local development to production

## Contributing

1. Create a feature branch
2. Commit your changes
3. Push to your fork or repository
4. Open a pull request

## License

This project is licensed under the MIT License unless otherwise stated.
