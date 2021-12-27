import { Container, Heading, Link, ListItem, Text, UnorderedList } from '@chakra-ui/react';
import { Share } from '@icon-park/react';

function AboutPage() {
  return (
    <Container textAlign='justify' maxW='container.md'>
      <Heading>关于本站</Heading>
      <Text my='8px'>
        本站数据来自于共享文档整理以及人肉调查，旨在为西电学子提供便利的校内相关数据查询服务。由于是人工维护，数据的时效性无法保证。
        若发现与实际情况有出入可联系 <Link color='teal' href='mailto:superbart_chen@qq.com'>SuperBart</Link>、
        <Link color='teal' href='mailto:handanwanga@outlook.com'>hawa130</Link>、<Link color='teal'
                                                                                      href='mailto:zhlzhab12@gmail.com'>Z0</Link>（QQ
        2037336335）进行数据更新。
      </Text>
      <Text my='8px'>
        感谢 <Link color='teal' href='https://docs.qq.com/sheet/DWmttV0hZbFFYQmVv?tab=BB08J2' isExternal>腾讯互助文档 <Share
        size='12' /></Link> 发起者 gyk。
      </Text>
      <Text my='8px'>
        感谢以下同学的协助整理（排名不分先后）。
      </Text>
      <UnorderedList>
        <ListItem><Link color='teal' href='https://benderblog.github.io/' isExternal>SuperBart <Share
          size='12' /></Link>（西电疫情互助文档简版作者）</ListItem>
        <ListItem><Link color='teal' href='https://moefactory.com/' isExternal>Robotxm <Share size='12' /></Link>（电表开发者）</ListItem>
        <ListItem>Z0（不愿意透露名字的Z0）</ListItem>
      </UnorderedList>
      <Text my='8px'>感谢以下同学的支持：Yangxiansen。</Text>
      <Text my='8px'>疫情终将战胜，一起加油！</Text>
      <Text textAlign='right'><Link href='https://www.hawa130.com/' isExternal>hawa130</Link></Text>
      <Text textAlign='right'>2021/12/26</Text>
    </Container>
  );
}

export default AboutPage;