import * as React from 'react';
import styled from '~/styled';

import PostDetailContentCard from '../PostDetailContentCard';
import PostDetailUserCard from '../PostDetailUserCard';

export interface IPostDetailProps {

}

export default (props: IPostDetailProps) => {
    return (
        <Wrapper>
            <PostDetailUserCard />
            <PostDetailContentCard />
        </Wrapper>
    );
}

const Wrapper = styled.div`
    position: relative;
    width: 100%;
    min-height: 100%;
`
