import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Typography, List, ListItem, ListItemText, Link } from "@mui/material";
import axios from "axios";

const PaperDetails = () => {
  const { paperId } = useParams();
  const [paper, setPaper] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPaperDetails = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:5000/api/paper/${paperId}`);
        setPaper(response.data);
      } catch (error) {
        console.error("Error fetching paper details:", error);
      }
    };

    fetchPaperDetails();
  }, [paperId]);

  if (!paper) {
    return (
      <Container>
        <Typography variant="h6">Loading...</Typography>
      </Container>
    );
  }

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        {paper.title}
      </Typography>
      <Typography variant="body1" gutterBottom>
        <strong>Abstract:</strong> {paper.abstract}
      </Typography>
      <Typography variant="body1" gutterBottom>
        <strong>Authors:</strong> {paper.author_string_list}
      </Typography>
      <Typography variant="body1" gutterBottom>
        <strong>Conference ID:</strong> {paper.conference_id}
      </Typography>
      <Typography variant="body1" gutterBottom>
        <strong>Topic ID:</strong> {paper.topic_id}
      </Typography>
      <Typography variant="h6" gutterBottom>
        Participants
      </Typography>
      <List>
        {paper.participants.map((participant) => (
          <ListItem key={participant.author_id} button onClick={() => navigate(`/author/${participant.author_id}`)}>
            <ListItemText primary={participant.full_name} secondary={participant.role} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default PaperDetails;
