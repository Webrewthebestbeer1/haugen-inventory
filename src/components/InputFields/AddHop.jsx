import React, { Component } from 'react';

class AddHop extends Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
    this.state = {
        name: '',
        weightGrams: 0,
        yearHarvested: 0,
        errors: [],
    };
  }

  handleChange(name, event) {
      this.setState({ [name]: event.target.value });
  }

  async submit() {
    const { onCreate } = this.props;
    const input = {
      name: this.state.name,
      weightGrams: this.state.weightGrams,
      yearHarvested: this.state.yearHarvested,
    }
    console.log(input);

    try {
        await onCreate({input})
        if (this.state.errors.length > 0) this.setState({ errors: [] })
    } catch (err) {
        console.error(err);
        this.setState({ errors: err.errors })
    }

  }

  renderErrors() {
      if (this.state.errors.length > 0) {
          return (
              <div>
                  {this.state.errors.map(error => (
                      <p key={error.message}>
                        {error.message}
                      </p>
                  ))}
              </div>
          )
      }
  }

  render(){
    return (
        <div>
            <input
                name="name"
                placeholder="name"
                onChange={(event) => { this.handleChange('name', event)}}
            />
            <input
                name="weightGrams"
                placeholder="weightGrams"
                onChange={(event) => { this.handleChange('weightGrams', event)}}
            />
            <input
                name="yearHarvested"
                placeholder="yearHarvested"
                onChange={(event) => { this.handleChange('yearHarvested', event)}}
            />
            <button onClick={this.submit}>
                Add
            </button>
            {this.renderErrors()}
        </div>
    );
  }
}

export default AddHop;
