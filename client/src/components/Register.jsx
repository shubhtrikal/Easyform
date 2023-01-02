import React from 'react'
import { Typography, Container } from '@mui/material'
import { Formik, Field, Form } from 'formik';
import { createUserWithEmailAndPassword } from "firebase/auth";
import {auth } from '../firebase/app';
import {useState} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'


const Register = () => {
    const navigate = useNavigate()
    const [errorMessage, setErrorMessage] = useState ('')
    const [token, setToken] = useState(null)
    const [user, setUser] = useState(null)

    const SubmitMongo = async(values) => {
        
        try {
            console.log("shubh");
            const res = await axios.post('http://localhost:8000/register', {
                name: values.name,
                email: values.email,
            })
            
            localStorage.setItem('user', JSON.stringify(res.data));
            setUser(res.data);
            navigate('/dashboard')
        } catch (error) {
            console.log(error);
        }
    }
    
    const onSubmit = async(values) => {
        await createUserWithEmailAndPassword(auth, values.email, values.password)
        .then((userCredential) => {
            // Signed in 
            // const user = userCredential.user;
            // console.log(user.accessToken);
            const data = userCredential.user.accessToken
            console.log(userCredential.user.accessToken)
            setToken(data)
            // setErrorMessage('User created successfully')
            console.log(token)
            localStorage.setItem('token', JSON.stringify(data));
            SubmitMongo(values)
            console.log(token)
            // ...
        })
        .catch((error) => {
            // const errorCode = error.code;
            // const errorMessage = error.message;
            setErrorMessage(error.message)
            console.log(error)
            // ..
        });
        
    }

    const initialValues = {
        name: '',
        email: '',
        password: '',
    }

    // console.log(token)

    return (
        <>
            <Container sx = {{marginTop : '50px'}}>
                <Typography> Signup </Typography>
                <Formik
                    initialValues={initialValues}
                    onSubmit={(values) =>  onSubmit(values)}
                >
                    <Form>
                        <label htmlFor="name">First Name</label>
                        <Field
                            id="name"
                            name="name"
                            placeholder="Enter your name"
                            type="text"
                        />

                        <label htmlFor="email">Email</label>
                        <Field
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            type="email"
                        />
                        <label htmlFor="password">Password</label>
                        <Field
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                            type="password"
                        />
                        
                        <button type="submit">Submit</button>

                        {errorMessage && <Typography variant="h5">{errorMessage}</Typography>}
                    </Form>
                </Formik>
            </Container>
        </>
    )
}

export default Register