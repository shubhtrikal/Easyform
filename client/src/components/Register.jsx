import React from 'react'
import { Typography, Container } from '@mui/material'
import { Formik, Field, Form } from 'formik';
import { createUserWithEmailAndPassword } from "firebase/auth";
import {auth } from '../firebase/app';
import {useState} from 'react'



const Register = () => {

    const [errorMessage, setErrorMessage] = useState('')

    const onSubmit = async(values) => {
        await createUserWithEmailAndPassword(auth, values.email, values.password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log(user);
            setErrorMessage('User created successfully')
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