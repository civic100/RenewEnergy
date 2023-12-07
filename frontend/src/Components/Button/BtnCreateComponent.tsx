import Button from '@mui/material/Button';

const BtnCreateComponent = ( {variant, color, onClick}) => {
    return (
        <Button variant={variant} color={color} onClick={onClick}>
            Create
        </Button>
    );
};
export default BtnCreateComponent;