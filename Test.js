import React, { Component } from 'react';
import Trial from './Trial'

class Test extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <>
            <div>
                <Trial chartId="1"/>
            </div>
            <div>
                <Trial chartId="2"/>
            </div>
            </>
         );
    }
}
 
export default Test;