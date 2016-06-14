# redux-modules [![Circle CI](https://circleci.com/gh/mboperator/redux-modules/tree/master.svg?style=svg)](https://circleci.com/gh/mboperator/redux-modules/tree/master)

`redux-modules` is a refinement on the [Redux module](https://github.com/erikras/ducks-modular-redux) concept with developer experience in mind. It provides:
- an **intuitive** way define actions and state transformations
- **propType style typechecking** for action payloads
![Example](https://raw.githubusercontent.com/mboperator/redux-modules/master/examples/screenshots/payloadTypes.png "redux-modules")
- a decorator for passing bound module actions to React views

## Getting Started
### Install
`npm install redux-modules --save`

### Usage Example
Here's an example of a simple todo app. First create a module that allows todos to be created and destroyed.

#### src/modules/todos.js
```js
export default createModule({
  name: 'todos',
  initialState: List(),
  transformations: [
    {
      action: 'CREATE',
      payloadTypes: {
        todo: shape({
          description: string.isRequired,
        }),
      },
      reducer: (state, {payload: { todo }}) =>
        state.update('collection', todos => todos.push(fromJS(todo))),
    },
    {
      action: 'DESTROY',
      payloadTypes: {
        index: number.isRequired,
      },
      reducer: (state, {payload: { index }}) => {
        state.update('collection', todos => todos.delete(index)),
    },
  ],
});
```

Now we add the reducer to our store
#### src/App.jsx
```js
const store = createStore(todoModule.reducer, List());

export default const App = props => (
  <Provider store={store}>
    <Todos {...props}/>
  </Provider>
)
```

The last step is to wire it up to the view

#### src/views/Todos.jsx
```js
const selector = state => {
  return {
    todos: {
      collection: state.get('todos').toJS(),
    }
  };
};

@connectModule(selector, todoModule)
export default class Todos extends Component {
  static propTypes = {
    todos: shape({
      // exposed by selector
      collection: array,
      // actions from module w/ bound dispatch
      actions: shape({
        create: func,
        destroy: func,
      }),
    }),
  };
```

That's it! Check the documentation for comparisons

# Documentation
- Introduction
- Motivation
- Basic Concepts
- API Reference
