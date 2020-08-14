import React from 'react';

//components
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';

// styles
import { makeStyles } from '@material-ui/core/styles';
import { disabledGrey } from '../../styles/colors';
import { red } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    position: 'relative',
    height: 55
  },
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    position: 'absolute',
    justifyContent: 'center',
    zIndex: 10,
    top: 0,
    width: 200,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
    color: red,
    autocomplete: "off",
  },
  iconButton: {
    padding: 10,
    color: disabledGrey
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

export default function CustomizedInputBase({id, onChange, onFocus, onPaste}) {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
    <Paper component="form" className={classes.root}>
      <InputBase  
        id={id}
        onChange={onChange}
        onFocus={onFocus}
        onPaste={onPaste}
        className={classes.input}
        placeholder="Add a new member.."
        inputProps={{ 'autoComplete': 'off', 'aria-label': 'Add a new member' }}
      />
      <SearchIcon className={classes.iconButton}/>
     
    </Paper> </div>
  );
}
