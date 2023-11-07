import Navbar from '../../components/NewNavbar'
import React, { useState } from 'react'
import Sidebar from '../../components/Sidebar'
import style from './AddReservation.module.css'
import axios from 'axios'
import { validation } from '../../components/Validation/Validation';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';

function AddReservation() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const navigate = useNavigate();
    const [dateFin, setDateFin] = useState('');
    const [dateArrive, setDateArrive] = useState('');
    const [nbPersonnes, setNbPersonnes] = useState('');
    const [statutDePaiement, setStatutDePaiement] = useState('Unpaid');
    
    


    const [isOpen, setIsOpen] = useState(false)
    const toggle = () => {
        setIsOpen(!isOpen)
    }

    const AddRes = async() => {
        if (!dateArrive || !dateFin) {
            console.error("Date Arrive and Date Fin are required.");
            return;
        }

        

        await axios.post('http://localhost:8556/reservations/createReservation',
            {
                dateArrive: dateArrive,
                dateFin: dateFin,
                nbPersonnes: nbPersonnes,
                statutDePaiement: statutDePaiement,
            }
        ).then((response) => {
            console.log(response.data);
            navigate('/ListReservations');
        }).catch((errors) => {
            console.log(errors)
        })
    }

    return (
        <>
            <Sidebar isOpen={isOpen} toggle={toggle} />
            <Navbar toggle={toggle} />
            <div className={style.fullScreen}>
                <div className={style.overlay}></div>

            </div>
            <div className={style.AddResContainer}>
                <div className={style.AddResContent}>
                    <h1 className={style.welcomeText}>Add a new Reservation</h1>
                    <form className={style.AddResForm} onSubmit={handleSubmit(AddRes)}>
                        <input type="text" name='nbPersonnes' placeholder="Number of participants" className={style.inputField} onChange={(e) => setNbPersonnes(e.target.value)} />
                        <input type="date" name='dateArrive' placeholder="Start date" className={style.Datefield} onChange={(e) => setDateArrive(e.target.value)} />
                        <input type="date" name='dateFin' placeholder="End date" className={style.Datefield} onChange={(e) => setDateFin(e.target.value)} />
                        <select
                            name="statutDePaiement"
                            className={style.Datefield}
                            onChange={(e) => setStatutDePaiement(e.target.value)}
                        >
                            <option value="unpaid">Unpaid</option>
                            <option value="paid">Paid</option>
                        </select>

                        <div className='d-flex '>
                            <button type="button" className={`${style.AddResButton} ${style.CancelButton}`} onClick={()=>navigate('/')}>Cancel</button>
                            <button type="submit" className={style.AddResButton}>Add reservation</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default AddReservation;