import { useState } from 'react';
import IconButton from '@mui/joy/IconButton';
import MoreHoriz from '@mui/icons-material/MoreHoriz';
import { Menu, MenuItem, IconButtonProps } from '@mui/joy';

import DeleteDaily from '../../DeleteDaily';
import UpdateDaily from '../../UpdateDaily';
import { ActionsProps } from './Actions';

const Actions = (props: ActionsProps) => {
  const { id, daily } = props;

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  const handleClick: IconButtonProps['onClick'] = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        variant='soft'
        color='neutral'
        size='sm'
        sx={{ ml: 'auto' }}
        onClick={handleClick}
      >
        <MoreHoriz />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        keepMounted
        onClose={handleClose}
        placement='bottom-end'
      >
        <MenuItem>
          <UpdateDaily id={id} daily={daily} />
        </MenuItem>
        <MenuItem color='danger'>
          <DeleteDaily id={id} />
        </MenuItem>
      </Menu>
    </>
  );
};

export default Actions;
