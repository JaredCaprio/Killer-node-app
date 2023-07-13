import { Outlet } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <h1>Welcome to The killer Node App</h1>
      <Outlet />
    </div>
  );
}
