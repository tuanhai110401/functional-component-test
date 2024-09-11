import { IconButton, Menu, MenuItem, Typography, Avatar } from "@mui/material";
import { HiOutlineUser, HiOutlineBell } from "react-icons/hi2";
import React, { useState } from "react";
function Header() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className="header">
      <h4 className="header-title">Create Order</h4>
      <div>
        <IconButton sx={{ mr: 2 }}>
          <HiOutlineBell />
        </IconButton>
        <IconButton onClick={handleClick}>
          <HiOutlineUser />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>
            <Typography variant="body1">Profile</Typography>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Typography variant="body1">Settings</Typography>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Typography variant="body1">Logout</Typography>
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
}

export default Header;
