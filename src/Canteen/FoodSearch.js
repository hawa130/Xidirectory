import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { Search } from '@icon-park/react';
import React from 'react';

function FoodSearch(props) {
  const { canteen, onSearch } = props;

  const handleChange = async (e) => {
    const { value } = e.target;
    onSearch(value);
  };

  return (
    <InputGroup>
      <InputLeftElement pointerEvents='none' children={<Search />} />
      <Input
        id='search-input'
        variant='filled'
        borderRadius='99px'
        placeholder={`搜索${canteen}餐厅菜品、窗口`}
        onChange={handleChange}
      />
    </InputGroup>
  );
}

export default FoodSearch;