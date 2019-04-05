import React from 'react'
import {Form, Button, Container, Table, Row}  from 'react-bootstrap';

class RecognizeReviewAndConfirm extends React.Component {
    onPreviousClick = () => {
        this.props.history.push('/recognize/message');
    }
    onNextClick = () => {
        alert('Sucessfully submitted!')
    }
    render() {
        return (
            <Container className="step-container">
                <Table striped bordered hover>
                    <tbody>
                        <tr>
                            <td>Reward Recipient</td>
                            <td>PALL</td>
                        </tr>
                        <tr>
                            <td>Reward Approver</td>
                            <td>BULL</td>
                        </tr>
                        <tr>
                            <td>Points Level</td>
                            <td>ASDF</td>
                        </tr>
                        <tr>
                            <td>Message to Recipient</td>
                            <td>asdfasdfasdfasdfasdfasdfasdfasdf</td>
                        </tr>
                        <tr>
                            <td>Message to Approver</td>
                            <td>asdfasdfasdfasdfasdfasdfasdfasdf</td>
                        </tr>
                    </tbody>
                </Table>
                <Form.Group as={Row} className="step-buttons">
                    <Button variant="primary" size="lg" onClick={this.onPreviousClick} className="step-previous-button">
                        Previous
                    </Button>
                    <Button variant="success" size="lg" onClick={this.onNextClick}>
                        Confirm &amp; Submit
                    </Button>
                </Form.Group>
            </Container>
        );
    }
}

export default RecognizeReviewAndConfirm