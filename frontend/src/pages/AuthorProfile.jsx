import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Typography, Card, CardContent, Grid } from "@mui/material";
import axios from "axios";

const AuthorProfile = () => {
  const { authorId } = useParams();
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:5000/api/author/${authorId}`);
        setProfile(response.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, [authorId]);

  if (!profile) {
    return <Typography>Loading...</Typography>;
  }

  const { full_name, website, profile_json_text, papers } = profile;
  const profileData = JSON.parse(profile_json_text);

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        {full_name}
      </Typography>
      <Typography variant="h6" component="h2">
        Bio
      </Typography>
      <Typography>{profileData.bio}</Typography>
      <Typography variant="h6" component="h2">
        Interests
      </Typography>
      <Typography>{profileData.interests.join(", ")}</Typography>
      <Typography variant="h6" component="h2">
        Website
      </Typography>
      <Typography>
        <a href={website} target="_blank" rel="noopener noreferrer">
          {website}
        </a>
      </Typography>
      <Typography variant="h6" component="h2">
        Papers
      </Typography>
      <Grid container spacing={2} marginTop={2}>
        {papers.map((paper) => (
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
                <Typography variant="body2" color="textSecondary">
                  Date Added: {new Date(paper.date_added).toLocaleDateString()}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default AuthorProfile;
