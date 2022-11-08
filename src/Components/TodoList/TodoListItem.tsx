import React, {ReactElement} from 'react';
import styled from "styled-components";
import TodoListItemCheckbox from './TodoListItemComponents/TodoListItemCheckbox';
import TodoListItemText from './TodoListItemComponents/TodoListItemText';
import {ITodoData} from "../../Types/TodoListType";

type Props = {
    idx: number
    todo: ITodoData
};

const defaultProps:Props = {
    idx: 0,
    todo: {
        id: 0,
        userId: "",
        title: "",
        completed: false
    }
}

const TodoListItem = React.memo((props:Props = defaultProps):ReactElement | null => {
    console.log('render - todoListItem')
    return (
        <StyledTodoListItemLi>
            <StyledItemComponentLiContainer>
                <TodoListItemCheckbox todo={props.todo}/>
                <TodoListItemText todo={props.todo}/>
            </StyledItemComponentLiContainer>
        </StyledTodoListItemLi>
    )
});

const StyledTodoListItemLi = styled.li`
  text-align: left;
  display: flex !important;
  font-size: .9375rem;
  padding: 0.4rem 0;
  border-bottom: 1px solid #f3f3f3;
  list-style: none;
`

const StyledItemComponentLiContainer = styled.div`
  display: flex;
  text-overflow: ellipsis;
  overflow: hidden;
  width: 100%;
  white-space: nowrap;
`

export default TodoListItem;