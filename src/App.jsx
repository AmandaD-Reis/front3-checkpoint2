
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import { MainLayout } from "./Components/mainLayout";
import { ThemeProvider } from "./context/useTheme";
import { TokenProvider } from "./context/useToken";

import Detail from "./Routes/Detail"
import Home from "./Routes/Home"
import Contact from "./Routes/Login"
import LoginForm from "./Components/LoginForm";


function App() {
  
  const appRouter = createBrowserRouter([
    {
      path: '',
      element: <MainLayout />,
      children: [
        {
          path: '',
          element: <Home />
        },
        {
          path: 'home',
          element: <Home />
        },
        {
          path: 'contact',
          element: <Contact />
        },
        {
          path: '/dentista/:id',
          element: <Detail />
        }
      ]
    }
  ])
  return (
  <ThemeProvider>
    <TokenProvider>
      <RouterProvider router={appRouter} />
    </TokenProvider>
  </ThemeProvider>
  );
}

export default App;
