import { Animated } from 'react-native';
import styled from 'styled-components/native';

export const Container = styled(Animated.View)`
  justify-content: center;
  align-items: center;
`;

export const Title = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #999;
  margin-top: 30px;
  text-align: center;
`;

export const Message = styled.Text`
  color: #999;
  text-align: center;
  margin-top: 20px;
`;
