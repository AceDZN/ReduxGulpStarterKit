import React, {Component} from 'react';
import {connect} from 'react-redux';
import {selectPlatform} from '../actions/index';
import {bindActionCreators} from 'redux';

class PlatformsList extends Component {
  renderList(){
    return this.props.platforms.map((platform)=>{
      return (
        <li
          className="list-group-item"
          key={platform.title}
          onClick={()=>this.props.selectPlatform(platform)}>
          {platform.title}
        </li>
      )
    })
  }
  render(){
    return (
      <ul className="list-group">
        {this.renderList()}
      </ul>
    )
  }
}

function mapStateToProps(state) {
  return {
    platforms: state.platforms
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({selectPlatform:selectPlatform}, dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps)(PlatformsList);
