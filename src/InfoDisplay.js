import InfoCard from './InfoCard';
import {
  Button,
  Collapse,
  Container,
  Input,
  InputGroup,
  InputLeftElement,
  Spinner,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useDisclosure,
} from '@chakra-ui/react';
import { Close, Search } from '@icon-park/react';
import React from 'react';

const categories = ['饮食', '生活', '打印', '学习', '快递', '超市', '饮用水'];

function InfoDisplay(props) {
  const { infoList, loading } = props;

  const { isOpen, onToggle } = useDisclosure();
  const [search, setSearch] = React.useState('');

  const handleSearch = () => {
    onToggle();
  };

  const handleChange = async (e) => {
    const { value } = e.target;
    setSearch(value);
  };

  return (
    <Tabs variant='soft-rounded' align='center' colorScheme='gray' p='0' isLazy={true}>
      <TabList flexFlow='wrap' paddingTop='16px'>
        <Button variant='ghost' borderRadius='99px' onClick={handleSearch}>
          {isOpen ? <Close /> : <Search />}
        </Button>
        <Tab>全部</Tab>
        {
          categories.map((item) => {
            return <Tab key={item}>{item}</Tab>;
          })
        }
      </TabList>
      <Collapse in={isOpen} animateOpacity>
        <Container mt='16px'>
          <InputGroup>
            <InputLeftElement pointerEvents='none' children={<Search />} />
            <Input
              id='search-input'
              variant='filled'
              borderRadius='99px'
              placeholder='搜索名称、分类、标签'
              onChange={handleChange}
            />
          </InputGroup>
        </Container>
        <div style={{ padding: 16 }}>
          <InfoCard data={infoList.filter((row) => {
            return search &&
              (
                row.name.includes(search) ||
                row.category.includes(search) ||
                row.tags.includes(search)
              );
          })} />
        </div>
      </Collapse>
      <Collapse in={!isOpen} animateOpacity>
        {loading ? <Spinner /> : null}
        <TabPanels>
          <TabPanel>
            <InfoCard data={infoList} />
          </TabPanel>
          {
            categories.map((item) => {
              return (
                <TabPanel>
                  <InfoCard data={infoList.filter((row) => {
                    return row.category === item;
                  })} />
                </TabPanel>
              );
            })
          }
        </TabPanels>
      </Collapse>
    </Tabs>
  );
}

export default InfoDisplay;