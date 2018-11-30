import React, { Component } from 'react';
import SideButt from './SideButt';

const SideBar = props =>(
        <nav className="toolbar_navigation">
        <div>
            <SideButt click={props.drawOpen}/>
        </div>
        </nav>
);
export default SideBar;
