import React from 'react'
import {Form, Button, Container, Row}  from 'react-bootstrap';

class RecognizeSelectLevel extends React.Component {
    state = {
        selectPointsLevelId: null
    }
    componentDidMount() {
        this.setState({selectPointsLevelId: this.props.selectPointsLevelId})
    }
    onPreviousClick = () => {
        this.props.setPointsLevel(this.state.selectPointsLevelId);
        this.props.history.push('/recognize/select_receipient');
    }
    onNextClick = () => {
        this.props.setPointsLevel(this.state.selectPointsLevelId);
        this.props.history.push('/recognize/message');
    }
    handleChange = (e) => {
        this.setState({selectPointsLevelId: e.target.value});
    }
    render() {
        const pointLevelOptions = this.props.pointsLevels.map((pointLevel)=> {
            return <option value={pointLevel.id}>{pointLevel.level_name}</option>;
        });
        return (
            <Container className="step-container">
                <Form.Group  as={Row} controlId="recognizeSelectRecipient">
                    <Form.Label>Select Points Level</Form.Label>
                    <Form.Control as="select" value={this.state.selectPointsLevelId} onChange={this.handleChange}>
                        {pointLevelOptions}
                    </Form.Control>
                </Form.Group>
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