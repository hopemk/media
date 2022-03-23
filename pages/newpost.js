/*import React from 'react'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
//import TextArea from '@material-ui/core/TextArea'
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button'
import {NotificationContainer, NotificationManager} from 'react-notifications';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import  SnackbarContent  from '@mui/material/SnackbarContent'

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const useStyles = makeStyles(theme => ({
  layout: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    maxWidth: '768px',
    margin: '0 auto'
  },
  paper: {
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(8),
      padding: `${theme.spacing(6)}px ${theme.spacing(4)}px`
    }
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12
  }
}))

const Register = () => {
  const classes = useStyles({})
  const [formData, setFormData] = React.useState({
    title: '',
    description: '',
    image:''
  })
  const [submitting, setSubmitting] = React.useState(false)
  const [open, setOpen] = React.useState(false);
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

    const handleSubmit = async e => {
        e.preventDefault()
        console.log(formData)
        const { title, description,  image } = formData
        let fd = new FormData();
        fd.append('title', title);
        fd.append('description', description);
        //fd.append('email', email);
        //fd.append('password', password);
        fd.append('image', image, image.name)
        const response = await axios.post('/api/post', 
          fd
        ).then(res=>{
          NotificationManager.success(res.data, 'Title here');
          console.log(res)
          //window.location.replace('/login')
        }).catch(err => {
          setOpen(true);
          console.log(err)
        })
        /*
        if (success) {
          window.location.replace(data)
          return
        }
        
      }

  return (
    <main className={classes.layout}>
      <Paper className={classes.paper} elevation={2}>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal:'right' }}>
        
        <Alert onClose={handleClose} severity="warning" color="warning" style={{backgroundColor:'red',color: 'white'}} sx={{ width: '100%' }}>
          This is a success message!
        </Alert>
       
      </Snackbar>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
        >
          <Typography component="h1" variant="h4" gutterBottom>
            Register
          </Typography>
        </Box>

        <form method="post" className={classes.form} noValidate onSubmit={handleSubmit}>
        <NotificationContainer/>
          <TextField
            margin="none"
            required
            fullWidth
            id="title"
            label="Title"
            name="title"
            autoComplete="title"
            autoFocus
            defaultValue={formData.title}
            onChange={e => setFormData({ ...formData, title: e.target.value })}
          />
          <TextField
            margin="none"
            required
            fullWidth
            id="description"
            label="description"
            name="description"
            multiline
            rows={10}
            autoComplete="description"
            defaultValue={formData.description}
            onChange={e => setFormData({ ...formData, description: e.target.value })}
          />
          
          <Input
            margin="none"
            required
            fullWidth
            name="image"
            label="image"
            type="file"
            id="image"
            autoComplete="profile photo"
            defaultValue={formData.image}
            onChange={e => setFormData({ ...formData, image: e.target.files[0]  })}
          />
          <Box mb={6}>
            <Button
              disabled={submitting}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              {submitting && (
                <CircularProgress size={24} className={classes.buttonProgress} />
              )}
              {submitting ? 'Registering...' : 'Register'}
            </Button>
          </Box>
        </form>
      </Paper>
    </main>
  )
}

export default Register
*/
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
import Header from './Header';


const theme = createTheme();
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
const sections = [];
export default function UpdatePost(props) {
  const { post } = props;
  const [formData, setFormData] = React.useState({
    id: '',
    title: '',
    description: '',
    image: ''
  })
  const [submitting, setSubmitting] = React.useState(false)
  const [show, setShow] = React.useState({
    message: '',
    open: false,
    severity: '',
    color:''
  });
  const [user, setUser] = useState({})
  
  const getUser = async () => {
    await axios.get(`api/login`)
      .then(res => {
        const data = res.data
        setUser(data.data.user);
      })
    console.log(user)
  }
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
    const { title, description, image } = formData
    let fd = new FormData();
    //fd.append('_id', post._id);
    fd.append('title', title);
    fd.append('description', description);
    //fd.append('email', email);
    //fd.append('password', password);
    fd.append('image', image, image.name)
    const response = await axios.post('/api/post/',
      fd
    ).then(res => {
      setShow({
        open: true,
        message: 'Post saved successfully.',
        severity: 'success',
        color: 'green'
      })
      console.log(res)
      //window.location.replace('/login')
    }).catch(err => {
      setShow({
        open: true,
        message: 'Error occured.',
        severity: 'danger',
        color: 'red'
      })
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
      
        <Snackbar open={show.open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>

          <Alert onClose={handleClose} severity={show.severity} color={show.severity} style={{ backgroundColor: show.color, color: 'white' }} sx={{ width: '100%' }}>
            {show.message}
          </Alert>

        </Snackbar>
        <CssBaseline />
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
                  //defaultValue={post.title}
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
                  //defaultValue={post.description}
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
              Save Post
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/allposts" variant="body2">
                  All Posts
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
