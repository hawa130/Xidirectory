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

function Report(props) {
  const { place } = props;

  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
  } = useForm();

  const onTencentCaptcha = (submitData) => {
    const { averageTime, stdevTime, resultLength } = props;
    let { waitTime } = submitData;
    waitTime = Number(waitTime);

    if (isNaN(waitTime) || waitTime < 0 ||
      ((resultLength > 6) && (waitTime > 25 || waitTime < 5) && (Math.abs(waitTime - averageTime) > 3 * stdevTime))) {
      alert('请输入合理的等待时间。');
      return;
    }

    const appId = '2053958429';
    // eslint-disable-next-line no-undef
    const captcha = new TencentCaptcha(appId, (res) => {
      if (res.ret === 0) {
        onSubmit({
          Ticket: res.ticket,
          Randstr: res.randstr,
          result: waitTime,
          place: place,
        });
      }
    });
    captcha.show();
  };

  const onSubmit = async (data) => {
    await axios.post('https://ncov-api.geek-tech.club/api/new_record/', data);
    props.getData();
  };

  return (
    <form onSubmit={handleSubmit(onTencentCaptcha)} style={{ width: '100%' }}>
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
          id='TencentCaptcha'
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