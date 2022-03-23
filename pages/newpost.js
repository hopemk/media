import React from 'react'
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
        */
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