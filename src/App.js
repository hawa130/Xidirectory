import './App.css';
import '@icon-park/react/styles/index.css';
import React from 'react';
import { ChakraProvider, Link, Text } from '@chakra-ui/react';
import MainPage from './MainPage';
import theme from './theme';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <MainPage />
      </Router>
      <Text align='center' fontSize='sm' color='gray.500'>
        &copy; 2021-{new Date().getFullYear()} <Link href='https://www.hawa130.com/'>hawa130</Link> &nbsp;|
        &nbsp;<Link href='https://beian.miit.gov.cn/' isExternal>冀ICP备2021001339号</Link>
      </Text>
    </ChakraProvider>
  );
}

export default App;
