import React, {Component} from 'react';
import {connect} from 'react-redux';

class GreetMessage extends Component{
  render(){
    if(!this.props.platform){
      return (
        <div>Hello _______!</div>
      )
    }
    return(
      <div>
        Hello {this.props.platform.title}!
      </div>
    )
  }

}
function mapStateToProps(state) {
  return {
    platform: state.activePlatform
  }
}

export default connect(mapStateToProps)(GreetMessage);
