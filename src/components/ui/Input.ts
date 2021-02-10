
import styled from 'styled-components';

export const Input = styled.input`
    font-weight: normal;
    font-size: 16px;
    line-height: 24px;
    width: 100%;
    color: #3f4277;
    background-color: #F2F7FE;
    padding: 10px 15px;
    border: 1px solid transparent;
    margin-top: 15px;
    margin-bottom: 15px;
    text-align: center;
    box-sizing: border-box;
    border: 1px solid #2c80ff;
    outline: none;
    &.full-width {
        width: 100%;
    }
    &:focus {
        box-shadow: rgba(42,44,208,0.15) 0px 0.8rem 3.2rem 0px;
    }  
    & + p {
        width: 80%;
    }
`

export default Input;
