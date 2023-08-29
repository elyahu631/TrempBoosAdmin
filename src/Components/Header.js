import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowBack from '@mui/icons-material/ArrowBack'; // Import for Back button
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { LoginContext } from '../Contexts/LoginContext';


const drawerWidth = 240;
const navItems = ['Home', 'sign out'];

function Header(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useContext(LoginContext);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleSignOut = () => {
    logout();
    navigate('/');
  };

  const handleBack = () => {
    navigate(-1);
  }

  const drawer = isLoggedIn ? (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }} >
        TREMP-BOSS MANAGER
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }} onClick={() => item === 'Home' ? navigate('/home') : handleSignOut()}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  ) : <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
    <Typography variant="h6" sx={{ my: 2 }} >
    TREMP-BOSS MANAGER
    </Typography>
  </Box>

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav" sx={{ bgcolor: "primary.main" }}>
        <Toolbar>

          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { xs: 'block', sm: 'none' }, }}
          >
            <MenuIcon />
          </IconButton>
          {isLoggedIn && (<IconButton
            color="inherit"
            aria-label="go back"
            edge="end"
            onClick={handleBack}
            sx={{ mr: 2, display: { xs: 'none', sm: 'block' }, }}
          >
            <ArrowBack />
          </IconButton>)}
          <Typography
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'block', sm: 'block' }, textAlign: 'center' }}
            color="white"
          >
        TREMP-BOSS MANAGER
          </Typography>

          {isLoggedIn && (<IconButton
            color="inherit"
            aria-label="go back"
            edge="end"
            onClick={handleBack}
            sx={{ mr: 2, display: { xs: 'block', sm: 'none' }, }}
          >
            <ArrowBack />
          </IconButton>)}

          {isLoggedIn && (<Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navItems.map((item) => (
              <Button key={item} sx={{ color: '#fff' }} onClick={() => item === 'Home' ? navigate('/home') : handleSignOut()}>
                {item}
              </Button>
            ))}
          </Box>
          )}
        </Toolbar>
      </AppBar>
      <Box >
        <Drawer
          color='info'
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box', width: drawerWidth
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}

export default Header;
