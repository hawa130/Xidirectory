import React, { useEffect } from 'react';
import { Box, Container, HStack, Skeleton, Text, VStack } from '@chakra-ui/react';
import StatDisplay from './StatDisplay';
import Report from './Report'; // 旧版API
import axios from 'axios';
import TableDisplay from './TableDisplay';
import Board from './Board';

const getReportData = async () => {
  const res = await axios.get('https://ncov-api.geek-tech.club/api/records/?during=3600');
  const resList = res.data?.results;
  if (resList.length === 0) {
    return {
      waitingTime: '--',
      updateTime: '无最近数据',
      averageTime: NaN,
      stdevTime: NaN,
      results: [],
    };
  }
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
  const rawBoard = await axios.get('https://ncov-api.geek-tech.club/api/boards/');
  const boards = rawBoard.data?.boards;
  const board = boards[0];
  return {
    title: '公告',
    content: board['content'],
    // updatedAt: new Date(board['createAt']).toLocaleString('zh-CN', { hour12: false }),
    updatedAt: board['createAt'],
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
    waitingTime: <Skeleton width='100px' height='80px' />,
    updateTime: '----/--/-- --:--:--',
    averageTime: '--',
    stdevTime: '--',
    board: {
      title: '公告',
      content: '<div style="height: 18px; background-color: #E2E8F0;"></div>',
      updatedAt: '----/--/-- --:--:--',
    },
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
    <Box p={4}>
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
            resultLength={state.results.length}
            getData={refreshData}
          />
          <Text>最近 1 小时的 {state.results.length} 次提交等待时间平均值</Text>
          <HStack align='baseline' style={{ marginTop: 0 }}>
            <Text fontSize='2xl' as='strong' color={
              state.averageTime > 30 ?
                'red.500' :
                state.averageTime > 10 ?
                  'yellow.500' :
                  'green.500'
            }>
              {Math.round(state.averageTime)}
            </Text>
            <Text>分钟</Text>
          </HStack>
          <TableDisplay results={state.results} />
        </VStack>
      </Container>
    </Box>
  );
}

export default TimeShare;
