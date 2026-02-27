const defaultState = {
    users:[]
}

const CREATE = 'CREATE';
const READ = 'READ';
const UPDATE = 'UPDATE';
const DELETE = 'DELETE';

export const Reducer = (state=defaultState,action)=>{
    switch (action.type) {
        case CREATE:
            return {...state,users:[...state.users,action.payload]};
        case READ:
            return {...state,users:action.payload}
        case UPDATE:
          let index =  state.users.findIndex(user=>user.id==action.payload.id);
          state.users[index] = action.payload;
            return {...state};
        case DELETE:
          let delUser =  state.users.filter(user=>user.id!==action.payload);
            return {...state,users:delUser};
    }
    return state;
}