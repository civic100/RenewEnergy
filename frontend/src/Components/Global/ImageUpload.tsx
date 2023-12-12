import { useDropzone } from 'react-dropzone';
import '../../assets/style/Images.css'

const ImageUpload = ({ onImageSelect }) => {
    const onDrop = (acceptedFiles) => {
        const file = acceptedFiles[0];
        onImageSelect(file);
    };

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    return (
        <div>
            <div {...getRootProps()} className='zone'>
                <input {...getInputProps()} />
                <p>Arrastra y suelta una imagen aquí, o haz clic para seleccionar una.</p>
            </div>
        </div>
    );
};

export default ImageUpload;
