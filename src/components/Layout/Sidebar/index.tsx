import { useRouter } from 'next/router';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemButton from '@mui/joy/ListItemButton';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import ListItemContent from '@mui/joy/ListItemContent';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import SettingsIcon from '@mui/icons-material/Settings';
import { useTranslation } from 'next-i18next';

const Sidebar = () => {
  const { t } = useTranslation('common');
  const router = useRouter();

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
            fontWeight={700}
            sx={{
              fontSize: '12px',
              textTransform: 'uppercase',
              letterSpacing: '.1rem',
            }}
          >
            {t('sidebar.browse')}
          </Typography>
        </Box>
        <List aria-labelledby='nav-list-browse'>
          <ListItem>
            <ListItemButton
              variant={router.pathname === '/' ? 'soft' : 'plain'}
              color='primary'
              sx={{ padding: '8px' }}
              onClick={() => router.push('/')}
            >
              <ListItemDecorator sx={{ color: 'text.primary' }}>
                <FolderOpenIcon fontSize='small' />
              </ListItemDecorator>
              <ListItemContent sx={{ color: 'text.primary', fontWeight: 700 }}>{t('sidebar.myTeam')}</ListItemContent>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton
              variant={router.pathname === '/settings' ? 'soft' : 'plain'}
              color='primary'
              sx={{ padding: '8px'}}
              onClick={() => router.push('/settings')}
            >
              <ListItemDecorator sx={{ color: 'text.primary' }}>
                <SettingsIcon fontSize='small' />
              </ListItemDecorator>
              <ListItemContent sx={{ color: 'text.primary', fontWeight: 700 }}>
                {t('sidebar.settings')}
              </ListItemContent>
            </ListItemButton>
          </ListItem>
        </List>
      </ListItem>
    </List>
  );
};

export default Sidebar;
