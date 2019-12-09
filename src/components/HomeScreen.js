import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { Spinner, Container, Content, Button } from 'native-base'
import { connect } from 'react-redux'
import { getData } from '../redux/action/TestAction'

class HomeScreen extends Component {
    componentDidMount() {
        this.props.get_Data();
    }

    render() {
        if (this.props.test.loading === true) {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Spinner></Spinner>
                </View>
            )
        } else if (this.props.test.loading === false) {
           
            return (
                <Container>
                    <Content>
                        <Button onPress={()=>this.props.navigation.navigate('Monday')}>
                            <Text>Monday</Text>
                        </Button>
                        <Button onPress={()=>this.props.navigation.navigate('Tuesday')}>
                            <Text>Tuesday</Text>
                        </Button>
                        <Button onPress={()=>this.props.navigation.navigate('Wednesday')}>
                            <Text>Wednesday</Text>
                        </Button>
                        <Button onPress={()=>this.props.navigation.navigate('Thursday')}>
                            <Text>Thursday</Text>
                        </Button>
                        <Button onPress={()=>this.props.navigation.navigate('Friday')}>
                            <Text>Friday</Text>
                        </Button>
                        <Button onPress={()=>this.props.navigation.navigate('Saturday')}>
                            <Text>Saturday</Text>
                        </Button>
                        <Button onPress={()=>this.props.navigation.navigate('Sunday')}>
                            <Text>Sunday</Text>
                        </Button>
                    </Content>
                </Container>
            )
        }
    }
}
const mapStateToProps = state => ({
    test: state.test

});
const mapDispatchToProps = dispatch => {
    return {
        get_Data: () => dispatch(getData())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);