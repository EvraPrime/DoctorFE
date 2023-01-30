import * as React from 'react';
import PropTypes from 'prop-types';
import Typography from '../components/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { NavLink } from 'react-router-dom';

function NormalPost(props) {
  const { post } = props;

  return (
    <Grid width="100%" item xs={12} md={6}>
      <CardActionArea component="a" href="#">
        <Card sx={{ display: 'flex' }}>
          <CardMedia
            component="img"
            sx={{ width: 160, display: { xs: 'none', sm: 'block' }, objectFit: "contain" }}
            image={post.image}
            alt={post.imageLabel}
          />
          <CardContent sx={{ flex: 1 }}>
            <Typography component="h2" align="left" variant="h5">
              <b>{post.title}</b>
            </Typography>
            <Typography variant="subtitle1" align="left" color="text.secondary">
              {post.date}
            </Typography>
            <Typography variant="subtitle1" align="left" paragraph>
              {post.description}
            </Typography>
            <NavLink to={`/detail/${post.title}`}>Đọc thêm...</NavLink>
          </CardContent>
        </Card>
      </CardActionArea>
    </Grid>
  );
}

NormalPost.propTypes = {
  post: PropTypes.shape({
    date: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    imageLabel: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default NormalPost;