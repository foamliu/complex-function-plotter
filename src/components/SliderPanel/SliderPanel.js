import React from 'react';

import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';

import VariableSlider from './VariableSlider.js';
import VariableAdder from './VariableAdder.js';

import './slider-panel.css';


const hiddenVariables = new Set([
  'log_scale', 'center_x', 'center_y',
  'enable_checkerboard',
  'invert_gradient', 'continuous_gradient',
  'antialiasing',
  'custom_function'
]);

class SliderPanel extends React.Component {
  constructor(props) {
    super(props);
    this.sliders = props.variables;
    this.textField = React.createRef();
  }

  handleChange(name, value) {
    this.sliders[name] = value;
    this.props.onUpdate(this.sliders);
    this.forceUpdate();
  }

  renderSliderList() {
    let sliderList = [];
    for (const [name, value] of Object.entries(this.sliders)) {
      // Skip variables in hidden blacklist
      if (hiddenVariables.has(name)) {continue;}

      // Return slider component
      sliderList.push(
	<VariableSlider 
	  key={name}
	  name={name}
	  value={value}
	  onChange={(event, value) => this.handleChange(name, value)}
	  onDelete={(event) => this.props.onRemove(name)}
	/>
      );
    }

    return sliderList;
  }

  render() {
    return (
      <List id='variable-list'>
	<ListSubheader disableSticky>Variables</ListSubheader>
	{this.renderSliderList()}
	<VariableAdder
	  onClick={name => this.props.onAdd(name, 0.5)}
	/>
      </List>
    );
  }
}

export default SliderPanel;
