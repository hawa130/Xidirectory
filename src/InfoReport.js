import {
  Alert,
  AlertIcon,
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Switch,
  Textarea,
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

  return (
    <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose} autoFocus={false}>
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>上报数据</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
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
                  数据提交成功，将于审核通过后更新。
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