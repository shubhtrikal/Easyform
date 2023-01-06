import React from 'react'
import Navbar from '../components/Navbar'
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Typography, Container } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { Formik, Form, Field } from 'formik';

const FormPage = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const formId = searchParams.get('id');

    const [user, setUser] = useState(null);
    const [question, setQuestion] = useState(null);
    const [admin, setAdmin] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    const getData = async (value) => {
        await axios.post('http://localhost:8000/getForm', {
            formID: formId,
            userID: value,
        })
        .then(res => {
            if(res.data.admin)
                setAdmin(true);
            setQuestion(res.data.que);
        })
        .catch(err => {
            console.log(err);
        })
    }

    const onSubmit = async (values) => {
        await axios.post('http://localhost:8000/addQuestion', {
            userID: user._id,
            formID: formId,
            question: values.question,
            optionA: values.optionA,
            optionB: values.optionB,
            optionC: values.optionC,
            optionD: values.optionD,
        })
        .then(res => {
            setQuestion(res.data);
            setErrorMessage(null);
        })
        .catch(err => {
            setErrorMessage(err.response.data.message);
        })
    }

    useEffect(() => {
        const token = JSON.parse(localStorage.getItem('token'));
        if(!token)
            navigate('/');
        const User = JSON.parse(localStorage.getItem('user'));
        if(!User)
            navigate('/');
        else
        {
            setUser(User);
            getData(User._id);
        }
    }, [])

    const initialValues = {
        question : '',
        optionA : '',
        optionB : '',
        optionC : '',
        optionD : '',
    }
    console.log(question);
    return (
        <>
            <Navbar />
            {
                admin && (
                    <Container sx = {{marginTop : '50px'}}>
                        <Typography> Login </Typography>
                        <Formik
                            initialValues={initialValues}
                            onSubmit={(values) =>  onSubmit(values)}
                        >
                            <Form>
                                <label htmlFor="question">Enter Question</label>
                                <Field
                                    id="question"
                                    name="question"
                                    placeholder="Enter question"
                                    type="text"
                                />

                                <label htmlFor="optionA">Enter Option A</label>
                                <Field
                                    id="optionA"
                                    name="optionA"
                                    placeholder="Enter option A"
                                    type="text"
                                />

                                <label htmlFor="optionB">Enter Option B</label>
                                <Field
                                    id="optionB"
                                    name="optionB"
                                    placeholder="Enter option B"
                                    type="text"
                                />

                                <label htmlFor="optionC">Enter Option C</label>
                                <Field
                                    id="optionC"
                                    name="optionC"
                                    placeholder="Enter option C"
                                    type="text"
                                />

                                <label htmlFor="optionD">Enter Option D</label>
                                <Field
                                    id="optionD"
                                    name="optionD"
                                    placeholder="Enter option D"
                                    type="text"
                                />
                                
                                <button type="submit">Submit</button>

                                {errorMessage && <Typography variant="h5">{errorMessage}</Typography>}
                            </Form>
                        </Formik>
                    </Container>
                )
        }
                    <Typography variant="h4">
                        User
                    </Typography>
        </>
    )
}

export default FormPage