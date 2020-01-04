import React, { Component } from 'react'
import { Text, StyleSheet} from 'react-native'
import { Container, Content, Button } from 'native-base'
import { connect } from 'react-redux'
import { getData } from '../redux/action/TestAction'

class HomeScreen extends Component {

    componentDidMount() {
        this.props.getData()
    }
    getDetail = () => {
        this.props.navigation.navigate('Result')
    }
    render() {
        return (
            <Container>

                <Content>
                    <Button style={styles.button}
                        onPress={() => this.getDetail()}>
                        <Text>Hair Solution</Text>
                    </Button>
                </Content>

            </Container>
        )
    }
}

const styles = StyleSheet.create({
    button: {   
        borderRadius: 20,
        marginHorizontal: 10,
        width: 'auto',
        height: 70,
        justifyContent: 'center'
    }
})
const mapDispatchToProps = dispatch => {
    return {
        getData: () => dispatch(getData())
    }
}

export default connect(null, mapDispatchToProps)(HomeScreen)