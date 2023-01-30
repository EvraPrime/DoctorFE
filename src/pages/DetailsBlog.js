import * as React from 'react';
import { useEffect } from "react";
import Container from '@mui/material/Container';
import Typography from '../components/Typography';
import AppAppBar from '../views/AppAppBar';
import AppFooter from '../views/AppFooter';
import withRoot from '../modules/withRoot';
import { useParams } from "react-router-dom";
import useHttp from '../modules/use-http';
import { getBlogsByName } from '../api/blogs';
import LoadingBox from '../components/LoadingBox';
import Markdown from '../components/Markdown';
import { Box } from '@mui/system';
import CardMedia from '@mui/material/CardMedia';

function DetailsBlog() {
  const { title } = useParams();
  
  const { data, status, sendRequest } = useHttp(getBlogsByName);
  const [ content, setContent ] = React.useState();

  useEffect(() => {
    sendRequest(title);
  }, [sendRequest]);

  useEffect(() => {
    if (status === 'completed' && data) {
      setContent(data[0]);
    }
  }, [data, status]);

  if (status === 'pending' || content === '' || content === undefined) return <LoadingBox />;

  return (
    <React.Fragment>
      <AppAppBar />
        <Container maxWidth="lg" sx={{ mt: 5 }}>
          <Markdown>{content.detail}</Markdown>
        </Container>
      <AppFooter />
    </React.Fragment>
  );
}

export default withRoot(DetailsBlog);