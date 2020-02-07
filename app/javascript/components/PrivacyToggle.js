import React     from "react"
import PropTypes from "prop-types"

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import axios from 'axios';

class PrivacyToggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      privacy: this.props.content.privacy
    };
    // this.autosave = this.autosave.bind(this);

    axios.defaults.headers.common['X-CSRF-TOKEN'] = this.props.csrf_token;
  }

  async autosave() {
    var new_privacy_setting = (this.state.privacy == 'public' ? 'private' : 'public');
    console.log('changing privacy to --> ' + new_privacy_setting);

    // await axios.patch(
    //   this.props.submit_path,
    //   { 
    //     [this.props.content.page_type.toLowerCase()]: {
    //       privacy: this.state.privacy
    //     } 
    //   },
    //   { headers: { 'Content-Type': 'application/json' } }
    // );

    this.setState({ privacy: new_privacy_setting })
  }

  render () {
    return (
      <form data-model={this.props.content.page_type} 
            action={this.props.submit_path} 
            data-remote="true"
            method="post">

        <FormControl component="fieldset">
          <FormLabel component="legend">
            <i className="material-icons red-text left">person</i>
            {this.props.content.name}'s privacy:
          </FormLabel>
          <RadioGroup 
            aria-label="privacy" 
            name="privacy" 
            value={this.state.privacy}
            onChange={() => this.autosave()}
          >
            <FormControlLabel
              value="private"
              control={<Radio color="primary" />}
              label="Private (default)"
              labelPlacement="start"
              className="black-text"
              
            />
            <FormControlLabel
              value="public"
              control={<Radio color="primary" />}
              label="Visible to anyone with the URL"
              labelPlacement="start"
              className="black-text"
            />
            {/*
            <FormControlLabel
              value="searchable"
              control={<Radio color="primary" />}
              label="Discoverable"
              labelPlacement="start"
            />
            */}
          </RadioGroup>
          {/*
          <FormHelperText>
            You can change this page's privacy setting at any time.
          </FormHelperText>
          */}
        </FormControl>
      </form>
    );
  }
}

PrivacyToggle.propTypes = {
  content:     PropTypes.exact({
    id:          PropTypes.number,
    name:        PropTypes.string,
    page_type:   PropTypes.string,
    privacy:     PropTypes.string
  }).isRequired,
  submit_path: PropTypes.string.isRequired
};

export default PrivacyToggle;
