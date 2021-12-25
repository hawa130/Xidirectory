import { Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { useSortBy, useTable } from 'react-table';
import React from 'react';

function TableDisplay(props) {
  const data = React.useMemo(
    () => props.results,
    [props],
  );

  const columns = React.useMemo(
    () => [
      {
        Header: '等待时长（分钟）',
        accessor: 'waitTime',
      }, {
        Header: '提交时间',
        accessor: 'updatedAt',
      },
    ],
    [],
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data }, useSortBy);

  return (
    <Table {...getTableProps()} size='sm'>
      <Thead>
        {headerGroups.map((headerGroup) => (
          <Tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <Th
                {...column.getHeaderProps()}
              >
                {column.render('Header')}
              </Th>
            ))}
          </Tr>
        ))}
      </Thead>
      <Tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <Tr {...row.getRowProps()}>
              {row.cells.map((cell) => (
                <Td {...cell.getCellProps()}>
                  {cell.render('Cell')}
                </Td>
              ))}
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );
}

export default TableDisplay;