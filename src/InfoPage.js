import { Container } from '@chakra-ui/react';
import InfoDisplay from './InfoDisplay';
import axios from 'axios';
import React, { useEffect } from 'react';
import md5 from 'js-md5';

const getData = async (para) => {
  const timestamp = Date.now();
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
  return (resList.map((row) => {
    return {
      objectId: row?.objectId,
      name: row?.name,
      status: row?.status,
      category: row?.category,
      tags: row?.tags,
      description: row?.description,
      updatedAt: new Date(row?.updatedAt).toLocaleString('zh-CN', { hour12: false }),
    };
  }));
};

function InfoPage(props) {
  const [state, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    getData().then((data) => {
      setLoading(false);
      setData(data);
    });
  }, []);

  return (
    <Container maxW='container.xl' p='0'>
      <InfoDisplay infoList={state} loading={loading} />
    </Container>
  );
}

export default InfoPage;