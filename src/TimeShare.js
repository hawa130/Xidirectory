import React, { useEffect } from 'react';
import { Container, HStack, Text, VStack } from '@chakra-ui/react';
import StatDisplay from './StatDisplay';
import Report from './Report';
import axios from 'axios';
import TableDisplay from './TableDisplay';
import Board from './Board';

const getReportData = async () => {
  const res = await axios.get('https://ncov-api.hawa130.com/1.1/classes/RNAtest?order=-createdAt&limit=20',
    {
      headers: {
        'X-LC-Id': '2x27utDtFSuLNtGkWVwT1m7v-gzGzoHsz',
        'X-LC-Key': 'Da0dObuKbEzfjgsN6mxskA2p',
      },
    });
  const resList = res.data?.results;
  const rawResults = resList.map((row) => {
    return {
      waitTime: row?.waitTime,
      updatedAt: new Date(row?.updatedAt).toLocaleString('zh-CN', { hour12: false }),
    };
  });
  const result = resList[0];
  const waitingTime = result['waitTime'];
  let updateTime = result['updatedAt'];
  updateTime = new Date(updateTime).toLocaleString('zh-CN', { hour12: false });
  let averageTime = rawResults.reduce((acc, cur) => acc + cur.waitTime, 0) / rawResults.length;
  let stdevTime = Math.sqrt(rawResults.reduce((acc, cur) => acc + Math.pow(cur.waitTime - averageTime, 2), 0) / rawResults.length);
  const results = rawResults;
  return {
    waitingTime,
    updateTime,
    averageTime,
    stdevTime,
    results,
  };
};

const getBoardData = async () => {
  const rawBoard = await axios.get('https://ncov-api.hawa130.com/1.1/classes/message/61c7746e097c2b17a58082e1',
    {
      headers: {
        'X-LC-Id': '2x27utDtFSuLNtGkWVwT1m7v-gzGzoHsz',
        'X-LC-Key': 'Da0dObuKbEzfjgsN6mxskA2p',
      },
    });
  const board = rawBoard.data;
  return {
    title: board['title'],
    content: board['content'],
    updatedAt: new Date(board['updatedAt']).toLocaleString('zh-CN', { hour12: false }),
  };
};

const getData = async () => {
  const reportData = await getReportData();
  const board = await getBoardData();
  return {
    board,
    ...reportData,
  };
};

function TimeShare() {
  const [state, setData] = React.useState({
    waitingTime: '--',
    updateTime: '----/--/-- --:--:--',
    averageTime: '--',
    stdevTime: '--',
    board: { title: '公告', content: '--', updatedAt: '----/--/-- --:--:--' },
    results: [{ waitTime: '--', updatedAt: '----/--/-- --:--:--' }],
  });

  useEffect(() => {
    getData().then((data) => {
      setData(data);
    });
  }, []);

  const refreshData = () => {
    getData().then((data) => {
      setData(data);
    });
  };

  return (
    <Container maxW='container.md' p='0'>
      <VStack align='center'>
        <Board board={state.board} />
        <StatDisplay
          waitingTime={state.waitingTime}
          updateTime={state.updateTime}
          getData={refreshData}
        />
        <Report
          averageTime={state.averageTime}
          stdevTime={state.stdevTime}
          getData={refreshData}
        />
        <HStack>
          <Text>最近 {state.results.length} 次等待时间平均值</Text>
          <Text fontSize='xl' as='strong' color={
            state.averageTime > 30 ?
              'red.500' :
              state.averageTime > 10 ?
                'yellow.500' :
                'green.500'
          }>
            {state.averageTime}
          </Text>
          <Text>分钟</Text>
        </HStack>
        <TableDisplay results={state.results} />
      </VStack>
    </Container>
  );
}

export default TimeShare;
