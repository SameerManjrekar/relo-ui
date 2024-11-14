# Image Annotation Tool

This project is a React application built with Vite. The application enables users to annotate images by drawing boxes, selecting categories, and submitting annotations. The app also includes features for retrying API requests, handling errors, and managing global state with Zustand.

## Features

- **Canvas Box**: Users can draw boxes on images.
- **Category Selection**: Fetches and displays categories for selection.
- **Annotations Submission**: Submits annotated data to an API.
- **Error Handling**: Gracefully handles API errors and provides retry functionality.
- **State Management**: Uses Zustand for global state management.

## Installation and Setup

### Prerequisites

- Node.js (>=20.x)
- npm or yarn

### Steps

1. Clone the repository:

   ```bash
   git clone <repository_url>
   cd <repository_folder>
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open the application in your browser at:
   ```
   http://localhost:5173
   ```

## File Structure

```
├── src/
│   ├── components/   # Reusable React components
│   ├── store/        # Zustand state management
│   ├── useApi.ts     # Custom hook for API requests
│   ├── App.tsx       # Main application component
├── index.html        # Main HTML file
├── package.json      # Dependency and script definitions
├── vite.config.js    # Vite configuration
```

## API Endpoints

### Fetch Unanalyzed Images

- **URL**: `https://5f2f729312b1481b9b1b4eb9d00bc455.api.mockbin.io/unanalyzed-images`
- **Method**: `GET`

### Fetch Categories

- **URL**: `https://f6fe9241e02b404689f62c585d0bd967.api.mockbin.io/categories`
- **Method**: `GET`

### Submit Annotation

- **URL**: `https://eb1b6f8bfab448df91c68bd442d6a968.api.mockbin.io/annotations`
- **Method**: `POST`

## Scripts

- `npm run dev`: Start the development server.
- `npm run build`: Build the project for production.
- `npm run preview`: Preview the production build.

## Notes

- The app uses Tailwind CSS for styling.
- `CanvasBox`, `CategorySelector`, and `ImageQueue` are modular components that encapsulate their own logic.
- Zustand manages the application's global state, including images, categories, and annotations.

## License

This project is licensed under the MIT License.
