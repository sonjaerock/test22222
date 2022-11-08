import {useMutation, useQuery, useQueryClient, UseQueryResult} from "react-query";
import {ITodoData, IUpdateTodoList, IDeleteTodoList} from "../Types/TodoListType";
import {TodoListApi} from "../Apis/TodoListApi";

// get
export const useTodoListData = () => {
    const { data: getTodoList } :UseQueryResult<ITodoData[], Error> = useQuery<ITodoData[], Error>({
        queryKey: 'todolist',
        queryFn: TodoListApi.get,
        suspense: true
    });
    return getTodoList;
}

export const useUpdateTodo = () => {
    const queryClient = useQueryClient();
    // const { mutate : updateTodoList } : UseMutationResult<ITodoData, Error, IUpdateTodoList>
    return useMutation<ITodoData, Error, IUpdateTodoList>({
        mutationKey: 'todolist',
        mutationFn: async ({id, title, completed}) => TodoListApi.put(id, title, completed),
        onMutate: async ({id, title, completed}) => {
            await queryClient.cancelQueries({queryKey: 'todolist'})

            const previousTodoList: ITodoData[] | undefined = queryClient.getQueryData('todolist')

            const newTodoList = previousTodoList?.filter((todo) => {
                if (todo.id === id) {
                    todo.title = title;
                    todo.completed = completed;
                }
                return todo;
            });

            console.log('mutate done')
            // Optimistically update to the new value
            queryClient.setQueryData('todolist', newTodoList)

            return {previousTodoList, newTodoList}
        },
    });
}

export const useDeleteTodo = () => {
    const queryClient = useQueryClient();
    // const { mutate: deleteTodoList } : UseMutationResult<ITodoData, Error, IDeleteTodoList>
    return useMutation<ITodoData, Error, IDeleteTodoList>({
            mutationKey: 'todolist',
            mutationFn: async ({id}) => {
                return TodoListApi.delete(id);
            },
            onSuccess: (data, variables, context) => {
                console.log('onSuccess')
            },
            onMutate: async ({id}) => {
                await queryClient.cancelQueries({queryKey: 'todolist'})

                const previousTodoList: ITodoData[] | undefined = queryClient.getQueryData('todolist')

                // const newTodoList = previousTodoList?.filter((todo) => todo.id !== id);

                // delete array in store 불변성 유지 방법.. 필요 밑에거도 싹다 재렌더링됨..
                const newTodoList = previousTodoList?.splice(id-1, 1)
                // Optimistically update to the new value
                queryClient.setQueryData('todolist', previousTodoList?.filter((todo) => todo.id !== id))

                return {previousTodoList, newTodoList}
            },
            onSettled: async () => {
                console.log('onSettled')
                // await queryClient.invalidateQueries({queryKey: 'todolist'})
            }
        }
    );
}
