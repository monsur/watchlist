import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Drawer } from "@mui/material";
import { useState } from "react";
import FilterMenu from "./FilterMenu";
import Filters from "./Filters";

function Header(props: { title: string; filters: Filters }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <Box sx={{ marginBottom: "100px" }}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => setIsDrawerOpen(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {props.title}
          </Typography>
        </Toolbar>

        <Drawer open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
          <FilterMenu filters={props.filters} handleClose={() => setIsDrawerOpen(false)}></FilterMenu>
        </Drawer>

      </AppBar>
    </Box>
  );
}

export default Header;
