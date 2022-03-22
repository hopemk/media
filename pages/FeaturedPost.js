import * as React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import UpdatePost from './EditPost'
function FeaturedPost(props) {
  const { post, user } = props;
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = ['Shipping address', 'Payment details'];
  function getStepContent(step) {
    switch (step) {
      case 0:
        return (<Card sx={{ display: 'flex' }}>
        <CardContent sx={{ flex: 1 }}>
          <Typography component="h2" variant="h5">
            By {post.author.firstName} {post.author.lastName}
          </Typography>
          <Typography component="h2" variant="h5">
            {post.title}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {post.createdAt}
          </Typography>
          <Typography variant="subtitle1" paragraph>
            {post.description}
          </Typography>
          <Typography variant="subtitle1" color="primary">
            Continue reading...
          </Typography>
          <EditPost isWriter={user.email === post.author.email} />
        </CardContent>
        <CardMedia
          component="img"
          sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
          image={'http://localhost:3000/api/downloadimage/' + post.image}
          alt={post.imageLabel}
        />
        
      </Card>);
      case 1:
        return <UpdatePost post={post}/>;
      default:
        throw new Error('Unknown step');
    }
  }
  
  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };
  console.log();
  function EditPost(isWriter) {
    return (<Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
    {activeStep !== 0 && (
      <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
        Back
      </Button>
    )}

    <Button
      variant="contained"
      onClick={handleNext}
      sx={{ mt: 3, ml: 1 }}
    >
      {activeStep === steps.length - 1 ? 'All Posts' : 'Update Post'}
    </Button>
  </Box>)
  }
  return (
    <Grid item xs={12} md={12}>
      <CardActionArea component="a" href="#">
      {getStepContent(activeStep)}
        
      </CardActionArea>
    </Grid>
  );
}

FeaturedPost.propTypes = {
  post: PropTypes.shape({
    createdAt: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    //imageLabel: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default FeaturedPost;
