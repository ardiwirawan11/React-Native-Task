import React, { Component } from 'react'
import { Container, Content } from 'native-base'

class ResultScreen extends Component {
    render() {
        return (
            <Container>
                <Content>
                    {this.props.navigation.getParam('dataa')}
                </Content>
            </Container>
        )
    }

}

export default ResultScreen