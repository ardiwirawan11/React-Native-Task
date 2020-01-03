import React, { Component } from 'react'
import { Text, View, StyleSheet, ScrollView } from 'react-native'
import { Spinner, Container, Content, Button } from 'native-base'
import { connect } from 'react-redux'
import { getData } from '../redux/action/TestAction'

class HomeScreen extends Component {
    state = {
        availableTime: [],
        dateData: [],
        activeDay: [],
        btnSelected: null,
        btnActive: null
    }

    componentDidMount = async () => {
        await this.props.getData()
        this.getDateData()
        this.processData(new Date().getDay(), new Date().getDate())
    }

    processData = (index1, index2) => {
        var dataApi = this.props.task.data
        console.log(dataApi)
        var filterDay = dataApi.filter(function (data) {
            return data.day_of_week === index1 && data.active === 1
        })
        console.log(filterDay)
        const sortedDay = filterDay.sort(function (a, b) {
            return parseInt(a.start_time, 10) - parseInt(b.start_time, 10)
        })
        var availableTime = sortedDay.filter(function (data) {
            var CurrentTime = new Date().getHours() + ':' + new Date().getMinutes()
            if (data.day_of_week === new Date().getDay() & index2 === new Date().getDate()){
                return data.start_time > CurrentTime
            } else {
                return sortedDay
            }
        })
        this.setState({ btnSelected: index2, availableTime: availableTime })
        var highDiscount = availableTime.sort(function (a, b) {
            return b.discount - a.discount && parseInt(a.start_time, 10) - parseInt(b.start_time, 10)
        })
        this.pickTime(highDiscount ? highDiscount[0].id : null )
    }

    pickTime = (index) => {
        this.setState({ btnActive: index })
    }

    getDateData = () => {
        var now = new Date()
        var dd = now.getDate() - 1
        var mm = now.getMonth() + 1
        var yyyy = now.getFullYear()
        var startDate
        var d
        var output = []

        startDate = yyyy + '-' + mm + '-' + dd
        d = new Date(startDate)
        for ( var i = dd; i <= dd + 14; i++) {
            d.setDate(d.getDate() + 1)
            output.push({
                date: d.getDate(),
                day: d.getDay(),
                month: d.getMonth()
            })
        }
        var result = []
        var dataApi = this.props.task.data
        console.log(dataApi)
        var day = dataApi.filter(function (data) {
            return data.active === 1
        })
        for (var j = 0; j < day.length; j++) {
            result.push(day[j].day_of_week)
        }
        console.log(result)
        let activeDay = [...new Set(result)];
        console.log(activeDay)
        this.setState({ dateData: output, activeDay: activeDay })
    }

    render() {
        const dateList = this.state.dateData.map((item) => {
            var dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
            const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
            return (
                <View key={item.date} style={styles.viewMap}>
                    {(this.state.activeDay).includes(item.day) ?
                        <Button bordered style={(this.state.btnSelected === item.date) ? styles.btnSelected : styles.btnNotSelected}
                            onPress={() => this.processData(item.day, item.date)} >
                            <Text>{dayNames[item.day]} </Text>
                            <Text>{item.date} </Text>
                            <Text>{monthNames[item.month]} </Text>
                        </Button> : null}
                </View>
            )
        })
        const timeSlots = this.state.availableTime.map((item) => {
            return (
                <View key={item.id} style={styles.viewMapTime}>
                    <Button bordered style={(this.state.btnActive === item.id) ? styles.btnActive : styles.btnInactive}
                        onPress={() => this.pickTime(item.id)} >
                        <Text>{item.start_time}</Text>
                        <Text>-{item.discount}% </Text>
                    </Button>
                </View>
            )
        })
        return (
            <Container>
                {this.props.task.loading === true ?
                    <View style={styles.spinner}>
                        <Spinner></Spinner>
                    </View> :
                    <Content>
                        <ScrollView horizontal>
                            {dateList}
                        </ScrollView>
                        <ScrollView horizontal>
                            {timeSlots}
                        </ScrollView>
                    </Content>
                }
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    viewMapTime: {
        backgroundColor: '#F6F9F8',
        justifyContent: 'center',
        marginVertical: 10,
        paddingVertical: 30,
        paddingHorizontal: 5
    },
    viewMap: {
        justifyContent: 'center',
        marginVertical: 10,
        paddingVertical: 10
    },
    spinner: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnSelected: {
        borderColor: '#FF3164',
        flexDirection: 'column',
        borderRadius: 20,
        marginHorizontal: 10,
        width: 50,
        height: 70,
        justifyContent: 'center'
    },
    btnNotSelected: {
        marginHorizontal: 10,
        flexDirection: 'column',
        borderRadius: 20,
        width: 50,
        height: 70,
        justifyContent: 'center'
    },
    btnActive: {
        backgroundColor: '#FF3164',
        flexDirection: 'column',
        borderRadius: 20,
        marginHorizontal: 10,
        width: 70,
        height: 50,
        justifyContent: 'center'
    },
    btnInactive: {
        marginHorizontal: 10,
        flexDirection: 'column',
        borderRadius: 20,
        width: 70,
        height: 50,
        justifyContent: 'center'
    }
})
const mapStateToProps = state => ({
    task: state.test

})
const mapDispatchToProps = dispatch => {
    return {
        getData: () => dispatch(getData())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)