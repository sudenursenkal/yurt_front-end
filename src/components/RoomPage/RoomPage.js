import React from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function RoomPage(props) {
    const { roomInfo } = props;

    console.log("RoomPage bileşeni oluşturuldu. roomInfo:", roomInfo);

    if (!roomInfo) {
        console.log("roomInfo yükleniyor...");
        return <div>Loading...</div>;
    }

    // API yanıtındaki veri yapısına uygun şekilde verilere erişin
    const { name, room, roomType, instantRoomCapacity, price } = roomInfo;

    return (
        <div>
            Room

            <Card sx={{ maxWidth: 345 }}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        name: {name}- id:{room.id}- room number:{room.roomNumber}- dormitory id:{room.dormitoryId} - room type:{roomType} -instant room capacity:{instantRoomCapacity} - price:{price}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">Share</Button>
                    <Button size="small">Learn More</Button>
                </CardActions>
            </Card>

        </div>
    )
}


export default RoomPage;
