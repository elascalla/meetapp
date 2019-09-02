import styled, { css } from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

const outline = css`
  background: transparent;
  border-width: 1px;
  border-color: #d84e68;
`;

export const Container = styled(RectButton)`
  height: 50px;
  background: #d84e68;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
  ${props => props.outline && outline}
`;

export const Text = styled.Text`
  color: ${props => (props.outline ? '#d84e68' : '#fff')};
  font-weight: bold;
  font-size: 18px;
`;

export const Loading = styled.ActivityIndicator.attrs({
  size: 'small',
  color: '#fff',
})``;
