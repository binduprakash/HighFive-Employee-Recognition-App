import React from 'react'

//starter code/template used from: https://codepen.io/alexdevero/pen/oBLbMb

// Create component for button
class Button extends React.Component {
    render() {
      return (
        <fieldset>
          <button
            type={this.props.type || 'button'}
            value={this.props.value || null}
          >
            {this.props.text}
          </button>
        </fieldset>
      );
    }
  };
  
  // Create component for label
  class Label extends React.Component {
    render() {
      if (this.props.hasLabel === 'true') {
        return <label htmlFor={this.props.htmlFor}>{this.props.label}</label>
      }
    }
  }
  
  // Create component for select input
  class Select extends React.Component {
    render() {
      // Get all options from option prop
      const selectOptions = this.props.options.split(', ');
  
      // Generate list of options
      const selectOptionsList = selectOptions.map((selectOption, index) => {
        return <option key={index} value={index}>{selectOption}</option>
      });
  
      return (
        <fieldset>
          <Label
            hasLabel={this.props.hasLabel}
            htmlFor={this.props.htmlFor}
            label={this.props.label}
          />
          
          <select
            defaultValue=''
            id={this.props.htmlFor}
            name={this.props.name || null}
            required={this.props.required || null}
          >
            <option value='' disabled>Select one option</option>
  
            {selectOptionsList}
          </select>
        </fieldset>
      );
    }
  };
  
  // Create component for textarea
  class Textarea extends React.Component {
    render() {
      return (
        <fieldset>
          <Label
            hasLabel={this.props.hasLabel}
            htmlFor={this.props.htmlFor}
            label={this.props.label}
          />
  
          <textarea
            cols={this.props.cols || null}
            id={this.props.htmlFor}
            name={this.props.name || null}
            required={this.props.required || null}
            rows={this.props.rows || null}
          >
          </textarea>
        </fieldset>
      );
    }
  };
  
  // Create component for form
  class Form extends React.Component {
    render() {
      return (
        <form method='POST' action='http://localhost:3000/api/v1/rewards'>
         <Select
            hasLabel='true'
            htmlFor='select'
            label='Please Select Employee to Recognize'
            options='Tyler, Bindu, Maddie'
            required='true'
          />
          
          <Select
            hasLabel='true'
            htmlFor='select'
            label='Option 1 - Please Select Points'
            options='one, two, three, option four, five'
            required='true'
          />
          
          <Textarea
            hasLabel='true'
            htmlFor='textarea'
            label='Message to Employee'
            required='true'
            rows='10'
          />
          
          <Textarea
            hasLabel='true'
            htmlFor='textarea'
            label='Message to Manager'
            required='true'
            rows='10'
          />
          
          <Button
            type='submit'
            value='submit'
            text='Send form'
          />
        </form>
      )
    }
  }
export default Form