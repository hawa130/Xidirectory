import React, { useEffect } from 'react';
import { ChakraProvider, Container, theme, VStack } from '@chakra-ui/react';
import StatDisplay from './StatDisplay';
import Report from './Report';
import axios from 'axios';

const getData = async () => {
  const res = await axios.get('https://ncov-api.hawa130.com/1.1/classes/RNAtest?order=-createdAt',
    {
      headers: {
        'X-LC-Id': '2x27utDtFSuLNtGkWVwT1m7v-gzGzoHsz',
        'X-LC-Key': 'Da0dObuKbEzfjgsN6mxskA2p',
      },
    });
  const result = res.data?.results[0];
  const waitingTime = result['wait_time'];
  let updateTime = result['updatedAt'];
  updateTime = new Date(updateTime).toLocaleString();
  return {
    waitingTime,
    updateTime,
  };
};

function App() {
  const [state, setData] = React.useState({
    waitingTime: '-',
    updateTime: '--',
  });

  useEffect(async () => {
    const { waitingTime, updateTime } = await getData();
    setData({ waitingTime, updateTime });
  }, []);

  const refreshData = () => {
    getData().then(({ waitingTime, updateTime }) => {
      setData({ waitingTime, updateTime });
    });
  };

  return (
    <div style={{ padding: '24px 0' }}>
      <ChakraProvider theme={theme}>
        <Container maxW='container.md'>
          <VStack align='center'>
            <StatDisplay
              waitingTime={state.waitingTime}
              updateTime={state.updateTime}
            />
            <Report getData={refreshData} />
          </VStack>
        </Container>
      </ChakraProvider>
    </div>
  );
}

export default App;
