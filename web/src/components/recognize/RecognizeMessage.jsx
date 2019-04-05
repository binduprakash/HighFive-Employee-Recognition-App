import React from 'react'
import { Form, Button, Container, Row }  from 'react-bootstrap';

class RecognizeMessage extends React.Component {
    state = {
        messageToRecipient: null,
        messageToManager: null,
    }
    componentDidMount() { 
        this.setState({messageToRecipient: this.props.messageToRecipient});
        this.setState({messageToManager: this.props.messageToManager});
    }
    setMessages = () => {
        this.props.setMessageToRecipient(this.state.messageToRecipient);
        this.props.setMessageToManager(this.state.messageToManager);
    }
    onPreviousClick = () => {
        this.setMessages();
        this.props.history.push('/recognize/select_level');
    }
    onNextClick = () => {
        this.setMessages();
        this.props.history.push('/recognize/review_and_confirm');
    }
    handleRecipientChange = (e) => {
        this.setState({messageToRecipient: e.target.value})
    }
    handleManagerChange = (e) => {
        this.setState({messageToManager: e.target.value})
    }
    render() {
        return (
            <Container className="step-container">
                <Form.Group as={Row}>
                    <Form.Label>Message to Recipient</Form.Label>
                    <Form.Control as="textarea" rows="3" value={this.state.messageToRecipient} onChange={this.handleRecipientChange}/>
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label>Message to Manager</Form.Label>
                    <Form.Control as="textarea" rows="3" value={this.state.messageToManager} onChange={this.handleManagerChange}/>
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

export default RecognizeMessage