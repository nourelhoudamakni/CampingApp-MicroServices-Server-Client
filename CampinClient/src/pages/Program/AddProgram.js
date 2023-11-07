import Navbar from '../../components/NewNavbar'
import React, { useState } from 'react'
import Sidebar from '../../components/Sidebar'
import style from './AddProgram.module.css'
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
function AddProgram() {
    const {
                handleSubmit,
        formState: { errors },
    } = useForm();
    const [isOpen, setIsOpen] = useState(false)
    const toggle = () => {
        setIsOpen(!isOpen)
    }
    const navigate=useNavigate();
      const [description, setDescription] = useState("");
      const [activities, setActivities] = useState("");
      const [publicTarget, setPublicTarget] = useState("");
      const [equipements, setEquipements] = useState("");
      const [precautions, setPrecautions] = useState("");
      
    
        const add = () => {
            
               
                axios.post('http://localhost:8090/programs/', {
                    description: description,
                    activities: activities,
                    publicTarget: publicTarget,
                    equipements: equipements,
                    precautions: precautions,
                   
                }).then(response => {
                    navigate('/ListPrograms');
                  })
                  .catch(error => {
                    console.error(error);
                  });

        };

    return (
        <>
        <Sidebar isOpen={isOpen} toggle={toggle} />
            <Navbar toggle={toggle} />
            <div className={style.fullScreen}>
            <div className={style.overlay}></div>

            </div>
            <div className={style.AddResContainer}>
                    <div className={style.AddResContent}>
                        <h1 className={style.welcomeText}>Add a new Program</h1>
                        <form className={style.AddResForm} onSubmit={handleSubmit(add)} >
                     
                            <input type="textarea" name='description' placeholder="Description" className={style.inputField} onChange={(e) => setDescription(e.target.value)}/>
                            <input type="text" name='activities' placeholder="Activities" className={style.inputField} onChange={(e) => setActivities(e.target.value)} />
                            <input type="text" name='publicTarget' placeholder="Public Target" className={style.inputField} onChange={(e) => setPublicTarget(e.target.value)} />
                            <input type="text" name='equipements' placeholder="Equipements" className={style.inputField} onChange={(e) => setEquipements(e.target.value)} />
                            <input type="text" name='precautions' placeholder="Precautions" className={style.inputField} onChange={(e) => setPrecautions(e.target.value)} />
                            <div className='d-flex '>
                            <button type="button" className={`${style.AddResButton} ${style.CancelButton}`}>Cancel</button>
                            <button type="submit" className={style.AddResButton}>Add Program</button>
                            </div>
                        </form>
                    </div>
                </div>
        </>
    );
}

export default AddProgram;