import { Button, IconButton, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ArrowBack } from '@material-ui/icons';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing(4),
  },
  formContainer: {
    alignItems: 'Center',
    maxWidth: 400,
    margin: '0 auto',
  },
  textField: {
    marginBottom: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(2),
  },
  backButton: {
    position: 'fixed',
    top: theme.spacing(2),
    left: theme.spacing(2),
    zIndex: 1000,
    backgroundColor: theme.palette.background.paper,
  },
}));

const AdminLogin = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [Teacher_Id, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://localhost:8080/api/teachers/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ teacherId: Teacher_Id, password: password }),
      });
  
      const data = await response.text();
      console.log(data)
      if (response.ok) {
        if (data === "Success login") {
          localStorage.setItem('isLoggedIn', true);
          localStorage.setItem('adminUsername', Teacher_Id);
          navigate('/Teacherhome');
        }
      } else {
        toast.error(data.error || 'Failed to login. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error.message);
      toast.error('Failed to login. Please try again later.');
    }
  };
  
  const goBack = () => {
    navigate('/'); 
  };
  return (
    <div className={classes.root}>
      <IconButton className={classes.backButton} onClick={goBack}>
        <ArrowBack />
      </IconButton>
      <Typography variant="h4" align="center" gutterBottom>
        Teacher Login
      </Typography>
      <div className={classes.formContainer}>
        <form onSubmit={handleLogin}>
          <TextField
            className={classes.textField}
            fullWidth
            label="Teacher Id"
            variant="outlined"
            value={Teacher_Id}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            className={classes.textField}
            fullWidth
            label="Password"
            variant="outlined"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            className={classes.button}
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
          >
            Login
          </Button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AdminLogin;
