import React, {ReactElement, ReactNode, ReactNodeArray} from 'react';
import TodoListContainer from "../Containers/TodoListContainer";
import styled from "styled-components";

const TodoListPage = (): ReactElement | null => {
    return (
        <StyledTodoListPageContainer>
            <TodoListContainer></TodoListContainer>
        </StyledTodoListPageContainer>
    )
};

const StyledTodoListPageContainer = styled.div`
  overflow: auto;
  height: 100vh;
  background: #f9f9fa;
`
export default TodoListPage;
