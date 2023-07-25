import { useEffect, useState } from "react";

export default function Tricks() {
  const tableStyles = { border: "1px solid black", padding: "4rem" };

  const [tricks, setTricks] = useState();
  const [newTrick, setNewTrick] = useState({
    name: "",
    difficulty: "",
    grip: "",
  });

  useEffect(() => {
    fetch(`${import.meta.env.VITE_SERVER_DOMAIN}/tricks`)
      .then((res) => res.json())
      .then((data) => setTricks(data));
  }, []);

  const updateNewTrick = (event) => {
    const { name, value } = event.target;

    setNewTrick((prev) => ({ ...prev, [name]: value }));
    console.log(newTrick);
  };

  const addTrick = (e) => {
    e.preventDefault();
    console.log(newTrick);

    fetch(`${import.meta.env.VITE_SERVER_DOMAIN}/addTrick`, {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTrick),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  return (
    <div>
      <h1>Tricks</h1>
      <form onChange={(event) => updateNewTrick(event)}>
        <h3>Add a Trick</h3>
        <label htmlFor="name" id="name">
          Name
        </label>
        <input type="text" id="name" name="name" />
        <br />
        <label htmlFor="difficulty" id="difficulty">
          Difficulty
        </label>
        <input type="text" id="difficulty" name="difficulty" />
        <br />
        <label htmlFor="grip" id="grip">
          Grip
        </label>
        <input type="text" id="grip" name="grip" />
        <br />
        <button onClick={(e) => addTrick(e)}>Add Trick</button>
      </form>

      <>
        <table style={tableStyles}>
          <thead style={tableStyles}>
            <tr>
              <th>Name</th>
              <th>Difficulty</th>
              <th>Grip</th>
            </tr>
          </thead>
          <tbody style={tableStyles}>
            {tricks?.map((trick, i) => (
              <tr key={i}>
                <td>{trick.name}</td>
                <td>{trick.difficulty}</td>
                <td>{trick.grip}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    </div>
  );
}
