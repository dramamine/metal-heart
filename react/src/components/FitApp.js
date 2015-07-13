'use strict';

var React = require('react');
var dom = React.DOM;
var jQuery = require('jquery');



// CSS
require('normalize.css');


var Tab = React.createClass({

  render: function() {
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
        <h3>{this.props.title} - {this.props.data.cals} Cals</h3>
        <div className="container-fluid">
          <div className="row">
        {eachImage}
          </div>
        </div>
      </div>
    );
  }

});

var FitApp = React.createClass({

  handleClick: function(name) {
    this.setState({selectedItem: name});
  },

  componentDidMount: function() {
    jQuery.ajax({
      url: '../static/pix.json',
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
      <div className="content">
        <ul className="nav nav-tabs">
        {tabs}
        </ul>
        <Tab title={this.state.selectedItem} data={mydata} />
      </div>
    );


  }

});


React.render(<FitApp />, document.getElementById('content')); // jshint ignore:line

module.exports = FitApp;
