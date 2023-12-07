import Button from '@mui/material/Button';

const BtnEnabledComponent = ( {classState, onClick}) => {
    return (
        <Button 
            variant={'contained'} 
            className={classState ? 'enabled-btn' : 'disabled-btn'} 
            onClick={onClick}>
            {classState ? 'ENABLED' : 'DISABLED'}
        </Button>
    );
};
export default BtnEnabledComponent;