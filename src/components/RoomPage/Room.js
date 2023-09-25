import React, { useState, useEffect } from "react";
import RoomPage from "../RoomPage";
import axios from 'axios';

function Room() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [roomFullList, setRoomFullList] = useState([]);

    const refreshRoom = () => {
        axios.get("/room/room-info", { crossdomain: true })
            .then(response => {
                setRoomFullList(response.data);
                setIsLoaded(true);
            })
            .catch(error => {
                setError(error);
                setIsLoaded(true);
            });
    }

    useEffect(() => {
        refreshRoom();
    }, []);

    if (error) {
        return <div>Error: {error.message}</div>; // Hata durumunda hata mesajını görüntüle
    } else if (!isLoaded) {
        return <div>Loading...</div>; // Veriler yüklenmediyse yükleme mesajını görüntüle
    } else {
        return (
            <div>
            {error ? (
                <div>Error: {error.message}</div> // Hata durumunda hata mesajını görüntüle
            ) : !isLoaded ? (
                <div>Loading...</div> // Veriler yüklenmediyse yükleme mesajını görüntüle
            ) : (
                <div>
                    {roomFullList.map(roomInfo => (
                        <RoomPage
                            key={roomInfo.room.id}
                            roomInfo={roomInfo}
                        />
                    ))}
                </div>
            )}
        </div>
        );
    }
}

export default Room;
