import React from "react";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
function validate(input) {
  let errors = {};
  if (!input.name) {
    errors.name = "El Nombre es requerido";
  }
  if (!input.price) {
    errors.price = "El precio es requerido";
  } else if (!input.image) {
    errors.image = "La imagen es requerida";
  }
  return errors;
}
const CreateProduct = () => {
  const history = useHistory();
  const [errors, setErrors] = useState({});
  const [input, setInput] = useState({
    image: "",
    name: "",
    price: "",
  });
  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }
  function handleSubmit(e) {
    e.preventDefault();
    axios
      .post("http://localhost:3001/products", {
        ...input,
      })
      .then((res) => {
        alert("Producto Añadido");
        setInput({
          image: "",
          name: "",
          price: "",
        });
        history.push("/");
      })
      .catch((e) => alert(`${e}`));
  }
  return (
    <div className="CreateProduct">
      <div>
        <h1>Añade un nuevo Producto</h1>
      </div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label>URL de la imagen:</label>
        </div>
        <input
          type="text"
          value={input.image}
          name="image"
          onChange={handleChange}
        />
        <div>
          <label>Nombre del producto:</label>
        </div>
        <input
          type="text"
          value={input.name}
          name="name"
          onChange={handleChange}
          required
        />
        {errors.name && <p>{errors.name}</p>}
        <div>
          <label>Precio:</label>
        </div>
        <input
          type="text"
          value={input.price}
          name="price"
          onChange={handleChange}
          required
        />
        {errors.price && <p>{errors.price}</p>}
        <div>
          <button type="submit">Guardar</button>
          <Link to="/">
            <button>Volver</button>
          </Link>
        </div>
      </form>
    </div>
  );
};
export default CreateProduct;
