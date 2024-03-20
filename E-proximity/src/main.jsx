import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App.jsx"; 

const router = createBrowserRouter([
  {
    path: "/vite-react-router/",
    element: <App />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);