import { useEffect, useState } from "react";
import { Container, Typography, Card, CardContent, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [papers, setPapers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPapers = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/api/latest_papers");
        setPapers(response.data);
      } catch (error) {
        console.error("Error fetching papers:", error);
      }
    };

    fetchPapers();
  }, []);

  return (
    <Container>
      <Typography variant="h3" component="h1" gutterBottom>
        Latest Papers
      </Typography>
      {papers.map((topic, index) => (
        <div key={index}>
          <Typography variant="h5" component="h2" gutterBottom>
            {topic.topic_name}
          </Typography>
          <Grid container spacing={2}>
            {topic.papers.map((paper) => (
              <Grid item xs={12} sm={6} md={4} key={paper.paper_id}>
                <Card onClick={() => navigate(`/paper/${paper.paper_id}`)} style={{ cursor: "pointer" }}>
                  <CardContent>
                    <Typography variant="h6" component="h3">
                      {paper.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Authors: {paper.author_string_list}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Abstract: {paper.abstract}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>
      ))}
    </Container>
  );
};

export default Home;
