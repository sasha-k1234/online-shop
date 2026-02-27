export const defaultState = {
    display:localStorage.getItem('tasks')!==null?JSON.parse(localStorage.getItem('tasks')):[],
    editId:-1,
    input:''
}