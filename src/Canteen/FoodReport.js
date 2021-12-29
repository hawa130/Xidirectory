import {
  Alert,
  AlertIcon,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
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
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import md5 from 'js-md5';
import React, { useEffect } from 'react';

function FoodReport(props) {
  const { isOpen, onClose, food } = props;
  const { handleSubmit, register, setValue, formState: { isSubmitting } } = useForm();

  for (const key in food) {
    if (['window', 'name', 'price', 'shopStatus', 'status', 'unit'].indexOf(key) !== -1) {
      setValue(key, food[key]);
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
  }, [food]);

  const onSubmit = async (data) => {
    data.price = String(data?.price);
    const submitData = { ...data, originId: food.objectId };
    const timestamp = Date.now();
    const appKey = 'Da0dObuKbEzfjgsN6mxskA2p';
    const tmp = md5(`${timestamp}${appKey}`);
    const sign = `${tmp},${timestamp}`;
    await axios.post('https://ncov-api.hawa130.com/1.1/classes/foodReport', submitData, {
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
  };

  return (
    <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose} autoFocus={false}>
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>错误数据上报</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Text>请在这里填写<strong>正确</strong>的数据，我们将在审核后展示。</Text>
            <FormControl mt={2} isRequired>
              <FormLabel>窗口名称</FormLabel>
              <Input {...register('window')} />
            </FormControl>
            <FormControl mt={2}>
              <FormLabel>食品名称</FormLabel>
              <Input {...register('name')} />
            </FormControl>
            <HStack mt={2}>
              <FormControl>
                <FormLabel>窗口营业状态</FormLabel>
                <Switch colorScheme='teal' size='lg' {...register('shopStatus')} />
              </FormControl>
              <FormControl>
                <FormLabel>该食品供给状态</FormLabel>
                <Switch colorScheme='teal' size='lg' {...register('status')} />
              </FormControl>
            </HStack>
            <HStack mt={2}>
              <FormControl>
                <FormLabel>单价</FormLabel>
                <Input {...register('price')} />
              </FormControl>
              <FormControl>
                <FormLabel>计量单位</FormLabel>
                <Input {...register('unit')} />
              </FormControl>
            </HStack>
            <FormControl mt={2}>
              <FormLabel>附加信息</FormLabel>
              <Textarea {...register('postscript')} />
            </FormControl>
            {
              !state.isDisabled ? null :
                <Alert status='success' my={2}>
                  <AlertIcon />
                  感谢你的提交，今天你又为食堂数据库的维护出了一份力呢！
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

export default FoodReport;