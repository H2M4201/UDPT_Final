import { Typography, Container } from "@mui/material";

const Home = () => {
  return (
    <Container>
      <Typography variant="h3" component="h1" gutterBottom>
        Welcome to My App
      </Typography>
      <Typography variant="body1">This is the home page.</Typography>
    </Container>
  );
};

export default Home;
