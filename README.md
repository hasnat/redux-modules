# redux-modules [![npm version](https://badge.fury.io/js/redux-modules.svg)](https://badge.fury.io/js/redux-modules) [![Circle CI](https://circleci.com/gh/mboperator/redux-modules/tree/master.svg?style=svg)](https://circleci.com/gh/mboperator/redux-modules/tree/master)

`redux-modules` is a refinement on the [Redux module](https://github.com/erikras/ducks-modular-redux) concept with developer experience in mind. It provides:
- An **intuitive** way define actions and state transformations
- The ability to add action creator middleware
- **propType style typechecking** for action payloads
![Example](https://raw.githubusercontent.com/mboperator/redux-modules/master/examples/screenshots/payloadTypes.png "redux-modules")
- A decorator for passing bound module actions to React views

## Getting Started
### Install
`npm install redux-modules --save`

### Usage Example
Here's an example of a simple todo app. First create a module that allows todos to be created and destroyed.

#### src/modules/todos.js
```js
import { createModule } from 'redux-modules';

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

Once the module is complete, the reducer has to be added to the store.
#### src/App.jsx
```js
const store = createStore(todoModule.reducer, {});

export default const App = props => (
  <Provider store={store}>
    <Todos {...props}/>
  </Provider>
)
```

Alternatively, use `ModuleProvider` to allow reducers to be automatically added to the store at runtime.

```js
import { ModuleProvider } from 'redux-modules';
const store = createStore(state => state, {});

export default const App = props => (
  <ModuleProvider store={store}>
    <Todos {...props}/>
  </ModuleProvider>
)

```

The last step is to connect the module to the view. This works like a normal Redux `connect` with the added bonus of auto dispatching and namespacing actions.

#### src/views/Todos.jsx
```js
import { connectModule } from 'redux-modules';
const selector = state => {
  return {
    todos: state.get('todos').toJS(),
  };
};

@connectModule(selector, todoModule)
export default class Todos extends Component {
  static propTypes = {
    todos: array,
    actions: shape({
      todos: shape({
        create: func,
        destroy: func,
      }),
    }),
  };
```

That's it! Check the documentation for comparisons with idiomatic Redux, in depth examples, and advanced usage.

# Documentation
- [Motivation](https://mboperator.gitbooks.io/redux-modules/content/docs/motivation.html)
- [Basic Concepts](https://mboperator.gitbooks.io/redux-modules/content/docs/basics/)
- Recipes
- [API Reference](https://mboperator.gitbooks.io/redux-modules/content/docs/api_reference/REAMDE.html)
