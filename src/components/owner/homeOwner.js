import '../../components/owner/homeOwner.css';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Link , useLocation} from 'react-router-dom';

const drawerWidth = 240;
export default function HomeOwner() {
    const items = [
        { text: 'Dashboard', path: '/home-owner' },
        { text: 'Thông tin', path: '/thong-tin' },
        { text: 'Lịch đặt', path: '/lich-dat' },
        { text: 'Quản lý sân bóng', path: '/quan-ly-san-bong' }
    ];

    const location = useLocation();

    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
                >
                </AppBar>
                <Drawer
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: drawerWidth,
                            boxSizing: 'border-box',
                        },
                    }}
                    variant="permanent"
                    anchor="left"
                >
                    <div className='logo'>
                        <Link to={"/home-owner"}>
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQM_3TfYToHgKq8riyh-_jv5n8LPbGiyIRIJg&s" className="img-header ms-1"></img>
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
                </Drawer>
              
            </Box>
        </>
    );
}