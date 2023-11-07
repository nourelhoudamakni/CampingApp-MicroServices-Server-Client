import Navbar from '../../components/NewNavbar'
import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/Sidebar'
import style from './CampingStyle.module.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function ListCamping() {
    const [isOpen, setIsOpen] = useState(false);
    const [campings, setCampings] = useState([]);
    const toggle = () => {
        setIsOpen(!isOpen)
    }

    const navigate=useNavigate();

    const deleteCamping=(id)=>{ 
        axios.delete(`http://localhost:8084/camping/delete/${id}`);
        axios.get("http://localhost:8084/camping").then((response)=>{ 
            setCampings(response.data);
           })
    }

    useEffect(()=>{
      axios.get("http://localhost:8084/camping").then((response)=>{ 
       setCampings(response.data);
      })
    })



    return (
        <>
        <Sidebar isOpen={isOpen} toggle={toggle} />
        <Navbar toggle={toggle} />
        <div className={style.fullScreen}>
            <div className={style.overlay}></div>
        </div>
        <div className={`container  ${style.AddResContainer}`}> 
            <div className={style.AddResContent}>
                <h1 className={style.welcomeText}>List of Campings</h1>
                <div className=' pt-4'></div>
                <table className="table mb-4 text-white" style={{ "--bs-table-color": "initial", "--bs-table-bg": "initial" }}>
                    <thead>
                        <tr>
                            <th scope="col">Camping </th>
                            <th scope="col">Camping Title</th>
                            <th scope="col">Description</th>
                            <th scope="col">Capacity</th>
                            <th scope="col">price</th> 
                            <th scope="col">Actions </th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {campings.map((camping,index)=>(
                        <tr key={index}>
                            <th scope="row" className='align-middle'> <img src={`data:image/png;base64, ${camping.image}`} alt="Camping" style={{width:"90px"}}/></th>
                            <td className='align-middle'>{camping.titre}</td>
                             <td className='align-middle'>{camping.description}</td>
                            <td className='align-middle'>{camping.capacity}</td>
                            <td className='align-middle'>{camping.price} $</td>
                            <td>
                                <button className={`${style.AddResButton} ${style.CancelButton}`} onClick={()=>{deleteCamping(camping.id)}}>Delete</button>
                            </td>
                            <td>
                                <button className={`${style.AddResButton} ${style.UpdateButton}`} onClick={()=>{navigate(`/UpdateCamping/${camping.id}`)}}>Update</button>
                            </td>
                        </tr>))}
                    </tbody>
                </table>
            </div>
        </div>
        </>
    );
}

export default ListCamping;
