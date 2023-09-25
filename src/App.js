import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home/Home';
import StudentProfile from './components/StudentProfile/StudentProfile';
import NavBar from './components/NavBar/NavBar'
import DormitoryPage from './components/DormitoryPage/DormitoryPage';
import './App.css'
import RoomPage from './components/RoomPage/RoomPage';
import CreateStudent from "./components/student/CreateStudent.js";
import Address from './components/AddressPage/Address';
import EditStudent from "./components/student/EditStudent";

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar></NavBar>
        <Switch>
          <Route exact path='/' component={Home}></Route>
          <Route exact path = '/dormitory' component={DormitoryPage}></Route>
          <Route exact path = '/room' component={RoomPage}></Route>
          <Route exact path='/student' component={StudentProfile}></Route>
          <Route path="/student/update/:id" component = {EditStudent}/>
          <Route exact path='/createstudent' component={CreateStudent}></Route>
          <Route exact path='/address' component={Address}></Route>
        </Switch>
      </Router>
      </div>
  );
}

export default App;
