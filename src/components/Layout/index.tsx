import { useState, PropsWithChildren } from 'react';
import { Box } from '@mui/joy';

import Layout from './Wrappers';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const DefaultLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  return (
    <>
      {drawerOpen && (
        <Layout.SideDrawer onClose={() => setDrawerOpen(false)}>
          <Sidebar />
        </Layout.SideDrawer>
      )}
      <Layout.Root
        sx={{
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'minmax(64px, 200px) minmax(450px, 1fr)',
            md: 'minmax(160px, 300px) minmax(600px, 1fr) minmax(300px, 420px)',
          },
          ...(drawerOpen && {
            height: '100vh',
            overflow: 'hidden',
          }),
        }}
      >
        <Layout.Header>
          <Navbar setDrawerOpen={setDrawerOpen} />
        </Layout.Header>
        <Layout.SideNav>
          <Sidebar />
        </Layout.SideNav>
        <Layout.Main>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: 2,
            }}
          >
            {children}
          </Box>
        </Layout.Main>
      </Layout.Root>
    </>
  );
};

export default DefaultLayout;
