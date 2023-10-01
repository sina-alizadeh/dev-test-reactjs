import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { FC, useContext, useEffect, useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import { TokenContext } from "../../context/TokenContext";
import jwtDecode from "jwt-decode";
import { useGetUserById } from "../../core/services/api/user.api";
import { TUser } from "../../core/models/user.model";
const drawerWidth = 240;

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

const Dashboard: FC = (props: Props) => {
  const [user, setUser] = useState<TUser>();
  const token = useContext(TokenContext);
  const getUserById = useGetUserById();
  useEffect(() => {
    const decode = token?.token && (jwtDecode(token?.token) as any);
    console.log("decode", decode);
    getUserById.mutate(decode.sub, {
      onSuccess: (data) => {
        console.log(data.data);
        setUser(data.data);
      },
    });
  }, [token?.token]);

  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const tokenCtx = useContext(TokenContext);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // todo add loading
  if (getUserById.isLoading) return <div></div>;

  const drawer = (
    <>
      <Toolbar></Toolbar>
      <Divider />
      <List>
        <ListItem disablePadding sx={{ background: "#ccc" }}>
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
            tokenCtx && tokenCtx.logOut();
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

  const container =
    window !== undefined ? () => window().document.body : undefined;
  return (
    <>
      <Box sx={{ display: "flex" }}>
        {/* <CssBaseline /> */}
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
              داشبورد
            </Typography>
          </Toolbar>
        </AppBar>
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders"
        >
          <Drawer
            container={container}
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
          <Typography>به داشبورد خوش آمدید</Typography>
        </Box>
      </Box>
    </>
  );
};

export { Dashboard };
