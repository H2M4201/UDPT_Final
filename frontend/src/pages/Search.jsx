import React, { useState } from "react";
import { Container, TextField, Button, Typography, Card, CardContent, Grid } from "@mui/material";
import axios from "axios";

const Search = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [conference, setConference] = useState("");
  const [year, setYear] = useState("");
  const [topic, setTopic] = useState("");

  const handleSearch = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/api/search_papers", {
        params: { title, author, conference, year, topic }
      });
      setSearchResults(response.data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Search Papers
      </Typography>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch();
        }}
      >
        <TextField
          label="Title"
          variant="outlined"
          margin="normal"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          label="Author"
          variant="outlined"
          margin="normal"
          fullWidth
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <TextField
          label="Conference"
          variant="outlined"
          margin="normal"
          fullWidth
          value={conference}
          onChange={(e) => setConference(e.target.value)}
        />
        <TextField
          label="Year"
          variant="outlined"
          margin="normal"
          fullWidth
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
        <TextField
          label="Topic"
          variant="outlined"
          margin="normal"
          fullWidth
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary">
          Search
        </Button>
      </form>
      <Grid container spacing={2} marginTop={2}>
        {searchResults.map((paper) => (
          <Grid item xs={12} sm={6} md={4} key={paper.paper_id}>
            <Card>
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

export default Search;
