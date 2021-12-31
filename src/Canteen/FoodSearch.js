import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { Filter } from '@icon-park/react';
import React from 'react';

function FoodSearch(props) {
  const { canteen, onSearch } = props;

  const handleChange = async (e) => {
    const { value } = e.target;
    onSearch(value);
  };

  return (
    <InputGroup>
      <InputLeftElement pointerEvents='none' children={<Filter />} />
      <Input
        id='search-input'
        variant='filled'
        borderRadius='99px'
        placeholder={`筛选${canteen}餐厅楼层、菜品、窗口，多条件用空格分隔`}
        onChange={handleChange}
      />
    </InputGroup>
  );
}

export default FoodSearch;