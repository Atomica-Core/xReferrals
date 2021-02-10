import styled from "styled-components";
import { blue, lightBlue, grey } from './GlobalStyles'
export const PrimaryBtn = styled.button`
    background-color: ${blue};
    color: white;
    padding: 20px 35px;
    border-radius: 4px;
    border: 1px solid ${blue};
    &.bigBtn{
        width: 200px;
    }
    i {
        margin-right: 5px;
        margin-left: 5px;
    }
    &:hover {
        cursor: pointer;
        color: ${blue};
        background-color: white;
    }
    & + button {
        margin-left: 10px;
    }
    &.smallBtn {
        padding: 3px 5px;
        font-size: 10px;
    }

    &.active {
        padding: 10px 15px;
        background-color: ${lightBlue};
        border: 1px solid ${blue};
        color: ${blue};
    }

    &.btn {
        padding: 10px 15px;
    }

    :disabled {
        background-color: ${grey};
        color: white;
        border: 1px solid ${grey};
    }
`;
