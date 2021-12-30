import { Box, HStack, Tag, Text } from '@chakra-ui/react';
import FoodCard from './FoodCard';
import React from 'react';

function ShopCardList(props) {
  const { display } = props;
  // 获取所有的商家名
  let shops = display.map((food) => food?.window);
  shops = Array.from(new Set(shops)); // 商家名去重
  // 获取商家数据
  shops = shops.map((shopName) => {
    const shopData = display.find((food) => {
      return food.window === shopName;
    });
    const foodList = display.filter((food) => food?.window === shopName);
    const status = !!foodList.find((food) => food.status === true);
    return {
      name: shopName,
      place: shopData?.place,
      comment: shopData?.shopComment,
      status: status,
      foods: foodList,
      number: shopData?.number,
    };
  });

  return shops.map((shop) => (
    <Box textAlign='justify' p='8px 8px' w='100%' borderWidth='1px' borderRadius='2xl' overflow='hidden' my={2}>
      <HStack mb={2}>
        {
          shop.number ?
            <Box borderRadius='99px' borderWidth='1px' px={1} fontSize='sm' minWidth='23px' textAlign='center'
                 color='gray.500'>
              {shop.number}
            </Box> :
            null
        }
        <Text fontSize='lg' ml={2}><strong>{shop.name}</strong></Text>
        <Tag>{shop.place}</Tag>
        <Tag colorScheme={shop.status ? 'green' : 'red'}>{shop.status ? '营业' : '停业'}</Tag>
      </HStack>
      <Text fontSize='sm' ml={2} mb={2}>
        <div dangerouslySetInnerHTML={{ __html: shop.comment }} />
      </Text>
      <FoodCard foods={shop.foods} shopStatus={shop.status} />
    </Box>
  ));
}

export default ShopCardList;