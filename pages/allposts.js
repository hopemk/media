import React, { useState, useEffect } from "react";
import axios from 'axios';

import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from './Header';
import FeaturedPost from './FeaturedPost';
//import Sidebar from './Sidebar';
import Footer from './Footer';
const sections = [
  /* { title: 'Technology', url: '#' },
   { title: 'Design', url: '#' },
   { title: 'Culture', url: '#' },
   { title: 'Business', url: '#' },
   { title: 'Politics', url: '#' },
   { title: 'Opinion', url: '#' },
   { title: 'Science', url: '#' },
   { title: 'Health', url: '#' },
   { title: 'Style', url: '#' },
   { title: 'Travel', url: '#' },*/
];

const mainFeaturedPost = {
  title: 'Title of a longer featured blog post',
  description:
    "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
  image: 'https://source.unsplash.com/random',
  imageText: 'main image description',
  linkText: 'Continue reading…',
};
const steps = ['Shipping address', 'Payment details', 'Review your order'];
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

const sidebar = {
  title: 'About',
  description:
    'Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.',
  archives: [
    { title: 'March 2020', url: '#' },
    { title: 'February 2020', url: '#' },
    { title: 'January 2020', url: '#' },
    { title: 'November 1999', url: '#' },
    { title: 'October 1999', url: '#' },
    { title: 'September 1999', url: '#' },
    { title: 'August 1999', url: '#' },
    { title: 'July 1999', url: '#' },
    { title: 'June 1999', url: '#' },
    { title: 'May 1999', url: '#' },
    { title: 'April 1999', url: '#' },
  ],
  social: [
    { name: 'GitHub', icon: GitHubIcon },
    { name: 'Twitter', icon: TwitterIcon },
    { name: 'Facebook', icon: FacebookIcon },
  ],
};

const theme = createTheme();

export default function Blog() {
  const [posts, setPosts] = useState([])
  const [user, setUser] = useState({})
  
  const getPosts = async () => {
    await axios.get(`api/post`)
      .then(res => {
        const data = res.data
        setPosts(data);
      })
    console.log(posts)
  }
  const getUser = async () => {
    await axios.get(`api/login`)
      .then(res => {
        const data = res.data
        setUser(data.data.user);
      })
    console.log(user)
  }
  const logout = () => {
    document.cookie = null
    return 'logged out'
  }
  useEffect(() => {
    if (document.cookie) {
      if (!user.email) {
        getUser()
      }
    }
    getPosts();
    //let timer1 = setTimeout(() => setShow(true), delay * 1000);
    /*
    let interval = setInterval(() => {
      getUser()
      getPosts()
      
    }, 600000);
    return clearInterval(interval)*/
  })

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header title="Media" sections={sections} user={user} />
        <main>
          
          <Grid container spacing={4}>
            {posts.map((post) => (
              <FeaturedPost key={post.createdAt} post={post} user={user} />
            ))}
          </Grid>

        </main>
        
      </Container>
      <Footer
        title="Footer"
        description="Something here to give the footer a purpose!"
      />
    </ThemeProvider>
  );
}
