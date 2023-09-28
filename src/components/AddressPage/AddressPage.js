import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';


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
      <h3>Address</h3>
      <div  style={{ marginLeft: '120px', marginRight: '120px',marginTop: '40px', display: 'flex', justifyContent: 'center', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)' }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Address Type</StyledTableCell>
                <StyledTableCell align="right">Country</StyledTableCell>
                <StyledTableCell align="right">City</StyledTableCell>
                <StyledTableCell align="right">Street</StyledTableCell>
                <StyledTableCell align="right">addressDescription</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {addressData.map((address) => (
                <StyledTableRow
                  key={address.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <StyledTableCell component="th" scope="row">
                    {address.addressType}
                  </StyledTableCell>
                  <StyledTableCell align="right">{address.country}</StyledTableCell>
                  <StyledTableCell align="right">{address.city}</StyledTableCell>
                  <StyledTableCell align="right">{address.street}</StyledTableCell>
                  <StyledTableCell align="right">{address.addressDescription}</StyledTableCell>
                </StyledTableRow>

              ))}

            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div >
  );
}

export default AddressPage;
