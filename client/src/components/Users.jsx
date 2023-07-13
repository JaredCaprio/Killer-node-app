import { useEffect, useState } from "react";

export default function Users() {
  const [users, setUsers] = useState();
  console.log();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_SERVER_DOMAIN}/users`)
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  return (
    <div>
      <h1>Users</h1>
      {users?.map((user) => (
        <ul key={user.id}>
          <p>{user.name}</p>
          <p>{user.age}</p>
        </ul>
      ))}
    </div>
  );
}
