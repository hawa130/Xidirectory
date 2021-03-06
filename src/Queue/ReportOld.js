import {
  Button,
  FormControl,
  InputGroup,
  InputRightAddon,
  NumberInput,
  NumberInputField,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import md5 from 'js-md5';

function Report(props) {
  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    let { waitTime } = data;
    waitTime = Number(waitTime);

    const { averageTime, stdevTime } = props;
    if (isNaN(waitTime) || waitTime < 0 || (waitTime > 120 && (Math.abs(waitTime - averageTime) > 5 * stdevTime))) {
      alert('请输入合理的等待时间。');
      return;
    }

    const timestamp = Date.now();
    const appKey = 'Da0dObuKbEzfjgsN6mxskA2p';
    const tmp = md5(`${timestamp}${appKey}`);
    const sign = `${tmp},${timestamp}`;
    await axios.post('https://ncov-api.hawa130.com/1.1/classes/RNAtest',
      { waitTime }, {
        headers: {
          'X-LC-Id': '2x27utDtFSuLNtGkWVwT1m7v-gzGzoHsz',
          'X-LC-Sign': sign,
        },
      });
    props.getData();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
      <VStack>
        <FormControl>
          <InputGroup>
            <NumberInput w='100%'>
              <NumberInputField id='waitTime' placeholder='输入你的预估排队时间' borderRadius='8px 0 0 8px'
                                {...register('waitTime', { required: true })} />
            </NumberInput>
            <InputRightAddon children='分钟' />
          </InputGroup>
        </FormControl>
        <Button
          colorScheme={'teal'}
          isLoading={isSubmitting}
          type='submit'
          variant='solid'
          w='100%'
        >
          提交
        </Button>
      </VStack>
    </form>
  );
}

export default Report;