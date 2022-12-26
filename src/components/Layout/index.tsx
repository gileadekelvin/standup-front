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
          minHeight: 'calc(100vh - 64px)',
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
          <Box>{children}</Box>
        </Layout.Main>
      </Layout.Root>
    </>
  );
};

export default DefaultLayout;
