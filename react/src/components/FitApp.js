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

var Tabs = React.createClass({

  handleClick: function(name) {
    this.props.onChange( name );
  },

  render: function() {
    var props = this.props;

    if( props.data === null )
    {
      return (<div />);
    }

    var self = this;

    function tab(name) {

      return dom.a({
        href: '#',
        className: props.selectedItem === name ? 'selected' : '',
        onClick: self.handleClick.bind(null, name),
        key: name
      }, name);
    }

    var tabs = Object.keys( this.props.data ).map(function(day) {
      return tab(day);
    });

    return (
      <div>
      {tabs}
      </div>
      );

  }
});

var FitApp = React.createClass({

  getInitialState: function() {
    return {
      selectedTab: 'Sunday',
      data: null,
      currentDaysData: null
    };
  },

  onSelectTab: function(evt) {
    this.setState({ selectedTab: evt });
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

  render: function() {
    var mydata = this.state.data && this.state.data.hasOwnProperty(this.state.selectedTab) ? this.state.data[this.state.selectedTab] : null;

    return (
      <div className="main">
        <Tabs data={this.state.data} selected={this.state.selectedTab} onChange={this.onSelectTab} />
        {this.props.tabs}
        <Tab title={this.state.selectedTab} data={mydata} />
      </div>
    );
  }

});
React.render(<FitApp />, document.getElementById('content')); // jshint ignore:line

module.exports = FitApp;
