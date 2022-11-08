import React from 'react';
import TodoListPage from "./Pages/TodoListPage";
import SimpleListPage from "./Pages/SimpleListPage";

import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/todolist' element={<TodoListPage></TodoListPage>} />
                <Route path='/simplelist' element={<SimpleListPage></SimpleListPage>}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
