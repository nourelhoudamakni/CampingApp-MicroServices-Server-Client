import Navbar from '../../components/NewNavbar'
import React, { useState } from 'react'
import Sidebar from '../../components/Sidebar'
import style from './CampingStyle.module.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
function AddCamping() {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [capacity, setCapacity] = useState(0)
    const [price, setPrice] = useState(0)
    const [imageView, setimageView] = useState('');
    const [dateCamping, setDateCamping] = useState('')
    const [isOpen, setIsOpen] = useState(false)
    const [file, setfile] = useState('');
    const navigate=useNavigate();

    const toggle = () => {
        setIsOpen(!isOpen)
    }

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

    const AddCamping=()=>{ 
        const formData = new FormData();
        formData.append('titre', title);
        formData.append('description', description);
        formData.append('capacity', capacity);
        formData.append('price', price);
        formData.append('image', file);
        formData.append('dateComping', dateCamping);
        axios.post("http://localhost:8084/camping/create",formData).then((response)=>{ 
            console.log(response.data)
        }).catch((err)=>{ 
            console.log(err)
        })
        navigate("/Campings");
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
                        <h1 className={style.welcomeText}>Add a new Camping</h1>
                        <form className={style.AddResForm} >
                            <input type="text" name='title' placeholder="Camping Title" className={style.inputField}  onChange={(e) => setTitle(e.target.value)}/>
                            <input type="text" placeholder="Description" className={style.Datefield}  onChange={(e) => setDescription(e.target.value)}/>
                            <input type="number" placeholder="capacity" className={style.Datefield}  onChange={(e) => setCapacity(e.target.value)}/>
                            <input type="number" placeholder="Price" className={style.Datefield}  onChange={(e) => setPrice(e.target.value)}/>
                            <input type="file" placeholder="Image"  name='file' className={style.Datefield}  onChange={handleImageChange}  accept="image/*"/>
                            {file && <img src={imageView} alt="Selected Image" style={{ width: "50%" }} />} 
                           
                        </form>
                        <div className='d-flex '>
                            <button type="button" className={`${style.AddResButton} ${style.CancelButton}`} >Cancel</button>
                            <button  className={style.AddResButton} onClick={()=>{AddCamping()}}>Add Camping</button>
                            </div>
                    </div>
                </div>
        </>
    );
}

export default AddCamping;