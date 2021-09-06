import React, { Fragment, Component } from "react";

class List extends Component {
  state = {
    isEdit: false,
    class: "class"
  };
  addActive = (e) => {
    console.log(e.target);
    e.target.classList.toggle("class");
  };
  renderCourse = () => {
    return (
      <li>
        <span onClick={this.addActive} className={this.state.class}>{this.props.details.name}</span>
        <button className="edit" onClick={() => this.ToggleState()}>
          Edit
        </button>
        <button
          className="delete"
          onClick={() => this.props.DeleteCourse(this.props.index)}
        >
          Delete
        </button>
      </li>
    );
  };

  ToggleState = () => {
    let { isEdit } = this.state;
    this.setState({
      isEdit: !isEdit,
    });
  };

  updateCourseItem = (e) => {
    if (this.input.value.trim()) {
      e.preventDefault();
      this.props.editCourse(this.props.index, this.input.value);
      this.ToggleState();
    } else {
      e.preventDefault();
      this.ToggleState();
    }
  };

  renderUpdateForm = () => {
    return (
      <form
        className="editF"
        onSubmit={this.updateCourseItem}
        onBlur={this.updateCourseItem}
      >
        <input
          autoFocus
          type="text"
          className="editT"
          defaultValue={this.props.details.name}
          ref={(v) => {
            this.input = v;
          }}
        />
        <button className="editB">Update Course</button>
      </form>
    );
  };
  render() {
    let { isEdit } = this.state;
    return (
      <Fragment>
        {isEdit ? this.renderUpdateForm() : this.renderCourse()}
      </Fragment>
    );
  }
}

export default List;
