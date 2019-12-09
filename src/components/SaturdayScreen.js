import React, { Component } from 'react'
import { Text } from 'react-native'
import { Card, CardItem, Container, Content, Body } from 'native-base'
import { connect } from 'react-redux'

class SaturdayScreen extends Component {
    render() {
        const datas = this.props.test.data.data
        var monday = datas.filter(function (data) {
            return data.day_of_week == 6 && data.active == 1;
        });
        const sorted = monday.sort(function (a, b) {
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

        return (
            <Container>
                <Content>
                    {dataa}
                </Content>
            </Container>
        )
    }

}
const mapStateToProps = state => ({
    test: state.test

});

export default connect(mapStateToProps)(SaturdayScreen);
