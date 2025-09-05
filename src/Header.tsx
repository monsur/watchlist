import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Drawer } from "@mui/material";
import { useState } from "react";
import FilterMenu from "./FilterMenu";
import Filters from "./Filters";

type HeaderProps = {
  title: string;
  leftIconType: 'menu' | 'back';
  onLeftIconClick: () => void;
  filters?: Filters;
  zIndex?: number;
};

function Header(props: HeaderProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleLeftIconClick = () => {
    if (props.leftIconType === 'menu') {
      setIsDrawerOpen(true);
    } else {
      props.onLeftIconClick();
    }
  };

  const getLeftIcon = () => {
    return props.leftIconType === 'menu' ? <MenuIcon /> : <ArrowBackIcon />;
  };

  const getAriaLabel = () => {
    return props.leftIconType === 'menu' ? 'menu' : 'back';
  };

  return (
    <Box sx={{ marginBottom: "100px" }}>
      <AppBar position="fixed" sx={{ zIndex: props.zIndex }}>
        <Toolbar sx={{ position: 'relative' }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label={getAriaLabel()}
            sx={{ position: 'absolute', left: 8 }}
            onClick={handleLeftIconClick}
          >
            {getLeftIcon()}
          </IconButton>
          <Typography variant="h6" component="div" sx={{ width: '100%', textAlign: 'center' }}>
            {props.title}
          </Typography>
        </Toolbar>

        {props.filters && (
          <Drawer open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
            <FilterMenu filters={props.filters} handleClose={() => setIsDrawerOpen(false)}></FilterMenu>
          </Drawer>
        )}

      </AppBar>
    </Box>
  );
}

export default Header;
