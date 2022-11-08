import React, {ReactElement, useEffect} from 'react';
import styled from "styled-components";

type Props = {
    item: simpleItem,
    clickEvent: Function
};

const defaultProps = {
    idx: 0
}

interface simpleItem {
    id: number,
    data: number
}

const SimpleStateItem = React.memo((props: Props): ReactElement | null => {
    useEffect(() => {
        console.log('SimpleStateItem useEffect', props.item.id)
    }, [])
    console.log('render - state', props.item)
    return (
        <div>
            {props.item.id}
            <button onClick={() => {props.clickEvent(props.item.id)}}>delete</button>
        </div>
    );
});

export default SimpleStateItem;