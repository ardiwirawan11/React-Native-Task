import React, { Component } from 'react'
import { Container, Content } from 'native-base'

class MondayScreen extends Component {
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

export default MondayScreen