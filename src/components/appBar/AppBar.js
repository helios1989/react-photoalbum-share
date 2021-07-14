import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Auth } from 'aws-amplify';
const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }));
  

  export default function ButtonAppBar(props) {
    const classes = useStyles();
    const signoutHandler = () => {

        if (props.isLogged) {

            signOut();
        }
    }
      const signOut = async () => {
          try {
              console.log("SIGNOUT");
              await Auth.signOut({ global: true });
              window.location.reload();
           
          } catch (error) {
              console.log('error signing out: ', error);
          }
      }
    const signoutButton = (isLogged) => {
        return (
            <Button color="inherit" onClick={signoutHandler}>
                {isLogged ? "SIGN OUT": "SIGN IN"}
            </Button>
        )
    }
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              PHOTO ALBUMS
            </Typography>
            {signoutButton(props.isLogged)}
          </Toolbar>
        </AppBar>
      </div>
    );
  }