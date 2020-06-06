"use strict"
//1
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as bookActions from '../actions/bookActions';
import BookRender from './BookRender';

const BookContainer = (props) => {
    // componentWillMount() {
    //     this.props().postBook();
    // }
    //new
    // componentWillReceiveProps(nextProps) {
    //     if (nextProps.postBook()) {
    //       this.props.books.unshift(nextProps.newPost);
    //     }
    // }
    useEffect(() => {
        const { actions } = props;
        actions.readBooks();//once we have our props we pass the action to change it 
    }, [] );

   //pass map "state" as a prop, use effec is the only place that changes, passes down state data
    return(
        <div>
            <BookRender {...props} /> 
        </div>
    );
}

function mapStateToProps(state) {//copy part, copy of the slice of data, the book reducer will provide it as props
    return {
        bookData: state.bookReducer.bookData
    }
}

function mapDispatchToProps(dispatch){
    return { 
        actions: bindActionCreators(bookActions, dispatch)
    }
}

BookContainer.propTypes = {
    actions: PropTypes.object
};

//coneect out props to our bookcontainer
//making props""state" aviable to the book container
export default connect( 
    mapStateToProps,
    mapDispatchToProps
    )(BookContainer);
