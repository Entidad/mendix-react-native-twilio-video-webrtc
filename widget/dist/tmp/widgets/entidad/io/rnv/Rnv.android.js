import { Component, createElement } from 'react';
import { Dimensions, PixelRatio, StyleSheet, View, TouchableHighlight, Text, TouchableOpacity, PermissionsAndroid } from 'react-native';
import { TwilioVideoParticipantView, TwilioVideoLocalView, TwilioVideo } from 'react-native-twilio-video-webrtc';
import normalize from 'react-native-normalize';

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

// packages

let screenWidth = Dimensions.get('window').width; // Retrieve initial screen's height

let screenHeight = Dimensions.get('window').height;
/**
 * Converts provided width percentage to independent pixel (dp).
 * @param  {string} widthPercent The percentage of screen's width that UI element should cover
 *                               along with the percentage symbol (%).
 * @return {number}              The calculated dp depending on current device's screen width.
 */

const widthPercentageToDP = widthPercent => {
  // Parse string percentage input and convert it to number.
  const elemWidth = typeof widthPercent === "number" ? widthPercent : parseFloat(widthPercent); // Use PixelRatio.roundToNearestPixel method in order to round the layout
  // size (dp) to the nearest one that correspons to an integer number of pixels.

  return PixelRatio.roundToNearestPixel(screenWidth * elemWidth / 100);
};
/**
 * Converts provided height percentage to independent pixel (dp).
 * @param  {string} heightPercent The percentage of screen's height that UI element should cover
 *                                along with the percentage symbol (%).
 * @return {number}               The calculated dp depending on current device's screen height.
 */


