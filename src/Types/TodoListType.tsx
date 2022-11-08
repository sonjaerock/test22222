export interface ITodoData {
    id: number,
    userId: string,
    title: string,
    completed: boolean
}

export interface IUpdateTodoList {
    id: number,
    title: string,
    completed: boolean
}

export interface IDeleteTodoList {
    id: number,
}
