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


function AddressPage() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [addressData, setAddressData] = useState([]);
  const [expanded, setExpanded] = React.useState(false); // Doğru sıralama

  useEffect(() => {
    fetch("/address")
      .then((res) => {
        if (!res.ok) {
          throw new Error("HTTP hata! " + res.status);
        }
        return res.json();
      })
      .then((result) => {
        setIsLoaded(true);
        console.log("Address Data:", result);
        setAddressData(result);
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
      Address
      <div  style={{ marginLeft: '120px', marginRight: '120px',marginTop: '40px', display: 'flex', justifyContent: 'center' }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Address Type</TableCell>
                <TableCell align="right">Country</TableCell>
                <TableCell align="right">City</TableCell>
                <TableCell align="right">Street</TableCell>
                <TableCell align="right">addressDescription</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {addressData.map((address) => (
                <TableRow
                  key={address.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {address.addressType}
                  </TableCell>
                  <TableCell align="right">{address.country}</TableCell>
                  <TableCell align="right">{address.city}</TableCell>
                  <TableCell align="right">{address.street}</TableCell>
                  <TableCell align="right">{address.addressDescription}</TableCell>
                </TableRow>

              ))}

            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div >
  );
}

export default AddressPage;
