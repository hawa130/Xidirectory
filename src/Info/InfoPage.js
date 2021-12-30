import { Container, Spinner } from '@chakra-ui/react';
import InfoDisplay from './InfoDisplay';
import axios from 'axios';
import React, { useEffect } from 'react';
import md5 from 'js-md5';

function InfoPage(props) {
  const [state, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    getData().then((data) => {
      setLoading(false);
      setData(data);
    });
  }, []);

  const setSessionStorage = async (data, time) => {
    sessionStorage.setItem('服务', JSON.stringify(data));
    sessionStorage.setItem(`服务更新时间`, time);
  };

  const getSessionStorage = async () => {
    return JSON.parse(sessionStorage.getItem('服务'));
  };

  const getData = async (para) => {
    setData([]);
    const timestamp = Date.now();
    const updateTime = sessionStorage.getItem(`服务更新时间`);
    const data = sessionStorage.getItem('服务');
    if (data && updateTime && timestamp - updateTime < 1000 * 60 * 5) {
      return getSessionStorage();
    }

    const appKey = 'Da0dObuKbEzfjgsN6mxskA2p';
    const tmp = md5(`${timestamp}${appKey}`);
    const sign = `${tmp},${timestamp}`;
    const res = await axios.get('https://ncov-api.hawa130.com/1.1/classes/info',
      {
        headers: {
          'X-LC-Id': '2x27utDtFSuLNtGkWVwT1m7v-gzGzoHsz',
          'X-LC-Sign': sign,
        },
        params: {
          order: '-status,-updatedAt',
          limit: 1000,
          ...para,
        },
      });
    const resList = res.data?.results;
    const ret = resList.map((row) => {
      return {
        objectId: row?.objectId,
        name: row?.name,
        status: row?.status,
        category: row?.category,
        tags: row?.tags,
        description: row?.description,
        updatedAt: new Date(row?.updatedAt).toLocaleString('zh-CN', { hour12: false }),
      };
    });
    await setSessionStorage(ret, timestamp);
    return ret;
  };

  return (
    <Container maxW='container.xl' p='0'>
      {loading ? <Spinner size='xl' my='25%' /> : <InfoDisplay infoList={state} />}
    </Container>
  );
}

export default InfoPage;