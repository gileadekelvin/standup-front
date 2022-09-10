import Box, { BoxProps } from '@mui/joy/Box';
import Sheet from '@mui/joy/Sheet';

const Root = (props: BoxProps) => (
  <Box
    {...props}
    sx={[
      {
        bgcolor: 'background.body',
        minHeight: '100vh',
      },
      ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
    ]}
  />
);

const Header = (props: BoxProps) => (
  <Box
    component='header'
    className='Header'
    {...props}
    sx={[
      {
        p: 2,
        gap: 2,
        bgcolor: 'background.body',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gridColumn: '1 / -1',
        borderBottom: '1px solid',
        borderColor: 'divider',
        position: 'fixed',
        minWidth: 'calc(100% - 48px)',
        top: 0,
        zIndex: 1100,
      },
      ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
    ]}
  />
);

const SideNav = (props: BoxProps) => (
  <Box
    component='nav'
    className='Navigation'
    {...props}
    sx={[
      {
        p: 2,
        marginTop: '64px',
        position: 'fixed',
        top: 0,
        bottom: 0,
        minWidth: '240px',
        bgcolor: 'background.body',
        borderRight: '1px solid',
        borderColor: 'divider',
        display: {
          xs: 'none',
          sm: 'initial',
        },
      },
      ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
    ]}
  />
);

const SidePane = (props: BoxProps) => (
  <Box
    className='Inbox'
    {...props}
    sx={[
      {
        bgcolor: 'background.body',
        borderRight: '1px solid',
        borderColor: 'divider', 
        display: {
          xs: 'none',
          md: 'initial',
        },
      },
      ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
    ]}
  />
);

const Main = (props: BoxProps) => (
  <Box
    component='main'
    className='Main'
    {...props}
    sx={[
      {
        py: 1,
        marginTop: '64px',
        marginLeft: {
          sm: '280px',
        },
      },
      ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
    ]}
  />
);

const SideDrawer = ({
  onClose,
  ...props
}: BoxProps & { onClose: React.MouseEventHandler<HTMLDivElement> }) => (
  <Box
    {...props}
    sx={[
      { position: 'fixed', zIndex: 1200, width: '100%', height: '100%' },
      ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
    ]}
  >
    <Box
      role='button'
      onClick={onClose}
      sx={{
        position: 'absolute',
        inset: 0,
        bgcolor: (theme) => `rgba(${theme.vars.palette.neutral.darkChannel} / 0.8)`,
      }}
    />
    <Sheet
      sx={{
        minWidth: 256,
        width: 'max-content',
        height: '100%',
        p: 2,
        boxShadow: 'lg',
        bgcolor: 'background.body',
      }}
    >
      {props.children}
    </Sheet>
  </Box>
);

const Layout = {
  Root,
  Header,
  SideNav,
  SidePane,
  SideDrawer,
  Main,
};

export default Layout;
