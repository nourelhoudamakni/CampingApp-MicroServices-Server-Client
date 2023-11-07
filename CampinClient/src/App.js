import './App.css';
import Signup from './pages/Auth/signUpPage'
import Signin from './pages/Auth/LoginScreen'
import { Routes , Route } from 'react-router-dom';
import Home from './pages/Home/index'
import AddReservation from './pages/Reservation/AddReserVation';
import ListReservations from './pages/Reservation/ListReservations';
import AddOffrePlat from './pages/OffrePlat/AddOffrePlat';
import ListOffrePlat from './pages/OffrePlat/ListOffrePlat'
import UpdateOffrePlat from './pages/OffrePlat/UpdateOffrePlat'
import UpdateReservation from './pages/Reservation/UpdateReservation';
import AddCamping from './pages/Camping/AddCamping';
import ListCamping from './pages/Camping/ListCamping';
import UpdateCamping from './pages/Camping/UpdateCamping';
import AddProgram from './pages/Program/AddProgram';
import ListPrograms from './pages/Program/ListPrograms';
import UpdateProgram from './pages/Program/UpdateProgram';
import AddAvis from './pages/Avis/AddAvis';
import ListAvis from './pages/Avis/ListAvis';
import Updatereview from './pages/Avis/UpdateAvis';

function App() {
  return (
    <>
    
    <Routes>
    <Route path='/' element={<Home></Home>} ></Route>
      <Route path='/Signup' element={<Signup></Signup>} ></Route>
      <Route path='/Signin' element={<Signin></Signin>} ></Route>
      <Route path='/AddReservation' element={<AddReservation></AddReservation>} ></Route>
      <Route path='/AddCamping' element={<AddCamping></AddCamping>} ></Route>
      <Route path='/Campings' element={<ListCamping></ListCamping>} ></Route>
      <Route path='/ListReservations' element={<ListReservations></ListReservations>} ></Route>
      <Route path='/AddOffrePlat' element={<AddOffrePlat></AddOffrePlat>} ></Route>
      <Route path='/ListOffrePlat' element={<ListOffrePlat></ListOffrePlat>} ></Route>
      <Route path='/UpdateOffrePlat/:id' element={<UpdateOffrePlat></UpdateOffrePlat>} ></Route>
      <Route path='/UpdateReservation/:id' element={<UpdateReservation></UpdateReservation>} ></Route>
      <Route path='/UpdateCamping/:campingId' element={<UpdateCamping></UpdateCamping>} ></Route>
      <Route path='/AddProgram' element={<AddProgram></AddProgram>} ></Route>
      <Route path='/ListPrograms' element={<ListPrograms></ListPrograms>} ></Route>
      <Route path='/UpdateProgram/:id' element={<UpdateProgram></UpdateProgram>} ></Route>
      <Route path='/AddAvis' element={<AddAvis></AddAvis>} ></Route>
      <Route path='/ListAvis' element={<ListAvis></ListAvis>} ></Route>
      <Route path='/updateavis/:idAvis' element={<Updatereview></Updatereview>} ></Route>
      
    </Routes> 
  
  
  
   </>
  );
}

export default App;
