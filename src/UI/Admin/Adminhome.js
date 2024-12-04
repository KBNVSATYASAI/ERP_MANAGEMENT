import { Button, Divider, Drawer, List, ListItem, ListItemText, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    width: 240,
    flexShrink: 0,
    position: 'fixed',  // Fix the sidebar in place
    top: 0,
    left: 0,
    height: '100vh',  // Ensure sidebar takes full height of the screen
  },
  drawerPaper: {
    width: 240,
    backgroundColor: '#2c3e50',
    color: '#ecf0f1',
    paddingTop: theme.spacing(4),
  },
  content: {
    marginLeft: 240,  // Leave space for the fixed sidebar
    padding: theme.spacing(3),
    overflowY: 'auto',  // Allow vertical scrolling if needed
    backgroundColor: '#ecf0f1',  // Adjust content background color to match theme
    flexGrow: 1,  // Ensure content area grows to fill the available space
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    backgroundColor: '#f0f0f0',
    marginTop: theme.spacing(2),
    cursor: 'pointer',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: theme.spacing(4),
  },
  notificationIcon: {
    marginLeft: 'auto',
  },
  sidebarLink: {
    textDecoration: 'none',
    color: '#ecf0f1',
  },
  logoutButton: {
    marginTop: 'auto', // Ensures logout button is at the bottom
    backgroundColor: '#e74c3c',
    color: '#ecf0f1',
  },
}));

const AdminHome = () => {
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const fetchAdminData = (loggedInUsername, navigate, setUsername) => {
    fetch('http://localhost:8080/api/admin')
      .then(response => {
        if (!response.ok) {
          console.error('Error:', response.statusText);
          navigate('/Adminlogin');
          throw new Error('Unauthorized');
        }
        return response.json();
      })
      .then(data => {
        const isAdmin = data.some(admin => admin.username === loggedInUsername);
        if (isAdmin) {
          setUsername(loggedInUsername);
        } else {
          console.log("User is not an admin, redirecting to login page");
          navigate('/Adminlogin');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        navigate('/Adminlogin');
      });
  };

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const loggedInUsername = localStorage.getItem('adminUsername');

    console.log("isLoggedIn:", isLoggedIn);
    console.log("loggedInUsername:", loggedInUsername);

    if (!isLoggedIn || isLoggedIn !== 'true' || !loggedInUsername) {
      console.log("Redirecting to login page");
      navigate('/Adminlogin');
    } else {
      fetchAdminData(loggedInUsername, navigate, setUsername);
    }
  }, [navigate, setUsername]);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('adminUsername');
    navigate('/');
  };

  return (
    <div className={classes.root}>
      {/* Sidebar */}
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <List>
          <ListItem>
            <Typography variant="h6">
              Welcome, {username}🎇
            </Typography>
          </ListItem>
          <Divider />
          <ListItem button component={Link} to="/AdminHome">
            <ListItemText primary="Home🏠" />
          </ListItem>
          <ListItem button component={Link} to="/Addstudent">
            <ListItemText primary="Add Student🧑‍🎓👩‍🎓" />
          </ListItem>
          <ListItem button component={Link} to="/Addteacher">
            <ListItemText primary="Add Teacher🧑‍🏫👩‍🏫" />
          </ListItem>
          <ListItem button component={Link} to="/viewstudents">
            <ListItemText primary="View All Students" />
          </ListItem>
          <ListItem button component={Link} to="/addbus">
            <ListItemText primary="Add Bus🚌" />
          </ListItem>
          <ListItem button component={Link} to="/newadmin">
            <ListItemText primary="Add Admin" />
          </ListItem>
          <ListItem button component={Link} to="/viewbuses">
            <ListItemText primary="View All Buses" />
          </ListItem>
          <ListItem button component={Link} to="/updatefee">
            <ListItemText primary="Update Student Fee" />
          </ListItem>
          <ListItem button component={Link} to="/viewteachers">
            <ListItemText primary="View All Teachers" />
          </ListItem>
          <ListItem button component={Link} to="/Addexam">
            <ListItemText primary="Student Marks📑" />
          </ListItem>
        </List>
        <Divider />
        {/* Logout Button at the bottom */}
        <ListItem button onClick={handleLogout}>
          <Button variant="contained" className={classes.logoutButton} fullWidth>
            Logout😴
          </Button>
        </ListItem>
      </Drawer>

    </div>
  );
};

export default AdminHome;
