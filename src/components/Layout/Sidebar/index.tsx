import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemButton from '@mui/joy/ListItemButton';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import ListItemContent from '@mui/joy/ListItemContent';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';

const Sidebar = () => {
  return (
    <List size='sm' sx={{ '--List-item-radius': '8px' }}>
      <ListItem nested sx={{ p: 0 }}>
        <Box
          sx={{
            mb: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography
            id='nav-list-browse'
            textColor='neutral.500'
            fontWeight={700}
            sx={{
              fontSize: '10px',
              textTransform: 'uppercase',
              letterSpacing: '.1rem',
            }}
          >
            Browse
          </Typography>
        </Box>
        <List aria-labelledby='nav-list-browse'>
          <ListItem>
            <ListItemButton variant='soft' color='primary' sx={{ padding: '8px' }}>
              <ListItemDecorator sx={{ color: 'inherit' }}>
                <FolderOpenIcon fontSize='small' />
              </ListItemDecorator>
              <ListItemContent>My Team</ListItemContent>
            </ListItemButton>
          </ListItem>
        </List>
      </ListItem>
    </List>
  );
};

export default Sidebar;
