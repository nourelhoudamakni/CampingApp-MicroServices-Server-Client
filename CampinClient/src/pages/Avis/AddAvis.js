
import Navbar from '../../components/NewNavbar'
import React, { useState } from 'react'
import Sidebar from '../../components/Sidebar'
import style from './AddAvis.module.css';
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from 'react-router-dom'; 

function AddAvis() {
    const [isOpen, setIsOpen] = useState(false)
    const navigate = useNavigate();
    const toggle = () => {
        setIsOpen(!isOpen)
    }
    const {
        register,
        handleSubmit,
        formState: { errors },
        
    } = useForm();

    
    const [imageView, setimageView] = useState('');
    const [titre, settitre] = useState('');
    const [description, setdescription] = useState('');
    const [note, setnote] = useState('');
    const [dateDePublication, setdateDePublication] = useState('');
    const [image, setimage] = useState('');
   

    const handleImageChange = (e) => {
        const image = e.target.files[0];
        setimage(e.target.files[0])
        if (image) {
          const reader = new FileReader();
    
          reader.onload = (e) => {
            setimageView(e.target.result);
          };
    
          reader.readAsDataURL(image);
        } else {
            setimageView(null);
        }
      };

  
      const addAvis = () => {
        const formData = new FormData();
        formData.append('titre', titre);
        formData.append('description', description);
        formData.append('note', note);
        formData.append('dateDePublication', dateDePublication);
        formData.append('image', image);
        
        console.log(image);
        axios.post('http://localhost:8045/avis/', formData)

          .then(response => {
            
            console.log(response.data);
            navigate('/ListAvis');

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
                        <h1 className={style.welcomeText}>Add your review </h1>
                        <form className={style.AddResForm} onSubmit={handleSubmit(addAvis)} >
                            <input type="text" name='titre' placeholder="titile" className={style.inputField} onChange={(e) => settitre(e.target.value)}/>
                            
                            <textarea type="text" placeholder="Description" name='description' className={style.Datefield} onChange={(e) => setdescription(e.target.value)}/>
                            <input type="number"  name='note' className={style.Datefield} onChange={(e) => setnote(e.target.value)}/>
                            <input type="date"  name='dateDePublication' className={style.Datefield} onChange={(e) => setdateDePublication(e.target.value)} />
                            <input type="file" placeholder="Image"  name='image' className={style.Datefield}  onChange={handleImageChange}  accept="image/*"/>
                            {image && <img src={imageView} alt="Selected Image" style={{ width: "50%" }} />}                            <div className='d-flex '>
                            <button type="button" className={`${style.AddResButton} ${style.CancelButton}`} >Cancel</button>
                            <button type="submit" className={style.AddResButton}>Add</button>
                            </div>
                        </form>
                    </div>
                </div>
        </>
    );
}

export default AddAvis;