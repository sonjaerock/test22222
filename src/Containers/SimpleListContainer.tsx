import {ReactElement} from 'react';
import SimpleList from "../Components/SimpleList/SimpleList";
import styled from "styled-components";

const SimpleListContainer = (): ReactElement | null => {
    return (
        <div>
            <SimpleList></SimpleList>
        </div>
    );
};

export default SimpleListContainer;