import {
    addTodoListAC, changeTodoListFilterAC,
    changeTodoListTitleAC,
    removeTodoListAC,
    todoListReducer,
} from './todolists-reducer';
import {v1} from 'uuid';
import {FilterValuesType, TodolistType} from '../App';

let todolistId1: string
let todolistId2: string

let startState: Array<TodolistType>=[]

beforeEach(() => {
      todolistId1 = v1(); // для каждого теста будет разными
      todolistId2 = v1();

      startState = [
         {id: todolistId1, title: "What to learn", filter: "all"},
         {id: todolistId2, title: "What to buy", filter: "all"}
     ]
 })
test('correct todolist should be removed', () => {

    const endState = todoListReducer(startState, removeTodoListAC(todolistId1));

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
    expect(endState[0].title).toBe("What to buy")
})

test('correct todolist should be added', () => {

    let newTodolistTitle = "New Todolist";
    const endState = todoListReducer(startState, addTodoListAC(newTodolistTitle))

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {

    let newFilter: FilterValuesType = "completed";
    const endState = todoListReducer(startState, changeTodoListFilterAC(todolistId2, newFilter))

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});

test('correct todolist should change its name', () => {

    let newTodolistTitle = "New Todolist";
    const action = changeTodoListTitleAC(todolistId2, newTodolistTitle)

    const endState = todoListReducer(startState, action)
    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});


