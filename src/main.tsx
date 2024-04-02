import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./globals.scss";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import QuizPage from "./routes/QuizPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: (
      <div>
        <h1>404 Not Found</h1>
      </div>
    ),
  },
  {
    path: "quiz",
    element: <QuizPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
