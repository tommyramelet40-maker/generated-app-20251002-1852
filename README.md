# ConnectSphere

A visually stunning, minimalist real-time chat application inspired by Discord for seamless communication in dedicated communities.

[cloudflarebutton]

ConnectSphere is a real-time chat application built with a minimalist design philosophy. It allows users to communicate within dedicated spaces called 'Spheres' (servers), each containing multiple text-based 'Channels'. The application features a classic, intuitive three-column layout for seamless navigation and interaction. The entire experience is designed to be clean, fast, and visually stunning, prioritizing clarity and ease of use.

## Key Features

*   **Three-Column Layout:** A familiar and intuitive interface with dedicated columns for servers, channels, and the chat view.
*   **Spheres & Channels:** Organize communities into "Spheres" (servers) and create multiple text "Channels" within each Sphere.
*   **Minimalist Dark UI:** A beautiful, clean dark theme designed for focus and visual comfort.
*   **Real-Time Communication:** (Phased implementation) View messages as they are sent.
*   **Responsive Design:** A polished experience across all device sizes.
*   **Built on Cloudflare:** Leverages the power and speed of Cloudflare Workers and Durable Objects for a high-performance backend.

## Technology Stack

*   **Frontend:** React, Vite, TypeScript, React Router
*   **Backend:** Hono on Cloudflare Workers
*   **State Management:** Zustand
*   **Styling:** Tailwind CSS, Shadcn UI
*   **Animation:** Framer Motion
*   **Icons:** Lucide React
*   **Persistence:** Cloudflare Durable Objects

## Getting Started

Follow these instructions to get a local copy up and running for development and testing purposes.

### Prerequisites

*   [Node.js](https://nodejs.org/) (v18 or later)
*   [Bun](https://bun.sh/) package manager
*   [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/)

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/your-username/connectsphere_app.git
    cd connectsphere_app
    ```

2.  **Install dependencies:**
    ```sh
    bun install
    ```

### Running Locally

To start the development server for both the frontend and the backend worker:

```sh
bun dev
```

This will start the Vite development server, typically on `http://localhost:3000`.

## Project Structure

The project is organized into three main directories:

*   `./src`: Contains the entire React frontend application, including pages, components, hooks, and the Zustand store.
*   `./worker`: Contains the Hono backend application that runs on Cloudflare Workers. This is where API routes and Durable Object entity logic reside.
*   `./shared`: Contains TypeScript types and interfaces that are shared between the frontend and the backend to ensure type safety.

## Development

*   **Frontend:** All frontend code lives in the `src` directory. Modify components and pages here. The main application view is orchestrated in `src/pages/HomePage.tsx`.
*   **Backend:** API endpoints are defined in `worker/user-routes.ts` using the Hono framework.
*   **Data Models:** Data persistence logic is handled by "Entities" in `worker/entities.ts`, which provide an abstraction over the core Cloudflare Durable Object.
*   **Shared Types:** To maintain consistency, define all data structures in `shared/types.ts`.

## Deployment

This application is designed to be deployed to the Cloudflare network.

1.  **Login to Wrangler:**
    If you haven't already, authenticate the Wrangler CLI with your Cloudflare account.
    ```sh
    wrangler login
    ```

2.  **Deploy the application:**
    Run the deploy script, which will build the application and deploy it to your Cloudflare account.
    ```sh
    bun run deploy
    ```

Alternatively, you can deploy your own version of this project with a single click.

[cloudflarebutton]