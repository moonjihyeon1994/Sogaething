import * as React from 'react';
import CategoryHeader from '~/services/index/components/CategoryHeader';
import styled from '~/styled';
import HalfProductCardList from '../components/HalfProductCardList';
import useStores from '../helpers/useStores';

export default () => {
    const {cardStore} = useStores();
    return (
        <Wrapper>
            <CategoryHeader type={'normal'} text={'검색결과'} />
            <HalfProductCardList cardData={cardStore.MainSearchCards} />
        </Wrapper>
    )
}

const Wrapper = styled.div`

`;
