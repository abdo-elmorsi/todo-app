import React, { Component } from "react";
import "./App.css";
import CourseForm from "./Component/CourseForm";
import CourseList from "./Component/CourseList";

class App extends Component {
  local = {
    fetch: () => {
      let Courses = JSON.parse(localStorage.getItem("courses") || "[]");
      return Courses;
    },
    save: (e) => {
      localStorage.setItem("courses", JSON.stringify(e));
    },
  };
  state = {
    courses: this.local.fetch(),
    current: "",
    placeHolder: "Enter Your Course",
  };

  componentDidUpdate() {
    this.local.save(this.state.courses);
  }

  updateCourse = (e) => {
    this.setState({
      current: e.target.value,
    });
  };
  addCourse = (e) => {
    e.preventDefault();
    if (this.state.current.trim()) {
      let current = this.state.current;
      let courses = this.state.courses;
      courses.push({ name: current });
      this.setState({
        courses,
        current: "",
        placeHolder: "Enter Your Course",
      });
    } else {
      this.setState({
        placeHolder: "You must Write Any Words",
      });
    }
  };
  DeleteCourse = (index) => {
    let courses = this.state.courses;
    courses.splice(index, 1);
    this.setState({ courses });
  };
  editCourse = (index, value) => {
    let courses = this.state.courses;
    let course = courses[index];
    course["name"] = value;
    this.setState({
      courses,
    });
  };

  render() {
    const courses = this.state.courses;
    const courseList = courses.map((course, index) => {
      return (
        <CourseList
          details={course}
          key={index}
          index={index}
          DeleteCourse={this.DeleteCourse}
          editCourse={this.editCourse}
        />
      );
    });
    return (
      <div className="App">
        <h2>Abdo Ahmed</h2>
        <CourseForm
          placeHolder={this.state.placeHolder}
          updateCourse={this.updateCourse}
          addCourse={this.addCourse}
          Cvalue={this.state.current}
        />
        <ul>
          {courseList.length > 0 ? (
            courseList
          ) : (
            <li>
              <strong>Sory No Courses</strong>
            </li>
          )}
        </ul>
      </div>
    );
  }
}

export default App;
