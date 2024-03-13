import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useColorScheme } from '@mui/joy/styles';
import { Box, Typography } from '@mui/joy';
import IconButton from '@mui/joy/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';

import { NavbarProps } from './Navbar';
import logo from '../../../../public/logoIcon.svg';

const ColorSchemeToggle = () => {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <IconButton size='sm' variant='outlined' color='primary' />;
  }

  return (
    <IconButton
      id='toggle-mode'
      size='sm'
      variant='outlined'
      color='primary'
      onClick={() => {
        if (mode === 'light') {
          setMode('dark');
        } else {
          setMode('light');
        }
      }}
    >
      {mode === 'light' ? <DarkModeRoundedIcon /> : <LightModeRoundedIcon />}
    </IconButton>
  );
};

const Navbar = (props: NavbarProps) => {
  const { setDrawerOpen } = props;
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 1.5,
        }}
      >
        <IconButton
          variant='outlined'
          size='sm'
          onClick={() => setDrawerOpen(true)}
          sx={{ display: { sm: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
        <Image src={logo} alt='Standup Daily' height='32px' width='32px'></Image>
        <Typography fontWeight='700' fontSize='16px'>
          Standup Daily
        </Typography>
      </Box>
      <ColorSchemeToggle />
    </>
  );
};

export default Navbar;
