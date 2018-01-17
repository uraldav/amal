import React from 'react';
import { bool, string, func } from 'prop-types';
import { compose, pure } from 'recompose';
import { NavLink, Link } from 'react-router-dom';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import AccountCircle from 'material-ui-icons/AccountCircle';
import { Manager, Target, Popper } from 'react-popper';
import { MenuItem, MenuList } from 'material-ui/Menu';
import ClickAwayListener from 'material-ui/utils/ClickAwayListener';
import Paper from 'material-ui/Paper';
import Grow from 'material-ui/transitions/Grow';
import Divider from 'material-ui/Divider';

UserMenu.propTypes = {
  signedIn: bool,
  signInPath: string.isRequired,
  accountPath: string.isRequired,
  onMenuOpen: func.isRequired,
  menuOpened: bool,
  onMenuClose: func.isRequired,
  onSignOff: func.isRequired,
};

UserMenu.defaultProps = {
  signedIn: false,
  menuOpened: false,
};

function UserMenu({
  signedIn,
  signInPath,
  accountPath,
  onMenuOpen,
  menuOpened,
  onMenuClose,
  onSignOff,
}) {
  if (signedIn) {
    return (
      <Manager>
        <Target>
          <IconButton
            color="contrast"
            onClick={onMenuOpen}
            aria-owns={menuOpened ? 'user-menu' : null}
            aria-haspopup="true"
          >
            <AccountCircle />
          </IconButton>
        </Target>
        <Popper placement="bottom-end" eventsEnabled={menuOpened}>
          <ClickAwayListener onClickAway={onMenuClose}>
            <Grow in={menuOpened}>
              <Paper id="user-menu">
                <MenuList role="menu" onClick={onMenuClose}>
                  <MenuItem component={NavLink} to={accountPath}>
                    My account
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={onSignOff}>Sign off</MenuItem>
                </MenuList>
              </Paper>
            </Grow>
          </ClickAwayListener>
        </Popper>
      </Manager>
    );
  }

  return (
    <Button color="contrast" to={signInPath} component={Link}>
      Sign In
    </Button>
  );
}

export default compose(pure)(UserMenu);