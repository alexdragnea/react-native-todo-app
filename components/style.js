import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
    background-color: ${(props) => props.theme['PRIMARY_COLOR']};
    flex: 1;
`;


export const ThemeButton = styled.Pressable`
    padding: 10px;
    top: 10px;
    align-items: center;
  ${(props) => props.theme['BUTTON_COLOR']};
`;

export const ThemeButtonText = styled.Text`
    top: -35px;
    font-size: 16px;
    color: ${(props) => props.theme['BUTTON_COLOR']};
`;
