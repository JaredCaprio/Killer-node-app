export default function LoginLayout() {
  const login = () => {
    fetch(`${import.meta.env.VITE_SERVER_DOMAIN}/auth/google`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  return (
    <>
      <h2>Welcome!</h2> <br />
      <div>
        <a href={`${import.meta.env.VITE_SERVER_DOMAIN}/auth/google`}>
          <button>
            <i className="fab fa-google"></i>
            Log in With Google
          </button>
        </a>
      </div>
    </>
  );
}
