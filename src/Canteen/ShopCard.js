import { Button, Container, HStack, Spinner, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import md5 from 'js-md5';
import axios from 'axios';
import FoodSearch from './FoodSearch';
import ShopCardList from './ShopCardList';
import RandomBar from './RandomBar';

function ShopCard(props) {
  const { canteen } = props;
  localStorage.setItem('canteen', canteen);

  const [foods, setFoods] = useState([]);
  const [display, setDisplay] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isRandom, setIsRandom] = useState(false);

  const setSessionStorage = async (data, time) => {
    sessionStorage.setItem(canteen, JSON.stringify(data));
    sessionStorage.setItem(`${canteen}更新时间`, time);
  };

  const getSessionStorage = async () => {
    return JSON.parse(sessionStorage.getItem(canteen));
  };

  const getData = async (canteen) => {
    setFoods([]);
    setDisplay([]);
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
          order: '-status,-updatedAt',
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
    const searchList = search.split(' ');
    const filteredFoods = foods.filter((food) => {
      let isMatch = true;
      for (search of searchList) {
        if (search === '') continue;
        isMatch = isMatch && (food.name.includes(search) || food?.window?.includes(search) || food?.place.includes(search));
      }
      return isMatch;
    });
    setDisplay(filteredFoods);
    setLoading(false);
  };

  const handleRandom = () => {
    if (!isRandom) {
      setDisplay([]);
      setIsRandom(true);
      return;
    }
    let food;
    do {
      const random = Math.floor(Math.random() * foods.length);
      food = foods[random];
    } while (food?.status === false || food?.comment === '加料');
    setDisplay([food, ...display]);
  };

  const handleRandomCancel = () => {
    setIsRandom(false);
    setDisplay(foods);
  };

  const handleRandomReset = () => {
    setDisplay([]);
  };

  return (
    <>{
      loading ? <Spinner size='xl' my='25%' /> :
        <>
          <Container mt={1}>
            <HStack>
              <Button borderRadius='99px' onClick={handleRandom}>{isRandom ? '随机一个！' : '随机'}</Button>
              {isRandom ?
                <RandomBar
                  handleRandomCancel={handleRandomCancel}
                  handleRandomReset={handleRandomReset}
                /> :
                <FoodSearch canteen={canteen} onSearch={onSearch} />}
            </HStack>
          </Container>
          <Container maxW='container.xl' p='0'>
            <ShopCardList display={display} />
            {isRandom && display.length === 0 ? <Text textAlign='center' my={10}>点击「随机一个！」开始随机抽取食物！</Text> : null}
          </Container>
        </>
    }</>
  );
}

export default ShopCard;