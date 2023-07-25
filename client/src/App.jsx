import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import RootLayout from "./layouts/RootLayout";
import Login from "./components/Login";
import Tricks from "./components/Tricks";
import { AuthProvider } from "./auth/UserContext";
import EnsureAuth from "./auth/EnsureAuth";
import EnsureGuest from "./auth/EnsureGuest";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route
          path="login"
          element={
            <EnsureGuest>
              <Login />
            </EnsureGuest>
          }
          exact
        />
        <Route
          path="/"
          element={
            <EnsureAuth>
              <RootLayout />
            </EnsureAuth>
          }
        >
          <Route path="home" element={<Home />} exact />

          <Route path="tricks" element={<Tricks />} exact />
        </Route>
      </Route>
    )
  );

  return (
    <>
      <div className="App">
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </div>
    </>
  );
}

export default App;
