import * as React from 'react';
import { useEffect, useState } from "react";
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import AppAppBar from '../views/AppAppBar';
import MainFeaturedPost from '../views/MainFeaturedPost';
import FeaturedPost from './FeaturedPost.js';
import AppFooter from '../views/AppFooter';
import Markdown from '../components/Markdown';
import post1 from '../markdowns/blog-post.1.md';
import withRoot from '../modules/withRoot';
import useHttp from '../modules/use-http';
import { getAllBlogs } from '../api/blogs'

const mainFeaturedPost = {
  title: 'Title of a longer featured blog post',
  description:
    "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
  image: 'https://source.unsplash.com/random',
  imageText: 'main image description',
  linkText: 'Continue reading…',
};

const featuredPosts = [
  {
    title: 'Featured post',
    date: 'Nov 12',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://source.unsplash.com/random',
    imageLabel: 'Image Text',
  },
  {
    title: 'Post title',
    date: 'Nov 11',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://source.unsplash.com/random',
    imageLabel: 'Image Text',
  },
];

function Blog() {
  const [content, setContent] = useState("");
  const { data, sendRequest } = useHttp(getAllBlogs);

  useEffect(() => {
    fetch(post1)
      .then((res) => res.text())
      .then((text) => setContent(text));
  }, []);

  useEffect(() => {
    sendRequest();
  }, []);

  return (
    <React.Fragment>
      <AppAppBar />
        <Container maxWidth="lg">
            <MainFeaturedPost post={mainFeaturedPost} />
            <Grid container spacing={4}>
              {featuredPosts.map((post) => (
                <FeaturedPost key={post.title} post={post} />
              ))}
            </Grid>
            <Box>
              <Markdown align="left">{content}</Markdown>
            </Box>
        </Container>
      <AppFooter />
    </React.Fragment>
  );
}

export default withRoot(Blog);