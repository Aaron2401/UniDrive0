import React, { useState } from 'react';
import './Registrar.css';  // Importamos el archivo CSS

interface RegistrationFormProps {
  onRegister: (formData: {
    name: string;
    email: string;
    password: string;
    university: string;
  }) => void;
}

const Registrar: React.FC<RegistrationFormProps> = ({ onRegister }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    university: '',
  });

  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password || !formData.university) {
      setError('Por favor, complete todos los campos obligatorios.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    setError(null);
    onRegister({
      name: formData.name,
      email: formData.email,
      password: formData.password,
      university: formData.university,
    });
    alert('¡Registro exitoso!');
  };

  return (
    <div className="registration-container">
      <div className="registration-content">
        {/* Imagen de la izquierda */}
        <div className="image-container">
          <img src="/Images/imagen-registro.jpg" alt="Imagen de Registro" className="registration-image" />
        </div>
        {/* Formulario de registro */}
        <div className="registration-form">
          <h2 className="form-header">¡Regístrate y Únete!</h2>
          {error && <p className="error-message">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Nombre completo</label>
              <input
                type="text"
                name="name"
                placeholder="Ingresa tu nombre"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="input-group">
              <label>Correo electrónico</label>
              <input
                type="email"
                name="email"
                placeholder="correo@universidad.edu.mx"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="input-group">
              <label>Contraseña</label>
              <input
                type="password"
                name="password"
                placeholder="Ingresa una contraseña"
                value={formData.password}
                onChange={handleInputChange}
              />
            </div>
            <div className="input-group">
              <label>Confirmar Contraseña</label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirma tu contraseña"
                value={formData.confirmPassword}
                onChange={handleInputChange}
              />
            </div>
            <div className="input-group">
              <label>Universidad</label>
              <select
                name="university"
                value={formData.university}
                onChange={handleInputChange}
              >
                <option value="">Selecciona tu universidad</option>
                <option value="Universidad Tecnológica de Cancún">Universidad Tecnológica de Cancún</option>
                <option value="La Salle">La Salle</option>
                <option value="Tecnológico de Monterrey">Tecnológico de Monterrey</option>
              </select>
            </div>
            <button type="submit" className="submit-btn">Registrar</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registrar;