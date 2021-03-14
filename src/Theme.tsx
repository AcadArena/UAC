import { createMuiTheme } from "@material-ui/core/styles";
import purple from "@material-ui/core/colors/purple";
import green from "@material-ui/core/colors/green";

const theme = createMuiTheme({
  spacing: 5,
  palette: {
    background: {
      default: "rgba(0,0,0,0)",
      paper: "rgba(0,0,0,0)",
    },
    primary: {
      main: purple[500],
    },
    secondary: {
      main: green[500],
    },
  },
});

export default theme;
