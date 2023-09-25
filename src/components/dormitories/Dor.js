import React, { useState, useEffect } from "react";

function  Dor() {
    const [error, setError] = useState(null); // en basta error olmaz o yüzden null
    const [isLoaded, setIsLoaded] = useState(false); //en basta  false durumundadir data
    const [dormitoryList, setDormitoryList] = useState([]);

    const refreshDormitory = () => {
        fetch("/dormitory", { mode: 'cors' })
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
    }
    useEffect(() => { // liste yenilendiğinde ekrana dusmesini saglayacak
        refreshDormitory()
    }, []);


    if (error) {
        return <div>Error: {error.message} </div>;
    } else if (!isLoaded) {
        return <div>loading...</div>;
    } else {
        return (
            <ul>
                {dormitoryList.map(dormitory => (
                    <li  key={dormitory.id}>
                        {dormitory.id}-
                        {dormitory.name}-
                        {dormitory.address_id}-
                        {dormitory.general_capacity}
                    </li>

                ))}
            </ul>
        );
    }
}
// disatidan eriselim diye
export default Dor;