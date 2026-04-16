import "../css/Hero.css";
import udemy from "../img/udemy.jpg";

const Hero = () => {
  return (
    <div className="hero">
      <img src={udemy} alt="udemy" className="hero-img" />

      <div className="hero-content">
        <div id="logoimg">
            <img src="https://www.udemy.com/staticx/udemy/images/v7/logo-udemy.svg" alt="Logo" />
        </div>
        <h2>Upgrade your skills</h2>
        <p>
          From critical skills to technical topics, Udemy supports your
          professional development.
        </p>
        <button>Explore Courses</button>
      </div>
    </div>
  );
};

export default Hero;