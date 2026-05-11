import "../css/Hero.css";
import udemy from "../img/udemy.jpg";

const Hero = () => {
  return (
    <div className="home-hero">
      <img src={udemy} alt="Students learning online" className="home-hero-img" />

      <div className="home-hero-content">
        <div className="home-hero-logo">
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
