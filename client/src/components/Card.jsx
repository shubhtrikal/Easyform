import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';


const BasicCard = (props) => {

    const navigate = useNavigate()
    const createForm = () => {
        navigate('/createform');
  }

    const redirectForm = () => {
        navigate({
            pathname: "/form",
            search: `?id=${props.id}`, 
        });
  }
    // console.log(props.description)
    const handleClcik = () => {
        if(props.id === '0')
            createForm()
        else
            redirectForm()
    }

    return (
        <Card sx={{ minWidth: 275 }}>
            <CardContent>
                {/* <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Word of the Day
        </Typography> */}
                <Typography variant="h5" component="div">
                    {props.title}
                </Typography>
                {/* <Typography sx={{ mb: 1.5 }} color="text.secondary">
          adjective
        </Typography> */}
                <Typography variant="body2">
                    {props.description}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" onClick = {handleClcik}> {props.btn}  </Button>
            </CardActions>
        </Card>
    );
}

export default BasicCard