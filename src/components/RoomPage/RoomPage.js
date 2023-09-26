import React, { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


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
                console.log("Room Data:", result);
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
            Room
            <div style={{ marginLeft: '120px', marginRight: '120px', marginTop: '40px', display: 'flex', justifyContent: 'center' }}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Dormitory Name</TableCell>
                                <TableCell align="right">Room Number</TableCell>
                                <TableCell align="right">Room Type</TableCell>
                                <TableCell align="right">Instant Room Capacity</TableCell>
                                <TableCell align="right">Price</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {roomData.map((roomInfo) => (
                                <TableRow
                                    key={roomInfo.room.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {roomInfo.name}
                                    </TableCell>
                                    <TableCell align="right">{roomInfo.room.roomNumber}</TableCell>
                                    <TableCell align="right">{roomInfo.roomType}</TableCell>
                                    <TableCell align="right">{roomInfo.instantRoomCapacity}</TableCell>
                                    <TableCell align="right">{roomInfo.price}</TableCell>
                                </TableRow>

                            ))}

                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div >
    );
}
export default RoomPage;
