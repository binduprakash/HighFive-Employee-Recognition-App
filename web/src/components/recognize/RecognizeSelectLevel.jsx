import React from 'react'
import { Form, Button, Container, Row, Alert }  from 'react-bootstrap';

class RecognizeSelectLevel extends React.Component {
    state = {
        selectPointsLevelId: null,
        isValid: true,
    }
    componentDidMount() {
        this.setState({selectPointsLevelId: this.props.selectPointsLevelId})
    }
    setSelectedPointsLevelId = () => {
        if (this.state.selectPointsLevelId){
            this.setState({isValid: true});
            this.props.setPointsLevel(this.state.selectPointsLevelId);
            return true;
        } else {
            this.setState({isValid: false});
            return false;
        }
    }
    onPreviousClick = () => {
        if (this.setSelectedPointsLevelId()){
            this.props.history.push('/recognize/select_receipient');
        }
    }
    onNextClick = () => {
        if( this.setSelectedPointsLevelId()){
            this.props.history.push('/recognize/message');
        }
    }
    handleChange = (e) => {
        this.setState({selectPointsLevelId: e.target.value});
        if(e.target.value){
            this.setState({isValid: true});
        }
    }
    render() {
        let pointLevelOptions = this.props.pointsLevels.map((pointLevel)=> {
            return <option value={pointLevel.id}>{pointLevel.level_name} - {pointLevel.points} Points</option>;
        });
        pointLevelOptions = [<option></option>].concat(pointLevelOptions);
        return (
            <Container className="step-container">
                <Form.Group  as={Row} controlId="recognizeSelectRecipient">
                    <Form.Label>Select Points Level</Form.Label>
                    <Form.Control as="select" value={this.state.selectPointsLevelId} onChange={this.handleChange}>
                        {pointLevelOptions}
                    </Form.Control>
                </Form.Group>
                {!this.state.isValid && <Alert variant='danger'>
                    Please select the Level for the Reward!
                </Alert>}
                <Form.Group as={Row} className="step-buttons">
                    <Button variant="primary" size="lg" onClick={this.onPreviousClick} className="step-previous-button">
                        Previous
                    </Button>
                    <Button variant="primary" size="lg" onClick={this.onNextClick}>
                        Next
                    </Button>
                </Form.Group>
            </Container>
        );
    }
}

export default RecognizeSelectLevel