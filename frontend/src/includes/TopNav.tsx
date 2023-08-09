import {useState,useEffect} from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import LogoutIcon from '@mui/icons-material/Logout';
import { Badge, IconButton, InputBase, Link, Stack } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PaymentsIcon from '@mui/icons-material/Payments';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartCheckoutRoundedIcon from '@mui/icons-material/ShoppingCartCheckoutRounded';
import { useMediaQuery, useTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const drawerWidth = 240;

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: '#f1f1f1',
  '&:hover': {
    backgroundColor: '#f1f1f1',
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function ClippedDrawer() {
  const theme = useTheme()
  const isMobileView = useMediaQuery(theme.breakpoints.down('sm'));
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [showProfileIcon, setshowProfileIcon] = useState(false);
  const [mobileMenuIcon, setshowmobileMenuIcon] = useState(false);

  useEffect(() => {
    // This will run whenever isMobileView changes
    if (isMobileView) {
      setshowmobileMenuIcon(true)
    } 
  }, [isMobileView]);
  
  const handleLogout = () =>{
    setIsDrawerVisible(!isDrawerVisible)
    setshowProfileIcon(!setshowProfileIcon)
  }

  const handleShowProfileIcon = () =>{
    setshowProfileIcon(!setshowProfileIcon)
  }

  const handleProfileMenuOpen = () =>{
    setIsDrawerVisible(!isDrawerVisible)
  }
  
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar elevation={0} position="static" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1,backgroundColor: 'white', color: 'black' }}>
        <Toolbar>
          <Link href="/">
            <Box
              component="img"
              sx={{ height: 54 }}
              alt="MloFlow Logo"
              src="data:image/jpeg;base64,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"
            />
          </Link>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          <Stack direction='row' spacing={1} sx={{ marginLeft: 'auto' }}>
            {isMobileView ? <MenuIcon/>:
            (
              <>
              {showProfileIcon ? (
                <IconButton
                size="large"
                aria-label="user Profile"
                color="inherit"
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
              >
                <Badge >
                  <AccountCircle  />
                </Badge>
              <Typography variant="body1">Isaac Kamula</Typography>
            </IconButton> 
              ): (
                <Link>
                  <IconButton onClick={setshowProfileIcon}>Login/Signup</IconButton>
                </Link> 
              )}   
              <IconButton
              size="large"
              aria-label="Cart"
              color="inherit"
              
              >
              <Badge badgeContent={6} color="error">
                <ShoppingCartCheckoutRoundedIcon />
              </Badge>
            </IconButton>   
            <IconButton
              size="large"
              aria-label="show favourites"
              color="inherit"
              onClick={() => console.log('Profile clicked')}
              >
              <Badge badgeContent={17} color="error">
                <FavoriteBorderIcon />
              </Badge>
            </IconButton>

            </>
            )
            
            }
                  
              
          </Stack>
        </Toolbar>
      </AppBar>
      {isDrawerVisible && (
        <Drawer
        variant="permanent"
        anchor='right'
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
        <List>
            <ListItem  disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <AccountCircleIcon/>
                  </ListItemIcon>
                  <ListItemText primary='Profile' />
                </ListItemButton>
            </ListItem>

            <ListItem  disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <PaymentsIcon/>
                  </ListItemIcon>
                  <ListItemText primary='Payments' />
                </ListItemButton>
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem  disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <SupportAgentIcon />
                  </ListItemIcon>
                  <ListItemText primary='Help & Support' />
                </ListItemButton>
            </ListItem>
            <ListItem  disablePadding onClick={handleLogout}>
                <ListItemButton>
                  <ListItemIcon>
                    <LogoutIcon />
                  </ListItemIcon>
                  <ListItemText primary='Logout' />
                </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>    
      )}        
    </Box>
  );
}