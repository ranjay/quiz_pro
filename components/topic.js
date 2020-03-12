import React from "react";

import ons from "onsenui";

import {
  Page,
  Toolbar,
  List,
  ListItem,
  ListHeader,
  Button,
  BackButton
} from "react-onsenui";
import QuizApp from "./QuizApp";
import Settings from "../api/Settings";

class Topic extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      subject: props.subject
    };
  }

  componentDidMount() {
    const subject = this.state.subject;
    console.log(subject);

    const url = `${Settings.host}/questions/cat_list.json?subject=${subject}`;
    fetch(url)
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            topic: result
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
  showQuiz(transition) {
    const nav = this.props.navigator;
    console.log(transition);

    nav.pushPage(
      {
        comp: QuizApp,
        props: {
          key: transition,
          subject: this.state.subject,
          topic: transition
        }
      },
      { animation: "slide", animationOptions: { duration: 0.8 } }
    );
  }

  render() {
    const { error, isLoaded, topic } = this.state;
    console.log(topic);

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
          <p style={{ padding: "0 15px" }}>
            <List
              dataSource={topic}
              renderHeader={this.renderHeader}
              renderRow={(row, idx) => (
                <ListItem
                  key={idx}
                  tappable
                  onClick={this.showQuiz.bind(this, row)}
                >
                  {row}
                </ListItem>
              )}
            />
          </p>
        </Page>
      );
    }
  }
}

module.exports = Topic;
