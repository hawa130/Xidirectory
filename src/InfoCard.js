import { Box, Divider, HStack, SimpleGrid, Spacer, Tag, Text } from '@chakra-ui/react';
import { BookOne, ChopsticksFork, HangerTwo, MailPackage, Printer, Shopping, WaterLevel } from '@icon-park/react';

function InfoCard(props) {
  const { data } = props;

  const getIcon = (item) => {
    switch (item) {
      case '饮食':
        return <ChopsticksFork theme='outline' />;
      case '生活':
        return <HangerTwo theme='outline' />;
      case '打印':
        return <Printer theme='outline' />;
      case '学习':
        return <BookOne theme='outline' />;
      case '快递':
        return <MailPackage theme='outline' />;
      case '超市':
        return <Shopping theme='outline' />;
      case '饮用水':
        return <WaterLevel theme='outline' />;
      default:
        return item;
    }
  };

  return (
    <SimpleGrid minChildWidth='300px' spacing={2}>
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
                <Text size='sm' color='gray.600'>{getIcon(item.category)}</Text>
                <HStack flexFlow='wrap'>
                  {
                    item.tags.map((tag) => {
                      return (
                        <Tag key={tag}>{tag}</Tag>
                      );
                    })
                  }
                </HStack>
              </HStack>
              <Divider m='8px 0' />
              <Text textAlign='justify' fontSize='sm' color='gray.600'>
                {item?.description ? item.description : '无描述'}
              </Text>
              <Divider m='8px 0' />
              <Text textAlign='right' fontSize='sm' color='gray.400'>更新于：{item.updatedAt}</Text>
            </Box>);
        })
      }
    </SimpleGrid>
  );
}

export default InfoCard;