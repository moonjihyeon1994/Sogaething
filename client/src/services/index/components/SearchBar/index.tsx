import { useRouter } from 'next/router';
import * as React from 'react';
import { IPostMetaOutput, useGetSearchByTitleQuery } from '~/generated/graphql';
import styled from '~/styled';
import SearchImage from '../../assets/img/main-search.png?url';
import useStores from '../../helpers/useStores';
import CustomIcon from '../CustomIcon';

export default () => {
  const [searchTitle, setSearchTitle] = React.useState('');
  const { cardStore } = useStores();
  const searchByTitle = useGetSearchByTitleQuery({
    variables: { input: searchTitle },
  });
  const router = useRouter();
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTitle(e.target.value);
  };

  const handleSearchClick = () => {
    if (searchTitle) {
      const { loading, data, error } = searchByTitle;
      if (error) {
        console.log('error');
        cardStore.MainSearchError = error;
      }
      if (Array.isArray(data!.searchThingsByTitle)) {
        cardStore.setSearchCard(data!.searchThingsByTitle as IPostMetaOutput[]);
        setSearchTitle('');
        router.push('/search');
      }
    }
  };
  return (
    <Wrapper>
      <StyledInput
        type='text'
        value={searchTitle}
        placeholder='해시태그로 검색하기..'
        onChange={handleSearchChange}
      />
      <div onClick={handleSearchClick}>
        <StyledCustomIcon url={SearchImage} />
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 56px;
  border-radius: 29px;
  border: solid 2px ${(props) => props.theme.searchBarColor};
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 2px 4px 0 #bfbfbf;
`;

const StyledInput = styled.input`
  font-size: 16px;
  margin: 16px 19px 16px 19px;
  flex-grow: 8.5;
  border: 0;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  resize: none;
  outline: none;
`;

const StyledCustomIcon = styled(CustomIcon)`
  flex-grow: 1.5;
`;
