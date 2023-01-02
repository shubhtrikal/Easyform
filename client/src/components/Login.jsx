import React from 'react'
import { Typography, Container } from '@mui/material'
import { Formik, Field, Form } from 'formik';
import { signInWithEmailAndPassword } from "firebase/auth";
import {auth } from '../firebase/app';
import {useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const navigate = useNavigate()
    const [errorMessage, setErrorMessage] = useState('')
    const [token, setToken] = useState(null)
    const [user, setUser] = useState(null)

    const SubmitMongo = async(values) => {
        try {
            console.log("shubh");
            const res = await axios.post('http://localhost:8000/login', {
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
        await signInWithEmailAndPassword(auth, values.email, values.password)
        .then((userCredential) => {
            // Signed in 
            // const user = userCredential.user;
            // console.log(user);
            setToken(userCredential.user.accessToken)
            setErrorMessage('User signed successfully')
            localStorage.setItem('token', JSON.stringify(userCredential.user.accessToken));
            SubmitMongo(values)
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
        // name: '',
        email: '',
        password: '',
    }

    return (
        <>
            <Container sx = {{marginTop : '50px'}}>
                <Typography> Login </Typography>
                <Formik
                    initialValues={initialValues}
                    onSubmit={(values) =>  onSubmit(values)}
                >
                    <Form>
                        {/* <label htmlFor="name">First Name</label>
                        <Field
                            id="name"
                            name="name"
                            placeholder="Enter your name"
                            type="text"
                        /> */}

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

export default Login