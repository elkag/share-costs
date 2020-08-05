import { blue } from "@material-ui/core/colors";
import { createMuiTheme } from "@material-ui/core";

export const theme = createMuiTheme({
    overrides: {
      MuiBackdrop: {
        root: {
          color: blue[700],
          backgroundColor: 'transparent',
        }
      },
    }
  });