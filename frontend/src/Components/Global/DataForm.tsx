import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import "../../assets/style/Button.css";
import ImageUpload from './ImageUpload.tsx';
import { useState } from 'react';

const DataForm = ({ fields, editedType, editedData, onChange, onSubmit, onClose, anchorEl, onImageSubmit, onDeleteImage }) => {
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageSelect = (imageFile) => {
        // Actualiza el estado cuando se selecciona una imagen
        setSelectedImage(imageFile);

        onDeleteImage(editedData.image_url);
        // Actualiza el estado editedPanel con el nombre de la imagen seleccionada
        onChange({
            target: {
                name: 'image_url',
                value: imageFile.name,
            },
        });
        if (onImageSubmit) {
            // Utiliza el callback en setImagen para asegurar que tiene el valor actualizado
            setSelectedImage((prevImage) => {
                onImageSubmit(prevImage || imageFile);
                return prevImage || imageFile;
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
