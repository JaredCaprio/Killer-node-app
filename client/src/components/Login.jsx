export default function LoginLayout() {
  return (
    <>
      <h2>Welcome!</h2> <br />
      <div>
        <button>
          <a
            href={`${import.meta.env.VITE_SERVER_DOMAIN}/auth/google`}
            className="btn__google"
          >
            <i className="fab fa-google"></i>
            Log in With Google
          </a>
        </button>
      </div>
    </>
  );
}
