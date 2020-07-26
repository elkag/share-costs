import { makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors/';

const useSubmitStyles = makeStyles((theme) => ({
    buttonSuccess: {
      backgroundColor: green[500],
      '&:hover': {
        backgroundColor: green[700],
      },
    },
    buttonProgress: {
        color: green[500],
        position: "absolute",
        paddingRight: "24px",
        paddingLeft: "24px",
        paddingTop: "6px",
        paddingBottom: "6px"
    },
  }));

export default useSubmitStyles;