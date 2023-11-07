import Navbar from '../../components/NewNavbar'
import React, { useState,useEffect } from 'react'
import Sidebar from '../../components/Sidebar'
import style from './AddReservation.module.css'
import axios from 'axios'
import { validation } from '../../components/Validation/Validation';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

function UpdateReservation() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const {id} = useParams();
    

    const navigate = useNavigate();
    const [dateFin, setDateFin] = useState('');
    const [dateArrive, setDateArrive] = useState('');
    const [nbPersonnes, setNbPersonnes] = useState('');
    const [statutDePaiement, setStatutDePaiement] = useState('');
    const [formatteddateArrive, setFormatteddateArrive] = useState('');
    const [formatteddateFin, setFormatteddateFin] = useState('');
    
    
    useEffect(() => {
        axios.get(`http://localhost:8556/reservations/getReservationById/${id}`)
            .then((response) => {
                console.log(response.data)
                setDateFin(response.data.dateFin); 
                setDateArrive(response.data.dateArrive); 
                setNbPersonnes(response.data.nbPersonnes); 
                setStatutDePaiement(response.data.statutDePaiement); 
                const date1 = new Date(dateArrive);
                setFormatteddateArrive(date1.toISOString().split('T')[0]);

        const date2 = new Date(dateFin);
        setFormatteddateFin(date2.toISOString().split('T')[0]);
        console.log(formatteddateFin);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);


    const [isOpen, setIsOpen] = useState(false)
    const toggle = () => {
        setIsOpen(!isOpen)
    }

    const AddRes = async() => {
        if (!dateArrive || !dateFin) {
            console.error("Date Arrive and Date Fin are required.");
            return;
        }

        

        await axios.put(`http://localhost:8556/reservations/updateReservation/${id}`,
            {
                dateArrive: formatteddateArrive,
                dateFin: formatteddateFin,
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
                    <h1 className={style.welcomeText}>Update Reservation</h1>
                    <form className={style.AddResForm} onSubmit={handleSubmit(AddRes)}>
                        <input type="text" name='nbPersonnes' value={nbPersonnes} placeholder="Number of participants" className={style.inputField} onChange={(e) => setNbPersonnes(e.target.value)} />
                        <input type="date" name='dateArrive' value={formatteddateArrive} placeholder="Start date" className={style.Datefield} onChange={(e) => setFormatteddateArrive(e.target.value)} />
                        <input type="date" name='dateFin' value={formatteddateFin} placeholder="End date" className={style.Datefield} onChange={(e) => setFormatteddateFin(e.target.value)} />
                        <select
                            name="statutDePaiement"
                            className={style.Datefield}
                            onChange={(e) => setStatutDePaiement(e.target.value)}
                            value={statutDePaiement}
                        >
                            <option value="unpaid">Unpaid</option>
                            <option value="paid">Paid</option>
                        </select>

                        <div className='d-flex '>
                            <button type="button" className={`${style.AddResButton} ${style.CancelButton}`}  onClick={()=>navigate('/ListReservations')}>Cancel</button>
                            <button type="submit" className={style.AddResButton}>Update reservation</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default UpdateReservation;