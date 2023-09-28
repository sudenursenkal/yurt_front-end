import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import NavBar from "../NavBar/NavBar";


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.primary.light, // Açık mavi rengi
      color: theme.palette.primary.contrastText, // Başlık hücrelerinin metin rengi
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14, // Hücrelerin metin boyutu
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      
      '&:hover': {
        backgroundColor: '#e1bee7', // Tek sıradaki arka plan rengi hafifçe koyulaşsın
      },
    },
    '&:nth-of-type(even)': {
      backgroundColor: '#e3f2fd', // Çift sıradaki arka plan rengi (normal mavi)
      '&:hover': {
        backgroundColor: '#f3e5f5', // Çift sıradaki arka plan rengi hafifçe koyulaşsın
      },
    },
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
  
  
function RoomPage() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [roomData, setRoomData] = useState([]);
    const [expanded, setExpanded] = React.useState(false); // Doğru sıralama

    useEffect(() => {
        fetch("/room/room-info")
            .then((res) => {
                if (!res.ok) {
                    throw new Error("HTTP hata! " + res.status);
                }
                return res.json();
            })
            .then((result) => {
                setIsLoaded(true);
                setRoomData(result);
            })
            .catch((error) => {
                setIsLoaded(true);
                setError(error);
            });
    }, []);

    if (!isLoaded) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <div>
            <h3>Room</h3>
            <div style={{ marginLeft: '120px', marginRight: '120px', marginTop: '40px', display: 'flex', justifyContent: 'center', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)' }}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Dormitory Name</StyledTableCell>
                                <StyledTableCell align="right">Room Number</StyledTableCell>
                                <StyledTableCell align="right">Room Type</StyledTableCell>
                                <StyledTableCell align="right">Instant Room Capacity</StyledTableCell>
                                <StyledTableCell align="right">Price</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {roomData.map((roomInfo) => (
                                <StyledTableRow
                                    key={roomInfo.room.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <StyledTableCell component="th" scope="row">
                                        {roomInfo.name}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">{roomInfo.room.roomNumber}</StyledTableCell>
                                    <StyledTableCell align="right">{roomInfo.roomType}</StyledTableCell>
                                    <StyledTableCell align="right">{roomInfo.instantRoomCapacity}</StyledTableCell>
                                    <StyledTableCell align="right">{roomInfo.price}</StyledTableCell>
                                </StyledTableRow>

                            ))}

                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div >
    );
}
export default RoomPage;
