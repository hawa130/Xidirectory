import React from 'react';
import { ChakraProvider, Link, Text } from '@chakra-ui/react';
import MainPage from './MainPage';
import '@icon-park/react/styles/index.css';
import theme from './theme';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <MainPage />
      <Text align='center' fontSize='sm' color='gray.500'>
        &copy; {new Date().getFullYear()} <Link href='https://www.hawa130.com/'>hawa130</Link> &nbsp;|
        &nbsp;<Link href='https://beian.miit.gov.cn/' isExternal>冀ICP备2021001339号</Link>
      </Text>
    </ChakraProvider>
  );
}

export default App;
