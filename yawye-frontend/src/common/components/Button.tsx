import styled from 'styled-components/macro';

export default styled.button`
  border: none;
  background-color: ${(props) => props.theme.colors.backgroundDark};
  color: #ffffff;
  font-size: 0.8rem;
  font-family: inherit;
  padding: 0.25rem 0.6rem;
  border-radius: 0.25rem;
  cursor: pointer;
`;
