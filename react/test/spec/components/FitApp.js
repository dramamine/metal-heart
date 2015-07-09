'use strict';

describe('FitApp', () => {
  let React = require('react/addons');
  let FitApp, component;

  beforeEach(() => {
    let container = document.createElement('div');
    container.id = 'content';
    document.body.appendChild(container);

    FitApp = require('components/FitApp.js');
    component = React.createElement(FitApp);
  });

  it('should create a new instance of FitApp', () => {
    expect(component).toBeDefined();
  });
});
