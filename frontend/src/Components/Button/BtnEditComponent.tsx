import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';

const BtnEditComponent = ( {onClick}) => {
    return (
        <Button variant={'contained'} className={'btn-color'} onClick={onClick}>
            <EditIcon />
        </Button>
    );
};
export default BtnEditComponent;