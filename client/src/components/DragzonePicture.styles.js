import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    container: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    large: {
        height: 130,
        width: 130,
    },
    uploading: {
      opacity: 0.5,
      height: 130,
      width: 130
    },
  }));

export const baseStyle = {
    borderWidth: 3,
    borderRadius: 65,
    borderColor: '#eeeeee',
    borderStyle: 'solid',
    backgroundColor: '#d8d8d8',
    outline: 'none',
    transition: 'border .24s ease-in-out'
};
  
export const activeStyle = {
    borderColor: '#2196f3'
};
  
export const acceptStyle = {
    borderColor: '#00e676'
};
  
export const rejectStyle = {
    borderColor: '#ff1744'
};
