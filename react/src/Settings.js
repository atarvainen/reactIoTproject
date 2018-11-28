import React, { Component } from 'react';
import './App.css';

class Settings extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        e.stopPropagation();
    }

    render() {
        return (
            <div className='settings' onClick={this.props.closeSettings}>
                <div className='settings_inner' onClick={this.handleClick}>
                    <h1>Helou this is settings</h1>
                    <button className="button1" onClick={this.props.closeSettings}>Close</button>
                </div>
            </div>
        )
    }
}

export default Settings;