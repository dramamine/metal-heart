'use strict';

var React = require('react');
var dom = React.DOM;
var $ = require('jquery');
// CSS
require('normalize.css');
require('../styles/main.css');


var Tab = React.createClass({

  render: function() {
    if( this.props.data === null )
    {
      return (
        <div>Loading...</div>
        );
    }

    var eachImage = this.props.data.content.map(function(image) {
      var imgsrc = 'http://metal-heart.org/content/images/fit/' + image.img;
      return (
        <div className="flow">
          <img src={imgsrc} />
          <br />{image.title}
        </div>
      );
    });

    return (
      <div>
      <span>{this.props.title} - {this.props.data.cals} Cals</span>
      {eachImage}
      </div>
    );
  }

});

var FitApp = React.createClass({

  handleClick: function(name) {
    this.setState({selectedItem: name});
  },

  componentDidMount: function() {
    $.ajax({
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
    if( this.state.data === null )
    {
      return (<div>Loading...</div>);
    }

    var self = this;

    function tab(name) {

      return dom.a({
        href: '#',
        className: self.state.selectedItem === name ? 'selected' : '',
        onClick: self.handleClick.bind(null, name),
        key: name
      }, name);
    }

    var tabs = Object.keys( this.state.data ).map(function(day) {
      return tab(day);
    });

    var mydata = this.state.data[this.state.selectedItem];

    return (
      <div className="content">
        <div className="tabs">
        {tabs}
        </div>
        <Tab title={this.state.selectedItem} data={mydata} />
      </div>
      );

  }
});


React.render(<FitApp />, document.getElementById('content')); // jshint ignore:line

module.exports = FitApp;
