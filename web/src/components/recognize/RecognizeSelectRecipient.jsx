import React from 'react'
import {Form, Button, Container, Row, Col}  from 'react-bootstrap';

class RecognizeSelectRecipient extends React.Component {
    state = {
        selectedRecipientId: null
    }
    componentDidMount() {
        this.setState({selectedRecipientId: this.props.selectedRecipientId})
    }
    onNextClick = () => {
        this.props.setRecipientId(this.state.selectedRecipientId);
        this.props.history.push('/recognize/select_level');
    }
    handleChange = (e) => {
        this.setState({selectedRecipientId: e.target.value});
    }
    render() {
        const recipientsOptions = this.props.recipients.map((recipent)=> {
            return <option value={recipent.id}>{recipent.first_name + ' ' + recipent.last_name}</option>;
        });
        return (
            <Container className="step-container">
                <Form.Group as={Row} controlId="recognizeSelectRecipient">
                    <Form.Label>Select Receipient</Form.Label>
                    <Form.Control as="select" value={this.state.selectedRecipientId} onChange={this.handleChange}>
                        {recipientsOptions}
                    </Form.Control>
                </Form.Group>
                <Form.Group as={Row} className='step-buttons'>  
                    <Button variant="primary" size="lg" onClick={this.onNextClick}>
                        Next
                    </Button>
                </Form.Group>
            </Container>
        );
    }
}

export default RecognizeSelectRecipient