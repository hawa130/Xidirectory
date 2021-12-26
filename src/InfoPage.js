import { Container } from '@chakra-ui/react';
import InfoDisplay from './InfoDisplay';

function InfoPage(props) {
  return (
    <Container maxW='container.xl'>
      <InfoDisplay />
    </Container>
  );
}

export default InfoPage;