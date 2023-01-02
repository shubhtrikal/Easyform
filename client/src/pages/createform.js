import React, {useEffect, useState} from 'react'
import { Typography, Container } from '@mui/material'
import { Formik, Field, Form } from 'formik';
import { createUserWithEmailAndPassword } from "firebase/auth";
import {auth } from '../firebase/app';
import axios from 'axios'
import { useNavigate} from 'react-router-dom'
import Navbar from '../components/Navbar';

const CreateForm = () => {
    const navigate = useNavigate()
    const [errorMessage, setErrorMessage] = useState('')
    const [user, setUser] = useState(null)
    const initialValues = {
        title: '',
        description: '',
    }
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('user'))
        if(data)
            setUser(data)
        else
            navigate('/')
    }, [])

    const onSubmit = async(values) => {
        await axios.post('http://localhost:8000/createform', {
            userID : user._id,
            title: values.title,
            description: values.description
        })
        .then((res) => {
            localStorage.setItem('user', JSON.stringify(res.data));
            navigate('/dashboard')
        })
        .catch((err) => {
            setErrorMessage(err.message);
        })
    }
    return (
        <>
            <Navbar/>
            <Container sx = {{marginTop : '50px'}}>
                <Typography> Enter the details to create form </Typography>
                <Formik
                    initialValues={initialValues}
                    onSubmit={(values) =>  onSubmit(values)}
                >
                    <Form>
                        <label htmlFor="title">Title</label>
                        <Field
                            id="title"
                            name="title"
                            placeholder="Enter the title"
                            type="text"
                        />

                        <label htmlFor="description">Description</label>
                        <Field  
                            as="textarea" 
                            id="description"
                            name="description"
                            placeholder = "Enter the description"
                        />
                        
                        <button type="submit">Submit</button>

                        {errorMessage && <Typography variant="h5">{errorMessage}</Typography>}
                    </Form>
                </Formik>
            </Container>
        </>
    )
}

export default CreateForm