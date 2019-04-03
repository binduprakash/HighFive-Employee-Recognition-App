import React from 'react';

class TableFilter extends React.Component {

    render () {
        return (
            <div className="table-wrapper">
                <div className="btn-group" data-toggle="buttons">
                    <label className="btn btn-info active">
                        <input type="radio" name="status" value="Received" checked="checked"/> Points Received
                    </label>
                    <label className="btn btn-success">
                        <input type="radio" name="status" value="Sent"/> Points Sent
                    </label>
                    <label className="btn btn-warning">
                        <input type="radio" name="status" value="approvals"/> Approvals
                    </label>
                </div>
            </div>        
        )
    }
    
}

export default TableFilter