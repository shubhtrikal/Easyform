import React from 'react'
import Navbar from '../components/Navbar'
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Typography, Box, Container, Grid, Divider } from '@mui/material';
import Card from '../components/Card'
import axios from 'axios';

const Dashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null)
    const [forms, setForms] = useState(null)
    // const [id, setId] = useState(null)

    const getForms = async(userID) => {
        await axios.get('http://localhost:8000/getAllForm/' + userID)
        .then((res) => {
            setForms(res.data);
        })
        .catch((err) => {
            console.log(err);
        })
    }

    useEffect(() => {
        const token = JSON.parse(localStorage.getItem('token'));
        const User = JSON.parse(localStorage.getItem('user'));
        if (token) {
        }
        else
            navigate('/');
        if (User) {
            getForms(User._id);
            setUser(User);
        }
      }, []);

      
    return (
        <Box>
            <Navbar/>
            <Container sx = {{margin : '20px'}}>
                <Typography variant = 'h4' sx = {{marginBottom : '20px'}}>Create form</Typography>
                <Grid container spacing = {2}>
                    <Grid item xs = {2}>
                        <Card title = "Create Form" description = "Click below button to begin" btn = "Click here" id = "0"/>
                    </Grid>
                </Grid>
            </Container>
            <Divider/>
            <Container sx = {{margin : '20px'}}>
                <Typography variant = 'h4' sx = {{marginBottom : '20px'}}>Your forms</Typography>
                <Grid container spacing = {2}>
                    {
                        forms?.map((form , i) => (
                            <Grid item key = {i} xs = "auto">
                                <Card title = {form.title} description = {form.description} btn = "Click here" id = {form._id}/>
                            </Grid>
                        ))                  
                    }
                </Grid>
            </Container>
        </Box>
    )
}

export default Dashboard