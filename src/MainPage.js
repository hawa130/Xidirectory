import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import TimeShare from './Queue/TimeShare';
import InfoPage from './Info/InfoPage';
import AboutPage from './About/AboutPage';
import CanteenPage from './Canteen/CanteenPage';

function MainPage() {
  return (
    <Tabs variant='line' align='center' colorScheme='teal' isLazy={true} defaultIndex={0}>
      <TabList>
        <Tab>食堂查询</Tab>
        <Tab>服务查询</Tab>
        <Tab>排队分享</Tab>
        <Tab>关于</Tab>
      </TabList>

      <TabPanels>
        <TabPanel p='0'>
          <CanteenPage />
        </TabPanel>
        <TabPanel p='0'>
          <InfoPage />
        </TabPanel>
        <TabPanel p='0'>
          <TimeShare />
        </TabPanel>
        <TabPanel p='0'>
          <AboutPage />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}

export default MainPage;