import Manager from '@nez-fin/core/dist/Manager';
import Variable from '@nez-fin/core/dist/Variable';
import Component, {chain, inheritParams} from '@nez-fin/core/dist/Component';
import './index.css';

// define a component classic style
class Box extends Component {
  constructor(params) {
    super(inheritParams({}, params));
  }
}

// define a component functional style
function FlexBox(params) {
  return new Component(chain('FlexBox', {}, params));
}

// define a component functional style with chain
function ColFlexBox(params) {
  return FlexBox(chain('ColFlexBox', {
    attributes: {
      style: {
        flexDirection: 'column'
      }
    }
  }, params));
}

// define a component classic style with extend
class Card extends Box {
  constructor(params) {
    super(inheritParams({}, params));
  }
}

// define a component functional style with chain
function Input(params) {
  return new Component(chain('Input', {
    tag: 'input',
    attributes: {
      value: username.refer,
      onInput: (c) => username.value = c.node.value
    }
  }, params));
}

const logos = [
  [ 'logo/fin.png', false, true ],
  [ 'logo/fin.png', true, false ],
  [ 'logo/fin-round.png', false, false ],
  [ 'logo/fin.js.svg', true, false ],
  [ 'logo/fin.js_.svg', true, true ]
];

export const username = new Variable('guest');

function App(params) {
  return new Component(chain('App', {
    attributes: {
      id: 'app',
      style: { gap: '.5rem' }
    },
    children: [
      FlexBox({
        attributes: {
          style: { 
            gap: '1rem', 
            padding: '1rem', 
            position: 'sticky',
            top: '0',
            boxShadow: 'goldenrod 0 .1rem .2rem',
            backgroundColor: 'rgb(250 250 250)'
        }},
        children: logos.map(([logoUri, logoBorder, logoShadow]) => 
          new Component({
            tag: 'img',
            attributes: {
              class: `Logo 
                ${(logoBorder ? 'Border' : '')} 
                ${(logoShadow ? 'Shadow' : '')}
              `,
              alt: logoUri,
              src: logoUri,
              style: {height: '3rem'}
            }
          })
        )
      }),
      ColFlexBox({
        attributes: {
          style: { gap: '.5rem', padding: '.5rem 1rem' }
        },
        children: [
          new Card({
            children: [ 'hello ', username.refer, '!' ]
          }),
          new Card({
            children: [ Input() ]
          })
        ]
      })
    ]
  }, params));
}

export default new Manager(
  document.getElementById('root'), 
  App()
)
.update().render();
