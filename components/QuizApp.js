import React, { Fragment, Component } from "react";

import Quiz from "./Quiz";
import {
  Page,
  Toolbar,
  List,
  ListItem,
  ListHeader,
  Dialog,
  Button,
  BackButton
} from "react-onsenui";

import quiz from "../api/Quizdata";
import Settings from "../api/Settings";

class QuizApp extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);

    this.state = {
      error: null,
      isLoaded: false,
      quiz_data: {},
      subject: props.subject,
      topic: props.topic
    };
  }
  componentDidMount() {
    const subject = this.state.subject;
    const topic = this.state.topic;
    console.log(subject);

    const url = `${
      Settings.host
    }/questions/qlist.json?subject=${subject}&topic=${topic}`;
    fetch(url)
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            quiz_data: result
          });
        },

        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }
  renderToolbar() {
    return (
      <Toolbar>
        <div className="left">
          <BackButton>Back</BackButton>
        </div>
        <div className="center">Quiz</div>
      </Toolbar>
    );
  }

  render() {
    const { error, isLoaded, quiz_data } = this.state;

    if (error) {
      return (
        <Page renderToolbar={this.renderToolbar}>
          <div>Error: {error.message}</div>
        </Page>
      );
    } else if (!isLoaded) {
      return (
        <Page renderToolbar={this.renderToolbar}>
          <div className="loading" />
        </Page>
      );
    } else {
      return (
        <Page renderToolbar={this.renderToolbar}>
          <Quiz quiz={quiz_data} />
        </Page>
      );
    }
  }
}

export default QuizApp;
