import React, { useState, useEffect } from "react";
import DormitoryPage from "../DormitoryPage/DormitoryPage";

function  Dormitory() {
    const [error, setError] = useState(null); // en basta error olmaz o yüzden null
    const [isLoaded, setIsLoaded] = useState(false); //en basta  false durumundadir data
    const [dormitoryList, setDormitoryList] = useState([]);

 
    useEffect(() => { // liste yenilendiğinde ekrana dusmesini saglayacak
        fetch("/dormitory")
            .then(res => {
                if (!res.ok) {
                    throw new Error('HTTP hata! ' + res.status);
                }
                return res.json();
            })
            .then(result => {
                setIsLoaded(true);
                setDormitoryList(result);
            })
            .catch(error => {
                setIsLoaded(true);
                setError(error);
            });
    }, []);


    if (error) {
        return <div>Error: {error.message} </div>;
    } else if (!isLoaded) {
        return <div>loading...</div>;
    } else {
        return (
            <div>
                {dormitoryList.map(dormitory => (
                    <DormitoryPage key={dormitory.id}
                    id ={dormitory.id}
                    name= {dormitory.name}
                    address_id={dormitory.address_id}
                    general_capacity={dormitory.general_capacity}
                    ></DormitoryPage>

                ))}
            </div>
        );
    }
}
// disatidan eriselim diye
export default Dormitory;
