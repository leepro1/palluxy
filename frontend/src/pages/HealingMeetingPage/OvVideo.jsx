import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class OpenViduVideoComponent extends Component {
  constructor(props) {
    super(props);
    this.videoRef = React.createRef();
  }

  componentDidUpdate(props) {
    if (props && !!this.videoRef) {
      this.props.streamManager.addVideoElement(this.videoRef.current);
    }
  }

  componentDidMount() {
    if (this.props && !!this.videoRef) {
      this.props.streamManager.addVideoElement(this.videoRef.current);
    }
  }

  render() {
    return (
      <div>
        <video
          autoPlay={true}
          ref={this.videoRef}
        />
      </div>
    );
  }
}

OpenViduVideoComponent.propTypes = {
  streamManager: PropTypes.any,
};
