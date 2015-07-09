'use strict';

var React = require('react');

// CSS
require('normalize.css');
require('../styles/main.css');

// var content = require('../data/pix.json');
// console.log(content);



var Tab = React.createClass({

  render: function() {
    console.log(this.props);
    var day =  this.props.data[this.props.dayId];
    console.log(day);

    var eachImage = day.content.map(function(image) {
      return (
        <div class="flow">
          <img src="/content/images/fit/{image.img}" />
          <br />{image.title}
        </div>
      );
    });


    return (
      <div>
      <span>{day.day} - {day.cals} Cals</span>
      {eachImage}
      </div>
    );
  }

});

var FitApp = React.createClass({

  getInitialState: function() {
    return {
      selectedTab: 0,
      data: [{
          day: "Sunday",
          cals: 1600,
          content: [
            {
              img: "yoga-chataranga.gif",
              title: "Hot yoga (1 hr)"
            },
            {
              img: "01-P1050208.jpg",
              title: "Omelette w/ avocado, mushrooms, peppers & onions, toast"
            },
            {
              img: "02-P1050213.jpg",
              title: "Brussels sprouts + beef patty, cheese, avocado"
            }
          ]
         },
         {
          day: "Monday",
          cals: 1600,
          content: [
            {
              img: "yoga-chataranga.gif",
              title: "Hot yoga (1 hr)"
            },
            {
              img: "01-P1050208.jpg",
              title: "Omelette w/ avocado, mushrooms, peppers & onions, toast"
            },
            {
              img: "02-P1050213.jpg",
              title: "Brussels sprouts + beef patty, cheese, avocado"
            }
          ]
         }
        ]
    };
  },

  render: function() {
    return (
      <div className="main">
        <Tab data={this.state.data} dayId={this.state.selectedTab} />
      </div>
    );
  }

});
React.render(<FitApp />, document.getElementById('content')); // jshint ignore:line

module.exports = FitApp;
