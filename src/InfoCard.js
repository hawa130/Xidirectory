import { Box, Divider, HStack, SimpleGrid, Spacer, Tag, Text } from '@chakra-ui/react';
import { BookOne, ChopsticksFork, HangerTwo, MailPackage, Printer, Shopping, WaterLevel } from '@icon-park/react';

function InfoCard(props) {
  const { data } = props;

  const getIcon = (item) => {
    switch (item) {
      case '饮食':
        return <ChopsticksFork theme='outline' fill='#333' />;
      case '生活':
        return <HangerTwo theme='outline' fill='#333' />;
      case '打印':
        return <Printer theme='outline' fill='#333' />;
      case '学习':
        return <BookOne theme='outline' fill='#333' />;
      case '快递':
        return <MailPackage theme='outline' fill='#333' />;
      case '超市':
        return <Shopping theme='outline' fill='#333' />;
      case '饮用水':
        return <WaterLevel theme='outline' fill='#333' />;
      default:
        return item;
    }
  };

  return (
    <SimpleGrid minChildWidth='280px' spacing={2}>
      {
        data.map((item) => {
          return (
            <Box borderWidth='1px' borderRadius='lg' overflow='hidden' p='8px 16px'>
              <HStack w='100%'>
                <Text fontSize='lg' fontWeight='semibold'>{item.name}</Text>
                <Spacer />
                <Tag colorScheme={item.status ? 'green' : 'red'}>{item.status ? '开放' : '关闭'}</Tag>
              </HStack>
              <Spacer h='8px' />
              <HStack>
                <Text size='sm' color='grey'>{getIcon(item.category)}</Text>
                {
                  item.tags.map((tag) => {
                    return (
                      <Tag key={tag}>{tag}</Tag>
                    );
                  })
                }
              </HStack>
              <Divider m='8px 0' />
              <Text textAlign='justify' fontSize='sm' color='dimgrey'>
                {item?.description ? item.description : '无描述'}
              </Text>
              <Divider m='8px 0' />
              <Text textAlign='right' fontSize='sm' color='grey'>更新于：{item.updatedAt}</Text>
            </Box>);
        })
      }
    </SimpleGrid>
  );
}

export default InfoCard;