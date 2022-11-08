import React, {ReactElement, useCallback, useState} from 'react';
import SimpleListItem from "./SimpleListItem";
import SimpleStateItem from "./SimpleStateItem";

import styled from "styled-components";
import {useQuery, UseQueryResult} from "react-query";
interface simpleItem {
    id: number,
    data: number
}
const SimpleList = React.memo((): ReactElement | null => {
    const [test, setTest] = useState([{
        id: 1,
        data: 1
    }, {
        id: 2,
        data: 2
    }, {
        id: 3,
        data: 3
    }, {
        id: 4,
        data: 4
    }, {
        id: 5,
        data: 5
    }, {
        id: 6,
        data: 6
    }, {
        id: 7,
        data: 7
    }, {
        id: 8,
        data: 8
    }]);
    const deleteTest = useCallback((id: number) => {
        console.log('delete - go')
        setTest(test.filter((item) => (item.id !== id)))
    }, [])

    const {
        isLoading,
        data: simpleList
    }: UseQueryResult<simpleItem[], Error> = useQuery<simpleItem[], Error>({
        queryKey: 'simpleList',
        queryFn: () => {
            return [{
                id: 1,
                data: 1
            }, {
                id: 2,
                data: 2
            }, {
                id: 3,
                data: 3
            }, {
                id: 4,
                data: 4
            }, {
                id: 5,
                data: 5
            }, {
                id: 6,
                data: 6
            }, {
                id: 7,
                data: 7
            }, {
                id: 8,
                data: 8
            }]
        },
        suspense: true
    })

    return (
        <div>
            <b>store</b>
            {
                simpleList?.map((item, idx) => {
                    return (<SimpleListItem key={item.id} item={item}></SimpleListItem>)
                })
            }
            <b>state</b>
            {
                test.map((item, idx) => {
                    return <SimpleStateItem
                        key={item.id}
                        item={item}
                        clickEvent={(id: number) => {
                            deleteTest(id)
                        }}></SimpleStateItem>
                })
            }
        </div>
    );
});

export default SimpleList;