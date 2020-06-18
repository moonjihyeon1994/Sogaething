import * as React from 'react';
import { useGetSearchByCategoryQuery } from '~/generated/graphql';
import { IPostMetaOutput } from '~/generated/graphql';
import styled from '~/styled';
import category from '../../pages/category';
import Card from './HalfCard';
import useStores from '../../helpers/useStores';

interface IQueryData {
  searchThingsByCategory: IPostMetaOutput[];
}

interface ICardProps {
  cardData: IPostMetaOutput[];
}

export default (props: ICardProps) => {
  const {cardStore} = useStores();
  const handleClickCard = () => {
  };

  let Cards;
  if (cardStore.MainSearchLoading || cardStore.MainSearchError ) {
    Cards = [1, 2, 3, 4, 5, 6].map((item, i) => {
      return <Card key={i} idx={i} cardData={null} loading />;
    });
    return <Wrapper onClick={handleClickCard}>{Cards}</Wrapper>;
  }

  if (Array.isArray(props.cardData)) {
    if (props.cardData.length === 0) {
      return <Wrapper><b>등록된 글이 없습니다</b></Wrapper>;
    }
    Cards = props.cardData!.map((item, i) => {
      if (props.cardData.length) {
        return <Card key={i} idx={i} cardData={item} loading={false} />;
      }
    });
  }

  return <Wrapper onClick={handleClickCard}>{Cards}</Wrapper>;
};

const Wrapper = styled.div`
  display: block;
  padding: 80px 16px 30px 16px;
  height: 100%;
`;
