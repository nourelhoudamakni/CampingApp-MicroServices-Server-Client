import Navbar from '../../components/NewNavbar'
import React, { useState, useEffect } from 'react'
import Sidebar from '../../components/Sidebar'
import style from './AddReservation.module.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function ListReservations() {
    const [isOpen, setIsOpen] = useState(false);
    const [reservations, setReservations] = useState([]); 

        const navigate = useNavigate();

    const toggle = () => {
        setIsOpen(!isOpen);
    }

    const changeDate=(timestamp)=>{
        const date = new Date(timestamp);
        const formattedDate = date.toISOString().split('T')[0];
        return formattedDate;
    }

    const deleteRes=(id)=>{
        axios.delete(`http://localhost:8556/reservations/deleteReservation/${id}`).then(()=>{
            fetch('http://localhost:8556/reservations/getAllReservations')
            .then(response => response.json())
            .then(data => {
                setReservations(data); 
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
        })
    }

    useEffect(() => {
        fetch('http://localhost:8556/reservations/getAllReservations')
            .then(response => response.json())
            .then(data => {
                setReservations(data); 
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <>
            <Sidebar isOpen={isOpen} toggle={toggle} />
            <Navbar toggle={toggle} />
            <div className={style.fullScreen}>
                <div className={style.overlay}></div>
            </div>
            <div className={`container ${style.AddResContainer}`}>
                <div className={style.AddResContent}>
                    <h1 className={style.welcomeText}>List of reservations</h1>
                    <div className='pt-4'></div>
                    <table className="table mb-4 text-white" style={{ "--bs-table-color": "initial", "--bs-table-bg": "initial" }}>
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Number of participants</th>
                                <th scope="col">Start date</th>
                                <th scope="col">End date</th>
                                <th scope="col">Payment status</th>
                                <th scope="col">Delete</th>
                                <th scope="col">Update</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reservations.map((reservation, index) => (
                                <tr key={index}>
                                    <th scope="row" className='align-middle'>{index + 1}</th>
                                    <td className='align-middle'>{reservation.nbPersonnes}</td>
                                    <td className='align-middle'>{changeDate(reservation.dateArrive)}</td>
                                    <td className='align-middle'>{changeDate(reservation.dateFin)}</td>
                                    <td className='align-middle'>{reservation.statutDePaiement}</td>
                                    <td>
                                        <button className={`${style.AddResButton} ${style.CancelButton}`} onClick={()=>deleteRes(reservation.id)}>Delete</button>
                                    </td>
                                    <td>
                                        <button className={`${style.AddResButton} ${style.UpdateButton}`} onClick={()=>{navigate(`/UpdateReservation/${reservation.id}`)}}>Update</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default ListReservations;
