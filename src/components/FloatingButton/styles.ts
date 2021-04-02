import styled, { css } from 'styled-components'

interface FloatingButtonProps {
  variant: 'add' | 'confirm' | 'delete' | 'edit' | 'return'
}

const buttonVariations: any = {
  add: css`
    background: #529A67;
    color: #FFFFFF;
  `,
  delete: css`
    background: #F50057;
    color: #FFFFFF;
  `,
  edit: css`
    background: #E3C521;
    color: #000000;
  `,
   confirm: css`
    background: #529A67;
    color: #FFFFFF;
  `,
   return: css`
    background: #529A67;
    color: #FFFFFF;
  `
}

export const Container = styled.div<FloatingButtonProps>`
  button.MuiFab-root {
    ${props => buttonVariations[props.variant]}
  }

  button.MuiFab-root:disabled {
    background: #E0E0E0;
    color: #000000;
    opacity: 0.5;
  }

  .MuiCircularProgress-colorPrimary {
    color: #FFF;
  }
`