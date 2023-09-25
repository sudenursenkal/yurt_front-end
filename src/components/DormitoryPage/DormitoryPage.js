import React, { useState, useEffect } from "react";
import Dor from "../dormitories/Dor";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function DormitoryPage(props) {
  const { name, address_id, general_capacity } = props;

  const [error, setError] = useState(null); // en başta error null olmalıdır
  const [isLoaded, setIsLoaded] = useState(false); // en başta false durumundadır data
  const [dormitoryList, setDormitoryList] = useState([]);

  const [dormitoryData, setDormitoryData] = useState({
    id: "",
    name: "",
    address_id: "",
    phoneNumber: "",
    general_capacity: ""
  });

  useEffect(() => { // liste yenilendiğinde ekrana düşmesini sağlayacak
    fetch("/dormitory")
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          setDormitoryData({
            ...data
          });
        }
      });
  }, []);

  return (
    <div>
      Dormitory

      <div>
        name:{name} - addressId:{address_id} - generalCapacity:{general_capacity}
      </div>
      <Card sx={{ maxWidth: 345 }}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Name:{dormitoryData.name} 
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <Dor></Dor>
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Share</Button>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    </div>
  );
}

export default DormitoryPage;
