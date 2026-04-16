import { Link } from "react-router-dom";
import "./BecomeInstructor.css";

const BecomeInstructor = () => {
  return (
    <div className="become-instructor-section">
      <div className="become-instructor-content">
        <h2>Become an instructor today</h2>
        <p>
          Join one of the world's largest online learning marketplaces.
        </p>
        <Link to="/view-instructors">
          <button className="view-instructors-btn">View Instructors</button>
        </Link>
      </div>
    </div>
  );
};

export default BecomeInstructor;
