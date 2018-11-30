import React, { Component } from 'react';

const SideButt = props => (
    <button role="button" className='toggle-button' onClick={props.click}>
        <div className='toggle-button_line'/>
        <div className='toggle-button_line'/>
        <div className='toggle-button_line'/>
    </button>
);

export default SideButt;
