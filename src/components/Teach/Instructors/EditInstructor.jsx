import { useState, useEffect } from "react";
import { Button, Form, Col, Container, Row, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { getTeacherAsync, updateTeacherAsync } from "../../../Services/Action/teacher.action";
import "../AddForm/Addform.css";
import CloudinaryUpload from "../../Upload/CloudinaryUpload";

const EditInstructor = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const teacher = useSelector((state) => state.teacher.teacher);

    const [formData, setFormData] = useState({
        id: "",
        firstName: "",
        lastName: "",
        email: "",
        phnumber: "",
        profession: "",
        skills: "",
        bio: "",
        profileImage: "",
    });

    useEffect(() => {
        dispatch(getTeacherAsync(id));
    }, [dispatch, id]);

    useEffect(() => {
        if (teacher && teacher.id) {
            setFormData(teacher);
        }
    }, [teacher]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.firstName || !formData.email) {
            alert("Please fill required fields");
            return;
        }

        dispatch(updateTeacherAsync(formData));
        navigate("/view-instructors");
    };

    return (
        <Container className="add-course-container">
            <Card className="add-course-card">
                <h2 className="add-course-title">Edit Instructor</h2>

                <Form onSubmit={handleSubmit}>

                    {/* Name */}
                    <Row className="mb-3">
                        <Col>
                            <Form.Label>First Name *</Form.Label>
                            <Form.Control
                                name="firstName"
                                placeholder="First Name"
                                value={formData.firstName}
                                onChange={handleChange}
                            />
                        </Col>
                        <Col>
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                                name="lastName"
                                placeholder="Last Name"
                                value={formData.lastName}
                                onChange={handleChange}
                            />
                        </Col>
                    </Row>

                    {/* Email */}
                    <Form.Group className="mb-3">
                        <Form.Label>Email *</Form.Label>
                        <Form.Control
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    {/* Phone */}
                    <Form.Group className="mb-3">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control
                            name="phnumber"
                            placeholder="Phone Number"
                            value={formData.phnumber}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    {/* Profession */}
                    <Form.Group className="mb-3">
                        <Form.Label>Profession</Form.Label>
                        <Form.Control
                            name="profession"
                            placeholder="Profession"
                            value={formData.profession}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    {/* Skills */}
                    <Form.Group className="mb-3">
                        <Form.Label>Skills</Form.Label>
                        <Form.Control
                            name="skills"
                            placeholder="Skills (React, JS...)"
                            value={formData.skills}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    {/* Bio */}
                    <Form.Group className="mb-3">
                        <Form.Label>Bio</Form.Label>
                        <Form.Control
                            as="textarea"
                            name="bio"
                            placeholder="Short Bio"
                            value={formData.bio}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    {/* Profile Image */}
                    <Form.Group className="mb-4">
                        <Form.Label>Profile Image</Form.Label>
                        {formData.profileImage ? (
                            <div className="mb-2">
                                <img src={formData.profileImage} alt="Profile" style={{ width: '100px', borderRadius: '50%' }} />
                                <Button variant="danger" size="sm" className="ms-3" onClick={() => setFormData({...formData, profileImage: ""})}>Remove</Button>
                            </div>
                        ) : (
                            <CloudinaryUpload onUploadSuccess={(url) => setFormData({...formData, profileImage: url})} />
                        )}
                    </Form.Group>

                    {/* Submit */}
                    <div className="text-center">
                        <Button className="add-course-btn" type="submit">
                            Update Instructor
                        </Button>
                    </div>

                </Form>
            </Card>
        </Container>
    );
};

export default EditInstructor;
