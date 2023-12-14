import React, { useState } from 'react';
import ImageUpload from '../Global/ImageUpload';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faChevronRight, faEnvelope, faBuilding, faGlobe, faImage} from '@fortawesome/free-solid-svg-icons';
import '../../assets/style/Register/Register.css'; // Asegúrate de importar el nuevo archivo CSS

const RegisterComponent: React.FC<{ onRegister: () => void }> = ({ onRegister }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    user_type: 'normal', // O 'company', según tu lógica
    image_url: '',
    company_name: '',
    website: '',
  });
  const [selectedImage, setSelectedImage] = useState(null);

  const handleInputChange = (event) => {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  };

  const handleImageSelect = (imageFile) => {
    setSelectedImage(imageFile);
    handleInputChange({
      target: {
        name: 'image_url',
        value: imageFile.name,
      },
    });
  };

  const handleRegister = async () => {
    try {
      const response = await fetch('http://localhost:8080/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        if (selectedImage) {
          const formData = new FormData();
          formData.append('image', selectedImage);

          await axios.post('http://localhost:8080/images', formData)
            .then(response => {
              console.log('Imagen guardada con éxito:', response.data);
            })
            .catch(error => {
              console.error('Error al guardar la imagen:', error);
            });
        }

        // Luego de un registro exitoso, llamas a la función onRegister para redirigir al usuario al  .
        onRegister();
      } else {
        console.error('Error en el registro:', response.statusText);
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  return (
    <div className="container">
      <div className="screen">
        <div className="screen__content">
          <form className="register">
            <div className="register__field">
              <FontAwesomeIcon icon={faUser} className="register__icon" />
              <input type="text" className="register__input" placeholder="User name" value={formData.name} onChange={handleInputChange} />
            </div>
            <div className="register__field">
              <FontAwesomeIcon icon={faEnvelope} className="register__icon" />
              <input type="email" className="register__input" placeholder="Email" value={formData.email} onChange={handleInputChange} />
            </div>
            <div className="register__field">
              <FontAwesomeIcon icon={faLock} className="register__icon" />
              <input type="password" className="register__input" placeholder="Password" name="password" value={formData.password} onChange={handleInputChange} />
            </div>
            <div className="register__field">

              <select name="user_type" className="register__select" value={formData.user_type} onChange={handleInputChange}>
                <option value="normal">Normal</option>
                <option value="company">Empresa</option>
              </select>
            </div>
          
              {formData.user_type === 'company' && (
                <>
                <div className="register__field">
                  <label>
                    <FontAwesomeIcon icon={faBuilding} className="register__icon" />
                    <input type="text"  className="register__input" name="company_name" placeholder="Nombre de la empresa" value={formData.company_name} onChange={handleInputChange} />
                  </label>
                </div>
                <div className="register__field">
                  <label>
                  <FontAwesomeIcon icon={faGlobe} className="register__icon" />
                    <input type="text"  className="register__input" name="website" placeholder="Sitio web" value={formData.website} onChange={handleInputChange} />
                  </label>
                </div>
                </>
              )}
          

            <div className="register__field">
                <p>URL de imagen:<FontAwesomeIcon icon={faImage} className="register__icon register__alin" /></p> 
              <label>
             
                <ImageUpload key={formData.image_url} onImageSelect={handleImageSelect} />
              </label>
              {selectedImage && (
                <p>Imagen seleccionada: {selectedImage.name}</p>
              )}
            </div>

            <button className="button register__submit" type="button" onClick={handleRegister}>
              <span className="button__text">Register</span>
              <FontAwesomeIcon icon={faChevronRight} className="button__icon" />
            </button>
            </form>
          <div className="social-register">
              <h3>Register in <br/>RenewEnergy </h3>
              <div className="social-icons">
                  <a href="#" className="social-register__icon fab fa-instagram"></a>
                  <a href="#" className="social-register__icon fab fa-facebook"></a>
                  <a href="#" className="social-register__icon fab fa-twitter"></a>
              </div>
          </div>
      </div>
      <div className="screen__background">
          <span className="screen__background__shape screen__background__shape4"></span>
          <span className="screen__background__shape screen__background__shape3"></span>		
          <span className="screen__background__shape screen__background__shape2"></span>
          <span className="screen__background__shape screen__background__shape1"></span>
      </div>		
    </div>
    </div>
  );
};

export default RegisterComponent;
