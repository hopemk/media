import React, { useState, useEffect } from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Input from '@mui/material/Input';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


const theme = createTheme();
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function UpdatePost(props) {
  const {post} = props;
    const [formData, setFormData] = React.useState({
        id:'',
        title: '',
        description: '',
        image:''
      })
      const [submitting, setSubmitting] = React.useState(false)
      const [show, setShow] = React.useState({
        message: '',
        open: false,
        severity: '',
        color:''
      });
      const [user, setUser] = useState({})
      
      
      const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setShow({
          open: false
            
        });
      };
        const handleSubmit = async e => {
            e.preventDefault()
            console.log(formData)
            const { title, description,  image } = formData
            let fd = new FormData();
            fd.append('_id', post._id);
            fd.append('title', title);
            fd.append('description', description);
            fd.append('userId', post.author._id)
            //fd.append('email', email);
            //fd.append('password', password);
            fd.append('image', image, image.name)
            const response = await axios.put('/api/post/' + post._id, 
              fd
            ).then(res=>{
              setShow({
                open: true,
                message: 'Post updated successfully.',
                severity: 'success',
                color: 'green'
              })
              console.log(res)
              //window.location.replace('/login')
            }).catch(err => {
              console.log(err)
            })
            /*
            if (success) {
              window.location.replace(data)
              return
            }
            */
          }
    

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Snackbar open={show.open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>

          <Alert onClose={handleClose} severity={show.severity} color={show.severity} style={{ backgroundColor: show.color, color: 'white' }} sx={{ width: '100%' }}>
            {show.message}
          </Alert>

        </Snackbar>
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Edit Post
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  autoComplete="title"
                  name="title"
                  required
                  fullWidth
                  id="title"
                  label="Title"
                  autoFocus
                  defaultValue={post.title}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  fullWidth
                  id="description"
                  label="description"
                  name="description"
                  multiline
                  rows={10}
                  autoComplete="description"
                  defaultValue={post.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                />
              </Grid>
              
              <Grid item xs={12}>
                <Input
                  required
                  fullWidth
                  id="image"
                  label="Featured Photo"
                  name="image"
                  type="file"
                  //autoComplete="image"
                  onChange={e => setFormData({ ...formData, image: e.target.files[0] })}
                />
              </Grid>
              
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Update Post
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/allposts" variant="body2">
                  Refresh Posts
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        
      </Container>
    </ThemeProvider>
  );
}
