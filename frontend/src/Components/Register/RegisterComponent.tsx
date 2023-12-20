import React, { useState } from 'react';
import ImageUpload from '../Global/ImageUpload';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faChevronRight, faEnvelope, faBuilding, faGlobe, faImage } from '@fortawesome/free-solid-svg-icons';
import '../../assets/style/Register/Register.css'; // Asegúrate de importar el nuevo archivo CSS
import Swal from 'sweetalert2';
import { isValidEmail } from '../../assets/Utils/ValidationEmail.tsx';


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

  const [isEmailValid, setIsEmailValid] = useState(true);

  const handleInputChange = (event) => {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));

    if (event.target.name === 'email') {
      setIsEmailValid(isValidEmail(event.target.value));
    }
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

  const validateForm = (formData) => {
    setIsEmailValid(isValidEmail(formData.email));

    return (
      formData.name &&
      formData.email &&
      formData.password &&
      formData.image_url &&
      isEmailValid &&
      (formData.user_type !== 'company' ||
        (formData.company_name && formData.website))
    );
  };

  const handleRegister = async () => {
    const isFormIncomplete = !validateForm(formData);

    if (isFormIncomplete) {
      let texto = "Please fill in the following fields: ";
      if (!formData.name) {
        texto += "UserName, ";
      }

      if (!formData.email) {
        texto += "Email, ";
      } else if (!isEmailValid) {
        texto = "Invalid email format, example@example.example ";
      }

      if (!formData.password) {
        texto += "Password, ";
      }

      if (!formData.image_url) {
        texto += "Image, ";
      }

      if (formData.user_type === 'company') {
        if (!formData.company_name) {
          texto += "Company Name, ";
        }

        if (!formData.website) {
          texto += "WebSite, ";
        }
      }

      // Eliminar la coma al final del texto si hay campos vacíos
      if (texto.endsWith(', ')) {
        texto = texto.slice(0, -2);
      }

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: texto,
      });
    } else {
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
    }

  };

  return (
    <>
      <div className="container">
        <div className="screen" style={{ height: formData.user_type === 'company' ? '800px' : '700px' }}>
          <div className="screen__content">
            <form className="pago">
              <div className="pago__field">
                <FontAwesomeIcon icon={faUser} className="pago__icon" />
                <input type="text" className="pago__input" placeholder="User name" name='name' value={formData.name} onChange={handleInputChange} />
              </div>
              <div className="pago__field">
                <FontAwesomeIcon icon={faEnvelope} className="pago__icon" />
                <input type="email" className="pago__input" placeholder="Email" name='email' value={formData.email} onChange={handleInputChange} />
              </div>
              <div className="pago__field">
                <FontAwesomeIcon icon={faLock} className="pago__icon" />
                <input type="password" className="pago__input" placeholder="Password" name="password" value={formData.password} onChange={handleInputChange} />
              </div>
              <div className="pago__field">

                <select name="user_type" className="pago__select" value={formData.user_type} onChange={handleInputChange}>
                  <option value="normal">Normal</option>
                  <option value="company">Empresa</option>
                </select>
              </div>

              {formData.user_type === 'company' && (
                <>
                  <div className="pago__field">
                    <label>
                      <FontAwesomeIcon icon={faBuilding} className="pago__icon" />
                      <input type="text" className="pago__input" name="company_name" placeholder="Nombre de la empresa" value={formData.company_name} onChange={handleInputChange} />
                    </label>
                  </div>
                  <div className="pago__field">
                    <label>
                      <FontAwesomeIcon icon={faGlobe} className="pago__icon" />
                      <input type="text" className="pago__input" name="website" placeholder="Sitio web" value={formData.website} onChange={handleInputChange} />
                    </label>
                  </div>
                </>
              )}


              <div className="pago__field">
                <p>URL de imagen:<FontAwesomeIcon icon={faImage} className="pago__icon pago__alin" /></p>
                <ImageUpload key={formData.image_url} onImageSelect={handleImageSelect} />
                {selectedImage && (
                  <p>Imagen seleccionada: {selectedImage.name}</p>
                )}
              </div>

              <button className="button pago__submit" type="button" onClick={handleRegister}>
                <span className="button__text">Register</span>
                <FontAwesomeIcon icon={faChevronRight} className="button__icon" />
              </button>
            </form>

          </div>
          <div className="screen__background">
            <span className="screen__background__shape screen__background__shape4"></span>
            <span className="screen__background__shape screen__background__shape3"></span>
            <span className="screen__background__shape screen__background__shape2"></span>
            <span className="screen__background__shape screen__background__shape1"></span>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterComponent;
