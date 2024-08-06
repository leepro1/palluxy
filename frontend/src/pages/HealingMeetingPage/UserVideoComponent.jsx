import React, { Component } from 'react';
import OpenViduVideoComponent from './OvVideo';

export default class UserVideoComponent extends Component {
  getNicknameTag() {
    return JSON.parse(this.props.streamManager.stream.connection.data)
      .clientData;
  }

  render() {
    const isActive = this.props.isActive;

    return (
      <div
        className={`test flex h-full w-full items-center justify-center ${
          isActive ? 'border-2 border-yellow-200' : ''
        }`}
      >
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
