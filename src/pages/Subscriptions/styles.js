import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
`;

export const SubscriptionsList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { paddingHorizontal: 20 },
})`
  margin-top: 30px;
`;

export const Loading = styled.ActivityIndicator.attrs({
  size: 'small',
})`
  margin: 30px 0;
`;
