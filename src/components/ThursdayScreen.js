import React, { Component } from 'react'
import { Container, Content } from 'native-base'

class ThursdayScreen extends Component {
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

export default ThursdayScreen
