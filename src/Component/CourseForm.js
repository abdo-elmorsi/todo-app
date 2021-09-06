import React, { Component } from "react";

class Form extends Component {
  render() {
    return (
      <form onSubmit={this.props.addCourse}>
        <input
          autoFocus
          type="text"
          onChange={this.props.updateCourse}
          value={this.props.Cvalue}
          placeholder={this.props.placeHolder}
        />
        <input type="submit" value="submit" />
      </form>
    );
  }
}

export default Form;
