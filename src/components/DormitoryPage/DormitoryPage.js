import React, { useState, useEffect } from "react";
import Button from '@mui/material/Button';
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
  transform: expand ? 'rotate(180deg)' : 'rotate(0deg)', // Açıldığında dönsün
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

function DormitoryPage() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [dormitoryData, setDormitoryData] = useState([]);
  const [expanded, setExpanded] = useState({}); // Her kart için ayrı bir expanded durumu

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
        console.log("Dormitory Data:", result);
        setDormitoryData(result);
        // Tüm kartlar için başlangıçta kapalı olarak ayarlayın
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
      [id]: !prevExpanded[id], // Kartın durumunu tersine çevirin
    }));
  };

  const handleInfo = () => {
    if (!expanded) {
      console.log("bisi yaz artik");
    } else {
      console.log("dükkani kapadik");
    }
  };

  return (
    <div>
      Dormitory
      {dormitoryData.map((dormitory) => (
        <Card
          key={dormitory.id}
          sx={{ maxWidth: 400, margin: "20px 0", mx: "auto" }}
        >
          <CardHeader
            title={
              <Typography variant="h7">
                {dormitory.name}
              </Typography>
            }
          />

          <CardActions disableSpacing>
            <ExpandMore
              expand={expanded[dormitory.id]} // Kartın durumunu kullanın
              onClick={() => handleExpandClick(dormitory.id)} // Doğru kartı açmak için id'yi kullanın
              aria-expanded={expanded[dormitory.id]}
              aria-label="show more"
            >
              <Fab size="small" color="info">
                <ExpandMoreIcon onClick={handleInfo} />
              </Fab>
            </ExpandMore>
          </CardActions>

          <Collapse in={expanded[dormitory.id]} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph>Info:</Typography>
              <div variant="body2" color="text.secondary">
                {`${dormitory.name}'s info: ${dormitory.address_id}`}
              </div>
            </CardContent>
          </Collapse>
        </Card>
      ))}
       {/*<Modal
                    open={editOpen}
                    onClose={handleEditClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <div style={{ maxWidth: "90%", maxHeight: "90vh", overflowY: "auto" }}>
                            {/* EditStudent bileşenine öğrenci ID'sini geçiriyoruz }
                            <EditDormitory id={id} />
                        </div>
                    </Box>
                </Modal>*/}
    </div>
  );
}

export default DormitoryPage;
