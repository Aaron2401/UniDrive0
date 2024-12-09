import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Profile.css";
import { useUser } from "./../UserContext"; // Importa el hook para acceder al contexto

const Profile: React.FC = () => {
  const { user, setUser } = useUser(); // Usamos el contexto para obtener y actualizar el nombre del usuario
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    age: "",
    hobbies: "",
    cityOfBirth: "",
    musicGenre: "",
    paymentMethod: ""
  });

  useEffect(() => {
    // Simulamos una llamada a la API para obtener los datos del usuario
    setFormData({
      name: user.name,
      email: user.email,
      password: "",
      confirmPassword: "",
      age: user.age || "",
      hobbies: user.hobbies || "",
      cityOfBirth: user.cityOfBirth || "",
      musicGenre: user.musicGenre || "",
      paymentMethod: user.paymentMethod || "",
    });
  }, [user]); // Esto asegura que cuando el nombre cambie, se actualice en el formulario

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveChanges = () => {
    if (formData.password !== formData.confirmPassword) {
      alert("Las contraseñas no coinciden.");
      return;
    }
  
    setUser(formData); // Actualiza el usuario en el contexto
    setIsEditing(false);
  };
  

  const handleCancelEdit = () => {
    setIsEditing(false);
    setFormData({
      name: user.name,
      email: user.email,
      password: "",
      confirmPassword: "",
      age: user.age || "",
      hobbies: user.hobbies || "",
      cityOfBirth: user.cityOfBirth || "",
      musicGenre: user.musicGenre || "",
      paymentMethod: user.paymentMethod || "",
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  return (
    <div className="profile-container">
      <h1>Perfil de {user.name}</h1> {/* Mostramos el nombre actualizado globalmente desde el contexto */}
      <div className="profile-details">
        {isEditing ? (
          <div className="profile-edit-form">
            <div>
              <label htmlFor="name">Nombre:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="email">Correo electrónico:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="age">Edad:</label>
              <input
                type="number"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="hobbies">Hobbies:</label>
              <input
                type="text"
                id="hobbies"
                name="hobbies"
                value={formData.hobbies}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="cityOfBirth">Ciudad de nacimiento:</label>
              <input
                type="text"
                id="cityOfBirth"
                name="cityOfBirth"
                value={formData.cityOfBirth}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="musicGenre">Género de música favorito:</label>
              <select
                id="musicGenre"
                name="musicGenre"
                value={formData.musicGenre}
                onChange={handleChange}
              >
                <option value="">Seleccione un género</option>
                <option value="rock">Rock</option>
                <option value="pop">Pop</option>
                <option value="jazz">Jazz</option>
                <option value="classical">Clásica</option>
                <option value="hiphop">Hip-hop</option>
              </select>
            </div>
            <div>
              <label htmlFor="paymentMethod">Método de pago preferido:</label>
              <select
                id="paymentMethod"
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleChange}
              >
                <option value="">Seleccione un método</option>
                <option value="efectivo">Efectivo</option>
                <option value="transferencia">Transferencia</option>
              </select>
            </div>
            <div className="profile-edit-actions">
              <button className="save-button" onClick={handleSaveChanges}>
                Guardar Cambios
              </button>
              <button className="cancel-button" onClick={handleCancelEdit}>
                Cancelar
              </button>
            </div>
          </div>
        ) : (
          <>
            <p><strong>Nombre:</strong> {user.name}</p>
            <p><strong>Correo electrónico:</strong> {user.email}</p>
            <p><strong>Edad:</strong> {user.age || "No proporcionada"}</p>
            <p><strong>Hobbies:</strong> {user.hobbies || "No proporcionados"}</p>
            <p><strong>Ciudad de nacimiento:</strong> {user.cityOfBirth || "No proporcionada"}</p>
            <p><strong>Género de música favorito:</strong> {user.musicGenre || "No seleccionado"}</p>
            <p><strong>Método de pago preferido:</strong> {user.paymentMethod || "No seleccionado"}</p>
          </>
        )}
      </div>

      <div className="profile-actions">
        {!isEditing && (
          <button onClick={handleEditClick} className="edit-button">
            Editar Perfil
          </button>
        )}
      </div>

      <div className="profile-bottom-actions">
        <Link to="/dash">
          <button className="back-button">Volver al Dashboard</button>
        </Link>
      </div>
    </div>
  );
};

export default Profile;