const heightPercentageToDP = heightPercent => {
  // Parse string percentage input and convert it to number.
  const elemHeight = typeof heightPercent === "number" ? heightPercent : parseFloat(heightPercent); // Use PixelRatio.roundToNearestPixel method in order to round the layout
  // size (dp) to the nearest one that correspons to an integer number of pixels.

  return PixelRatio.roundToNearestPixel(screenHeight * elemHeight / 100);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  callContainer: {
    flex: 1,
    position: "absolute",
    bottom: 0,
    top: 0,
    left: 0,
    right: 0,
    minHeight: "100%"
  },
  welcome: {
    fontSize: 30,
    textAlign: "center",
    paddingTop: 40,
    color: "#000000"
  },
  input: {
    height: 50,
    borderWidth: 1,
    marginRight: 70,
    marginLeft: 70,
    marginTop: 50,
    textAlign: "center",
    backgroundColor: "white"
  },
  button: {
    marginTop: 100
  },
  localVideoOnButtonEnabled: {
    bottom: "40%",
    width: "35%",
    left: "64%",
    height: "25%",
    zIndex: 2
  },
  localVideoOnButtonDisabled: {
    bottom: "30%",
    width: "35%",
    left: "64%",
    height: "25%",
    zIndex: 2
  },
  remoteGrid: {
    flex: 1,
    flexDirection: "column"
  },
  remoteVideo: {
    width: widthPercentageToDP("100%"),
    height: heightPercentageToDP("100%"),
    zIndex: 1
  },
  optionsContainer: {
    position: "absolute",
    left: 0,
    bottom: 0,
    right: 0,
    height: 100,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    zIndex: 2
  },
  optionButton: {
    width: 60,
    height: 60,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 100 / 2,
    backgroundColor: "grey",
    justifyContent: "center",
    alignItems: "center"
  },
  spacing: {
    padding: 10
  },
  inputLabel: {
    fontSize: 18,
    color: "#000000"
  },
  buttonContainer: {
    height: normalize(45),
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: widthPercentageToDP("90%"),
    borderRadius: 30
  },
  loginButton: {
    backgroundColor: "#1E3378",
    width: widthPercentageToDP("90%"),
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 20,
    marginTop: 10
  },
  Buttontext: {
    color: "white",
    fontWeight: "500",
    fontSize: 18
  },
  inputBox: {
    borderBottomColor: "#cccccc",
    fontSize: 16,
    width: widthPercentageToDP("95%"),
    borderBottomWidth: 1,
    color: "#000000"
  }
});
async function GetAllPermissions() {
  //see also https://www.freecodecamp.org/news/building-video-call-app-in-react-native/
  try {
    //console.warn("P:0");
    const userResponse = await PermissionsAndroid.requestMultiple([PermissionsAndroid.PERMISSIONS.CAMERA, PermissionsAndroid.PERMISSIONS.RECORD_AUDIO, PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE]); //console.log(userResponse);
    //console.warn("P:1");

    return userResponse;
  } catch (err) {
    console.warn(err);
  }

  return null;
}
class RnvComp extends Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {
      isAudioEnabled: true,
      isVideoEnabled: true,
      isButtonDisplay: true,
      status: "disconnected",
      participants: new Map(),
      videoTracks: new Map(),
      identity: "",
      roomName: "",
      token: ""
    });

    _defineProperty(this, "_onConnectButtonPress", () => {
      //console.warn("_onConnectButtonPress");
      //console.warn(this.state.roomName);
      //console.warn(this.state.token);
      //console.warn(this.state.identity);
      this.refs.twilioVideo.connect({
        roomName: this.state.roomName,
        accessToken: this.state.token
      });
      this.setState({
        status: "connecting"
      });
    });

    _defineProperty(this, "_onEndButtonPress", () => {
      //console.warn("_onEndButtonPress");
      //console.warn(this.state.status);
      this.refs.twilioVideo.disconnect();
      this.setState({
        status: "disconnected"
      });
      this.setState({
        participants: new Map()
      });
      this.setState({
        videoTracks: new Map()
      });
    });

    _defineProperty(this, "_onMuteButtonPress", () => {
      //Mon Jan  3 17:20:00 SAST 2022
      //-
      //Mon Jan  3 17:10:00 SAST 2022
      //console.warn("_onMuteButtonPress");
      //console.warn(this.state.status);
      this.refs.twilioVideo.setLocalAudioEnabled(!this.state.isAudioEnabled).then(isEnabled => {
        this.setState({
          isAudioEnabled: isEnabled
        });
      });
    });

    _defineProperty(this, "_onFlipButtonPress", () => {
      //console.warn("_onFlipButtonPress");
      //console.warn(this.state.status);
      this.refs.twilioVideo.flipCamera();
    });

    _defineProperty(this, "_onRoomDidConnect", () => {
      //console.warn("_onRoomDidConnect");
      //setProps({...props, status: 'connected'});
      //setStatus('connected');
      //console.warn(this.state.status);
      this.setState({
        status: "connected"
      }); //this.state.status="connected";//setState({status:"connected"})
      //console.warn(this.state.status);
    });

    _defineProperty(this, "_onRoomDidDisconnect", ({
      roomName,
      error
    }) => {
      //console.warn("_onRoomDidDisconnect");
      this.setState({
        status: "disconnected"
      });
      this.setState({
        participants: new Map()
      });
      this.setState({
        videoTracks: new Map()
      });
    });

    _defineProperty(this, "_onRoomDidFailToConnect", error => {
      //console.warn("_onRoomDidFailToConnect");
      this.setState({
        status: "disconnected"
      });
      this.setState({
        participants: new Map()
      });
      this.setState({
        videoTracks: new Map()
      });
    });

    _defineProperty(this, "_onParticipantAddedVideoTrack", ({
      participant,
      track
    }) => {
      //console.warn("_onParticipantAddedVideoTrack");
      this.setState({
        videoTracks: new Map([...this.state.videoTracks, [track.trackSid, {
          participantSid: participant.sid,
          videoTrackSid: track.trackSid
        }]])
      });
    });

    _defineProperty(this, "_onParticipantRemovedVideoTrack", ({
      participant,
      track
    }) => {
      //console.warn("_onParticipantRemovedVideoTrack");
      alert("_onParticipantRemovedVideoTrack");
      const videoTracks = this.state.videoTracks;
      videoTracks.delete(track.trackSid); //this.setState({videoTracks:{...videoTracks}})

      /*
      const videoTracks=this.state.videoTracks;
      this.state.videoTracks.delete(track.trackSid);
      this.setState({
      	videoTracks:{
      		...videoTracks
      	}
      });
      */
    });
  }

  componentDidMount() {
    //console.warn("componentDidMount");
    //console.warn(this.state.status);
    GetAllPermissions();
  }

  render() {
    this.state.identity = this.props.identity || "identity";
    this.state.roomName = this.props.roomname || "roomname";
    this.state.token = this.props.token || "token";
    return createElement(View, {
      style: styles.container
    }, this.state.status === "disconnected" && createElement(View, null, createElement(TouchableHighlight, {
      style: [styles.buttonContainer, styles.loginButton],
      onPress: this._onConnectButtonPress
    }, createElement(Text, {
      style: styles.Buttontext
    }, "Connect"))), (this.state.status === "connected" || this.state.status === 'connecting') && createElement(View, {
      style: styles.callContainer
    }, this.state.status === "connected" && createElement(View, {
      style: styles.remoteGrid
    }, createElement(TouchableOpacity, {
      style: styles.remoteVideo,
      onPress: () => {
        this.setState({
          isButtonDisplay: !this.state.isButtonDisplay
        });
      }
    }, Array.from(this.state.videoTracks, ([trackSid, trackIdentifier]) => {
      return createElement(View, null, createElement(TwilioVideoParticipantView, {
        style: styles.remoteVideo,
        key: trackSid,
        trackIdentifier: trackIdentifier
      }));
    })), createElement(TwilioVideoLocalView, {
      enabled: true,
      style: this.state.isButtonDisplay ? styles.localVideoOnButtonEnabled : styles.localVideoOnButtonDisabled
    })), createElement(View, {
      style: {
        display: this.state.isButtonDisplay ? "flex" : "none",
        position: "absolute",
        left: 0,
        bottom: 0,
        right: 0,
        height: 100,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
        //backgroundColor:"blue",
        //zIndex: 2,
        zIndex: this.state.isButtonDisplay ? 2 : 0
      }
    }, createElement(TouchableOpacity, {
      style: {
        display: this.state.isButtonDisplay ? "flex" : "none",
        width: 60,
        height: 60,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 100 / 2,
        backgroundColor: "grey",
        justifyContent: "center",
        alignItems: "center"
      },
      onPress: this._onMuteButtonPress
    }, createElement(Text, {
      style: {
        color: "#FFFFFF",
        fontSize: 24
      }
    }, "Mute")), createElement(TouchableOpacity, {
      style: {
        display: this.state.isButtonDisplay ? "flex" : "none",
        width: 60,
        height: 60,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 100 / 2,
        backgroundColor: "grey",
        justifyContent: "center",
        alignItems: "center"
      },
      onPress: this._onEndButtonPress
    }, createElement(Text, {
      style: {
        color: "#FFFFFF",
        fontSize: 24
      }
    }, "End")), createElement(TouchableOpacity, {
      style: {
        display: this.state.isButtonDisplay ? "flex" : "none",
        width: 60,
        height: 60,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 100 / 2,
        backgroundColor: "grey",
        justifyContent: "center",
        alignItems: "center"
      },
      onPress: this._onFlipButtonPress
    }, createElement(Text, {
      style: {
        color: "#FFFFFF",
        fontSize: 24
      }
    }, "Flip")))), createElement(TwilioVideo, {
      ref: "twilioVideo",
      onRoomDidConnect: this._onRoomDidConnect,
      onRoomDidDisconnect: this._onRoomDidDisconnect,
      onRoomDidFailToConnect: this._onRoomDidFailToConnect,
      onParticipantAddedVideoTrack: this._onParticipantAddedVideoTrack,
      onParticipantRemovedVideoTrack: this._onParticipantRemovedVideoTrack
    }));
  }

}

class Rnv extends Component {
  render() {
    const roomname = this.props.roomname.value || "";
    const identity = this.props.identity.value || "";
    const token = this.props.token.value || "";
    return createElement(RnvComp, {
      roomname: roomname,
      identity: identity,
      token: token,
      style: this.props.style
    });
  }

}

export { Rnv };
