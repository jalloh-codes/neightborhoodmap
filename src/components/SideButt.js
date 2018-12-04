import React from 'react';

const SideButt = props => (
    // header button, control the sideBar menu to open and close 
    <button  aria-label='sideBar button'  className='toggle-button' onClick={props.click}>
        <div className='toggle-button_line'/>
        <div className='toggle-button_line'/>
        <div className='toggle-button_line'/>
    </button>
);

export default SideButt;
