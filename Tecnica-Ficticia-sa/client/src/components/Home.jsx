import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
const Home = () => {
  const [gets, setGets] = useState(null);
  const [deleted, setDeleted] = useState({
    id: "",
    image: "",
    name: "",
    price: "",
  });

  useEffect(() => {
    fetch("http://localhost:3001/products")
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        // console.log(res);
        setGets(res);
      });
  }, []);
  console.log(gets);
  function productDelete(id) {
    axios
      .delete(`http://localhost:3001/products`, {
        data: { id: deleted.id },
      })
      .then((res) => {
        setDeleted({ id: "", image: "", name: "", price: "" });
      });
    alert("Producto Eliminado");
  }
  return (
    <div className="Home">
      <Link to="/CreateProduct">
        <button>Añadir Producto</button>
      </Link>
      <table key="uniqueData" className="table">
        <thead>
          <tr>
            <th scope="col">id</th>
            <th scope="col">Nombre</th>
            <th scope="col">Precio</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {gets &&
            gets?.map((get) => (
              <tr key={gets.id}>
                <th scope="row">{get.id}</th>
                <td className="text-right">{get.name}</td>
                <td className="text-right">{get.price}</td>
                <td>
                  <Link to="/UpdateProduct">
                    <button>Edit</button>
                  </Link>
                  <button onClick={() => productDelete(deleted.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
