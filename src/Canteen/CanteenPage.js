import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import ShopCard from './ShopCard';

const canteens = ['竹园', '海棠', '丁香'];

function CanteenPage(props) {
  return (
    <Tabs variant='soft-rounded' align='center' colorScheme='gray' p='0' isLazy={true} defaultIndex={0}>
      <TabList flexFlow='wrap' paddingTop='16px'>
        {canteens.map((canteen, index) => (
          <Tab key={index}>{canteen}</Tab>
        ))}
      </TabList>

      <TabPanels>
        {
          canteens.map((canteen, index) => (
            <TabPanel key={index} pt={1}>
              <ShopCard canteen={canteen} />
            </TabPanel>
          ))
        }
      </TabPanels>
    </Tabs>
  );
}

export default CanteenPage;