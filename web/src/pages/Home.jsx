import React from 'react'
import { Link } from 'react-router-dom'


import './Home.css'
import homeimage from '../img/home.svg'

function Home() {
    return (
        <>
            <div className="home">
                <div className="home__imagen">
                    <img src={homeimage} alt="Imagen de Inicio" />
                </div>

                <div className="home__descripcion">
                    <h1 className="home__title">
                        HospedaU
                    </h1>
                    <p>
                        HospedaU es una aplicación web que te permite gestionar tus propiedades de una manera fácil y sencilla.
                    </p>

                    <div className="home__botones">
                        <Link to="/iniciar/sesion" >
                            <button className='home__boton'>
                                Iniciar Sesion
                            </button>
                        </Link>
                        <Link to="/registrar/usuarios" >
                            <button className='home__boton'>
                                Registrarse
                            </button>
                        </Link>
                    </div>
                </div>



            </div>

        </>
    )

}

export default Home