import styled from 'styled-components/macro';

export default styled.button`
  border: none;
  background-color: ${(props) => props.theme.colors.accent};
  color: #ffffff;
  font-size: 1.2rem;
  font-family: inherit;
  padding: 0.4rem 0.6rem;
  border-radius: 0.25rem;
  cursor: pointer;
`;
