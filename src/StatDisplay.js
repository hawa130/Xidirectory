import { Box, Stat, StatHelpText, StatLabel, StatNumber } from '@chakra-ui/react';
import React from 'react';

function StatDisplay(props) {
  return (
    <Box textAlign='center' p='8px 24px' w='100%' borderWidth='1px' borderRadius='lg' overflow='hidden'>
      <Stat>
        <StatLabel fontSize='xl'>预计排队时长</StatLabel>
        <StatNumber
          fontSize='6xl'
          color={
            props.waitingTime > 30 ?
              'red.500' :
              props.waitingTime > 10 ?
                'yellow.500' :
                'green.500'
          }
        >
          {props.waitingTime}
        </StatNumber>
        <StatHelpText fontSize='md'>分钟</StatHelpText>
        <StatHelpText>更新于：{props.updateTime}</StatHelpText>
      </Stat>
    </Box>
  );
}

export default StatDisplay;