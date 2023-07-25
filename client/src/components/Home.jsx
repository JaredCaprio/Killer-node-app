import { Outlet } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <h1>Welcome to The killer Kendama Korner</h1>
      <p>
        Here you will find a list of tricks ranging from basic beginner to god
        level advanced
      </p>
      <Outlet />
    </div>
  );
}
