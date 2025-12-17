# Program 1 - Fullstack MERN Auth

Yo! 👋 This is a fullstack authentication system I built. It's got the full MERN stack setup (MongoDB, Express, React, Node) but with a focus on actually being nice to work with.

## The Good Stuff

Most tutorials give you a clunky setup. I tried to fix that:

*   **One Command Start**: You don't need five terminal windows. Just run `npm run program1` and it boots everything.
*   **Offline Mode**: This is my favorite part. If you don't have MongoDB installed (or you're too lazy to start it), the server won't crash. It just switches to "Memory Mode" so you can still test the UI and features.
*   **Clean Logs**: I filtered out all that Mongoose noise. You only see what matters.
*   **Modern UI**: React 18, Tailwind, and Framer Motion. no dusty old CSS.

## Tech Stack

*   **Frontend**: React + Vite (Fast as hell)
*   **Styling**: Tailwind CSS
*   **Icons**: Lucide React (Clean, no weird SVGs)
*   **Backend**: Node + Express
*   **Database**: MongoDB (optional-ish)

## How to Run It

1.  **Clone it**:
    ```bash
    git clone <repo_url>
    cd program1
    ```

2.  **Install dependencies**:
    I set it up so you can just run this scripts to install dependencies for both client and server:
    ```bash
    npm install --prefix client && npm install --prefix server
    ```

3.  **Start it**:
    ```bash
    npm run program1
    ```

That's it. It'll open the frontend at `http://localhost:5173`.

## Folder Structure

Keep it simple:

*   `client/`: All the React stuff.
*   `server/`: The Node API.

## API Endpoints

*   `POST /api/v1/auth/register` - Make a new user
*   `POST /api/v1/auth/login` - Log in
*   `GET /api/v1/auth/me` - See who's logged in

## "It's Not Working?"

If you see a yellow warning like `⚠️ MongoDB not found`, don't panic. That's the **Offline Mode**. You can still register and login, but the data will vanish when you restart the server.

If you want the data to stick, just make sure `mongod` is running in the background.

---

Built for the College Practical (Program 1).
