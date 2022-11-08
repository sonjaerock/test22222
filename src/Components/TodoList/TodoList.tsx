import {ReactElement, Suspense} from 'react';
import styled, {keyframes} from "styled-components";
import TodoListItem from "./TodoListItem";
import {useQuery, UseQueryResult} from "react-query";
import {TodoListApi} from "../../Apis/TodoListApi";
import {ITodoData} from "../../Types/TodoListType";
import ErrorBoundary from '../../Error/ErrorBoundary'

type Props = {};

const defaultProps = {}

const TodoList = (props: Props): ReactElement | null => {
    const {
        isLoading,
        data
    }: UseQueryResult<ITodoData[], Error> = useQuery<ITodoData[], Error>({
        queryKey: 'todolist',
        queryFn: TodoListApi.get,
        suspense: true
    })

    if (isLoading) return (<div>Loading...</div>)

    return (
        <StyledTodoListUl>
            <Suspense fallback={<div>Loading...</div>}>
                <ErrorBoundary fallback={<div>Error...</div>}>
                    {
                        data?.map((todo: ITodoData, idx: number) => {
                            return <TodoListItem
                                todo={todo}
                                key={Number(idx)}
                                idx={Number(idx)}/>;
                        })
                    }
                </ErrorBoundary>
            </Suspense>
        </StyledTodoListUl>
    );
};

TodoList.defaultProps = defaultProps;

const fadeIn = keyframes`
  0% {
    opacity: 0
  }
`
const StyledTodoListUl = styled.ul`
  flex-direction: column-reverse !important;
  padding: 0;
  text-align: left;
  list-style: none;
  margin-bottom: 0;
  animation: ${fadeIn} 1s;
`

export default TodoList;