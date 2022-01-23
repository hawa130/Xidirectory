import React from 'react';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import axios from 'axios';
import TimeShare from './TimeShare';

const getReportData = async (place) => {
  const res = await axios.get('https://ncov-api.geek-tech.club/api/records/',
    {
      params: {
        during: 3600,
        place: place,
      },
    });
  const resList = res.data?.results;
  if (resList.length === 0) {
    return {
      waitingTime: '--',
      updateTime: '无最近数据',
      averageTime: NaN,
      stdevTime: NaN,
      results: [],
    };
  }
  const rawResults = resList.map((row) => {
    return {
      waitTime: row?.waitTime,
      updatedAt: new Date(row?.updatedAt).toLocaleString('zh-CN', { hour12: false }),
    };
  });
  const result = resList[0];
  const waitingTime = result['waitTime'];
  let updateTime = result['updatedAt'];
  updateTime = new Date(updateTime).toLocaleString('zh-CN', { hour12: false });
  let averageTime = rawResults.reduce((acc, cur) => acc + cur.waitTime, 0) / rawResults.length;
  let stdevTime = Math.sqrt(rawResults.reduce((acc, cur) => acc + Math.pow(cur.waitTime - averageTime, 2), 0) / rawResults.length);
  const results = rawResults;
  return {
    waitingTime,
    updateTime,
    averageTime,
    stdevTime,
    results,
  };
};

const getBoardData = async () => {
  const rawBoard = await axios.get('https://ncov-api.geek-tech.club/api/boards/');
  const boards = rawBoard.data?.boards;
  const board = boards[0];
  return {
    title: board['title'],
    content: board['content'],
    updatedAt: new Date(board['createAt']).toLocaleString('zh-CN', { hour12: false }),
  };
};

const getData = async (place) => {
  const reportData = await getReportData(place);
  const board = await getBoardData();
  return {
    board,
    ...reportData,
  };
};

const places = ['北操场', '信远楼', '图书馆', 'E楼'];

function QueuePage(props) {
  const place = localStorage.getItem('place');
  const index = place ? places.indexOf(place) : 0;

  return (
    <Tabs variant='soft-rounded' align='center' colorScheme='gray' p='0' isLazy={true} defaultIndex={index}>
      <TabList flexFlow='wrap' paddingTop='16px'>
        {
          places.map((place, index) => {
            return (
              <Tab key={index}>{place}</Tab>
            );
          })
        }
      </TabList>

      <TabPanels>
        {
          places.map((place, index) => {
            return (
              <TabPanel key={index}>
                <TimeShare getData={getData} place={place} />
              </TabPanel>
            );
          })
        }
      </TabPanels>
    </Tabs>
  );
}

export default QueuePage;