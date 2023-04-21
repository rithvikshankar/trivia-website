import { createBrowserRouter, RouterProvider } from "react-router-dom";

import RootLayout from "./components/RootLayout";
import OurQuizzes from "./pages/OurQuizzes";
import CommunityQuizzes from "./pages/CommunityQuizzes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "quizzes/our",
        element: <OurQuizzes />,
      },
      {
        path: "quizzes/community",
        element: <CommunityQuizzes />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
