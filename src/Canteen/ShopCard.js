import { Box, Container, HStack, Spinner, Tag, Text } from '@chakra-ui/react';
import FoodCard from './FoodCard';
import React, { useEffect, useState } from 'react';
import md5 from 'js-md5';
import axios from 'axios';
import FoodSearch from './FoodSearch';

function ShopCard(props) {
  const { canteen } = props;

  const [foods, setFoods] = useState([]);
  const [display, setDisplay] = useState([]);
  const [loading, setLoading] = useState(true);

  const setSessionStorage = async (data, time) => {
    sessionStorage.setItem(canteen, JSON.stringify(data));
    sessionStorage.setItem(`${canteen}更新时间`, time);
  };

  const getSessionStorage = async () => {
    return JSON.parse(sessionStorage.getItem(canteen));
  };

  const getData = async (canteen) => {
    setLoading(true);
    const timestamp = Date.now();
    const updateTime = sessionStorage.getItem(`${canteen}更新时间`);
    const foods = sessionStorage.getItem(canteen);
    // 5 分钟以内使用缓存
    if (foods && updateTime && timestamp - updateTime < 1000 * 60 * 5) {
      return getSessionStorage();
    }

    const appKey = 'Da0dObuKbEzfjgsN6mxskA2p';
    const tmp = md5(`${timestamp}${appKey}`);
    const sign = `${tmp},${timestamp}`;
    const res = await axios.get('https://ncov-api.hawa130.com/1.1/classes/canteen',
      {
        headers: {
          'X-LC-Id': '2x27utDtFSuLNtGkWVwT1m7v-gzGzoHsz',
          'X-LC-Sign': sign,
        },
        params: {
          where: { 'place': { '$regex': canteen } },
          limit: 1000,
        },
      });
    const data = res.data.results;
    await setSessionStorage(data, timestamp);
    return data;
  };

  useEffect(() => {
    getData(canteen).then((data) => {
      setLoading(false);
      setFoods(data);
      setDisplay(data);
    });
  }, [canteen]);

  const onSearch = async (search) => {
    setLoading(true);
    if (search === '') {
      setDisplay(foods);
      setLoading(false);
      return;
    }
    const filteredFoods = foods.filter((food) => {
      return food.name.includes(search) || food?.window?.includes(search);
    });
    setDisplay(filteredFoods);
    setLoading(false);
  };

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
    };
  });

  const shopList = shops.map((shop) => (
    <Box textAlign='justify' p='8px 8px' w='100%' borderWidth='1px' borderRadius='2xl' overflow='hidden' my={2}>
      <HStack mb={2}>
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

  return (
    <>
      <Container mt={1}>
        <FoodSearch canteen={canteen} onSearch={onSearch} />
      </Container>
      <Container maxW='container.xl' p='0'>
        {loading ? <Spinner size='xl' my='25%' /> : null}
        {shopList}
      </Container>
    </>
  );
}

export default ShopCard;