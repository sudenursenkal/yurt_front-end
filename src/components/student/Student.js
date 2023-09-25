import React, { useState } from "react";
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { deepPurple } from '@mui/material/colors';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Fab from '@mui/material/Fab';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import CreateStudent from "./CreateStudent";
import EditStudent from "./EditStudent";
import { useHistory } from 'react-router-dom'; // useHistory hook'unu içe aktar
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));



function Student(props) {
    const { id, name, surname, phoneNumber, familyNumber, schoolName, street, city, country, addressType, addressDescription, studentIds } = props;

    const [expanded, setExpanded] = useState(false); // expanded ile açik kapali takibi
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    // Düzenleme düğmesine tıklama işlevi
    //const handleEditClick = () => {
    // Öğrenci düzenleme sayfasına yönlendirme yapmak için history.push'i kullanıyoruz.
    //    history.push(`student/update/${id}`); // Student ID'sini kullanarak düzenleme sayfasına yönlendiriyoruz
    // ;

    const history = useHistory();
    const [editOpen, setEditOpen] = React.useState(false);
    const [studentId, setStudentId] = React.useState("");
    const [idInputOpen, setIdInputOpen] = React.useState(false);

    const handleOpenEdit = () => setEditOpen(true);
    const handleEditOpen = () => setEditOpen(true);
    const handleEditClose = () => setEditOpen(false);

    // Öğrenci ID'sini girmek için açma işlevi
    const handleIdInputOpen = () => setIdInputOpen(true);
    const handleIdInputClose = () => setIdInputOpen(false);

    // Öğrenci ID'sini ayarla
    const handleStudentIdChange = (e) => {
        setStudentId(e.target.value);
    };

    const [errorMessage, setErrorMessage] = useState("");
    const [isError, setIsError] = useState(false);

    const handleEditClick = () => {
        if (!studentId) {
            setErrorMessage("Student ID is missing. Please enter a valid Student ID.");
            setIsError(true);

        } else if (!/^\d+$/.test(studentId)) {
            // Eğer studentId bir rakam değilse hata ver
            setErrorMessage("Student ID should be a number.");
            setIsError(true);

        } /*else if (!studentIds.includes(studentId)) {
            alert("Öyle bir öğrenci bulunamadı.");
        }*/ else {
            history.push(`student/update/${studentId}`);
        }
    };


    { /*   const handleEditClick = () => {
        // Kullanıcıdan alınan ID'nin boş veya undefined olup olmadığını kontrol edin
        if (!studentId) {
            console.error("Student ID is missing.");
            alert("Please enter a valid Student ID.");
        } else {
            // Kullanıcının girdiği studentId'yi öğrenci ID'leri ile karşılaştırın
            const studentExists = props.studentIds && props.studentIds.includes(studentId);
            if (studentExists) {
                // Öğrenci düzenleme sayfasına yönlendirme yapmak için history.push'i kullanıyoruz.
                history.push(`student/update/${studentId}`);
            } else {
                alert("Böyle bir öğrenci bulunamadı.");
            }
        }
    };
*/ }





    const handleEditIconClick = () => {
        // Kullanıcıdan alınan ID'nin boş veya undefined olup olmadığını kontrol edin
        if (id) {
            history.push(`student/update/${id}`);
        } else {
            // Öğrenci düzenleme sayfasına yönlendirme yapmak için history.push'i kullanıyoruz.
            console.error("Student ID is missing.");
        }
    };



    const handleButtonClick = () => {
        // Belirli bir URL'ye yönlendirme yapmak için history.push'i kullanabilirsiniz.
        history.push('/createstudent'); // Yönlendirilmek istenen URL
    };


    const handleInfo = () => {
        if (!expanded) {
            console.log("bisi yaz artik")
            console.log("phoneNumber:", phoneNumber);
            console.log("schoolName:", schoolName);
            console.log("addressDescription:", addressDescription);


        } else {
            console.log("dükkani kapadik")

        }

    };



    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <div>
                <Card sx={{ maxWidth: 400, margin: '20px 0', mx: 'auto' }} >
                    <CardHeader
                        avatar={
                            <Avatar sx={{ bgcolor: deepPurple[500] }} >
                                {name.charAt(0).toUpperCase() + surname.charAt(0).toUpperCase()} {/*kullanici isim ilk karakter*/}
                            </Avatar>
                        }
                        title={<Typography variant="h7">{name} {surname}</Typography>}
                        subheader="Student Profile"

                    />

                    <CardActions disableSpacing>
                        <Fab size="small" color="secondary" aria-label="edit" onClick={() => handleEditIconClick(id)}>
                            <EditIcon />
                        </Fab>
                        <Modal
                            open={editOpen}
                            onClose={handleEditClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={style}>
                                <div style={{ maxWidth: "90%", maxHeight: "90vh", overflowY: "auto" }}>
                                    <EditStudent id={id} />
                                </div>
                            </Box>
                        </Modal>
                        
                        <ExpandMore
                            expand={expanded}
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="show more"
                        >
                            <Fab size="small" color="info" >
                                <ExpandMoreIcon onClick={handleInfo} />
                            </Fab>
                        </ExpandMore>
                        <ExpandMore
                        >
                            <Fab size="small" color="error" aria-label="edit">
                                <DeleteIcon /></Fab>

                        </ExpandMore>
                    </CardActions>
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <Typography paragraph>Information: </Typography>
                        <CardContent>
                            <div>Phone Number : {phoneNumber} </div>
                            <div>Family Number : {familyNumber} </div>
                            <div>School Name : {schoolName} </div>
                            <div>Address Info:
                                <div>Street: {street}</div>
                                <div>City: {city}</div>
                                <div>Country: {country}</div>
                                <div>Address Description: {addressDescription}</div>
                                <div>Address Type: {addressType}</div>
                            </div>
                        </CardContent>
                    </Collapse>

                </Card>
            </div>
            <div >
                <Button size="large" variant="contained" color="success" aria-label="add"
                    sx={{ position: 'fixed', bottom: 50, right: 50, zIndex: 'tooltip' }}
                    onClick={handleOpen}>Create A Student</Button>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"

                >
                    <Box sx={style}>
                        <div style={{ maxWidth: "90%", maxHeight: "90vh", overflowY: "auto" }}>
                            <CreateStudent></CreateStudent>
                        </div>
                    </Box>
                </Modal>

            </div>
            <div>
                {/* "Update A Student" butonu */}
                <Button size="large" variant="contained" color="success" aria-label="add"
                    sx={{ position: 'fixed', bottom: 110, right: 50, zIndex: 'tooltip' }}
                    onClick={handleIdInputOpen}>Update A Student</Button>

                {/* EditStudent bileşeni modalı */}
                <Modal
                    open={editOpen}
                    onClose={handleEditClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <div style={{ maxWidth: "90%", maxHeight: "90vh", overflowY: "auto" }}>
                            {/* EditStudent bileşenine öğrenci ID'sini geçiriyoruz */}
                            <EditStudent id={id} />
                        </div>
                    </Box>
                </Modal>

                {/* Öğrenci ID'si girmek için modal */}
                <Modal
                    open={idInputOpen}
                    onClose={handleIdInputClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <div style={{ maxWidth: "90%", maxHeight: "90vh", overflowY: "auto" }}>
                            {/* Öğrenci ID'sini girmek için bir bileşen */}
                            <div>
                                <h2>Enter Student ID</h2>
                                <input type="text" onChange={handleStudentIdChange} />
                                <Button onClick={handleEditClick}>Edit Student</Button>
                            </div>
                        </div>
                    </Box>
                </Modal>

                <Snackbar open={isError} autoHideDuration={6000} onClose={() =>{ setIsError(false); setErrorMessage("");}} >
                    <Alert onClose={() =>{ setIsError(false); setErrorMessage("");}} severity="error" variant="filled" sx={{ width: '100%' }}>
                        {errorMessage}
                    </Alert>
                </Snackbar>


            </div>
        </div>
    )
}
// disatidan eriselim diye
export default Student;