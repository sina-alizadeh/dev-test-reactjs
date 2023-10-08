import {
  Toolbar,
  Typography,
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Drawer,
  AppBar,
  IconButton,
} from "@mui/material";
import React, {
  FC,
  ReactElement,
  useContext,
  useEffect,
  useState,
} from "react";
import { TUser } from "../../core/models/user.model";
import { TokenContext } from "../../context/TokenContext";
import { useGetAuthUser } from "../../core/services/api/user.api";
import jwtDecode from "jwt-decode";
import { Loading } from "./Loading";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";

const drawerWidth = 240;

interface IPanelLayoutProps {
  children: JSX.Element;
  pageHeaderName: string;
}

const PanelLayout: FC<IPanelLayoutProps> = ({ children, pageHeaderName }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<TUser>();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const token = useContext(TokenContext);
  const getAuthUser = useGetAuthUser();

  useEffect(() => {
    if (!token?.token) return;
    getAuthUser.mutate(undefined, {
      onSuccess: (data) => {
        setUser(data.data);
      },
    });
  }, [token?.token]);

  if (getAuthUser.isLoading || !user)
    return (
      <Box
        sx={{
          display: "flex",
          minHeight: "100vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Loading
          sx={{ width: "100px !important", height: "100px !important" }}
        />
      </Box>
    );

  const drawer = (
    <>
      <Toolbar sx={{ gap: "10px" }}>
        <Avatar
          src={user.avatar}
          sx={{ width: "25px", height: "25px", borderRadius: "50%" }}
        />
        <Typography>{user.name}</Typography>
      </Toolbar>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => {
              navigate("/");
            }}
          >
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary={"داشبورد"} />
          </ListItemButton>
        </ListItem>
        <ListItem
          disablePadding
          onClick={() => {
            navigate("/profile");
          }}
        >
          <ListItemButton>
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary={"پروفایل"} />
          </ListItemButton>
        </ListItem>
        <ListItem
          disablePadding
          onClick={() => {
            token && token.logOut();
          }}
        >
          <ListItemButton>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary={"خروج"} />
          </ListItemButton>
        </ListItem>
      </List>
    </>
  );

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              {pageHeaderName}
            </Typography>
          </Toolbar>
        </AppBar>
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders"
        >
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: "none", sm: "block" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
          }}
        >
          <Toolbar />
          {children}
        </Box>
      </Box>
    </>
  );
};

export { PanelLayout };
function useRouter() {
  throw new Error("Function not implemented.");
}
