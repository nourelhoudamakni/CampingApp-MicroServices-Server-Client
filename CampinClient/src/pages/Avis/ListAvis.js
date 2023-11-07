import Navbar from '../../components/NewNavbar'
import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import style from './AddAvis.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 


function ListAvis() {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [avisList, setAvisList] = useState([]); 

    const toggle = () => {
        setIsOpen(!isOpen);
    }

    useEffect(() => {
        axios.get('http://localhost:8045/avis/')
            .then(response => {
                setAvisList(response.data); 
            })
            .catch(error => {
                console.error(error);
            });
    }, []); 

    const handleUpdate = (avisId) => {
        console.log(`Update Avis with ID: ${avisId}`);
    };

   

    const handleCancel = (id) => {
        if (window.confirm("Are you sure you want to cancel this Avis?")) {
            axios.delete(`http://localhost:8045/avis/${id}`)
                .then(response => {
                    
                    console.log(`Avis with ID ${id} has been canceled.`);
                    axios.get('http://localhost:8045/avis/')
            .then(response => {
                setAvisList(response.data); 
            })
            .catch(error => {
                console.error(error);
            });
    
                    
                })
                .catch(error => {
                    console.error(`Error canceling Avis with ID ${id}:`, error);
                    
                });
        }
    };
   
    
    
    
    
    
    

    return (
        <>
            <Sidebar isOpen={isOpen} toggle={toggle} />
            <Navbar toggle={toggle} />
            <div className={style.fullScreen}>
                <div className={style.overlay}></div>
            </div>
            <div className={`container  ${style.AddResContainer}`}>
          
                <div className={style.AddResContent}>
                <button
                                            onClick={() => navigate(`/AddAvis`)} 
                                            className={`${style.AddResButton} ${style.UpdateButton}`}
                                        >
                                            Add review
                                        </button>
                    <h1 className={style.welcomeText}>list of reviews</h1>
                    
                    <div className='pt-4'></div>
                    <table className="table mb-4 text-white" style={{ "--bs-table-color": "initial", "--bs-table-bg": "initial" }}>
                        <thead>
                            <tr>
                                <th scope="col">Number</th>
                                <th scope="col">Title</th>
                                <th scope="col">Description</th>
                                <th scope="col">Rating</th>
                                <th scope="col">Publication Date</th>
                                <th scope="col">Image</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {avisList.map((avis, index) => (
                                <tr key={index}>
                                    <th scope="row" className='align-middle'>{index + 1}</th>
                                    <td className='align-middle'>{avis.titre}</td>
                                    <td className='align-middle'>{avis.description}</td>
                                    <td className='align-middle'>{avis.note}</td>
                                    <td className='align-middle'>{avis.dateDePublication}</td>
                                    <td className='align-middle'>
                                        <img
                                            src={`data:image/png;base64,${avis.image}`}
                                            alt="Image from Base64" style={{ width: "30%", height: "30%" }}
                                        />
                                    </td>
                                    <td className='align-middle'>
                                        <button
                                            onClick={() => {navigate(`/updateavis/${avis.idAvis}`)}} 
                                            className={`${style.AddResButton} ${style.UpdateButton}`}
                                        >
                                            Update
                                        </button>

                                        <button
                                            onClick={() => handleCancel(avis.idAvis)}
                                            className={`${style.AddResButton} ${style.CancelButton}`}
                                        >
                                            Delete
                                        </button>
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

export default ListAvis;
