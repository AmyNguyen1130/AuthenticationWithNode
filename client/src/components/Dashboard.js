import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions'

class Dashboard extends Component {

    componentDidMount(){
        this.props.getSecret();
    }

    render(){
        return(
            <div>
                this is Dashboard 
                Our secret: <h4> {this.props.secret} </h4>
            </div>
        )
    }
}
function mapStateToProps(state){

    return {
        secret: state.dash.secret
    }
}

export default connect(mapStateToProps, actions)(Dashboard);