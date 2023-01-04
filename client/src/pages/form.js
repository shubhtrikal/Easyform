import React from 'react'
import Navbar from '../components/Navbar'
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import { useSearchParams } from 'react-router-dom';

const Form = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    return (
        <Typography variant = 'h1'> {searchParams.get("id")} </Typography>
    )
}

export default Form