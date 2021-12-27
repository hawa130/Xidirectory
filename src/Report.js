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
  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
  } = useForm();

  const onTencentCaptcha = (submitData) => {
    const appId = '2053958429';
    // eslint-disable-next-line no-undef
    const captcha = new TencentCaptcha(appId, (res) => {
      if (res.ret === 0) {
        onSubmit({
          Ticket: res.ticket,
          Randstr: res.randstr,
          ...submitData,
        });
      }
    });
    captcha.show();
  };

  const onSubmit = async (data) => {
    let { waitTime } = data;
    waitTime = Number(waitTime);

    const { averageTime, stdevTime } = props;
    if (isNaN(waitTime) || waitTime < 0 || (waitTime > 120 && (Math.abs(waitTime - averageTime) > 5 * stdevTime))) {
      alert('请输入合理的等待时间。');
      return;
    }

    await axios.post('https://ncov-api.geek-tech.club/api/new_record/',
      {
        Ticket: data.Ticket,
        Randstr: data.Randstr,
        result: waitTime,
      });
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