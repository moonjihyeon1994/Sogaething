import * as React from 'react';
import styled from '~/styled';

import useStores from '../../helpers/useStores';

export interface IPostDetailContentCardProps {
}

export default function PostDetailContentCard(props: IPostDetailContentCardProps) {
  const store = useStores();

  return (
    <Wrapper>
      {/* <Title>{store.postStore.post?.title}</Title> */}
      {/* <HashTag>{store.postStore.post?.hashtag}</HashTag> */}
      <Category>디지털/가전 </Category>
      <Content>
        상태 좋아요 !<br />
올해 구매했고 배터리사이클은 음 신경안쓰고 사용해서 <br />
60정도 됐습니다 ~~~<br />
직거래는 수원역 아니면 수원대학교에서 할께요 !<br />
연락은 소개톡으로 주세여<br />
      </Content>
    </Wrapper>
  );
}

const Wrapper = styled.div`
    display: grid;
    row-gap: 0.4rem;
    width: 100%;
    height: 100%;
    padding: 1rem;
`

const Title = styled.div`
    font-size: 1.5rem;
    color: #8f9bb3;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
`

const HashTag = styled.div`
    font-size: 0.3rem;
    color: #222b45;
`

const Category = styled.div`
    font-size: 0.3rem;
    font-weight: bold;
    color: #a7a7a7;
`

const Content = styled.div`
    font-size: 0.8rem;
    line-height: 1.2rem;
    padding: 0.8rem 0 4rem 0;
`
