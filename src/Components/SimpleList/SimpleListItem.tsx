import React, {ReactElement, useCallback} from 'react';
import styled from "styled-components";
import {useMutation, useQueryClient} from "react-query";
import {ITodoData, IUpdateTodoList} from "../../Types/TodoListType";
import {TodoListApi} from "../../Apis/TodoListApi";

type Props = {
    item: simpleItem
};

const defaultProps = {
    item: null
}

interface simpleItem {
    id: number,
    data: number
}

const SimpleListItem = React.memo((props: Props): ReactElement | null => {
    console.log('render : ', props.item)
    const queryClient = useQueryClient();

    const deleteSimpleList = useMutation<{id:number}, Error, number>({
        mutationKey: 'simpleList',
        mutationFn: async () => {
            return new Promise((resolve) => {
                setTimeout(resolve, 1000)
            })
        },
        onMutate: async (id: number) => {
            console.log('go mutate', id)
            await queryClient.cancelQueries({queryKey: 'simpleList'})

            const previousSimpleList: simpleItem[] | undefined = queryClient.getQueryData('simpleList')

            const newSimpleList = previousSimpleList?.filter(item => item.id !== id);
            // Optimistically update to the new value
            queryClient.setQueryData('simpleList', newSimpleList)

            return {previousSimpleList, newSimpleList}
        },
    });

    const test = useCallback(async () => {
        await deleteSimpleList.mutateAsync(props.item.id);
    }, [props.item])

    return (
        <div>
            <span>{props.item.data}</span>
            <button onClick={async () => {
                test();
            }}>delete</button>
        </div>
    );
});

export default SimpleListItem;