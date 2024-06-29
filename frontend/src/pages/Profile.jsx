import { useContext } from "react";
import { Container, Typography } from "@mui/material";
import { AuthContext } from "../context/AuthContext";

const Profile = () => {
  const { auth } = useContext(AuthContext);

  if (!auth.isAuthenticated) {
    return (
      <Container>
        <Typography variant="h6">You need to log in to view this page.</Typography>
      </Container>
    );
  }

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Welcome, {auth.user.username}!
      </Typography>
      <Typography variant="h6" gutterBottom>
        Profile Information
      </Typography>
      <Typography variant="body1">
        <strong>Email:</strong> {auth.user.email}
      </Typography>
      <Typography variant="body1">
        <strong>Status:</strong> {auth.user.status}
      </Typography>
      <Typography variant="body1">
        <strong>User Type:</strong> {auth.user.user_type}
      </Typography>
    </Container>
  );
};

export default Profile;
