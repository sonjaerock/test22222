import React, {ReactElement, useCallback, useEffect, useState} from 'react';
import styled from "styled-components";
import {ITodoData} from "../../../Types/TodoListType";
import TodoListItemButton from './TodoListItemButton';
import {useUpdateTodo} from "../../../Hooks/useTodoListQuery";

type Props = {
    todo: ITodoData
};

const defaultProps = {
    todo: null
}

const TodoListItemText = (props: Props): ReactElement | null => {
    const updateTodoList = useUpdateTodo()
    let todoData = props.todo;
    const [tempTodoData, setTempTodoData] = useState(todoData);
    const changeEventHandler = useCallback((e:any) => {
        setTempTodoData({
            ...tempTodoData,
            title: e.target.value
        });
    }, [])

    useEffect(() => {
        setTempTodoData(props.todo);
    }, [props.todo])

    return (
        <StyledTodoListItemTextContainer>
            <StyledTodoListItemTextInput
                onBlur={async (e) => {
                    if(todoData.title !== e.target.value) {
                        await updateTodoList.mutateAsync({
                            id: todoData.id,
                            title: e.target.value,
                            completed: todoData.completed
                        });
                    }
                }}
                onChange={async (e) => {
                    changeEventHandler(e)
                }}
                type="text"
                value={tempTodoData.title || ''}/>

            {/*삭제*/}
            <TodoListItemButton
                todoData={todoData}
                tempTodoData={tempTodoData}
                type={'delete'}
                title={'Delete'}/>

            {/*수정*/}
            <TodoListItemButton
                tempTodoData={tempTodoData}
                todoData={todoData}
                type={'put'}
                title={'Adjust'}/>

        </StyledTodoListItemTextContainer>
    );
};

const StyledTodoListItemTextContainer = styled.div`
  width: 100%;
`

const StyledTodoListItemTextInput = styled.input`
  width: 420px;
  border: none;

  &:focus {
    outline: none;
    border-bottom: 1px #61768B solid;
    font-weight: 600;
  }
`

// const StyledTodoListItemAdjustButton = styled.button`
//   float: right;
//   height: 20px;
//   margin-left: 10px;
//   color: white;
//   border: 1px #61768B solid;
//   border-radius: 1px;
//   background: #61768B;
//
// `

TodoListItemText.defaultProps = defaultProps;

export default TodoListItemText;