import React from 'react'
import { Form, Button, Container, Row, Alert }  from 'react-bootstrap';

class RecognizeSelectRecipient extends React.Component {
    state = {
        selectedRecipientId: null,
        isValid: true,
    }
    componentDidMount() {
        if (this.props.selectedRecipientId){
            this.setState({selectedRecipientId: this.props.selectedRecipientId})
        }
    }
    onNextClick = () => {
        if (this.state.selectedRecipientId){
            this.setState({isValid: true});
            this.props.setRecipientId(this.state.selectedRecipientId);    
        } else {
            this.setState({isValid: false});
            return;
        }
        this.props.history.push('/recognize/select_level');
    }
    handleChange = (e) => {
        this.setState({selectedRecipientId: e.target.value});
        if(e.target.value){
            this.setState({isValid: true});
        }
    }
    render() {
        let recipientsOptions = this.props.recipients.map((recipent)=> {
            return <option value={recipent.id}>{recipent.first_name + ' ' + recipent.last_name}</option>;
        });
        recipientsOptions = [<option></option>].concat(recipientsOptions);
        return (
            <Container className="step-container">
                <Form.Group as={Row} controlId="recognizeSelectRecipient">
                    <Form.Label>Select Receipient</Form.Label>
                    <Form.Control as="select" value={this.state.selectedRecipientId} onChange={this.handleChange}>
                        {recipientsOptions}
                    </Form.Control>
                </Form.Group>
                {!this.state.isValid && <Alert variant='danger'>
                    Please select the Recipient for the Reward!
                </Alert>}
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