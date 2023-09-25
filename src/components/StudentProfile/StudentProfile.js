import React, { useState, useEffect } from "react";
import Student from "../student/Student";

function StudentProfile() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [studentList, setStudentList] = useState([]);
    const [studentIds, setStudentIds] = useState([]); // studentIds'i tanımlayın ve ayarlayın

    const refreshStudent = () => {
        fetch("/student/student-info", { mode: 'cors' })
            .then(res => {
                if (!res.ok) {
                    throw new Error('HTTP hata! ' + res.status);
                }
                return res.json();
            })
            .then(result => {
                setIsLoaded(true);
                setStudentList(result);
                const ids = result.map(studentInfo => studentInfo.student.id);
                setStudentIds(ids); // studentIds'i güncelleyin
            })
            .catch(error => {
                setIsLoaded(true);
                setError(error);
            });
    }

    useEffect(() => {
        refreshStudent()
    }, []);

    if (error) {
        return <div>Error: {error.message} </div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <div>
                {studentList.map(studentInfo => (
                    <Student
                        key={studentInfo.student.id}
                        id={studentInfo.student.id}
                        name={studentInfo.student.name}
                        surname={studentInfo.student.surname}
                        phoneNumber={studentInfo.student.phoneNumber}
                        familyNumber={studentInfo.student.familyNumber}
                        addressId={studentInfo.student.addressId}
                        schoolName={studentInfo.student.schoolName}
                        street={studentInfo.street}
                        city={studentInfo.city}
                        country={studentInfo.country}
                        addressDescription={studentInfo.addressDescription}
                        addressType={studentInfo.addressType}
                        studentIds={studentIds} // studentIds'i Student bileşenine geçirin
                    ></Student>
                ))}
            </div>
        );
    }
}

export default StudentProfile;
