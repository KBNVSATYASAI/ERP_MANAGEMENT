import { Button, Card, CardContent, Grid, MenuItem, Select, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminHome from './Adminhome';

const FormCard = ({ label, name, value, type = 'text', onChange }) => (
  <TextField
    variant="outlined"
    margin="normal"
    required
    fullWidth
    id={name}
    label={label}
    name={name}
    autoComplete={name}
    autoFocus
    type={type}
    value={value}
    onChange={onChange}
  />
);

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    backgroundColor: '#ecf0f1', // Light background for the content area to match sidebar color
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
    margin: 0,
  },
  card: {
    maxWidth: 600,
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: theme.spacing(2),
    boxShadow: theme.shadows[3],
    padding: theme.spacing(4),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  header: {
    marginBottom: theme.spacing(4),
    textAlign: 'center',
    color: '#34495e', // Darker color for header to stand out
  },
  button: {
    backgroundColor: '#2980b9', // Matching blue color with sidebar
    color: '#fff',
    '&:hover': {
      backgroundColor: '#3498db', // Lighter blue on hover
    },
    marginTop: theme.spacing(2),
  },
  select: {
    marginTop: theme.spacing(2),
  },
  selectMenuItem: {
    color: '#34495e', // Darker text color for readability
  },
}));

const AddTeacher = () => {
  const classes = useStyles();
  const [formData, setFormData] = useState({
    teacherId: '',
    teacherName: '',
    subject: '',
    mobileNumber: '',
    address: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    let isValid = true;
    const errors = {};

    if (!formData.teacherId) {
      errors.teacherId = 'Teacher ID is required';
      isValid = false;
      toast.error(errors.teacherId);
    }

    if (!formData.teacherName) {
      errors.teacherName = 'Teacher name is required';
      isValid = false;
      toast.error(errors.teacherName);
    }

    if (!formData.subject) {
      errors.subject = 'Subject is required';
      isValid = false;
      toast.error(errors.subject);
    }

    if (!formData.mobileNumber || !/^\d+$/.test(formData.mobileNumber)) {
      errors.mobileNumber = 'Mobile number is required and must be a number';
      isValid = false;
      toast.error(errors.mobileNumber);
    }

    if (!formData.password) {
      errors.password = 'Password is required';
      isValid = false;
      toast.error(errors.password);
    }

    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
      isValid = false;
      toast.error(errors.confirmPassword);
    }

    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      fetch('http://localhost:8080/api/teachers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to add teacher');
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);
          setFormData({
            teacherId: '',
            teacherName: '',
            subject: '',
            mobileNumber: '',
            address: '',
            password: '',
            confirmPassword: '',
          });
          toast.success('Teacher added successfully');
        })
        .catch((error) => {
          console.error('Error:', error);
          toast.error('Failed to add teacher');
        });
    }
  };

  return (
    <div className={classes.root}>
      <AdminHome />
      
      <Grid container justify="center" spacing={0} style={{ width: '100%' }}>
        <Grid item xs={12} sm={10} md={8}>
          <Card className={classes.card}>
            <CardContent>
              <Typography variant="h5" component="h2" className={classes.header}>
                Add Teacher
              </Typography>
              <form onSubmit={handleSubmit}>
                <FormCard label="Teacher ID" name="teacherId" value={formData.teacherId} onChange={handleChange} />
                <FormCard label="Name" name="teacherName" value={formData.teacherName} onChange={handleChange} />
                <div style={{ marginBottom: '20px' }}>
                  <Typography variant="subtitle1" gutterBottom>Subject:</Typography>
                  <Select
                    id="class"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    fullWidth
                    className={classes.select}
                  >
                    <MenuItem value="Telugu" className={classes.selectMenuItem}>Telugu</MenuItem>
                    <MenuItem value="Hindi" className={classes.selectMenuItem}>Hindi</MenuItem>
                    <MenuItem value="English" className={classes.selectMenuItem}>English</MenuItem>
                    <MenuItem value="Maths" className={classes.selectMenuItem}>Maths</MenuItem>
                    <MenuItem value="Science" className={classes.selectMenuItem}>Science</MenuItem>
                    <MenuItem value="Social" className={classes.selectMenuItem}>Social</MenuItem>
                  </Select>
                </div>
                <FormCard label="Mobile Number" name="mobileNumber" value={formData.mobileNumber} onChange={handleChange} />
                <FormCard label="Address" name="address" value={formData.address} onChange={handleChange} />
                <FormCard label="Password" name="password" value={formData.password} onChange={handleChange} type="password" />
                <FormCard label="Confirm Password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} type="password" />
                <Button type="submit" fullWidth variant="contained" className={classes.button}>
                  Add Teacher
                </Button>
              </form>
              <ToastContainer />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default AddTeacher;
