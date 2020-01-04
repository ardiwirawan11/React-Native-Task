import React, { Component } from 'react'
import { Text, View, StyleSheet, ScrollView } from 'react-native'
import { Spinner, Container, Content, Button } from 'native-base'
import { connect } from 'react-redux'

class ResultScreen extends Component {
    state = {
        availableTime: [],
        dateData: [],
        activeDay: [],
        btnSelected: null,
        btnActive: null,
    }

    componentDidMount() {
        this.getDateData()
    }
 
    processData = async (index1, index2) => {
        var dataApi = await this.props.task.data
        var filterDay = dataApi.filter(function (data) {
            return data.day_of_week === index1 && data.active === 1
        })
        const sortedDay = filterDay.sort(function (a, b) {
            return parseInt(a.start_time, 10) - parseInt(b.start_time, 10)
        })
        var availableTime = sortedDay.filter(function (data) {
            var CurrentTime = new Date().getHours() + ':' + new Date().getMinutes()
            if (data.day_of_week === new Date().getDay() & index2 === new Date().getDate()) {
                return data.start_time > CurrentTime
            } else {
                return sortedDay
            }
        })
        this.setState({ btnSelected: index2, availableTime: availableTime })
        var highDiscount = availableTime.sort(function (a, b) {
            return b.discount - a.discount && parseInt(a.start_time, 10) - parseInt(b.start_time, 10)
        })
        this.pickTime(highDiscount ? highDiscount[0].id : null)
    }

    pickTime = (index) => {
        this.setState({ btnActive: index })
    }

    getDateData = async () => {
        var now = new Date()
        var dd = now.getDate() - 1
        var mm = now.getMonth() + 1
        var yyyy = now.getFullYear()
        var startDate
        var d
        var output = []

        startDate = yyyy + '-' + mm + '-' + dd
        d = new Date(startDate)
        for (var i = dd; i <= dd + 14; i++) {
            d.setDate(d.getDate() + 1)
            output.push({
                date: d.getDate(),
                day: d.getDay(),
                month: d.getMonth()
            })
        }
        var result = []
        var dataApi = await this.props.task.data
        var day = dataApi.filter(function (data) {
            return data.active === 1
        })
        for (var j = 0; j < day.length; j++) {
            result.push(day[j].day_of_week)
        }
        let activeDay = [...new Set(result)];
        this.setState({ dateData: output, activeDay: activeDay })
        var today = new Date().getDay()
        if (activeDay.includes(today)) {
            this.processData(today, new Date().getDate())
        } else {
            for (var i = 1; i < 7; i++) {
                if (today + i > 7 && activeDay.includes(today + i - 7)) {
                    this.processData(today + i - 7, new Date().getDate() + i)
                } else if (today + i <= 7 && activeDay.includes(today + i)) {
                    this.processData(today + i, new Date().getDate() + i)
                }
                if (activeDay.includes(today + i - 7) || activeDay.includes(today + i)) {
                    break
                }

            }
        }
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
export default connect(mapStateToProps)(ResultScreen)