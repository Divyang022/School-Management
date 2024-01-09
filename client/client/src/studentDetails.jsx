// Import the necessary dependencies
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";
import LogoutButton from './LogoutButton';

const UpdateStudentDetails = () => {
  const [studentDetails, setStudentDetails] = useState([]);
  const [filteredStudentDetails, setFilteredStudentDetails] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [updatedDetails, setUpdatedDetails] = useState({
    name: "",
    gender: "",
    city: "",
    state: "",
  });

  const fetchStudentDetails = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/getStudentDetails"
      );
      setStudentDetails(response.data);
      setFilteredStudentDetails(response.data);
    } catch (error) {
      console.error("Error fetching student details:", error);
    }
  };

  useEffect(() => {
    fetchStudentDetails();
  }, []);

  const handleShowModal = (student) => {
    setSelectedStudent(student);
    setUpdatedDetails({
      name: student.name,
      gender: student.gender,
      city: student.city,
      state: student.state,
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedStudent(null);
    setUpdatedDetails({
      name: "",
      gender: "",
      city: "",
      state: "",
    });
  };

  const handleUpdateDetails = async () => {
    try {
      const response = await axios.put(
        `http://localhost:4000/updateStudentDetails/${selectedStudent.email}`,
        updatedDetails
      );
      console.log(response.data);
      handleCloseModal();
      fetchStudentDetails();
    } catch (error) {
      console.error("Error updating student details:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUpdatedDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));

    // Filter students based on the name while typing
    const filteredStudents = studentDetails.filter((student) =>
      student.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredStudentDetails(filteredStudents);
  };

  return (
    <div className="user-details-container">
      <h1>Students Details</h1>

      {/* Search bar for filtering by name */}
      <div>
        <input
          type="text"
          placeholder="Search by Name"
          name="name"
          value={updatedDetails.name}
          onChange={handleChange}
        />
      </div>

      {filteredStudentDetails.length > 0 ? (
        <div>
          {filteredStudentDetails.map((student) => (
            <div key={student.email}>
              <p>Email: {student.email}</p>
              <p>Name: {student.name}</p>
              <p>Gender: {student.gender}</p>
              <p>Type: {student.type}</p>
              <p>City: {student.city}</p>
              <p>State: {student.state}</p>
              <button onClick={() => handleShowModal(student)}>
                Update Details
              </button>
              <hr />
            </div>
          ))}
        </div>
      ) : (
        <p>No matching student details found.</p>
      )}

      {/* Modal for updating student details */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Update Student Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Name"
                name="name"
                value={updatedDetails.name}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formGender">
              <Form.Label>Gender</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Gender"
                name="gender"
                value={updatedDetails.gender}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formCity">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter City"
                name="city"
                value={updatedDetails.city}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formState">
              <Form.Label>State</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter State"
                name="state"
                value={updatedDetails.state}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdateDetails}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <LogoutButton   />
    </div>
  );
};

export default UpdateStudentDetails;
