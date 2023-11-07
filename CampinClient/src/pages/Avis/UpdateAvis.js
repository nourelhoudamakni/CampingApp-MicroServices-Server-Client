import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import style from './AddAvis.module.css';
import { useForm } from "react-hook-form";

function Updatereview() {


  const [isOpen, setIsOpen] = useState(false)
  
  const toggle = () => {
      setIsOpen(!isOpen)
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
} = useForm();

  const { idAvis } = useParams();
  const navigate = useNavigate();

  const [titre, setTitre] = useState('');
  const [description, setDescription] = useState('');
  const [note, setNote] = useState(0);
  const [dateDePublication, setDateDePublication] = useState('');
  const [image, setImage] = useState(null);




  useEffect(() => {
    axios.get(`http://localhost:8045/avis/${idAvis}`)
      .then((response) => {
        const avis = response.data;
        setTitre(avis.titre);
        setDescription(avis.description);
        setNote(avis.note);
        setDateDePublication(avis.dateDePublication);
        setImage(avis.image)
      })
      .catch((err) => {
        console.log(err);
        console.log('test');

      });
  }, []);



  const handleImageChange = (event) => {
    const newImage = event.target.files[0];
    setImage(newImage);
  };

  const handleUpdateAvis = () => {
    navigate('/ListAvis'); 
    const formData = new FormData();
    formData.append('titre', titre);
    formData.append('description', description);
    formData.append('note', note);
    formData.append('dateDePublication', dateDePublication);
    if (image) {
      formData.append('image', image);
    }

    axios
      .put(`http://localhost:8045/avis/updateAvis/${idAvis}`, formData)
      .then((response) => {
        console.log(response.data);
        navigate('/ListAvis'); 
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className={style.fullScreen}>
      <div className={style.overlay}></div>
      <div className={style.AddResContainer}>
        <div className={style.AddResContent}>
          <h1 className={style.welcomeText}>Update Avis</h1>
          <form className={style.AddResForm}  onSubmit={handleSubmit(handleUpdateAvis)}>
            <input
              type="text"
              name="titre"
              placeholder="Titre"
              className={style.inputField}
              value={titre}
              onChange={(e) => setTitre(e.target.value)}
            />
            <textarea
              name="description"
              placeholder="Description"
              className={style.inputField}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <input
              type="number"
              name="note"
              placeholder="Note"
              className={style.inputField}
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
            <input
              type="date"
              name="dateDePublication"
              placeholder="Date de Publication"
              className={style.Datefield}
              value={dateDePublication}
              onChange={(e) => setDateDePublication(e.target.value)}
            />
         
             <input type="file" placeholder="Image" name="image" className={style.Datefield} onChange={handleImageChange} accept="image/*" />
            <img src={`data:image/png;base64, ${image}`} alt="image" style={{ width: "30%" }} />
           
            <div className="d-flex">
              <button
                type="button"
                className={`${style.AddResButton} ${style.CancelButton}`}
                onClick={() => navigate('/ListAvis')}
              >
                Cancel
              </button>
              <button type="submit" className={style.AddResButton} >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Updatereview;



