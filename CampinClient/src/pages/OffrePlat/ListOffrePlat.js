import Navbar from '../../components/NewNavbar'
import React, { useState } from 'react'
import Sidebar from '../../components/Sidebar'
import style from './OffrePlat.module.css'
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
function ListOffrePlat() {
    const [isOpen, setIsOpen] = useState(false)
    const toggle = () => {
        setIsOpen(!isOpen)
    }
    const [meals, setmeals] = useState([]);
    const reader = new FileReader();
    const navigate=useNavigate();
    useEffect(() => {
        axios
            .get(`http://localhost:8555/api/microservice/offrePlat/listOfferPlat`)
            .then((response) => {
                setmeals(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const deleteOffrePlat = (id) => {
    
        axios.delete(`http://localhost:8555/api/microservice/offrePlat/deleteOffrePlat/${id}`)
          .then((response) => {
            axios.get(`http://localhost:8555/api/microservice/offrePlat/listOfferPlat`)
              .then((response) => {
                setmeals(response.data);
              })
              .catch((error) => {
                console.error(error);
              });
          })
          .catch((error) => {
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
            <div className={`container  ${style.AddResContainer}`}>
                <div className={style.AddResContent}>
                    <h1 className={style.welcomeText}>List of meals</h1>
                    <button className={`${style.AddResButton} ${style.UpdateButton}`} 
                                         onClick={() => {
                                            navigate(`/AddOffrePlat`);                                             
                                        }}>Add new meal</button>
                    <div className=' pt-4'></div>
                    <table className="table mb-4 text-white" style={{ "--bs-table-color": "initial", "--bs-table-bg": "initial" }}>
                        <thead>
                            <tr>
                                <th scope="col">Type</th>
                                <th scope="col">Name</th>
                                <th scope="col">Number of persons</th>
                                <th scope="col">Price</th>
                                <th scope="col">Description</th>
                                <th scope="col">Image</th>
                                <th scope="col">Delete</th>
                                <th scope="col">Update</th>
                            </tr>
                        </thead>
                        <tbody>
                            {meals.map((meal, index) => (
                                <tr>

                                    <td className='align-middle'>{meal.type === 'PETITDEJEUNER'
                                        ? 'Breakfast'
                                        : meal.type === 'DEJEUNER'
                                            ? 'Lunch'
                                            : meal.type === 'DINER'
                                                ? 'Dinner'
                                                : meal.type === 'DESSERT'
                                                    ? 'Dessert'
                                                    : meal.type}</td>
                                    <td className='align-middle'> {meal.nom}</td>
                                    <td className='align-middle'> {meal.nbPersonnes}</td>
                                    <td className='align-middle'> {meal.prix}</td>
                                    <td className='align-middle'> {meal.description}</td>
                                    <td className='' style={{ width: "20%" }}>
                                        <img
                                            src={`data:image/png;base64,${meal.image}`}
                                            alt="Image from Base64" style={{ width: "60%", height: "60%" }}
                                        />
                                    </td>
                                    <td>
                                        <button className={`${style.AddResButton} ${style.CancelButton}`}
                                            onClick={() => {
                                                deleteOffrePlat(meal.idOffrePlat);                                               
                                            }} >Delete</button>
                                    </td>
                                    <td>
                                        <button className={`${style.AddResButton} ${style.UpdateButton}`} 
                                         onClick={() => {
                                            navigate(`/UpdateOffrePlat/${meal.idOffrePlat}`);                                             
                                        }}>Update</button>
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

export default ListOffrePlat;
