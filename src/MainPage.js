import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import TimeShare from './TimeShare';
import InfoPage from './InfoPage';
import AboutPage from './AboutPage';

function MainPage() {
  return (
    <Tabs variant='line' align='center' colorScheme='teal' isLazy={true}>
      <TabList>
        <Tab>排队分享</Tab>
        <Tab>服务查询</Tab>
        <Tab>关于</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <TimeShare />
        </TabPanel>
        <TabPanel p='0'>
          <InfoPage />
        </TabPanel>
        <TabPanel p='0'>
          <AboutPage />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}

export default MainPage;