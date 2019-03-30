import React, { Component } from 'react';

//Navigation bar and user count module

class NavBar extends Component {
    
    render() {

        return (
            <div>
                <header class="header">
                    <h1 class="logo"> 
                        {/* eslint-disable react/jsx-no-target-blank */}
                        <a href="/"> <img src="../public/high_five_logo.png" alt="High-Five"/>
                        </a> 
                    </h1>
                        <ul class="main-nav">
                            <li>Points Available: 2,000</li>
                        </ul>
                </header>
    
                <header class="header_2">
            
                    <ul class="main-nav">
                        <li><a href="/recognize">Recognize Employee</a></li>
                        <li><a href="/redeem">Redeem Awards</a></li>
                        <li><a href="/rewards_activities">Rewards History</a></li>
                    </ul>
                </header>
            </div> 
        )
    }
}

export default NavBar