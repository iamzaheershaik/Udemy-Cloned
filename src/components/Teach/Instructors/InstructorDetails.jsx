import { useEffect } from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { getTeacherAsync, deleteTeacherAsync } from "../../../Services/Action/teacher.action";
import { FaEnvelope, FaPhone, FaBriefcase, FaCode } from "react-icons/fa";
import "./Instructors.css";

const InstructorDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const teacher = useSelector((state) => state.teacher.teacher);

    useEffect(() => {
        dispatch(getTeacherAsync(id));
    }, [dispatch, id]);

    if (!teacher || !teacher.id) {
        return <h2 className="text-center mt-5">Loading...</h2>;
    }

    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete this instructor?")) {
            dispatch(deleteTeacherAsync(teacher.id));
            navigate("/view-instructors");
        }
    };

    return (
        <div className="instructor-detail-container">
            <Card className="instructor-detail-card">
                <Card.Body className="p-4">
                    <Row>
                        {/* Profile Image */}
                        <Col md={4} className="text-center mb-4">
                            <img
                                src={teacher.profileImage || "https://via.placeholder.com/180"}
                                alt={`${teacher.firstName} ${teacher.lastName}`}
                                className="instructor-detail-img mb-3"
                            />
                            <h2>{teacher.firstName} {teacher.lastName}</h2>
                            <span className="badge-profession">
                                {teacher.profession}
                            </span>
                        </Col>

                        {/* Details */}
                        <Col md={8}>
                            <h4 className="mb-4" style={{ color: "#393774", fontWeight: 600 }}>
                                Instructor Details
                            </h4>

                            <Row className="mb-3">
                                <Col sm={6}>
                                    <p>
                                        <FaEnvelope className="me-2" style={{ color: "#393774" }} />
                                        <span className="detail-label">Email: </span>
                                        <span className="detail-value">{teacher.email}</span>
                                    </p>
                                </Col>
                                <Col sm={6}>
                                    <p>
                                        <FaPhone className="me-2" style={{ color: "#393774" }} />
                                        <span className="detail-label">Phone: </span>
                                        <span className="detail-value">{teacher.phnumber}</span>
                                    </p>
                                </Col>
                            </Row>

                            <Row className="mb-3">
                                <Col sm={6}>
                                    <p>
                                        <FaBriefcase className="me-2" style={{ color: "#393774" }} />
                                        <span className="detail-label">Profession: </span>
                                        <span className="detail-value">{teacher.profession}</span>
                                    </p>
                                </Col>
                                <Col sm={6}>
                                    <p>
                                        <FaCode className="me-2" style={{ color: "#393774" }} />
                                        <span className="detail-label">Skills: </span>
                                        <span className="detail-value">{teacher.skills}</span>
                                    </p>
                                </Col>
                            </Row>

                            {/* Bio */}
                            {teacher.bio && (
                                <div className="bio-section">
                                    <h5>About</h5>
                                    <p className="mb-0">{teacher.bio}</p>
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className="mt-4 d-flex gap-3">
                                <Button
                                    variant="warning"
                                    onClick={() => navigate(`/edit-instructor/${teacher.id}`)}
                                >
                                    Edit Instructor
                                </Button>

                                <Button
                                    variant="danger"
                                    onClick={handleDelete}
                                >
                                    Delete Instructor
                                </Button>

                                <Button
                                    variant="outline-secondary"
                                    onClick={() => navigate("/view-instructors")}
                                >
                                    Back to List
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </div>
    );
};

export default InstructorDetails;
