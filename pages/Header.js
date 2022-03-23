import * as React from 'react';
import PropTypes from 'prop-types';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { withCookies, Cookies } from 'react-cookie';
import axios from 'axios';
function Header(props) {
  const { sections, title, user } = props;
  const logout = async () => {
    const response = await axios.get('/api/logout/'

    ).then(res => {
      console.log(res)
      window.location.replace('/login')
    }).catch(err => {
      console.log(err)
    })
  }
  const LoggedIn = (arg) => {
    if (arg) {
      return (
        <>

          <Button variant="outlined" size="small">
            {user.email}
          </Button>
          <Button variant="outlined" size="small" onClick={logout}>
            Logout
          </Button>
        </>
      )
    }
    else {
      return (
        <Button variant="outlined" size="small">
          Sign In
        </Button>
      )
    }
  }
  return (

    <React.Fragment>
      <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Link href="/newpost" variant="outlined">
          {"New Post"}
        </Link>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          sx={{ flex: 1 }}
        >
          {title}
        </Typography>

        <LoggedIn arg={user.email} />
      </Toolbar>
      <Toolbar
        component="nav"
        variant="dense"
        sx={{ justifyContent: 'space-between', overflowX: 'auto' }}
      >
        {sections.map((section) => (
          <Link
            color="inherit"
            noWrap
            key={section.title}
            variant="body2"
            href={section.url}
            sx={{ p: 1, flexShrink: 0 }}
          >
            {section.title}
          </Link>
        ))}
      </Toolbar>
    </React.Fragment>
  );
}

Header.propTypes = {
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    }),
  ).isRequired,
  title: PropTypes.string.isRequired,
};

export default Header;
