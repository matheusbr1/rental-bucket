import styled, { css } from 'styled-components'

interface TitleProps {
  isErrored: boolean
  size: 'small' | 'medium' | 'big'
}

const marginVariations = {
  small: css `margin: 10px 0;`,
  medium: css `margin: 30px 0;`,
  big: css `margin: 30px 0;`
}

export const Container = styled.div<TitleProps>`

  display: flex;
  align-items: center;
  margin: 30px 0;

  ${props => props.isErrored && css`
    color: #f44336;
  `}

  ${props => props.size && marginVariations[props.size]}

  h1 {
    font-weight: 400;
    font-size: 1.5rem;
  }

  h2 {
    font-weight: 400;
    font-size: 1.2rem
  }

  h3 {
    font-weight: 400;
    font-size: 1rem
  }
`

export const Error = styled.span`
  color: #f44336;
  margin-left: 14px;
  margin-right: 14px;
  font-size: 0.8em;
  letter-spacing: 0.03333em;
`