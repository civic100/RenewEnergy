import Button from '@mui/material/Button';

const BtnEnabledComponent = ( {variant, color, onClick}) => {
    return (
        <Button variant={variant} color={color} onClick={onClick}>
            Create
        </Button>
    );
};
export default BtnEnabledComponent;