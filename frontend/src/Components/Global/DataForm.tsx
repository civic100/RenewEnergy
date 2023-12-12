import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import "../../assets/style/Button.css";
import ImageUpload from './ImageUpload.tsx';
import { useState } from 'react';
import axios from 'axios';

const DataForm = ({ fields, editedType, editedData, onChange, onSubmit, onClose, anchorEl }) => {
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageSelect = (imageFile) => {
        // Actualiza el estado cuando se selecciona una imagen
        setSelectedImage(imageFile);
    };

    const handleFormSubmit = () => {
        // Puedes manejar el archivo seleccionado aquí, por ejemplo, guardándolo en el sistema de archivos
        if (selectedImage) {
            const url = URL.createObjectURL(selectedImage);
            const a = document.createElement('a');
            a.href = url;
            a.download = selectedImage.name;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        };

        if (selectedImage) {
            // Crear un objeto FormData y agregar la imagen a él
            const formData = new FormData();
            formData.append('image', selectedImage);

            // Crear una solicitud AJAX para enviar el formulario con la imagen al servidor
            // (puedes usar axios u otro método para realizar la solicitud)
            axios.post('http://localhost:8080/images', formData)
                .then(response => {
                    console.log('Imagen guardada con éxito:', response.data);
                })
                .catch(error => {
                    console.error('Error al guardar la imagen:', error);
                });
        }
    };

    return (
        <Popover
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={onClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}>
            <div>
                <Typography>{editedType} Data</Typography>
                <form>
                    {fields.map((field) => (
                        field.name === 'image_url' ? (
                            <ImageUpload key={field.name} onImageSelect={handleImageSelect} />
                        ) : (
                            <TextField
                                key={field.name}
                                label={field.label}
                                name={field.name}
                                value={editedData[field.name] !== null ? editedData[field.name] : ''}
                                onChange={onChange}
                            />
                        )
                    ))}
                    {selectedImage && (
                    <p>Imagen seleccionada: {selectedImage.name}</p>
                    )}
                    <Button variant="contained" className="btn-color" onClick={onSubmit}>
                        {editedType === 'Edit' ? 'Save' : 'Add'}
                    </Button>
                </form>
            </div>
        </Popover>
    );
};

export default DataForm;
