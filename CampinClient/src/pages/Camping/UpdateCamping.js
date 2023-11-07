import Navbar from '../../components/NewNavbar';
import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import style from './CampingStyle.module.css';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function UpdateCamping() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [capacity, setCapacity] = useState(0);
  const [price, setPrice] = useState(0);
  const [file, setFile] = useState(null);
  const [image, setImage] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const { campingId } = useParams();
  const navigate=useNavigate()
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    axios.get(`http://localhost:8084/camping/getCampingById/${campingId}`)
      .then((response) => {
        const camping = response.data;
        setTitle(camping.titre);
        setDescription(camping.description);
        setCapacity(camping.capacity);
        setPrice(camping.price);
        setImage(camping.image)
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
  };

  const updateCamping = () => {
    navigate("/Campings")
    const formData = new FormData();
    formData.append('titre', title);
    formData.append('description', description);
    formData.append('capacity', capacity);
    formData.append('price', price);
    formData.append('image', file);
    axios.put(`http://localhost:8084/camping/update/${campingId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then((response) => {
        console.log(response.data);
        navigate("/Campings")
      })
      .catch((err) => {
        
        console.log(err);
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
          <h1 className={style.welcomeText}>Update Camping</h1>
          <form className={style.AddResForm}>
            <input type="text" name="title" value={title} placeholder="Camping Title" className={style.inputField} onChange={(e) => setTitle(e.target.value)} />
            <input type="text" value={description} placeholder="Description" className={style.Datefield} onChange={(e) => setDescription(e.target.value)} />
            <input type="number" value={capacity} placeholder="Capacity" className={style.Datefield} onChange={(e) => setCapacity(e.target.value)} />
            <input type="number" value={price} placeholder="Price" className={style.Datefield} onChange={(e) => setPrice(e.target.value)} />
            <input type="file" placeholder="Image" name="file" className={style.Datefield} onChange={handleImageChange} accept="image/*" />
            <img src={`data:image/png;base64, ${image}`} alt="Camping" />
          </form>
          <div className="d-flex">
            <button type="button" className={`${style.AddResButton} ${style.CancelButton}`}>Cancel</button>
            <button className={style.AddResButton} onClick={()=>{updateCamping()}}>Update Camping</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default UpdateCamping;