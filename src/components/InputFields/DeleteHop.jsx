import React, { Component } from 'react';

class DeleteHop extends Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
  }

  async submit() {
    const { onDelete, id } = this.props;

    try {
        await onDelete({ input: { id } })
    } catch (err) {
        console.error(err);
    }
  }

  render(){
    return (
      <button onClick={this.submit}>
          Delete
      </button>
    );
  }
}

export default DeleteHop;
