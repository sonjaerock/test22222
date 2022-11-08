import React, {ReactElement} from 'react';
import styled from "styled-components";
import TodoList from '../Components/TodoList/TodoList';

const TodoListContainer = (): ReactElement | null => {
    return (
        <StyledTodoListContainer>
            <StyledTodoListTitle>
                ReactTest - TodoList
            </StyledTodoListTitle>
            <TodoList></TodoList>
        </StyledTodoListContainer>
    )
};

const StyledTodoListTitle = styled.div`
  color: #000000;
  margin-bottom: 0.625rem;
  text-transform: capitalize;
  font-size: 0.875rem;
  font-weight: 500;
`

const StyledTodoListContainer = styled.div`
  position: relative;
  margin: 100px auto;
  width: 600px;
  height: 600px;
  overflow: scroll;
  padding: 20px;
  border: 1px solid #d2d2dc;
  background: white;
  ::-webkit-scrollbar {
    display: none;
  }
`

export default TodoListContainer;
