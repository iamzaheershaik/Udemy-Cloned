import { useState } from "react";
import { Button, Form, Col, Container, Row, Card } from "react-bootstrap";
import "./Addform.css";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { addTeacherAsync } from "../../../Services/Action/teacher.action";
import CloudinaryUpload from "../../Upload/CloudinaryUpload";

const AddForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector((state) => state.teacher.error);
  const [actionError, setActionError] = useState("");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phnumber: "",
    profession: "",
    skills: "",
    bio: "",
    profileImage: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // simple validation
    if (!formData.firstName || !formData.email) {
      alert("Please fill required fields");
      return;
    }

    const newInstructor = {
      ...formData,
    };

    setActionError("");
    try {
      await dispatch(addTeacherAsync(newInstructor));
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phnumber: "",
        profession: "",
        skills: "",
        bio: "",
        profileImage: "",
      });

      navigate("/view-instructors");
    } catch (err) {
      setActionError(err.message);
    }
  };

  return (
    <Container className="add-course-container">
      <Card className="add-course-card">
        <h2 className="add-course-title">Become Instructor</h2>
        {(actionError || error) && (
          <div className="alert alert-danger">{actionError || error}</div>
        )}

        <Form onSubmit={handleSubmit}>

          {/* Name */}
          <Row className="mb-3">
            <Col>
              <Form.Control
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
              />
            </Col>
            <Col>
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
            <Form.Control
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
          </Form.Group>

          {/* Phone */}
          <Form.Group className="mb-3">
            <Form.Control
              name="phnumber"
              placeholder="Phone Number"
              value={formData.phnumber}
              onChange={handleChange}
            />
          </Form.Group>

          {/* Profession */}
          <Form.Group className="mb-3">
            <Form.Control
              name="profession"
              placeholder="Profession"
              value={formData.profession}
              onChange={handleChange}
            />
          </Form.Group>

          {/* Skills */}
          <Form.Group className="mb-3">
            <Form.Control
              name="skills"
              placeholder="Skills (React, JS...)"
              value={formData.skills}
              onChange={handleChange}
            />
          </Form.Group>

          {/* Bio */}
          <Form.Group className="mb-3">
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
              Submit
            </Button>
          </div>

        </Form>
      </Card>
    </Container>
  );
};

export default AddForm;
