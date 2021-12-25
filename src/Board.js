import { Box, HStack, Spacer, Text } from '@chakra-ui/react';

function Board(props) {
  return (
    <Box textAlign='justify' p='8px 16px' w='100%' borderWidth='1px' borderRadius='lg' overflow='hidden'>
      <HStack>
        <Text as='strong'>{props.board.title}</Text>
        <Spacer />
        <Text color='grey' fontSize='sm'>{props.board.updatedAt}</Text>
      </HStack>
      <Text>{props.board.content}</Text>
    </Box>
  );
}

export default Board;