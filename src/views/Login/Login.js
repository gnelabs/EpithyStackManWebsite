import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { AuthenticationDetails, CognitoUserPool, CognitoUser, CookieStorage } from "amazon-cognito-identity-js";


class Login extends Component {
  constructor(props) {
    super(props);
    console.log('props: ', this.props);
    // this.state = {
      // poolData: {
        // UserPoolId: this.props.epithypageinfo.cognitoUserPoolId,
        // ClientId: this.props.epithypageinfo.cognitoClientId
      // }
    // };
    this.state = {
      poolData: {
        UserPoolId: "us-east-2_i3BLbMndc",
        ClientId: "ut4ec3hp91vq3nhn9nqlivuoi",
        Storage: new CookieStorage({
            domain: document.location.hostname,
            secure: false
        })
      },
      submitDisabled: true,
    };
    console.log('pooldata: ', this.state.poolData);
    this.userPool = new CognitoUserPool(this.state.poolData);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleSubmit() {
    console.log(this.state);
    var authenticationDetails = new AuthenticationDetails({
      Username: this.state.userName,
      Password: this.state.passWord
    });
    
    var cognitoUser = new CognitoUser({
      Username: this.state.userName,
      Pool: this.userPool
    });
    
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: result => {
        var accessToken = result.getAccessToken().getJwtToken();
        console.log(accessToken);
        this.props.history.push('/');
      },
      
      onFailure: err => {
        alert(err.message);
      }
    });
  }
  
  handleChange(event) {
    this.setState({
      [event.target.id]: event.target.value
    });
    if (this.state.userName && this.state.passWord) {
      this.setState({
        submitDisabled: false
      });
    }
  }
  
  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form>
                      <h1>Login</h1>
                      <p className="text-muted">Use the username and password saved in SSM.</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="email" placeholder="Username" id='userName' onChange={this.handleChange} />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" placeholder="Password" id='passWord' onChange={this.handleChange} />
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button color="primary" className="px-4" onClick={this.handleSubmit} disabled={this.state.submitDisabled}>Login</Button>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default withRouter(Login);
