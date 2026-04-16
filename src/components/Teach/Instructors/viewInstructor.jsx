import { useEffect } from "react";
import { Container, Table, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllTeacherAsync, deleteTeacherAsync } from "../../../Services/Action/teacher.action";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import "./Instructors.css";

const ViewInstructor = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const instructors = useSelector((state) => state.teacher.teachers);

    useEffect(() => {
        dispatch(getAllTeacherAsync());
    }, [dispatch]);

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this instructor?")) {
            dispatch(deleteTeacherAsync(id));
        }
    };

    const handleEdit = (id) => {
        navigate(`/edit-instructor/${id}`);
    };

    const handleView = (id) => {
        navigate(`/instructor/${id}`);
    };

    return (
        <div className="instructor-table-container">
            <h2 className="text-center">Instructor List</h2>

            <Table className="instructor-table" striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Profession</th>
                        <th>Skills</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {instructors && instructors.length > 0 ? (
                        instructors.map((item, index) => (
                            <tr key={item.id}>
                                <td>{index + 1}</td>

                                <td>
                                    <img
                                        src={item.profileImage || "https://via.placeholder.com/45"}
                                        alt="profile"
                                        className="instructor-profile-img"
                                    />
                                </td>

                                <td>
                                    {item.firstName} {item.lastName}
                                </td>

                                <td>{item.email}</td>
                                <td>{item.phnumber}</td>
                                <td>{item.profession}</td>
                                <td>{item.skills}</td>

                                <td>
                                    <button
                                        className="action-btn view"
                                        title="View"
                                        onClick={() => handleView(item.id)}
                                    >
                                        <FaEye />
                                    </button>

                                    <button
                                        className="action-btn edit"
                                        title="Edit"
                                        onClick={() => handleEdit(item.id)}
                                    >
                                        <FaEdit />
                                    </button>

                                    <button
                                        className="action-btn delete"
                                        title="Delete"
                                        onClick={() => handleDelete(item.id)}
                                    >
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr className="no-instructor-row">
                            <td colSpan="8" className="text-center">
                                No Instructors Found
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>
    );
};

export default ViewInstructor;