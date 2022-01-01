import React, { useEffect } from 'react';
import { Box, Container, HStack, Skeleton, Text, VStack } from '@chakra-ui/react';
import StatDisplay from './StatDisplay';
import Report from './Report'; // 旧版API
import TableDisplay from './TableDisplay';
import Board from './Board';

function TimeShare(props) {
  const { getData, place } = props;
  localStorage.setItem('place', place);

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
    getData(place).then((data) => {
      setData(data);
    });
  }, [place]);

  const refreshData = () => {
    getData(place).then((data) => {
      setData(data);
    });
  };

  return (
    <Box>
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
            place={place}
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
