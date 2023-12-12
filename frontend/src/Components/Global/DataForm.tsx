import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import "../../assets/style/Button.css";

const DataForm = ({ fields, editedType, editedData, onChange, onSubmit, onClose, anchorEl }) => {
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
                        <TextField key={field.name} label={field.label} name={field.name} value={editedData[field.name] !== null ? editedData[field.name] : ''}
                        onChange={onChange} />
                    ))}
                    <Button variant="contained" className="btn-color" onClick={onSubmit}>
                        {editedType === 'Edit' ? 'Save' : 'Add'}
                    </Button>
                </form>
            </div>
        </Popover>
    );
};

export default DataForm;
