import InfoCard from './InfoCard';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';

const categories = ['最近更新', '饮食', '生活', '打印', '学习', '快递', '超市', '饮用水'];

function InfoDisplay(props) {
  const { infoList } = props;
  return (
    <Tabs variant='soft-rounded' align='center' colorScheme='gray' p='0'>
      <TabList flexFlow='wrap' paddingTop='16px'>
        {categories.map((item) => {
          return <Tab>{item}</Tab>;
        })}
      </TabList>
      <TabPanels>
        {categories.map((item) => {
          return <TabPanel key={item}>
            <InfoCard data={infoList.filter((row) => {
              const category = row.category;
              return item === '最近更新' || category === item;
            })} />
          </TabPanel>;
        })}
      </TabPanels>
    </Tabs>

  );
}

export default InfoDisplay;