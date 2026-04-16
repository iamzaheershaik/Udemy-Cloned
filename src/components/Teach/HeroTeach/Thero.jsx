import "./Thero.css";
import udemy from "./T-img/teach.webp";
import { Link } from "react-router-dom";

const Thero = () => {
  return (
    <div className="hero">
      <img src={udemy} alt="udemy" className="hero-img" />

      <div className="hero-content">
        <h2>Come teach with us</h2>
        <p>
          Become an instructor and change lives — including your own
        </p>
        <Link to="/get-started">
          <button>Get Started</button>
        </Link>
      </div>
    </div>
  );
};

export default Thero;