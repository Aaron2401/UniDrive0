import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Login: React.FC = () => {
  const [emailName, setEmailName] = useState('');
  const [emailDomain, setEmailDomain] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const allowedDomains = ['@utcancun.edu.mx', '@anahuac.mx', '@lasalle.mx'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!emailName || !emailDomain || !password) {
      setError('Por favor, completa todos los campos.');
      return;
    }

    if (!allowedDomains.includes(emailDomain)) {
      setError('Elige uno de los dominios permitidos.');
      return;
    }

    setError('');
    navigate('/dash');
  };

  const fullEmail = `${emailName}${emailDomain}`;

  return (
    <div className="login-container">
      <div className="login-content">
        <img
          src="/Images/imagen-login.jpg"
          alt="Imagen decorativa para login"
          className="login-image"
        />
        <form onSubmit={handleSubmit} className="login-form">
          <h2>Iniciar Sesión</h2>
          {error && <p className="error-message">{error}</p>}

          <div className="form-group">
            <label htmlFor="email-name">Correo electrónico:</label>
            {fullEmail && <p className="preview-email">Tu correo: {fullEmail}</p>}
            <div className="email-domain-container">
              <div className="form-group">
                <input
                  type="text"
                  id="email-name"
                  value={emailName}
                  onChange={(e) => setEmailName(e.target.value)}
                  placeholder="Introduce tu correo"
                  className="email-field"
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  id="email-domain"
                  value={emailDomain}
                  onChange={(e) => setEmailDomain(e.target.value)}
                  list="email-domains"
                  placeholder="Selecciona un dominio"
                  className="email-field"
                />
                <datalist id="email-domains">
                  <option value="@utcancun.edu.mx" />
                  <option value="@anahuac.mx" />
                  <option value="@lasalle.mx" />
                </datalist>
              </div>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Introduce tu contraseña"
            />
          </div>

          <button type="submit" className="login-button">
            Entrar
          </button>

          <div className="register-link">
            <p>¿No tienes una cuenta? <Link to="/registrar">Regístrate aquí</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;