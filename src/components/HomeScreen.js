import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { Card, CardItem, Body, Spinner, Container, Content, Button } from 'native-base'
import { connect } from 'react-redux'
import { getData } from '../redux/action/TestAction'

class HomeScreen extends Component {
    // componentDidMount() {
    //     this.props.getData()
    // }
    process = (index) => {
        const datas = this.props.test.data
        var day = datas.filter(function (data) {
            return data.day_of_week == index && data.active == 1
        })
        const sorted = day.sort(function (a, b) {
            return a.discount - b.discount
        })
        const dataa = sorted.map((item) => {
            return (
                <Card key={item.provider_id}>
                    <CardItem>
                        <Body>
                            <Text>provider_id : {item.provider_id}</Text>
                            <Text>day_of_week : {item.day_of_week}</Text>
                            <Text>start_time : {item.start_time}</Text>
                            <Text>tier : {item.tier}</Text>
                            <Text>pax : {item.pax}</Text>
                            <Text>discount : {item.discount}</Text>
                            <Text>active: {item.active}</Text>
                        </Body>
                    </CardItem>
                </Card>
            )
        })
        switch (index) {
            case 0:
                this.props.navigation.navigate('Sunday', { dataa: dataa })
                break
            case 1:
                this.props.navigation.navigate('Monday', { dataa: dataa })
                break
            case 2:
                this.props.navigation.navigate('Tuesday', { dataa: dataa })
                break
            case 3:
                this.props.navigation.navigate('Wednesday', { dataa: dataa })
                break
            case 4:
                this.props.navigation.navigate('Thursday', { dataa: dataa })
                break
            case 5:
                this.props.navigation.navigate('Friday', { dataa: dataa })
                break
            case 6:
                this.props.navigation.navigate('Saturday', { dataa: dataa })
        }
    }
    render() {
        return (
            <Container>
                <Content>
                    <Button onPress={() => this.process(1)}>
                        <Text>Monday</Text>
                    </Button>
                    <Button onPress={() => this.process(2)}>
                        <Text>Tuesday</Text>
                    </Button>
                    <Button onPress={() => this.process(3)}>
                        <Text>Wednesday</Text>
                    </Button>
                    <Button onPress={() => this.process(4)}>
                        <Text>Thursday</Text>
                    </Button>
                    <Button onPress={() => this.process(5)}>
                        <Text>Friday</Text>
                    </Button>
                    <Button onPress={() => this.process(6)}>
                        <Text>Saturday</Text>
                    </Button>
                    <Button onPress={() => this.process(0)}>
                        <Text>Sunday</Text>
                    </Button>
                </Content>
            </Container>
        )
    }
}

const mapStateToProps = state => ({
    test: state.test

})
const mapDispatchToProps = dispatch => {
    return {
        getData: () => dispatch(getData())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);