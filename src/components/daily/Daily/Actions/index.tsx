import { useState } from 'react';
import IconButton from '@mui/joy/IconButton';
import MoreHoriz from '@mui/icons-material/MoreHoriz';
import {
  ListDivider,
  ListItemDecorator,
  Menu,
  MenuItem,
  Typography,
  IconButtonProps,
} from '@mui/joy';
import { Edit } from '@mui/icons-material';

import DeleteDaily from '../../DeleteDaily';
import { ActionsProps } from './Actions';

const Actions = (props: ActionsProps) => {
  const { id } = props;

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
        <MenuItem onClick={handleClose}>
          <ListItemDecorator>
            <Edit />
          </ListItemDecorator>
          <Typography level='body1'>Edit</Typography>
        </MenuItem>
        <ListDivider />
        <MenuItem color='danger'>
          <DeleteDaily id={id} />
        </MenuItem>
      </Menu>
    </>
  );
};

export default Actions;
