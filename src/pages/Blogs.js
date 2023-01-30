import * as React from 'react';
import { useEffect, useState } from "react";
import Pagination from '@mui/material/Pagination';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '../components/Typography';
import AppAppBar from '../views/AppAppBar';
import MainFeaturedPost from '../views/MainFeaturedPost';
import FeaturedPost from './FeaturedPost.js';
import AppFooter from '../views/AppFooter';
import Markdown from '../components/Markdown';
import post1 from '../markdowns/blog-post.1.md';
import withRoot from '../modules/withRoot';
import useHttp from '../modules/use-http';
import { getAllBlogs } from '../api/blogs'
import LoadingBox from '../components/LoadingBox';
import NormalPost from '../views/NormalPost';
import { Button, List, ListItem, ListItemButton } from '@mui/material';
import { NavLink } from 'react-router-dom';

function Blog() {
  const [ content, setContent ] = useState("");
  const { data, status, sendRequest } = useHttp(getAllBlogs);

  useEffect(() => {
    sendRequest();
  }, []);

  useEffect(() => {
    if (status === 'completed' && data) {
      console.log(data);
      setContent(data);
    }
  }, [data, status]);

  if (status === 'pending' || content === '') return <LoadingBox />;

  return (
    <React.Fragment>
      <AppAppBar />
        <Container maxWidth="lg">
          <Typography variant="h3" gutterBottom marked="center" align="center" sx={{ mt: 7 }}>
            Tin tức
          </Typography>
          <MainFeaturedPost post={content[0]} />
          <Grid container spacing={4}>
            <FeaturedPost key={content[1].title} post={content[1]} />
            <FeaturedPost key={content[2].title} post={content[2]} />
          </Grid>
          <List>
            {content?.map(p => (
              <ListItem>
                <NormalPost key={p.title} post={p} />
              </ListItem>
            ))}
          </List>
        </Container>
      <AppFooter />
    </React.Fragment>
  );
}

export default withRoot(Blog);