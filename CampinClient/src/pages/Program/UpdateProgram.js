import Navbar from '../../components/NewNavbar'
import React, { useState,useEffect } from 'react'
import Sidebar from '../../components/Sidebar'
import style from './AddProgram.module.css'
import axios from 'axios'
import { validation } from '../../components/Validation/Validation';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

function UpdateProgram() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const {id} = useParams();
    

    const navigate = useNavigate();
    const [description, setDescription] = useState("");
    const [activities, setActivities] = useState("");
    const [publicTarget, setPublicTarget] = useState("");
    const [equipements, setEquipements] = useState("");
    const [precautions, setPrecautions] = useState("");
    
    
    useEffect(() => {
        axios.get(`http://localhost:8090/programs/${id}`)
            .then(response => {
                setDescription(response.data.description); 
                setActivities(response.data.activities); 
                setPublicTarget(response.data.publicTarget); 
                setEquipements(response.data.equipements); 
                setPrecautions(response.data.precautions); 
                
        console.log()
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
        

        

        await axios.put(`http://localhost:8090/programs/${id}`,
            {
                description: description,
                    activities: activities,
                    publicTarget: publicTarget,
                    equipements: equipements,
                    precautions: precautions,
            }
        ).then((response) => {
            console.log(response.data);
            navigate('/ListPrograms');
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
                        <h1 className={style.welcomeText}>Update Program</h1>
                        <form className={style.AddResForm} onSubmit={handleSubmit(AddRes)} >
                     
                            <input type="textarea" name='description' value={description} placeholder="Description" className={style.inputField} onChange={(e) => setDescription(e.target.value)}/>
                            <input type="text" name='activities' value={activities} placeholder="Activities" className={style.inputField} onChange={(e) => setActivities(e.target.value)} />
                            <input type="text" name='publicTarget' value={publicTarget} placeholder="Public Target" className={style.inputField} onChange={(e) => setPublicTarget(e.target.value)} />
                            <input type="text" name='equipements' value={equipements} placeholder="Equipements" className={style.inputField} onChange={(e) => setEquipements(e.target.value)} />
                            <input type="text" name='precautions' value={precautions} placeholder="Precautions" className={style.inputField} onChange={(e) => setPrecautions(e.target.value)} />
                            <div className='d-flex '>
                            <button type="button" className={`${style.AddResButton} ${style.CancelButton}`}>Cancel</button>
                            <button type="submit" className={style.AddResButton}>Update</button>
                            </div>
                        </form>
                    </div>
                </div>
        </>
    );
}

export default UpdateProgram;