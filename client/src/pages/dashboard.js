import React from 'react'
import Navbar from '../components/Navbar'
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Typography, Box, Container, Grid, Divider } from '@mui/material';
import Card from '../components/Card'

const Dashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null)
    useEffect(() => {
        const token = JSON.parse(localStorage.getItem('token'));
        const User = JSON.parse(localStorage.getItem('user'));
        if (User) {
            setUser(User);
        }
        if (token) {
        }
        else
            navigate('/');
      }, []);
    return (
        <Box>
            <Navbar/>
            <Container sx = {{margin : '20px'}}>
                <Typography variant = 'h4' sx = {{marginBottom : '20px'}}>Create form</Typography>
                <Grid container spacing = {2}>
                    <Grid item xs = {2}>
                        <Card title = "Create Form" description = "Click below button to begin" btn = "Click here"/>
                    </Grid>
                </Grid>
            </Container>
            <Divider/>
            <Container sx = {{margin : '20px'}}>
                <Typography variant = 'h4' sx = {{marginBottom : '20px'}}>Your forms</Typography>
                <Grid container spacing = {2}>
                    <Grid item xs = {2}>
                        <Card/>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}

export default Dashboard