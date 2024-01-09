import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import LogoutButton from './LogoutButton';

const UserDetails = () => {
  const { email } = useParams();
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/${email}`
        );
        setUserDetails(response.data);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, [email]);

  return (
    <div className="user-details-container">
      <h1>Your Details</h1>
      {userDetails ? (
        <div>
          <p>Email: {userDetails.email}</p>
          <p>Name: {userDetails.name}</p>
          <p>Gender: {userDetails.gender}</p>
          <p>Type: {userDetails.type}</p>
          <p>City: {userDetails.city}</p>
          <p>State: {userDetails.state}</p>
        </div>
      ) : (
        <p>Loading user details...</p>
      )}

      <LogoutButton />
    </div>
  );
};

export default UserDetails;
