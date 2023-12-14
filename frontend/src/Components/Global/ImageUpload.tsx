import { useDropzone } from 'react-dropzone';
import '../../assets/style/Images.css'

const ImageUpload = ({ onImageSelect }) => {
    const onDrop = (acceptedFiles) => {
        const file = acceptedFiles[0];
        onImageSelect(file);
    };

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    return (
        <div className='box-zone'>
            <div {...getRootProps()} className='zone'>
                <input {...getInputProps()} />
                <p>Selecciona tu imagen:</p>
            </div>
        </div>
    );
};

export default ImageUpload;
