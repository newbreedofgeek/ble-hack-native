import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

var noble = require('react-native-ble');
var Devices = require('./devices');
var measurementCharacteristic = null;

class BleHackNative extends Component {
  constructor(props) {
    super(props);

    this.state = {
      deviceSeeker: 'Idle',
      deviceWeightState: 1,
      deviceLastReading: ''
    };

    this.readPeripheralData = this.readPeripheralData.bind(this);
    this.startScanning = this.startScanning.bind(this);
    this.stopScanning = this.stopScanning.bind(this);
    this.saveAndReset = this.saveAndReset.bind(this);
  }

  componentDidMount() {

    // return;

    noble.on('stateChange', function(state) {
      console.log('stateChange = ' + state);

      if (state === 'poweredOn') {
        this.startScanning();
      }
      else {
        this.stopScanning();
      }
    }.bind(this));

    noble.on('discover', function(peripheral) {
      console.log('"' + peripheral.advertisement.localName + '" entered (RSSI ' + peripheral.rssi + ') ' + new Date());

      if (peripheral.advertisement.localName == Devices.localName) {

          this.stopScanning();

          console.log('found our target peripheral');
          // console.log(peripheral.advertisement);

          peripheral.connect(function(err) {
            peripheral.discoverServices([Devices.serviceUuid], function(err, services) {
              services.forEach(function(service) {
                console.log('found our target service:', service.uuid);
                service.discoverCharacteristics([], function(err, characteristics) {

                  characteristics.forEach(function(characteristic) {
                    if (Devices.measurementCharacteristicUuid == characteristic.uuid.toLowerCase()) {
                      console.log('found our target characteristic:', characteristic.uuid);
                      measurementCharacteristic = characteristic;

                      this.readPeripheralData();
                    }
                  }.bind(this))
                }.bind(this))
              }.bind(this))
            }.bind(this))
          }.bind(this))
      }
    }.bind(this));
  }

  componentWillUnmount() {
    console.log('unmount');
  }

  startScanning() {
    console.log('scanning...');

    this.setState({
      deviceSeeker: 'Scanning'
    });

    noble.startScanning([], false);
  }

  stopScanning() {
    console.log('stop scanning...');

    this.setState({
      deviceSeeker: 'Idle'
    });

    noble.stopScanning();
  }

  readPeripheralData() {
    this.setState({
      deviceWeightState: 2
    });

    measurementCharacteristic.notify(true, function(error) {
      if (error) {
        console.log('readPeripheralData - notify error! ', error);
      }
    }.bind(this));

    measurementCharacteristic.on('data', function(data, isNotification) {
      console.log('Success! reading received = ');

      var rawData = data; // e.g. <Buffer 02 f0 0a e0 07 06 01 10 1d 3
      var targetReading = data.readUInt16LE(1); // skip 1 byte and extract UInitLE after that which is what we want
      var adjustedReading = targetReading * 0.005; // if it's KG then 0.005 resolution

      console.log(adjustedReading);

      this.setState({
        deviceWeightState: 3,
        deviceLastReading: adjustedReading
      });

      this.saveAndReset();
      this.startScanning();
    }.bind(this));
  }

  saveAndReset() {
    setTimeout(function() {
      this.setState({
        deviceWeightState: 1,
        deviceLastReading: "Saved"
      });

      setTimeout(function() {
        this.setState({
          deviceLastReading: ""
        });

      }.bind(this), 4000);

    }.bind(this), 8000);
  }

  render() {
    var deviceBatteryStyle = styles.deviceBatteryGood;
    var deviceSeekerStyle = styles.deviceIdle;
    var deviceWeightStyle = styles.deviceIdle;
    var devicePressureStyle = styles.deviceIdle;

    if (this.state.deviceSeeker == 'Scanning') {
      deviceSeekerStyle = styles.deviceWorking;
    }
    else if (this.state.deviceSeeker == 'Paired') {
      deviceSeekerStyle = styles.deviceReceived;
    }

    if (this.state.deviceWeightState == 2) {
      deviceWeightStyle = styles.deviceWorking;
    }
    else if (this.state.deviceWeightState == 3) {
      deviceWeightStyle = styles.deviceReceived;
    }

    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.lastReading}>{this.state.deviceLastReading}</Text>
        </View>
        <View>
          <Text style={styles.instructions}>Battery</Text>
          <View style={deviceBatteryStyle}></View>
        </View>
        <View>
          <Text style={styles.instructions}>{this.state.deviceSeeker}</Text>
          <View style={deviceSeekerStyle}></View>
        </View>
        <View>
          <Text style={styles.instructions}>Weight</Text>
          <View style={deviceWeightStyle}></View>
        </View>
        <View>
          <Text style={styles.instructions}>Pressure</Text>
          <View style={devicePressureStyle}></View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },
  lastReading: {
    fontSize: 30,
    textAlign: 'center',
    marginRight: 10,
    color: '#CCCCCC',
  },
  instructions: {
    color: '#CCCCCC',
    marginBottom: 28,
    marginRight: 8,
    fontSize: 12,
    width: 60,
    transform: [{rotate: '270deg'}],
    textAlign: 'left',
  },
  deviceBatteryGood: {
    backgroundColor: 'green',
    width: 50,
    height: 50,
    marginRight: 5
  },
  deviceBatteryCharge: {
    backgroundColor: 'orange',
    width: 50,
    height: 50,
    marginRight: 5
  },
  deviceBatteryLow: {
    backgroundColor: 'red',
    width: 50,
    height: 50,
    marginRight: 5
  },
  deviceIdle: {
    backgroundColor: 'blue',
    width: 50,
    height: 50
  },
  deviceWorking: {
    backgroundColor: 'orange',
    width: 50,
    height: 50
  },
  deviceReceived: {
    backgroundColor: 'green',
    width: 50,
    height: 50
  },
});

AppRegistry.registerComponent('BleHackNative', () => BleHackNative);
