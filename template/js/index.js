import Engine from '@nez-fin/core/dist/Engine';
import Variable from '@nez-fin/core/dist/Variable';
import Component, {merge, chain} from '@nez-fin/core/dist/Component';
import './index.css';

// define a component classic style
class Box extends Component {
  constructor(params) {
    super(params); // Box is automatically chained
  }
}

// define a component functional style
function FlexBox(params) {
  return new Component(merge(params, {
    chain: ['FlexBox']
  }));
}

// define a component functional style with chain function
function ColFlexBox(params) {
  return FlexBox(chain('ColFlexBox', params, {
    attributes: {
      style: {
        flexDirection: 'column'
      }
    }
  }));
}

// define a component classic style with extend
class Card extends Box {
  constructor(params) {
    super(params);
  }
}

// define a component functional style with chain
function Input(params) {
  return new Component(chain('Input', params, {
    tag: 'input',
    attributes: {
      value: username.refer,
      onInput: (c) => username.value = c.node.value
    }
  }));
}

const logos = [
  [ 'logo/fin.png', false, true ],
  [ 'logo/fin.png', true, false ],
  [ 'logo/fin-round.png', false, false ],
  [ 'logo/fin.js.svg', true, false ],
  [ 'logo/fin.js_.svg', true, true ]
];

export const username = new Variable('guest');

function App() {
  return new Component({
    chain: ['App'], // another way of chaining
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
            chain: ['Chain'],
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
            children: [ Input({}) ]
          })
        ]
      })
    ]
  });
}

export default new Engine(
  document.getElementById('root'), 
  App()
)
.update().render();
