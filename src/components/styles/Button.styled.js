import styled from 'styled-components'

export const Button = styled.button`
  width: 48px;
  height: 48px;
  background-color: white;
  border-radius: 4px;
  font-size: 24px;
  font-weight: 500;
  border: 1px solid rgb(30, 159, 210);
  color: rgb(30, 159, 210);
  opacity: ${({ opacity }) => opacity || '1'};
  cursor: ${({ cursor }) => cursor || 'pointer'};
  margin: ${({ margin }) => margin || '0px 0px 0px 0px'};
  &:hover {
    background-color: ${({ hover }) => hover || 'rgba(30, 159, 210, 0.1)'};
  }
`
