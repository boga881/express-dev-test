import React from 'react';

export default class Button extends React.Component {
  constructor(props) {
      super(props);
  }
  
  render() {
    return (
      <div className='button'>
        <button>Click Me</button>
      </div>
    );
  }
}
