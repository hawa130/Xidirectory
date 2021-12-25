import { Box, Stat, StatHelpText, StatLabel, StatNumber } from '@chakra-ui/react';
import React from 'react';

function StatDisplay(props) {
  const [state, setData] = React.useState(
    {
      textTip: '点击可刷新',
    },
  );

  const refresh = async () => {
    setData({ textTip: '刷新中...' });
    await props.getData();
    setData({ textTip: '刷新成功' });
    setTimeout(() => {
      setData({ textTip: '点击可刷新' });
    }, 3000);
  };

  return (
    <Box
      align='center'
      p='8px 24px'
      w='100%'
      borderWidth='1px'
      borderRadius='lg'
      overflow='hidden'
    >
      <Stat onClick={refresh}>
        <StatLabel fontSize='xl'>预计排队时长</StatLabel>
        <Box align='baseline'>
          <StatNumber
            display='inline-block'
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
          <StatHelpText display='inline-block' fontSize='md'>分钟</StatHelpText>
        </Box>
        <StatHelpText>更新于：{props.updateTime}</StatHelpText>
        <StatHelpText>{state.textTip}</StatHelpText>
      </Stat>
    </Box>
  );
}

export default StatDisplay;