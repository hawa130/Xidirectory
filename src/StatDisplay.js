import { Box, Stat, StatHelpText, StatLabel, StatNumber } from '@chakra-ui/react';
import React from 'react';

function StatDisplay(props) {
  return (
    <Box textAlign='center' p='8px 24px' minW='xs' borderWidth='1px' borderRadius='lg'>
      <Stat>
        <StatLabel>预计排队时长</StatLabel>
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
        <StatHelpText>分钟</StatHelpText>
        <StatHelpText>更新：{props.updateTime}</StatHelpText>
      </Stat>
    </Box>
  );
}

export default StatDisplay;