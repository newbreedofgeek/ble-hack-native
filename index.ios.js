import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  AlertIOS
} from 'react-native';

class BleHackNative extends Component{
    render() {
        return (
          <View style={styles.mainContainer}>
            <View style={styles.toolbar}>
                <View style={styles.statusIcons}>
                  <View style={styles.statusGroup}>
                    <View style={styles.solid}></View>
                    <Text style={styles.statusName}>Battery</Text>
                  </View>
                  <View style={styles.statusGroup}>
                    <View style={styles.solid}></View>
                    <Text style={styles.statusName}>Status</Text>
                  </View>
                </View>
                <Text style={styles.hostName}>Device</Text>
            </View>

            <View style={styles.content}>
              <View style={styles.messageBox}>
                <View>
                    <Text style={styles.messageBoxTitleText}>Marks BP Reading</Text>
                </View>
                <View>
                    <Text style={styles.messageBoxBodyText}>140/20, Pulse 78</Text>
                </View>
              </View>
            </View>

            <View style={styles.footer}>

              <View style={styles.buttons}>
                <View style={styles.buttonGroup}>
                  <View style={styles.solidButton}></View>
                  <Text style={styles.buttonName}>Reset</Text>
                </View>
                <View style={styles.buttonGroup}>
                  <View style={styles.solidButton}>
                    <Text style={styles.smartState}>ON</Text>
                  </View>
                  <Text style={styles.buttonName}>Smart</Text>
                </View>
              </View>

              <View style={styles.deviceIcons}>
                <View style={styles.deviceGroup}>
                  <Text style={styles.deviceName}>BP Meter</Text>
                  <View style={styles.solid}></View>
                </View>
                <View style={styles.deviceGroup}>
                  <Text style={styles.deviceName}>Weight Scale</Text>
                  <View style={styles.solid}></View>
                </View>
              </View>

            </View>

          </View>
        );
    }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor:'black',
  },
  toolbar: {
    paddingTop:10,
    paddingBottom:10,
    paddingRight:10,
    paddingLeft:10,
    flexDirection:'row'
  },
  statusIcons: {
    flex: 1
  },
  hostName : {
    color: '#ef553a',
    width: 100,
    textAlign: 'right',
    fontSize: 24,
  },
  statusGroup: {
    flexDirection:'row',
    marginBottom: 2
  },
  statusName: {
    fontSize: 8,
    color: '#ebeef0',
    marginLeft: 2
  },
  solid: {
    backgroundColor: 'orange',
    width: 10,
    height: 10
  },

  content:{
    backgroundColor:'#333333',
    flex:1,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center'
  },

  messageBox:{
    backgroundColor:'#ef553a',
    width:300,
    paddingTop:10,
    paddingBottom:20,
    paddingLeft:20,
    paddingRight:20,
    borderRadius:10
  },

  messageBoxTitleText:{
      fontWeight:'bold',
      color:'#fff',
      textAlign:'center',
      fontSize:20,
      marginBottom:10
  },

  messageBoxBodyText:{
    color: '#fff',
    fontSize: 16,
    textAlign: 'center'
  },

  footer: {
    paddingTop:10,
    paddingBottom:10,
    paddingRight:10,
    paddingLeft:10,
    flexDirection:'row'
  },

  buttons: {
    width: 300,
    flexDirection:'row'
  },

  buttonGroup: {
    marginRight: 10
  },

  solidButton: {
    backgroundColor: '#CCCCCC',
    width: 30,
    height: 25
  },

  buttonName: {
    fontSize: 8,
    color:'#fff',
    textAlign: 'center',
    marginTop: 2
  },

  smartState: {
    textAlign: 'center',
    marginTop: 5,
    fontSize: 10,
  },

  deviceIcons: {
    flex: 1
  },

  deviceGroup: {
    flexDirection: 'row',
    marginBottom: 5,
    justifyContent: 'flex-end'
  },

  deviceName: {
    fontSize: 8,
    color:'#fff',
    marginRight: 5
  }
});

AppRegistry.registerComponent('BleHackNative', () => BleHackNative);

// https://css-tricks.com/snippets/css/a-guide-to-flexbox/
