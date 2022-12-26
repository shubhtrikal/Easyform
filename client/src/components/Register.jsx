import React from 'react'
import { Typography, Container } from '@mui/material'
import { Formik, Field, Form } from 'formik';
import { createUserWithEmailAndPassword } from "firebase/auth";
import {auth } from '../firebase/app';
// const Myform = styled('Box')({
//     color: 'darkslategray',
//     backgroundColor: 'aliceblue',
//     display : 'flex',
//     flexDirection: 'column',
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 8,
//     borderRadius: 4,
//   });

const onSubmit = async(values) => {
    // const auth = getAuth();
    await createUserWithEmailAndPassword(auth, values.email, values.password)
    .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user);
        // ...
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error)
        // ..
    });
}

const Register = () => {

    const initialValues = {
        name: '',
        email: '',
        password: '',
    }

    return (
        <>
            <Container>
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
                    </Form>
                </Formik>
            </Container>
        </>
    )
}

export default Register