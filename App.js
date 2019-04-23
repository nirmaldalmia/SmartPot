import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, ScrollView, Dimensions, Button } from 'react-native';
import { LineChart, Grid } from 'react-native-svg-charts'

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

var soilArray = [];
var waterArray = [];
var lightArray = [];
var temperatureArray = [];
var humidityArray = [];
const testArray = [252, 270, 278, 1025, 5]

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      soilMoisture: [],
      temperature: [],
      humidity: [],
      waterLevel: [],
      pump: [],
      light: []
    }

    //Fetching soil moisture
    fetch('https://api.thingspeak.com/channels/763302/fields/1.json?results=10', {
      method: "GET"
    }).then(response => response.json())
      .then((response) => {
        // console.log(response.feeds);
        this.setState({
          soilMoisture: response.feeds
        });
        // console.log(this.state.soilMoisture);
      }).catch(error => {
        console.log(error)
      }).done();
    // console.log(this.state.soilMoisture);

    //Fetching water data
    fetch('https://api.thingspeak.com/channels/763302/fields/2.json?results=10', {
      method: "GET"
    }).then(response => response.json())
      .then((response) => {
        // console.log(response.feeds);
        this.setState({
          waterLevel: response.feeds
        });
        // console.log(this.state.soilMoisture);
      }).catch(error => {
        console.log(error)
      }).done();

    //Fetching light data
    fetch('https://api.thingspeak.com/channels/763302/fields/3.json?results=10', {
      method: "GET"
    }).then(response => response.json())
      .then((response) => {
        // console.log(response.feeds);
        this.setState({
          light: response.feeds
        });
        // console.log(this.state.soilMoisture);
      }).catch(error => {
        console.log(error)
      }).done();

    //Fetching temperature data
    fetch('https://api.thingspeak.com/channels/763302/fields/4.json?results=10', {
      method: "GET"
    }).then(response => response.json())
      .then((response) => {
        // console.log(response.feeds);
        this.setState({
          temperature: response.feeds
        });
        // console.log(this.state.soilMoisture);
      }).catch(error => {
        console.log(error)
      }).done();

    //Fetching Humidity data
    fetch('https://api.thingspeak.com/channels/763302/fields/5.json?results=10', {
      method: "GET"
    }).then(response => response.json())
      .then((response) => {
        // console.log(response.feeds);
        this.setState({
          humidity: response.feeds
        });
        // console.log(this.state.soilMoisture);
      }).catch(error => {
        console.log(error)
      }).done();

    this.generateSoil = this.generateSoil.bind(this);
    this.generateWater = this.generateWater.bind(this);
    this.generateLight = this.generateLight.bind(this);
    this.generateTemperature = this.generateTemperature.bind(this);
    this.generateHumidity = this.generateHumidity.bind(this);
    this.average = this.average.bind(this);
    this.handlePump = this.handlePump.bind(this);
  }
  average() {
    console.log("Average called!")
    var i = 0;
    var sum = 0;
    for (i = 0; i < soilArray.length; i++) {
      sum = sum + soilArray[i];
    }
    const average = sum / soilArray.length;
    console.log(average);
    this.setState({ average });
    return (<Text>{average}</Text>);
  }
  generateSoil(value) {
    if (value.field1 !== null) {
      soilArray.push(parseInt(value.field1));
      return (<Text key={value.entry_id}>{value.entry_id}: {value.field1}</Text>)
    }
  }
  generateWater(value) {
    if (value.field2 !== null) {
      waterArray.push(parseInt(value.field2));
      return (<Text key={value.entry_id}>{value.entry_id}: {value.field2}</Text>)
    }
  }
  generateLight(value) {
    if (value.field3 !== null) {
      lightArray.push(parseInt(value.field3));
      return (<Text key={value.entry_id}>{value.entry_id}: {value.field3}</Text>)
    }
  }
  generateTemperature(value) {
    if (value.field4 !== null) {
      temperatureArray.push(parseInt(value.field4));
      return (<Text key={value.entry_id}>{value.entry_id}: {value.field4}</Text>)
    }
  }
  generateHumidity(value) {
    if (value.field5 !== null) {
      humidityArray.push(parseInt(value.field5));
      return (<Text key={value.entry_id}>{value.entry_id}: {value.field5}</Text>)
    }
  }
  handlePump() {
    fetch('https://api.thingspeak.com/update?api_key=MXZ1JMJIY8U7MFP3&field1=1', {
      method: "GET"
    }).then(response => response.json())
      .then((response) => {
        console.log(response);
      }).catch(error => {
        console.log(error)
      }).done();
  }
  render() {
    console.log(this.state.soilMoistureArray);
    return (
      // <View style={styles.container}>
      //   <Text style={styles.welcome}>Welcome to React Native!</Text>
      //   <Text style={styles.instructions}>To get started, edit App.js</Text>
      //   <Text style={styles.instructions}>{instructions}</Text>
      // </View>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.welcome}>Soil Moisture Data</Text>
        <View style={{ marginBottom: 20 }}>
          {this.state.soilMoisture.map(value => this.generateSoil(value))}
        </View>
        <Text style={styles.welcome}>Water Level Data</Text>
        <View style={{ marginBottom: 20 }}>
          {this.state.waterLevel.map(value => this.generateWater(value))}
        </View>
        <Text style={styles.welcome}>LED Data</Text>
        <View style={{ marginBottom: 20 }}>
          {this.state.light.map(value => this.generateLight(value))}
        </View>
        <Text style={styles.welcome}>Temperature Data</Text>
        <View style={{ marginBottom: 20 }}>
          {this.state.temperature.map(value => this.generateTemperature(value))}
        </View>
        <Text style={styles.welcome}>Humidity Data</Text>
        <View style={{ marginBottom: 20 }}>
          {this.state.humidity.map(value => this.generateHumidity(value))}
        </View>
        <Button
          onPress={this.handlePump}
          title="Pump Water"
          color="#841584"
        />
        {/* <View>
          <LineChart
            style={{ height: 200 }}
            data={soilArray}
            svg={{ stroke: 'rgb(134, 65, 244)' }}
            contentInset={{ top: 20, bottom: 20 }}
          >
            <Grid />
          </LineChart>
        </View> */}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    marginVertical: 20,
    paddingBottom: 60
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
