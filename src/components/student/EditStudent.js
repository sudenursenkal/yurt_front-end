import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import Card from '@mui/material/Card';
import OutlinedInput from '@mui/material/OutlinedInput';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import EditIcon from '@mui/icons-material/Edit';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';


const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function EditStudent() {
    const { id } = useParams();


    const [studentData, setStudentData] = useState({
        name: "",
        surname: "",
        identityNumber: "",
        phoneNumber: "",
        familyNumber: "",
        addressId: "",
        addressCreateRequest: {
            street: "",
            city: "",
            country: "",
            addressDescription: ""
        },
        schoolName: "",
    });



    const [open, setOpen] = React.useState(false);
    const [error, setError] = React.useState("");

    // Input değeri için state tanımlayın
    const [inputValue, setInputValue] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputValue(value);
        // Eğer değer tanımlı değilse, varsayılan bir değerle değiştir
        setStudentData((prevData) => ({
            ...prevData,
            [name]: value || "" // Varsayılan boş bir değer
        }));
    };

    useEffect(() => {
        fetch(`/student/${id}`)
            .then((response) => response.json())
            .then((data) => {
                if (data) {
                    setStudentData({
                        ...data,
                        addressCreateRequest: {
                            ...data.addressCreateRequest
                        }
                    });

                    // Öğrenci verileri alındıktan sonra addressId'yi kullanarak adres bilgilerini çekin
                    const addressId = data.addressId;
                    fetch(`/address/${addressId}`)
                        .then((addressResponse) => addressResponse.json())
                        .then((addressData) => {
                            setStudentData((prevData) => ({
                                ...prevData,
                                ...addressData,
                                addressCreateRequest: {
                                    ...prevData.addressCreateRequest,
                                    ...addressData.addressCreateRequest
                                }
                            }));
                        })
                        .catch((addressError) => {
                            console.error('Error fetching address data:', addressError);
                        });
                }
            })
            .catch((error) => {
                console.error('Error fetching student data:', error);
            });
    }, [id]);




    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setStudentData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleClick = () => {
        const {
            name,
            surname,
            identityNumber,
            phoneNumber,
            familyNumber,
            addressCreateRequest,
            addressId,
            schoolName,
        } = studentData;

        if (!name || !surname || !identityNumber || !phoneNumber || !familyNumber || !schoolName) {
            setError("Please complete all required fields.");
            setOpen(true);
        } else {
            updateStudent();
        }
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const updateStudent = () => {
        fetch(`/student/update/${id}`, { 
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(studentData)
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('HTTP error! ' + response.status);
                }
                return response.json();
            })
            .then((data) => {
                setOpen(true);
                setError("");
            })
            .catch((error) => {
                console.error('Error fetching student data:', error);
                // Hata mesajını görüntüle
                setError("An error occurred while fetching student data.");
                setOpen(true);
            });

    };
    const [isAddressEditOpen, setAddressEditOpen] = useState(false);

    // AddressEdit bileşenini açma işlevi
    const openAddressEdit = () => {
        setAddressEditOpen(true);
    };

    // AddressEdit bileşenini kapatma işlevi
    const closeAddressEdit = () => {
        setAddressEditOpen(false);
    };


    return (
        <Card sx={{ maxWidth: 345, margin: '20px 0', mx: 'auto' }}>
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
            >
                <h3>Edit Student</h3>
                <FormControl fullWidth sx={{ m: 1 }}>
                    <InputLabel htmlFor="name">Name</InputLabel>
                    <OutlinedInput
                        name="name"
                        id="name"
                        label="Name"
                        inputProps={{ maxLength: 25 }}
                        fullWidth
                        value={studentData.name}
                        onChange={handleInputChange}
                    /></FormControl>

                <FormControl fullWidth sx={{ m: 1 }}>
                    <InputLabel >Surname</InputLabel>
                    <OutlinedInput
                        name="surname"
                        label="Surname"
                        inputProps={{ maxLength: 25 }}
                        fullWidth
                        value={studentData.surname}
                        onChange={handleInputChange}
                    /></FormControl>

                <FormControl fullWidth sx={{ m: 1 }}>
                    <InputLabel >Identity Number</InputLabel>
                    <OutlinedInput
                        name="identityNumber"
                        label="Identity Number"
                        inputProps={{ maxLength: 11 }}
                        fullWidth
                        value={studentData.identityNumber}
                        onChange={handleInputChange}
                    /></FormControl>

                <FormControl fullWidth sx={{ m: 1 }}>
                    <InputLabel>Phone Number</InputLabel>
                    <OutlinedInput
                        name="phoneNumber"
                        label="Phone Number"
                        inputProps={{ maxLength: 25 }}
                        fullWidth
                        value={studentData.phoneNumber}
                        onChange={handleInputChange}
                    /></FormControl>

                <FormControl fullWidth sx={{ m: 1 }}>
                    <InputLabel>Family Phone Number</InputLabel>
                    <OutlinedInput
                        name="familyNumber"
                        label="Family Phone Number"
                        inputProps={{ maxLength: 25 }}
                        fullWidth
                        value={studentData.familyNumber}
                        onChange={handleInputChange}
                    />
                </FormControl>

                <FormControl fullWidth sx={{ m: 1 }}>
                    <InputLabel>Country</InputLabel>
                    <OutlinedInput
                        label="Country"
                        inputProps={{ maxLength: 25 }}
                        fullWidth
                        value={studentData.country}
                        startAdornment={<InputAdornment position="start"></InputAdornment>}

                        onChange={handleInputChange}
                    /></FormControl>

                <FormControl fullWidth sx={{ m: 1 }}>
                    <InputLabel>City</InputLabel>
                    <OutlinedInput
                        name="city"
                        label="City"
                        inputProps={{ maxLength: 25 }}
                        fullWidth
                        value={studentData.city}
                        startAdornment={<InputAdornment position="start"></InputAdornment>}

                        onChange={handleInputChange}
                    /></FormControl>

                <FormControl fullWidth sx={{ m: 1 }}>
                    <InputLabel>Street</InputLabel>
                    <OutlinedInput
                        label="Street"
                        inputProps={{ maxLength: 25 }}
                        fullWidth
                        value={studentData.street}
                        startAdornment={<InputAdornment position="start"></InputAdornment>}

                        onChange={handleInputChange}
                    /></FormControl>

                <FormControl fullWidth sx={{ m: 1 }}>
                    <InputLabel htmlFor="addressDescription">Address Description</InputLabel>
                    <OutlinedInput
                        name="addressDescription"
                        id="addressDescription"
                        label="Address Description"
                        inputProps={{ maxLength: 250 }}
                        fullWidth
                        startAdornment={<InputAdornment position="start"></InputAdornment>}
                        multiline
                        rows={2}
                        value={studentData.addressDescription}
                        onChange={handleInputChange}
                    />
                </FormControl>

                <FormControl fullWidth sx={{ m: 1 }}>
                    <InputLabel>School Name</InputLabel>
                    <OutlinedInput
                        label="School Name"
                        name="schoolName"
                        inputProps={{ maxLength: 25 }}
                        fullWidth
                        value={studentData.schoolName}
                        onChange={handleInputChange}
                    />
                </FormControl>



                <Button onClick={handleClick}>
                    <EditIcon />
                    Update Student
                </Button>
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} >
                    <Alert onClose={handleClose} severity={error ? "error" : "success"} sx={{ width: '100%' }}>
                        {error || "Student Updated"}
                    </Alert>
                </Snackbar>
            </Box>
        </Card>
    )
}

export default EditStudent;
