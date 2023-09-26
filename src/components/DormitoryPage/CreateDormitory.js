{/* Hneuz degistirmedim
import React, { useState } from "react";
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import { Button, OutlinedInput } from "@mui/material";
import Box from '@mui/material/Box';
import { useHistory } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';


const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));




function CreateStudent(props) {

    const [expanded, setExpanded] = useState(false);
    const [name, SetName] = useState("");
    const [surname, SetSurname] = useState("");
    const [identityNumber, SetIdentityNumber] = useState("");
    const [phoneNumber, SetPhoneNumber] = useState("");
    const [familyNumber, SetFamilyNumber] = useState("");
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [addressDescription, SetAddressDescription] = useState("");
    const [schoolName, SetSchoolName] = useState("");

    const [open, setOpen] = React.useState(false);
    const [error, setError] = React.useState("");

    const handleClick = () => {
        if (!name || !surname || !identityNumber || !phoneNumber || !familyNumber) {
            setError("Please complete all required fields.");
            setOpen(true);
        } else {
            saveStudent();
        }
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const saveStudent = () => {
        fetch("/student/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json" // JSON içeriği göndermek için uygun Content-Type
            },
            body: JSON.stringify({
                identityNumber: identityNumber,
                name: name,
                surname: surname,
                phoneNumber: phoneNumber,
                familyNumber: familyNumber,
                addressCreateRequest: addressCreateRequest,
                schoolName: schoolName,
                active: true

            })
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('HTTP error! ' + response.status);
                }
                return response.json();
            })
            .then((data) => {
                console.log('Student successfully created:', data);
                setOpen(true);
                setError("");
            })
            .catch((error) => {
                console.error('Error creating student:', error);
                setError("An error occurred while creating the student.");
                setOpen(true);
            });
    };

    const handleSubmit = () => {
        {/*console.log(name, surname, identityNumber, street,
            city,
        country, addressDescription, schoolName)}
        saveStudent();


    }

    const handleName = (value) => {
        SetName(value);
    }

    const handleSurname = (value) => {
        SetSurname(value);
    }

    const handleIdentityNumber = (value) => {
        SetIdentityNumber(value);
    }

    const handlePhoneNumber = (value) => {
        SetPhoneNumber(value);
    }

    const handleFamilyNumber = (value) => {
        SetFamilyNumber(value);
    }

    const handleStreet = (value) => {
        setStreet(value);
    };

    const handleCity = (value) => {
        setCity(value);
    };

    const handleCountry = (value) => {
        setCountry(value);
    };

    const handleAddressDescription = (value) => {
        SetAddressDescription(value);
    }

    const { isActive } = props;

    const addressCreateRequest = { // burada id de create etmiş oluyorum :)
        street,
        city,
        country,
        addressType: "student",
        addressDescription
    };


    const handleSchoolName = (value) => {
        SetSchoolName(value);
    }

    const history = useHistory();

    return (

        <div>
            <Card sx={{ maxWidth: 345, margin: '20px 0', mx: 'auto' }} >
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <h3>Create Student</h3>

                    <FormControl fullWidth sx={{ m: 1 }}>
                        <InputLabel>Name</InputLabel>
                        <OutlinedInput
                            label="Name"
                            inputProps={{ maxLength: 25 }}
                            fullWidth
                            onChange={(i) => handleName(i.target.value)}
                        ></OutlinedInput>
                    </FormControl>


                    <FormControl fullWidth sx={{ m: 1 }}>
                        <InputLabel >Address Id</InputLabel>
                        <OutlinedInput
                            label="Surname"
                            inputProps={{ maxLength: 25 }}
                            fullWidth
                            onChange={(i) => handleSurname(i.target.value)}
                        ></OutlinedInput>
                    </FormControl>


                    <FormControl fullWidth sx={{ m: 1 }}>
                        <InputLabel >Identity Number</InputLabel>
                        <OutlinedInput
                            label="identityNumber"
                            inputProps={{ maxLength: 11 }}
                            fullWidth
                            onChange={(i) => handleIdentityNumber(i.target.value)}
                        ></OutlinedInput>
                    </FormControl>


                    <FormControl fullWidth sx={{ m: 1 }}>
                        <InputLabel >Phone Number</InputLabel>
                        <OutlinedInput
                            label="Phone Number"
                            inputProps={{ maxLength: 11 }}
                            fullWidth
                            onChange={(i) => handlePhoneNumber(i.target.value)}
                        ></OutlinedInput>
                    </FormControl>


                    <FormControl fullWidth sx={{ m: 1 }}>
                        <InputLabel htmlFor="Family Phone Number">Family Phone Number</InputLabel>
                        <OutlinedInput
                            label="Family Phone Number"
                            inputProps={{ maxLength: 11 }}
                            multiline
                            onChange={(i) => handleFamilyNumber(i.target.value)}
                        ></OutlinedInput>
                    </FormControl>


                    <FormControl fullWidth sx={{ m: 1 }}>
                        <InputLabel>Country</InputLabel>
                        <OutlinedInput
                            label="Country"
                            inputProps={{ maxLength: 25 }}
                            fullWidth
                            onChange={(i) => handleCountry(i.target.value)}
                        ></OutlinedInput>
                    </FormControl>


                    <FormControl fullWidth sx={{ m: 1 }}>
                        <InputLabel>City</InputLabel>
                        <OutlinedInput
                            label="City"
                            inputProps={{ maxLength: 25 }}
                            fullWidth
                            onChange={(i) => handleCity(i.target.value)}
                        ></OutlinedInput>
                    </FormControl>


                    <FormControl fullWidth sx={{ m: 1 }}>
                        <InputLabel>Street</InputLabel>
                        <OutlinedInput
                            label="Street"
                            inputProps={{ maxLength: 25 }}
                            fullWidth
                            onChange={(i) => handleStreet(i.target.value)}
                        ></OutlinedInput>
                    </FormControl>


                    <FormControl fullWidth sx={{ m: 1 }}>
                        <InputLabel htmlFor="addressDescription">Address Description</InputLabel>
                        <OutlinedInput
                            id="outliend-adorment-amount"
                            label="Address Description"
                            inputProps={{ maxLength: 250 }}
                            multiline
                            rows={2}
                            fullWidth
                            onChange={(i) => handleAddressDescription(i.target.value)}
                        ></OutlinedInput>
                    </FormControl>


                    <FormControl fullWidth sx={{ m: 1 }}>
                        <InputLabel>General Capacity</InputLabel>
                        <OutlinedInput
                            label="General Capacity"
                            inputProps={{ maxLength: 25 }}
                            fullWidth
                            onChange={(i) => handleSchoolName(i.target.value)}
                        ></OutlinedInput>
                    </FormControl>

                    <Button onClick={handleClick}>
                        <AddIcon />
                        Create Student
                    </Button>
                </Box>
            </Card>
            
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} >
                <Alert onClose={handleClose} variant="filled" severity={error ? "error" : "success"} sx={{ width: '100%' }}>
                    {error || "Student Updated"}
                </Alert>
            </Snackbar>
        </div>

    )
}
// disatidan eriselim diye
export default CreateStudent;*/}