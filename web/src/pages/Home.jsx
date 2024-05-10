import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <section className="bg-cover bg-center bg-no-repeat bg-gray-700 bg-blend-multiply" style={{backgroundImage: `url('https://images.pexels.com/photos/11317784/pexels-photo-11317784.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')`}}>
      <div className="container px-4 mx-auto py-24 lg:py-56 text-center">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">
          Encuentra tu próximo hogar
        </h1>
        <p className="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">
          Explora una amplia gama de alquileres en destinos populares alrededor del mundo. Desde acogedores apartamentos urbanos hasta lujosas villas junto al mar, tenemos el alojamiento perfecto para tu próxima aventura.
        </p>
        <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
          <Link
            to="/buscar"
            className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-primary-100 hover:bg-accent-100 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
          >
            Comienza tu búsqueda
            <svg
              className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </Link>
          <Link
            to="/sobre"
            className="inline-flex justify-center hover:text-bg-100 items-center py-3 px-5 sm:ms-4 text-base font-medium text-center text-white rounded-lg border border-white hover:bg-bg-400 focus:ring-4 focus:ring-bg-300"
          >
            Más información
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Home;
