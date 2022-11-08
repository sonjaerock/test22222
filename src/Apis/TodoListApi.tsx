import axios from "axios";
import {ITodoData} from "../Types/TodoListType";

export const TodoListApi = {
    get: async (): Promise<ITodoData[]> => {
        return axios.get('https://jsonplaceholder.typicode.com/todos').then((res: any) => {
            return res.data
        })
    },

    put: async (id: number, title: string, completed: boolean): Promise<ITodoData> => {
        return axios.put(`https://jsonplaceholder.typicode.com/todos/${id}`, {
            title: title,
            completed: completed
        }).then((res: any) => {
            return res.data
        })
    },

    delete: async (id: number) => {
        return axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`).then((res: any) => {
            return res.data
        })
    }
}