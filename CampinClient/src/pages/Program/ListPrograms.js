import Navbar from '../../components/NewNavbar'

import Sidebar from '../../components/Sidebar'
import style from './AddProgram.module.css'
import axios from "axios";
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

function ListProgram() {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false)
    const [programs, setPrograms] = useState([]);
    const toggle = () => {
        setIsOpen(!isOpen)
    }
 
      useEffect(() => {
        fetch('http://localhost:8090/programs/')
            .then(response => response.json())
            .then(data => {
                setPrograms(data); 
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const handleDelete = async (id) => {
        try {
          await axios.delete(`http://localhost:8090/programs/${id}`);
          const response = await axios.get('http://localhost:8090/programs/');
          setPrograms(response.data);
        } catch (error) {
          console.error(error);
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
        {/* <button className={`${style.AddResButton} ${style.UpdateButton}`}> <a href="/AddProgram">ADD</a></button> */}
        <button className={`${style.AddResButton} ${style.UpdateButton}`} onClick={()=>{navigate(`/AddProgram`)}}>ADD</button>


            <div className={style.AddResContent}>
           
                <h1 className={style.welcomeText}>List of programs</h1>
                <div className=' pt-4'></div>
                <table className="table mb-4 text-white" style={{ "--bs-table-color": "initial", "--bs-table-bg": "initial" }}>
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Description</th>
                                <th scope="col">Activities</th>
                                <th scope="col">Public Target</th>
                                <th scope="col">Equipements</th>
                                <th scope="col">Precautions</th>
                                <th scope="col">Delete</th>
                                <th scope="col">Update</th>
                            </tr>
                        </thead>
                        <tbody>
                            {programs.map((program, index) => (
                                <tr key={index}>
                                    <th scope="row" className='align-middle'>{index + 1}</th>
                                    <td className='align-middle'>{program.description}</td>
                                    <td className='align-middle'>{program.activities}</td>
                                    <td className='align-middle'>{program.publicTarget}</td>
                                    <td className='align-middle'>{program.equipements}</td>
                                    <td className='align-middle'>{program.precautions}</td>
                                    <td>
                                        <button onClick={() => handleDelete(program.id)} className={`${style.AddResButton} ${style.CancelButton}`}>Delete</button>
                                    </td>
                                    <td>
                                    <button className={`${style.AddResButton} ${style.UpdateButton}`} onClick={()=>{navigate(`/UpdateProgram/${program.id}`)}}>Update</button>
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

export default ListProgram;
