import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import useMediaQuery from '@mui/material/useMediaQuery';
import { FaArrowRightLong } from 'react-icons/fa6';
import '../../components/sidebar/sidebar.css';

const drawerWidth = 240;

export default function Sidebar() {
    const items = [
    { text: 'Dashboard', path: '/home-owner' },
    { text: 'Thông tin', path: '/thong-tin' },
    { text: 'Lịch đặt', path: '/lich-dat' },
    { text: 'Quản lý sân bóng', path: '/quan-ly-san-bong' }
];

    const location = useLocation();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('currentUser'));

    const checkAuth = () => {
        return !!localStorage.getItem('currentUser');
    };

    useEffect(() => {
        setIsLoggedIn(checkAuth());
    }, []);

    const handleLogout = async () => {
        console.log('Bắt đầu quá trình đăng xuất');

        try {
            const response = await axios.post('http://localhost:8080/logout');
            if (response.status === 200) {
                console.log('Đăng xuất thành công');
                localStorage.setItem('currentLocation', '');
                localStorage.removeItem('currentUser');
                navigate('/');
            }
        } catch (error) {
            console.error('Lỗi khi đăng xuất:', error);
            alert('Có lỗi xảy ra khi đăng xuất. Vui lòng thử lại.');
        }
    };

    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div className='drawer-content'>
            <div className='logo'>
                <Link to={'/'}>
                    <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQM_3TfYToHgKq8riyh-_jv5n8LPbGiyIRIJg&s' className='img-header ms-1' />
                </Link>
                <h6 className='sport'>Bóng Đá Plus</h6>
            </div>
            <Divider />
            <List>
                {items.map((item, index) => (
                    <ListItem key={item.text} disablePadding>
                        <ListItemButton component={Link} to={item.path}>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText
                                primary={item.text}
                                style={{
                                    color: 'black',
                                    fontWeight: location.pathname === item.path ? 'bold' : 'normal'
                                }}
                            />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            {isLoggedIn && (
                <div className='logout-container' style={{ marginTop: 'auto' }}>
                    <p style={{ cursor: 'pointer' }} data-bs-toggle='modal' data-bs-target='#exampleModal2'>
                        Đăng xuất <FaArrowRightLong />
                    </p>
                </div>
            )}
            {isLoggedIn && (
                <div className='modal fade' id='exampleModal2' tabIndex='-1' aria-labelledby='exampleModalLabel' aria-hidden='true'>
                    <div className='modal-dialog'>
                        <div className='modal-content'>
                            <div className='modal-header'>
                                <h1 className='modal-title fs-5' id='exampleModalLabel'>
                                    Bạn chắc chắn muốn đăng xuất
                                </h1>
                                <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
                            </div>
                            <div className='modal-footer'>
                                <button type='button' className='btn btn-secondary pt-1 pb-1' data-bs-dismiss='modal'>
                                    Hủy
                                </button>
                                <button type='button' className='btn btn-primary pt-1 pb-1' onClick={handleLogout}>
                                    Đăng xuất
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );

    const isMobile = useMediaQuery('(max-width:760px)');

    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar
                    position='fixed'
                    sx={{
                        width: { sm: `calc(100% - ${drawerWidth}px)` },
                        ml: { sm: `${drawerWidth}px` }
                    }}
                >
                    <Toolbar>
                        <IconButton
                            color='inherit'
                            aria-label='open drawer'
                            edge='start'
                            onClick={handleDrawerToggle}
                            sx={{ display: { sm: 'none' } }}
                        >
                            <MenuIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Box component='nav' sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }} aria-label='mailbox folders'>
                    <Drawer
                        variant={isMobile ? 'temporary' : 'permanent'}
                        open={isMobile ? mobileOpen : true}
                        onClose={handleDrawerToggle}
                        ModalProps={{
                            keepMounted: true 
                        }}
                        sx={{
                            display: { xs: 'block', sm: 'block' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Box>
            </Box>
        </>
    );
}