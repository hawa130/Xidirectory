import { Button, Spacer } from '@chakra-ui/react';
import React from 'react';

function RandomBar(props) {
  const { handleRandomCancel, handleRandomReset } = props;

  return (
    <>
      <Button borderRadius='99px' onClick={handleRandomReset}>重置</Button>
      <Spacer />
      <Button borderRadius='99px' onClick={handleRandomCancel}>返回</Button>
    </>
  );
}

export default RandomBar;