'use strict';

var React = require('react');
var dom = React.DOM;
var jQuery = require('jquery');


// CSS
require('normalize.css');
require('../styles/fit.css');


var Tab = React.createClass({

  // this function is not really necessary, but is generally useful...
  // see also 'propTypes' for props validation
  getDefaultProps: function() {
    return {
      title: '',
      data: null
    };
  },

  render: function() {

    // this renders on inital load
    if( this.props.data === null )
    {
      return (
        <div>Loading...</div>
        );
    }

    var eachImage = this.props.data.content.map(function(image) {
      var imgsrc = '../content/images/fit/' + image.img;
      return (
        <div className="flow">
          <img src={imgsrc} />
          <center>{image.title}</center>
        </div>
      );
    });

    return (
      <div>
        <center><h3>{this.props.title} - {this.props.data.cals} Cals</h3></center>
        <div className="container">
        {eachImage}
        </div>
      </div>
    );
  }

});

var FitApp = React.createClass({

  // click handler. use 'setState', never change state directly!
  handleClick: function(name) {
    this.setState({selectedItem: name});
    return false;
  },

  // function that runs after component is loaded
  componentDidMount: function() {
    jQuery.ajax({
      url: '../data/pix.json',
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this)
    });
  },


  getInitialState: function() {
    return {
      selectedItem: 'Sunday',
      data: null
    };
  },

  render: function() {

    // this renders on initial load
    if( this.state.data === null )
    {
      return (<div>Loading...</div>);
    }

    // callback function needs outside reference to 'this'
    var self = this;

    // I used JS instead of JSX here, for fun!
    function tab(name) {
      return dom.li({
        className: self.state.selectedItem === name ? 'active' : ''},
        dom.a({
          href: '#',
          onClick: self.handleClick.bind(null, name),
          key: name
        }, name)
      );
    }

    var tabs = Object.keys( this.state.data ).map(function(day) {
      return tab(day);
    });

    var mydata = this.state.data[this.state.selectedItem];

    return (
      <div className="fit-content">
        <div className="tabs">
          <ul className="nav nav-tabs">
          {tabs}
          </ul>
        </div>
        <Tab title={this.state.selectedItem} data={mydata} />
      </div>
    );


  }

});

// render content!
React.render(<FitApp />, document.getElementById('content')); // jshint ignore:line

module.exports = FitApp;
