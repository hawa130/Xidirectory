import { Box, HStack, SimpleGrid, Text, Tooltip, useDisclosure } from '@chakra-ui/react';
import FoodReport from './FoodReport';
import { useState } from 'react';

function FoodCard(props) {
  const { foods, shopStatus } = props;

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [item, setItem] = useState({});

  const handleReport = (food) => {
    setItem({ ...food, shopStatus });
    onOpen();
  };

  const cards = foods.map((food) => {
    const priceList = food.price;
    let price;
    if (priceList.length === 0) {
      price = <Text color='gray.500'>暂无数据</Text>;
    } else {
      price = priceList.map((price, index) => {
        return (
          <>
            <Text as='strong' fontSize='lg'>{index === 0 ? '¥' : ' / ¥'}</Text>
            <Text as='strong' fontSize='xl'>{price}</Text>
          </>
        );
      });
    }

    return (
      <Box backgroundColor={food?.comment === '加料' ? 'gray.50' : 'gray.100'}
           borderRadius='lg' px={2} py={1}>
        <HStack>
          <Text fontSize='sm'>{food?.name ? food?.name : <Text color='gray.500'>名称未知</Text>}</Text>
        </HStack>
        <HStack>
          <Tooltip hasArrow label='点击纠错'>
            <Text fontSize='lg' onClick={() => handleReport(food)}>{price}</Text>
          </Tooltip>
          <Text fontSize='sm' color='gray.500'>{`/ ${food?.unit}`}</Text>
        </HStack>
        <Text fontSize='xs' color='gray.500'>
          <div dangerouslySetInnerHTML={{ __html: food?.comment }} />
        </Text>
      </Box>
    );
  });

  return (
    <>
      <SimpleGrid minChildWidth='150px' spacing={2}>
        {cards}
      </SimpleGrid>
      <FoodReport isOpen={isOpen} onClose={onClose} food={item} />
    </>
  );
}

export default FoodCard;