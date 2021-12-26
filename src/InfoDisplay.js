import InfoCard from './InfoCard';
import axios from 'axios';
import React, { useEffect } from 'react';

const getData = async () => {
  const res = await axios.get('https://ncov-api.hawa130.com/1.1/classes/info?order=-updatedAt',
    {
      headers: {
        'X-LC-Id': '2x27utDtFSuLNtGkWVwT1m7v-gzGzoHsz',
        'X-LC-Key': 'Da0dObuKbEzfjgsN6mxskA2p',
      },
    });
  const resList = res.data?.results;
  return (resList.map((row) => {
    return {
      name: row?.name,
      status: row?.status,
      category: row?.category,
      tags: row?.tags,
      description: row?.description,
      updatedAt: new Date(row?.updatedAt).toLocaleString('zh-CN', { hour12: false }),
    };
  }));
};

function InfoDisplay(props) {
  const [state, setData] = React.useState([]);

  useEffect(() => {
    getData().then((data) => {
      setData(data);
      console.log(state);
    });
  }, []);

  return (
    <InfoCard data={state} />
  );
}

export default InfoDisplay;