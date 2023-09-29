import React, { useState, useEffect } from "react";
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Fab from '@mui/material/Fab';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  marginLeft: 'auto',
}));

function DormitoryPage() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [dormitoryData, setDormitoryData] = useState([]);
  const [expanded, setExpanded] = useState({});

  useEffect(() => {
    fetch("/dormitory")
      .then((res) => {
        if (!res.ok) {
          throw new Error("HTTP hata! " + res.status);
        }
        return res.json();
      })
      .then((result) => {
        setIsLoaded(true);
        setDormitoryData(result);
        const initialExpanded = {};
        result.forEach((dormitory) => {
          initialExpanded[dormitory.id] = false;
        });
        setExpanded(initialExpanded);
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

  const handleExpandClick = (id) => {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [id]: !prevExpanded[id],
    }));
  };

  return (
    <div>
      <h3> Dormitory </h3>
      {dormitoryData.map((dormitory) => (
        <Card
          key={dormitory.id}
          sx={{ maxWidth: 400, margin: "20px 0", mx: "auto", boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)' }}
        >
          <CardHeader
            title={
              <Typography variant="h7">
                {dormitory.name}
              </Typography>
            }
          />

          <CardActions disableSpacing style={{ display: 'grid', placeItems: 'center' }}>
            <Fab size="small" sx={{background: 'linear-gradient(45deg, rgba(20,56,162,1) 18%, rgba(29,188,253,1) 69%, rgba(101,250,246,1) 87%)', color: 'white'}} onClick={() => handleExpandClick(dormitory.id)}>
              <ExpandMoreIcon />
            </Fab>
          </CardActions>

          <Collapse in={expanded[dormitory.id]} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph>Info:</Typography>
              <div variant="body2" color="text.secondary">
                {`${dormitory.name}'s address id: ${dormitory.address_id}`}
              </div>
              <div>{`Dormitory capacity: ${dormitory.general_capacity}`}</div>
            </CardContent>
          </Collapse>
        </Card>
      ))}
    </div>
  );
}

export default DormitoryPage;
