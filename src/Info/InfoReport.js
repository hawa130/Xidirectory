import {
  Alert,
  AlertIcon,
  Button,
  Collapse,
  FormControl,
  FormLabel,
  Input,
  Link,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Switch,
  Text,
  Textarea,
  UnorderedList,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import md5 from 'js-md5';
import React, { useEffect } from 'react';

function InfoReport(props) {
  const { isOpen, onClose, item } = props;
  const { handleSubmit, register, setValue, formState: { isSubmitting } } = useForm();

  for (const key in item) {
    if (['name', 'description', 'status'].indexOf(key) !== -1) {
      setValue(key, item[key]);
    }
  }

  const [state, setState] = React.useState({
    isDisabled: false,
    text: '提交',
    data: {},
  });

  useEffect(() => {
    setState({
      isDisabled: false,
      text: '提交',
      data: {},
    });
  }, [item]);

  const onSubmit = async (data) => {
    const submitData = { ...data, originId: item.objectId };
    const timestamp = Date.now();
    const appKey = 'Da0dObuKbEzfjgsN6mxskA2p';
    const tmp = md5(`${timestamp}${appKey}`);
    const sign = `${tmp},${timestamp}`;
    await axios.post('https://ncov-api.hawa130.com/1.1/classes/report', submitData, {
      headers: {
        'X-LC-Id': '2x27utDtFSuLNtGkWVwT1m7v-gzGzoHsz',
        'X-LC-Sign': sign,
      },
    });
    await setState({
      isDisabled: true,
      text: '已提交',
      data: data,
    });
    for (const key in data) {
      if (['name', 'description', 'status'].indexOf(key) !== -1) {
        setValue(key, item[key]);
      }
    }
  };

  const [show, setShow] = React.useState(false);

  const handleToggle = () => setShow(!show);

  return (
    <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose} autoFocus={false}>
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>错误数据上报</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Text>请在这里填写<strong>正确</strong>的数据，我们将在审核后展示。</Text>
            <Text textAlign='right' color='teal'><Link
              onClick={handleToggle}>{!show ? '显示填写指南' : '隐藏填写指南'}</Link></Text>
            <Collapse in={show}>
              <Text as='strong'>填写指南</Text>
              <UnorderedList>
                <ListItem><Text>描述可以填写一些商家的备注，可以参考现有的填写，信息传达到位即可。</Text></ListItem>
                <ListItem><Text>附加信息可以任意发挥，可以是消息来源，也可以是自己想说的话。</Text></ListItem>
              </UnorderedList>
              <Text mb={3}>数据库的准确有效需要大家的共同维护，请务必确认自己提供的数据是准确的。</Text>
            </Collapse>
            <FormControl isRequired>
              <FormLabel>名称</FormLabel>
              <Input {...register('name')} />
            </FormControl>
            <FormControl mt={2}>
              <FormLabel>开放状态</FormLabel>
              <Switch colorScheme='teal' size='lg' {...register('status')} />
            </FormControl>
            <FormControl mt={2}>
              <FormLabel>描述</FormLabel>
              <Textarea {...register('description')} />
            </FormControl>
            <FormControl mt={2}>
              <FormLabel>附加信息</FormLabel>
              <Textarea {...register('postscript')} />
            </FormControl>
            {
              !state.isDisabled ? null :
                <Alert status='success' my={2}>
                  <AlertIcon />
                  感谢你的提交，今天你又为数据库的维护出了一份力呢！
                </Alert>
            }
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='teal' mr={3} isLoading={isSubmitting} type='submit'
                    isDisabled={state.isDisabled}>
              {state.text}
            </Button>
            <Button onClick={onClose}>取消</Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}

export default InfoReport;