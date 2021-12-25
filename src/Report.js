import {
  Button,
  FormControl,
  InputGroup,
  InputRightAddon,
  NumberInput,
  NumberInputField,
  Select,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

function Report(props) {
  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    let { sign, wait_time } = data;
    wait_time = Number(wait_time);
    const res = await axios.post('https://ncov-api.hawa130.com/1.1/classes/RNAtest',
      { sign, wait_time }, {
        headers: {
          'X-LC-Id': '2x27utDtFSuLNtGkWVwT1m7v-gzGzoHsz',
          'X-LC-Key': 'Da0dObuKbEzfjgsN6mxskA2p',
        },
      });
    props.getData();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack>
        <FormControl>
          <InputGroup>
            <Select id='sign' maxW='64px' borderRadius='8px 0 0 8px'
                    {...register('sign', { required: true })}>
              <option value={'≈'}>≈</option>
              <option value={'>'}>&gt;</option>
              <option value={'<'}>&lt;</option>
            </Select>
            <NumberInput>
              <NumberInputField id='wait_time' placeholder='预估排队时间' borderRadius='0'
                                {...register('wait_time', { required: true })} />
            </NumberInput>
            <InputRightAddon children='分钟' />
          </InputGroup>
        </FormControl>
        <Button
          colorScheme={'teal'}
          isLoading={isSubmitting}
          type='submit'
          variant='solid'
        >
          提交
        </Button>
      </VStack>
    </form>
  );
}

export default Report;