import Navbar from '../../components/NewNavbar'
import React, { useState } from 'react'
import Sidebar from '../../components/Sidebar'
import style from './OffrePlat.module.css'
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useEffect } from "react";

function UpdateOffrePlat() {
    const [isOpen, setIsOpen] = useState(false)
    const toggle = () => {
        setIsOpen(!isOpen)
    }
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const {id} = useParams();
    const navigate=useNavigate();
    const [meal, setmeal] = useState('');
    const [imageView, setimageView] = useState('');
    const [nom, setnom] = useState('');
    const [description, setdescription] = useState('');
    const [nbPersonnes, setnbPersonnes] = useState('');
    const [prix, setprix] = useState('');
    const [file, setfile] = useState('');
    const [type, settype] = useState('');

    useEffect(() => {
      axios
          .get(`http://localhost:8555/api/microservice/offrePlat/offrePlat/${id}`)
          .then((response) => {
              setmeal(response.data);
              setimageView(response.data.image)
              setnom(response.data.nom);
              setdescription(response.data.description);
              setnbPersonnes(response.data.nbPersonnes);
              setprix(response.data.prix);
              settype(response.data.type)
              setfile(response.data.image)
          })
          .catch((error) => {
              console.error(error);
          });
    }, []);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setfile(e.target.files[0])
      };
      const updateOfrePlat = () => {
        const formData = new FormData();
        formData.append('nom', nom);
        formData.append('description', description);
        formData.append('nbPersonnes', nbPersonnes);
        formData.append('prix', prix);
        formData.append('file', file);
        formData.append('type', type);
      
        axios.put(`http://localhost:8555/api/microservice/offrePlat/updateOffrePlat/${meal.idOffrePlat}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
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
                        <h1 className={style.welcomeText}>Update meal</h1>
                        <form className={style.AddResForm} onSubmit={handleSubmit(updateOfrePlat())} >
                            <select className={style.Datefield} name='type' onChange={(e) => settype(e.target.value)} value={type}>
                            <option value="PETITDEJEUNER">Breakfast</option>
                            <option value="DEJEUNER">Lunch</option> 
                            <option value="DINER">Diner</option>
                            <option value="DESSERT">Dessert</option> 
                            </select>
                            <input type="text" name='nom' placeholder="Name" className={style.inputField} value={nom} onChange={(e) => setnom(e.target.value)}/>
                            <textarea type="text" placeholder="Description" name='description' className={style.Datefield} value={description} onChange={(e) => setdescription(e.target.value)}/>
                            <input type="number" placeholder="Number of persons"  name='nbPersonnes' className={style.Datefield} value={nbPersonnes}  onChange={(e) => setnbPersonnes(e.target.value)}/>
                            <input type="number" placeholder="Price"  name='prix' className={style.Datefield} value={prix}  onChange={(e) => setprix(e.target.value)} />
                            <input type="file" placeholder="Image"  name='file' className={style.Datefield} onChange={handleImageChange} accept="image/*"/>
                            <div>
                            {imageView && <img src={`data:image/png;base64, ${imageView}`} style={{ width: "30%",height:"30%" }} />}
                           
    
                            </div>
                     
                            <div className='d-flex '>
                            <button type="button"  onClick={() => {
                                            navigate('/ListOffrePlat');                                             
                                        }} className={`${style.AddResButton} ${style.CancelButton}`}>Cancel</button>
                            <button type="submit" className={style.AddResButton}>Update meal</button>
                            </div>
                        </form>
                    </div>
                </div>
        </>
    );
}

export default UpdateOffrePlat;