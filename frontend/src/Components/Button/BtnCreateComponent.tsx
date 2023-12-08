import Button from '@mui/material/Button';
import "../../assets/style/Button.css";


const BtnCreateComponent = ( {onClick}) => {
    return (
        <Button variant={'contained'} color={'success'} onClick={onClick}>
            Create
        </Button>
    );
};
export default BtnCreateComponent;