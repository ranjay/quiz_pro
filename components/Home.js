import React from "react";

import ons from "onsenui";

import {
  Page,
  Toolbar,
  List,
  ListItem,
  ListHeader,
  Button
} from "react-onsenui";
import Topic from "./Topic";
import Settings from "../api/Settings";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "quiz"
    };
  }

  componentDidMount() {
    const subject = this.state.subject;
    console.log(subject);

    const url = `${Settings.host}/questions/cat_list.json?cat=subjective`;
    fetch(url)
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            subject: result
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
        <div className="center">Quiz</div>
      </Toolbar>
    );
  }
  showQuiz(transition) {
    const nav = this.props.navigator;
    console.log(transition);

    nav.pushPage(
      {
        comp: Topic,
        props: {
          key: transition,
          subject: transition
        }
      },
      { animation: "slide", animationOptions: { duration: 0.8 } }
    );
  }

  render() {
    const { error, isLoaded, subject } = this.state;
    console.log(subject);

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
              dataSource={subject}
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

module.exports = Home;
