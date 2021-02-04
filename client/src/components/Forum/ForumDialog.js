import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { Grid } from '@material-ui/core';

const PostDialog = ({ open, handleClose }) => {
    return (
        <div>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Post title</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                        lobortis non turpis sit amet tincidunt. Suspendisse vel lorem
                        justo.
                    </DialogContentText>
                    <Grid style={{ margin: '16px 0 24px 0' }}>
                        {[1, 2, 3].map(comment => {
                            return (
                                <div key={comment}>comments can be displayed here</div>
                            );
                        })}
                    </Grid>
                    <TextField
                        variant="outlined"
                        autoFocus
                        label="Comment"
                        type="text"
                        multiline
                        rows={4}
                        rowsMax={4}
                        color="secondary"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Close
                    </Button>
                    <Button color="primary">Add comment</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};
export default PostDialog;
