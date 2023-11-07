import Navbar from '../../components/NewNavbar'
import React, { useState } from 'react'
import Sidebar from '../../components/Sidebar'
import style from './OffrePlat.module.css'
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function AddOffrePlat() {
    const [isOpen, setIsOpen] = useState(false)
    const toggle = () => {
        setIsOpen(!isOpen)
    }
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const navigate=useNavigate();
    const [imageView, setimageView] = useState('');
    const [nom, setnom] = useState('');
    const [description, setdescription] = useState('');
    const [nbPersonnes, setnbPersonnes] = useState('');
    const [prix, setprix] = useState('');
    const [file, setfile] = useState('');
    const [type, settype] = useState('');

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setfile(e.target.files[0])
        if (file) {
          const reader = new FileReader();
    
          reader.onload = (e) => {
            setimageView(e.target.result);
          };
    
          reader.readAsDataURL(file);
        } else {
            setimageView(null);
        }
      };
      const addOfrePlat = () => {
        const formData = new FormData();
        formData.append('nom', nom);
        formData.append('description', description);
        formData.append('nbPersonnes', nbPersonnes);
        formData.append('prix', prix);
        formData.append('file', file);
        formData.append('type', type);
      
        axios.post('http://localhost:8555/api/microservice/offrePlat/addOffrePlat', formData)
          .then(response => {
            navigate('/ListOffrePlat');
          })
          .catch(error => {
            console.error(error);
          });
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
                        <h1 className={style.welcomeText}>Add a new meal</h1>
                        <form className={style.AddResForm} onSubmit={handleSubmit(addOfrePlat)} >
                            <select className={style.Datefield} name='type' onChange={(e) => settype(e.target.value)}>
                            <option value="PETITDEJEUNER">Breakfast</option>
                            <option value="DEJEUNER">Lunch</option> 
                            <option value="DINER">Dinner</option>
                            <option value="DESSERT">Dessert</option> 
                            </select>
                            <input type="text" name='nom' placeholder="Name" className={style.inputField} onChange={(e) => setnom(e.target.value)}/>
                            <textarea type="text" placeholder="Description" name='description' className={style.Datefield} onChange={(e) => setdescription(e.target.value)}/>
                            <input type="number" placeholder="Number of persons"  name='nbPersonnes' className={style.Datefield} onChange={(e) => setnbPersonnes(e.target.value)}/>
                            <input type="number" placeholder="Price"  name='prix' className={style.Datefield} onChange={(e) => setprix(e.target.value)} />
                            <input type="file" placeholder="Image"  name='file' className={style.Datefield}  onChange={handleImageChange}  accept="image/*"/>
                            <div>
                            {file && <img src={imageView} alt="Selected Image" style={{ width: "30%",height:"30%" }} />}    
                            </div>
                     
                            <div className='d-flex '>
                            <button type="button" onClick={() => {
                                            navigate('/ListOffrePlat');                                             
                                        }} className={`${style.AddResButton} ${style.CancelButton}`}>Cancel</button>
                            <button type="submit" className={style.AddResButton}>Add meal</button>
                            </div>
                        </form>
                    </div>
                </div>
        </>
    );
}

export default AddOffrePlat;