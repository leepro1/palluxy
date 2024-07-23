import React, { Component } from 'react';
import OpenViduVideoComponent from './OvVideo';

export default class UserVideoComponent extends Component {
  getNicknameTag() {
    return JSON.parse(this.props.streamManager.stream.connection.data)
      .clientData;
  }

  render() {
    return (
      <div className="test flex h-full w-full items-center justify-center">
        {this.props.streamManager !== undefined ? (
          <div className="">
            <OpenViduVideoComponent streamManager={this.props.streamManager} />
            <p className="absolute bg-white">{this.getNicknameTag()}</p>
          </div>
        ) : null}
      </div>
    );
  }
}
