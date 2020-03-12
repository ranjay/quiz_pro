import React from "react";

import ons from "onsenui";
import ReactHtmlParser from "react-html-parser";

import {
  Page,
  Toolbar,
  List,
  ListItem,
  ListHeader,
  Button,
  BackButton
} from "react-onsenui";

import Settings from "../api/Settings";

class Slist extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      subject: props.subject,
      topic: props.topic,
      qlist: [],
      modalText: "loading"
    };
  }

  componentDidMount() {
    const subject = this.state.subject;
    const topic = this.state.topic;

    const url = `${
      Settings.host
    }/questions/qlist.json?subject=${subject}&topic=${topic}&subjective=true`;
    fetch(url)
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            qlist: result
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
  showModal(qid) {
    console.log(qid);

    var modal = document.querySelector("ons-modal");
    modal.show();
    const url = `${Settings.host}/questions/${qid}.json`;
    fetch(url)
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            modalText: result.explanation
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

  render() {
    const { error, isLoaded, topic, qlist, modalText } = this.state;

    console.log(qlist);

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
              dataSource={qlist}
              renderHeader={this.renderHeader}
              renderRow={(row, idx) => (
                <ListItem
                  class="list"
                  key={idx}
                  tappable
                  onClick={this.showModal.bind(this, row.id)}
                >
                  {ReactHtmlParser(row.question)}
                </ListItem>
              )}
            />
          </p>
          <ons-modal direction="up">
            <div>
              <p>{ReactHtmlParser(modalText)}</p>
            </div>
          </ons-modal>
        </Page>
      );
    }
  }
}

module.exports = Slist;
