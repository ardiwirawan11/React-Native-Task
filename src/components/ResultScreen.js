import React, { Component } from 'react'
import { Text, View, StyleSheet, ScrollView } from 'react-native'
import { Spinner, Container, Button } from 'native-base'
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
        let dataApi = await this.props.task.data
        let filterDay = dataApi.filter(function (data) {
            return data.day_of_week === index1 && data.active === 1
        })
        const sortedDay = filterDay.sort(function (a, b) {
            return parseInt(a.start_time, 10) - parseInt(b.start_time, 10)
        })
        let availableTime = sortedDay.filter(function (data) {
            let CurrentTime = new Date().getHours() + ':' + new Date().getMinutes()
            if (data.day_of_week === new Date().getDay() & index2 === new Date().getDate()) {
                return data.start_time > CurrentTime
            } else {
                return sortedDay
            }
        })
        this.setState({ btnSelected: index2, availableTime: availableTime })
        let highDiscount = availableTime.sort(function (a, b) {
            return b.discount - a.discount && parseInt(a.start_time, 10) - parseInt(b.start_time, 10)
        })
        this.pickTime(highDiscount ? highDiscount[0].id : null)
    }

    pickTime = (index) => {
        this.setState({ btnActive: index })
    }

    getDateData = async () => {
        let now = new Date()
        let dd = now.getDate() - 1
        let mm = now.getMonth() + 1
        let yyyy = now.getFullYear()
        let startDate
        let currentDate
        let output = []

        startDate = yyyy + '-' + (mm < 10 ? '0' + mm : mm) + '-' + (dd < 10 ? '0' + dd : dd)
        currentDate = new Date(startDate)
        for (let i = dd; i <= dd + 14; i++) {
            currentDate.setDate(currentDate.getDate() + 1)
            output.push({
                date: currentDate.getDate(),
                day: currentDate.getDay(),
                month: currentDate.getMonth()
            })
        }
        let result = []
        let dataApi = await this.props.task.data
        let day = dataApi.filter(function (data) {
            return data.active === 1
        })
        for (let i = 0; i < day.length; i++) {
            result.push(day[i].day_of_week)
        }
        let activeDay = [...new Set(result)];
        this.setState({ dateData: output, activeDay: activeDay })
        let today = new Date().getDay()
        if (activeDay.includes(today)) {
            this.processData(today, new Date().getDate())
        } else {
            for (let i = 1; i < 7; i++) {
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
            let dayNames = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]
            const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"]
            return (
                <View key={item.date} style={styles.viewMapDate}>
                    {(this.state.activeDay).includes(item.day) ?
                        <Button style={(this.state.btnSelected === item.date) ? styles.btnSelected : styles.btnNonSelected}
                            onPress={() => this.processData(item.day, item.date)} >
                            <Text style={(this.state.btnSelected === item.date) ? styles.textDayMonthActive : styles.textDayMonthNonActive}>{dayNames[item.day]}</Text>
                            <Text style={(this.state.btnSelected === item.date) ? styles.textDateActive : styles.textDateNonActive}>{item.date} </Text>
                            <Text style={(this.state.btnSelected === item.date) ? styles.textDayMonthActive : styles.textDayMonthNonActive}>{monthNames[item.month]} </Text>
                        </Button> : null}
                </View>
            )
        })
        const timeSlots = this.state.availableTime.map((item) => {
            let splitTime = (item.start_time).split(':')
            let joinTime
            if (splitTime[0] < 12) {
                joinTime = splitTime.join(':') + 'am'
            } else if (splitTime[0] > 12) {
                splitTime[0] = splitTime[0] - 12
                joinTime = splitTime.join(':') + 'pm'
            } else {
                joinTime = splitTime.join(':') + 'pm'
            }
            return (
                <View key={item.id} style={styles.viewMapTime}>
                    <Button style={(this.state.btnActive === item.id) ? styles.btnActive : styles.btnNonActive}
                        onPress={() => this.pickTime(item.id)} >
                        <Text style={(this.state.btnActive === item.id) ? styles.textTimeActive : styles.textTimeNonActive}>{joinTime}</Text>
                        <Text style={(this.state.btnActive === item.id) ? styles.textTimeDiscountActive : styles.textTimeDiscountNonActive}>-{item.discount}% </Text>
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
                    <View>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.sviewHorizontal}>
                            {dateList}
                        </ScrollView>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.sviewHorizontal}>
                            {timeSlots}
                        </ScrollView>
                    </View>
                }
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    sviewHorizontal:{
        flexGrow: 1
    },
    viewMapTime: {
        backgroundColor: '#F6F9F8',
        marginVertical: 10,
        paddingVertical: 30,
        paddingHorizontal: 5,
        flex:1,
        justifyContent:'flex-start'
    },
    viewMapDate: {
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
        borderRadius: 15,
        borderWidth:1,
        marginHorizontal: 10,
        width: 50,
        height: 70,
        justifyContent: 'center',
        backgroundColor: '#FFFFFF'
    },
    btnNonSelected: {
        marginHorizontal: 10,
        flexDirection: 'column',
        borderWidth: 0,
        borderRadius: 15,
        width: 50,
        height: 70,
        justifyContent: 'center',
        backgroundColor: '#F6F9F8'
    },
    btnActive: {
        backgroundColor: '#FF3164',
        flexDirection: 'column',
        borderRadius: 10,
        marginHorizontal: 10,
        width: 90,
        height: 60,
        justifyContent: 'center'
    },
    btnNonActive: {
        marginHorizontal: 10,
        flexDirection: 'column',
        borderRadius: 7,
        backgroundColor: '#FFFFFF',
        width: 90,
        height: 60,
        borderWidth:1,
        justifyContent: 'center',
        borderColor:'gray'
    },
    textDayMonthActive: {
        fontSize: 12,
        color: '#FF3164',
        fontFamily: 'Roboto'
    },
    textDayMonthNonActive: {
        fontSize: 12,
        fontFamily: 'Roboto',
        color:'gray'
    },
    textDateActive: {
        fontSize: 20,
        color: '#FF3164',
        fontFamily: 'Roboto',
        fontWeight: "bold"
    },
    textDateNonActive: {
        fontSize: 20,
        fontFamily: 'Roboto',
        fontWeight: "bold",
        color:'gray'
    },
    textTimeActive: {
        fontSize: 16,
        color:  '#F6F9F8',
        fontFamily: 'Roboto'
    },
    textTimeNonActive: {
        fontSize: 16,
         color: '#FF3164',
        fontFamily: 'Roboto'
    },
    textTimeDiscountActive: {
        fontSize: 20,
        color: '#FFFFFF',
        fontFamily: 'Roboto',
        fontWeight: "bold"
    },
    textTimeDiscountNonActive: {
        fontSize: 20,
         color: '#FF3164',
        fontFamily: 'Roboto',
        fontWeight: "bold"
    }
})
const mapStateToProps = state => ({
    task: state.test

})
export default connect(mapStateToProps)(ResultScreen)