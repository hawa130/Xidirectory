import { Box, Tab, TabList, Tabs } from '@chakra-ui/react';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import InfoPage from './Info/InfoPage';
import AboutPage from './About/AboutPage';
import CanteenPage from './Canteen/CanteenPage';
import QueuePage from './Queue/QueuePage';

function MainPage() {
  const { pathname } = useLocation();
  const tabs = ['/canteen', '/info', '/queue', '/about'];
  let defaultIndex = tabs.indexOf(pathname);
  defaultIndex = defaultIndex === -1 ? 0 : defaultIndex;

  return (
    <Tabs variant='line' align='center' colorScheme='teal' isLazy={true} defaultIndex={defaultIndex}>
      <TabList>
        <Link to='/canteen'>
          <Tab key='/canteen'>食堂菜单</Tab>
        </Link>
        <Link to='/info'>
          <Tab key='/info'>服务状况</Tab>
        </Link>
        <Link to='/queue'>
          <Tab key='/queue'>排队时长</Tab>
        </Link>
        <Link to='/about'>
          <Tab key='/about'>关于</Tab>
        </Link>
      </TabList>

      <Box>
        <Routes>
          <Route path='/' element={<CanteenPage />} />
          <Route path='/canteen' element={<CanteenPage />} />
          <Route path='/info' element={<InfoPage />} />
          <Route path='/queue' element={<QueuePage />} />
          <Route path='/about' element={<AboutPage />} />
        </Routes>
      </Box>
    </Tabs>
  );
}

export default MainPage;