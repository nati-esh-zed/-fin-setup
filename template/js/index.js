import Manager from '@nez-fin/core/dist/Manager';
import Variable from '@nez-fin/core/dist/Variable';
import Component, {chain, inheritParams} from '@nez-fin/core/dist/Component';
import './index.css';

export const username = new Variable('guest');

// define a component classic style
class Card extends Component {
  constructor(params) {
    super(inheritParams({}, params));
  }
}

// define a component functional style
function Input(params) {
  return new Component(chain('Input', {
    tag: 'input',
    attributes: {
      value: username.refer,
      onInput: (c) => username.value = c.node.value
    }
  }, params));
}

function App(params) {
  return new Component(chain('App', {
    attributes: {
      id: 'app',
      style: { gap: '.5rem' }
    },
    children: [
      new Card({
        children: [ 'hello ', username.refer, '!' ]
      }),
      new Card({
        children: [ Input() ]
      })
    ]
  }, params));
}

export default new Manager(
  document.getElementById('root'), 
  App()
)
.update().render();
