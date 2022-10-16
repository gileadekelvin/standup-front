import { useState } from 'react';
import IconButton from '@mui/joy/IconButton';
import MoreHoriz from '@mui/icons-material/MoreHoriz';
import { ListDivider, Menu, MenuItem, IconButtonProps } from '@mui/joy';

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
        variant='plain'
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
        <MenuItem sx={{ padding: 0 }}>
          <UpdateDaily id={id} daily={daily} />
        </MenuItem>
        <ListDivider />
        <MenuItem color='danger' sx={{ padding: 0 }}>
          <DeleteDaily id={id} />
        </MenuItem>
      </Menu>
    </>
  );
};

export default Actions;
