import { Box, Container, Heading, Link, ListItem, Text, UnorderedList } from '@chakra-ui/react';
import { Share } from '@icon-park/react';

function AboutPage() {
  return (
    <Box p={4}>
      <Container textAlign='left' maxW='container.md'>
        <Heading my='16px'>最新动态</Heading>
        <Text my='8px'>1 月 2 日增加分地点上报查询核酸检测排队时长功能，因为早期代码的高耦合度，修改花了不少功夫，请见谅。</Text>
        <Text my='8px'>大家 2022 年新年快乐！如果用户量足够多，后续或许会增加需求分享功能。</Text>
        <Text my='8px'>12 月 31 日更新随机食物功能，点击「随机」按钮体验吧；新增更详细的条件筛选功能，可以用空格键隔开多个条件，进行更细的筛选。</Text>
        <Text my='8px'>12 月 30 日更新三大食堂菜单信息，拥有超过 1500 条数据，快速检索食品、商家，不再苦恼于这顿饭要室友带什么。提前检索，做好充足准备再去带饭吧。</Text>
        <Text my='8px'>数据库于 29 日建立，根据网上食堂菜单的照片手动录入，因此我们并不清楚商家的营业状况。如有错误，一定要记得提交正确的信息，这样才能帮到更多的人。</Text>
        <Text my='8px'>对策府库借助我们的数据库创建了
          <Link color='teal' href='https://docs.qq.com/sheet/DWUJhYVVOR1VMcVla?tab=k75e6m' isExternal> 疫情下的餐饮评价表 <Share
            size='12' />
          </Link>
          ，欢迎大家前去对商家或菜品发表自己的看法。
        </Text>
        <Heading mu='16px'>FAQs</Heading>
        <Text my='8px'>Q：如何进行食堂数据库错误数据上报？</Text>
        <Text>A：点击<strong>价格数字</strong>即可弹出上报界面。</Text>
        <Heading my='16px'>关于本站</Heading>
        <Text my='8px'>本站提供新冠肺炎疫情影响下西安电子科技大学的校内食堂菜单、校内服务状况查询、核酸检测排队时长分享服务。</Text>
        <Text my='8px'>
          数据来自于共享文档整理、维护志愿者的人肉调查以及热心同学的提交（可以点击「纠错」进行数据提交），旨在为大家提供便利的校内相关数据查询服务，希望能够给疫情影响下的大家提供帮助。由于是人工维护，数据的时效性无法保证。
          若发现与实际情况有出入可点击卡片左下角「纠错」进行数据提交。
        </Text>
        <Text my='8px'>
          如有未收录的商家，可联系维护者
          <Link color='teal' href='mailto:superbart_chen@qq.com'> SuperBart</Link>、
          <Link color='teal' href='mailto:handanwanga@outlook.com'>hawa130</Link>（QQ 764968637）、
          <Link color='teal' href='mailto:zhlzhab12@gmail.com'>Z0</Link>（QQ 2037336335）进行数据添加。（点击名字即可发送邮件）
        </Text>
        <Text my='8px'>
          <del>若想成为网站的数据库维护志愿者的一员，并在此网站留下你的名字或 ID，可联系我的 QQ 764968637，我们欢迎更多的人加入进来，帮助更多的人。</del>
        </Text>
        <Text>目前维护者数量充足，暂时不需要志愿者了。</Text>
        <Text my='8px'>本站目前处于高速迭代开发状态，若有不足之处或者有什么功能建议都欢迎提出！由于网站是自己从零开始写的，后端也有部分负责，有需要的功能都可以提出建议。
          欢迎联系邮箱 <Link color='teal' href='mailto:handanwanga@outlook.com'>handanwanga@outlook.com</Link>。</Text>
        <Heading my='16px'>鸣谢</Heading>
        <Text my='8px'>
          感谢以下数据库维护志愿者的付出（排名不分先后）。
        </Text>
        <UnorderedList>
          <ListItem><Link color='teal' href='https://benderblog.github.io/' isExternal>SuperBart <Share
            size='12' /></Link>
            （<Link color='teal' href='https://benderblog.github.io/SpiritFlown.html' isExternal>西电疫情互助文档汇总版 <Share
              size='12' /></Link> 作者）</ListItem>
          <ListItem>Z0（不愿意透露名字的Z0）</ListItem>
          <ListItem>Yangxiansen</ListItem>
          <ListItem><Link color='teal' href='https://blog.ksfu.top/' isExternal>康师傅 <Share
            size='12' /></Link></ListItem>
          <ListItem>小北</ListItem>
          <ListItem>DAWNMX</ListItem>
          <ListItem>木生</ListItem>
          <ListItem>xeonds</ListItem>
        </UnorderedList>
        <Text my='8px'>
          感谢 <Link color='teal' href='https://docs.qq.com/sheet/DWmttV0hZbFFYQmVv?tab=BB08J2' isExternal>腾讯互助文档 <Share
          size='12' /></Link> 发起者 gyk。
        </Text>
        <Text my='8px'>
          感谢 <Link color='teal' href='https://geek-tech.club/' isExternal>西电极创工作室 <Share
          size='12' /></Link> 提供的后端服务器，以及工作室学长韩翔宇提供的后端程序。
        </Text>
        <Text my='8px'>
          感谢
          <Link color='teal' href='https://moefactory.com/' isExternal> Robotxm <Share size='12' /></Link>（电表开发者）
          提供的本数据库 <Link color='teal' href='https://myxdu.moefactory.com/ncov/' isExternal>电表版本 <Share
          size='12' /></Link>（电表版功能将会与本站同步更新）。
        </Text>
        <Text my='8px'>感谢对策府库的宣传。</Text>
        <Text my='8px'>感谢以下同学的支持：Dimole。</Text>
        <Text my='8px'>使用的 UI 框架：<Link href='https://chakra-ui.com/' isExternal>Chakra UI <Share
          size='12' /></Link>。</Text>
        <Text my='8px'>疫情终将战胜，西安加油！</Text>
        <Text textAlign='right'><Link href='https://www.hawa130.com/' isExternal>hawa130</Link></Text>
        <Text textAlign='right'>2021/12/26</Text>
      </Container>
    </Box>
  );
}

export default AboutPage;