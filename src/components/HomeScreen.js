import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { Card, CardItem, Body, Spinner, Container, Content, Button } from 'native-base'
import { connect } from 'react-redux'
import { getData } from '../redux/action/TestAction'

class HomeScreen extends Component {
    componentDidMount() {
        this.props.getData()
    }
    processData = (index) => {
        const datas = this.props.test.data
        var day = datas.filter(function (data) {
            return data.day_of_week == index && data.active == 1
        })
        const sorted = day.sort(function (a, b) {
            return a.discount - b.discount
        })
        const dataa = sorted.map((item) => {
            return (
                <Card key={item.id}>
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
        this.props.navigation.navigate('Result', { dataa: dataa })

    }
    render() {
        return (
            <Container>
                {this.props.test.loading == true ?
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Spinner></Spinner>
                    </View> :
                    <Content>
                        <Button onPress={() => this.processData(1)} style={style.button}>
                            <Text>Monday</Text>
                        </Button>
                        <Button onPress={() => this.processData(2)} style={style.button}>
                            <Text>Tuesday</Text>
                        </Button>
                        <Button onPress={() => this.processData(3)} style={style.button}>
                            <Text>Wednesday</Text>
                        </Button>
                        <Button onPress={() => this.processData(4)} style={style.button}>
                            <Text>Thursday</Text>
                        </Button>
                        <Button onPress={() => this.processData(5)} style={style.button}>
                            <Text>Friday</Text>
                        </Button>
                        <Button onPress={() => this.processData(6)} style={style.button}>
                            <Text>Saturday</Text>
                        </Button>
                        <Button onPress={() => this.processData(0)} style={style.button}>
                            <Text>Sunday</Text>
                        </Button>
                    </Content>
                }
            </Container>
        )
    }
}

const style = StyleSheet.create({
    button: {
        justifyContent: 'center',
        marginVertical: 10
    }
})
const mapStateToProps = state => ({
    test: state.test

})
const mapDispatchToProps = dispatch => {
    return {
        getData: () => dispatch(getData())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)