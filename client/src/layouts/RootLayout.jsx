import { Outlet } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";

export default function RootLayout() {
  const navigate = useNavigate();
  const logout = () => {
    fetch(`${import.meta.env.VITE_SERVER_DOMAIN}/logout`, {
      credentials: "include",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data) {
          navigate("/login");
          window.location.reload();
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/tricks">Tricks</Link>
          </li>
          <li>
            <div onClick={() => logout()}>Logout</div>
          </li>
        </ul>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
