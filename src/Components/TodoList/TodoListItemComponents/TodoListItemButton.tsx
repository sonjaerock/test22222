import {ReactElement, useState} from 'react';
import styled from "styled-components";
import {ITodoData} from "../../../Types/TodoListType";
import {useUpdateTodo, useDeleteTodo} from "../../../Hooks/useTodoListQuery";

type Props = {
    type: string,
    title: string,
    todoData: ITodoData,
    tempTodoData: ITodoData
};

const defaultProps = {
    type: '',
    title: '',
    todoData: {id: 0, title: ''},
    tempTodoData: {id: 0, title: ''}
}


const TodoListItemButton = (props: Props): ReactElement | null => {
    const updateTodoList = useUpdateTodo()
    const deleteTodoList = useDeleteTodo()

    const [isPending, setIsPending] = useState(false);

    const setTodoListItem = async (type: string, data: ITodoData, tempTodoData: ITodoData) => {
        switch (type) {
            case 'put':
                if (!isPending) {
                    setIsPending(true)

                    await updateTodoList.mutateAsync({
                        id: data.id,
                        title: tempTodoData.title,
                        completed: tempTodoData.completed
                    });

                    setIsPending(false)
                }
                break;

            case 'delete':
                if (!isPending) {
                    setIsPending(true)
                    await deleteTodoList.mutateAsync({
                        id: data.id
                    });
                    setIsPending(false)
                }
                break;

            default:
                return;
        }
    }

    return (
        <StyledTodoListItemButton
            disabled={isPending}
            onClick={async (e) => {
                e.preventDefault();
                e.stopPropagation();
                await setTodoListItem(props.type, props.todoData, props.tempTodoData)
            }
            }>
            {props.title}
        </StyledTodoListItemButton>
    );
};

const StyledTodoListItemButton = styled.button`
  float: right;
  height: 20px;
  margin-left: 10px;
  color: white;
  border: 1px #61768B solid;
  border-radius: 1px;
  background: #61768B;
`

TodoListItemButton.defaultProps = defaultProps;

export default TodoListItemButton;