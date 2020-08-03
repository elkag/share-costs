import { makeStyles } from '@material-ui/core/styles';
import { green, deepOrange } from '@material-ui/core/colors/';

const useSubmitStyles = makeStyles((theme) => ({
    buttonSuccess: {
      backgroundColor: deepOrange[400],
      '&:hover': {
        backgroundColor: deepOrange[700],
      },
    },
    buttonProgress: {
        color: deepOrange[700],
        position: "absolute",
        paddingRight: "24px",
        paddingLeft: "24px",
        paddingTop: "6px",
        paddingBottom: "6px"
    },
  }));

export default useSubmitStyles;