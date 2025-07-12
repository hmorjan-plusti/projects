import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <h1>Currency Converter</h1>
      <Link to="/register"><button>Register</button></Link>
      <Link to="/login"><button>Login</button></Link>
    </div>
  );
}

export default Home;
