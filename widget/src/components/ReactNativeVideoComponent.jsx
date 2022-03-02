//https://www.freecodecamp.org/news/building-video-call-app-in-react-native/
import{
	Component,
	createElement
}from"react";
import{
	Text,
	View,
	StyleSheet,
	TouchableOpacity,
	PermissionsAndroid,
	TouchableHighlight
}from"react-native";
import {
	TwilioVideoLocalView,
	TwilioVideoParticipantView,
	TwilioVideo
}from"react-native-twilio-video-webrtc";
import normalize from"react-native-normalize";
import{widthPercentageToDP as wp,heightPercentageToDP as hp}from"react-native-responsive-screen";
/* -------------------------------------------------------------------------------- */
/* Tue Mar  1 15:45:20 SAST 2022                                                    */
/* -------------------------------------------------------------------------------- */
import {
  checkMultiple,
  request,
  requestMultiple,
  PERMISSIONS,
  RESULTS,
} from 'react-native-permissions';
const styles=StyleSheet.create({
	container:{
		flex:1
	},
	callContainer:{
		flex:1,
		bottom:0,
		top:0,
		left:0,
		right:0,
		minHeight:"100%"
	},
	input:{
		height:50,
		borderWidth:1,
		marginRight:70,
		marginLeft:70,
		marginTop:50,
		textAlign:"center",
		backgroundColor:"white"
	},
	button:{
		marginTop:100
	},
	localVideoOnButtonEnabled:{
		bottom:"40%",
		width:"35%",
		left:"64%",
		height:"25%",
		zIndex:2
	},
	localVideoOnButtonDisabled:{
		bottom:"30%",
		width:"35%",
		left:"64%",
		height:"25%",
		zIndex:2
	},
	remoteGrid:{
		//flex:1,
		//flexDirection:"column"
	},
	remoteVideo:{
		width:wp("100%"),
		height:hp("100%"),
		zIndex:1
	},
	optionsContainer:{
		position:"absolute",
		left:0,
		bottom:0,
		right:0,
		height:100,
		flexDirection:"row",
		alignItems:"center",
		justifyContent:"space-evenly",
		zIndex:8
	},
	optionButton:{
		width:60,
		height:60,
		marginLeft:10,
		marginRight:10,
		borderRadius:100/2,
		backgroundColor:"grey",
		justifyContent:"center",
		alignItems:"center"
	},
	spacing:{
		padding:10
	},
	inputLabel:{
		fontSize:18,
		color:"#000000"
	},
	buttonContainer:{
		height:normalize(45),
		flexDirection:"row",
		justifyContent:"center",
		alignItems:"center",
		marginBottom:20,
		borderRadius:30
	},
	loginButton:{
		backgroundColor:"#1E3378",
		justifyContent:"center",
		alignItems:"center"
	},
	Buttontext:{
		color:"white",
		fontWeight:"500",
		fontSize:18
	},
	inputBox:{
		borderBottomColor:"#cccccc",
		fontSize:16,
		width:wp("95%"),
		borderBottomWidth:1,
		color:"#000000"
	}
});
const defaultStyle={
	container:{},
	label:{
		color:"#F6BB42"
	}
};
/*
export async function GetAllPermissions(){
	//see also https://www.freecodecamp.org/news/building-video-call-app-in-react-native/
	try{
		const userResponse=await PermissionsAndroid.requestMultiple([
			PermissionsAndroid.PERMISSIONS.CAMERA,
			PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
			PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
		]);
		return userResponse;
	}catch(err){
		this.log(err);
	}
	return null;
}
*/
/* -------------------------------------------------------------------------------- */
/* Tue Mar  1 15:45:20 SAST 2022                                                    */
/* -------------------------------------------------------------------------------- */
//const _checkPermissions = (callback) => {
export function GetAllPermissions(){
	const iosPermissions = [PERMISSIONS.IOS.CAMERA, PERMISSIONS.IOS.MICROPHONE];
	const androidPermissions = [
		PERMISSIONS.ANDROID.CAMERA,
		PERMISSIONS.ANDROID.RECORD_AUDIO,
	];
	checkMultiple(
		Platform.OS === 'ios' ? iosPermissions : androidPermissions,
	).then((statuses) => {
		const [CAMERA, AUDIO] =
			Platform.OS === 'ios' ? iosPermissions : androidPermissions;
		if (
			statuses[CAMERA] === RESULTS.UNAVAILABLE ||
			statuses[AUDIO] === RESULTS.UNAVAILABLE
		) {
			alert(
				'Error',
				'Hardware to support video calls is not available',
			);
		} else if (
			statuses[CAMERA] === RESULTS.BLOCKED ||
			statuses[AUDIO] === RESULTS.BLOCKED
		) {
			alert(
				'Error',
				'Permission to access hardware was blocked, please grant manually',
			);
		} else {
			if (
				statuses[CAMERA] === RESULTS.DENIED &&
				statuses[AUDIO] === RESULTS.DENIED
			) {
				requestMultiple(
					Platform.OS === 'ios' ? iosPermissions : androidPermissions,
				).then((newStatuses) => {
					if (
						newStatuses[CAMERA] === RESULTS.GRANTED &&
						newStatuses[AUDIO] === RESULTS.GRANTED
					) {
						//callback && callback();
					} else {
						alert('Error', 'One of the permissions was not granted');
					}
				});
			} else if (
				statuses[CAMERA] === RESULTS.DENIED ||
				statuses[AUDIO] === RESULTS.DENIED
			) {
				request(statuses[CAMERA] === RESULTS.DENIED ? CAMERA : AUDIO).then(
					(result) => {
						if (result === RESULTS.GRANTED) {
							//callback && callback();
						} else {
							alert('Error', 'Permission not granted');
						}
					},
				);
			} else if (
				statuses[CAMERA] === RESULTS.GRANTED ||
				statuses[AUDIO] === RESULTS.GRANTED
			) {
				//callback && callback();
			}
		}
	});
};
export class ReactNativeVideoComponent extends Component{
	constructor(props){
		super(props);
		this.cnam="RnvComp";
		this.log("constructor:beg");
		this.state={
			isAudioEnabled:true,
			isVideoEnabled:true,
			isButtonDisplay:true,
			status:"disconnected",
			participants:new Map(),
			videoTracks:new Map(),
			connect:this.props.connect,
			connected:this.props.connected,
			mute:this.props.mute,
			muted:this.props.muted,
			identity:this.props.identity,
			roomName:this.props.roomname,
			token:this.props.token
		};
		this.log("constructor:end");
	}
	log(v){
		if(this.props.debugon)console.error(`${this.cnam}:${typeof(v)=="object"?JSON.stringify(v):v}`);
	}
	componentDidMount(){
		this.log("componentDidMount:beg");
		//alert("CHANGED");
		//this.refs.twilioVideo.disconnect();//Tue Mar  1 18:03:34 SAST 2022
		GetAllPermissions();
		this.log("componentDidMount:end");
	}
	componentDidUpdate(prvprops,prvstate){
		this.log("componentDidUpdate:beg");
		/*
		this.log(`componentDidUpdate:roomname:  ${prvprops.roomname}->${this.props.roomname}`);
		this.log(`componentDidUpdate:identity:  ${prvprops.identity}->${this.props.identity}`);
		this.log(`componentDidUpdate:token:     ${prvprops.token}->${this.props.token}`);
		this.log(`componentDidUpdate:connect:   ${prvprops.connect}->${this.props.connect}`);
		this.log(`componentDidUpdate:connected: ${prvprops.connected}->${this.props.connected}`);
		this.log(`componentDidUpdate:mute:      ${prvprops.mute}->${this.props.mute}`);
		this.log(`componentDidUpdate:muted:     ${prvprops.muted}->${this.props.muted}`);
		*/
		/* handle autocon (needs to be renamed) */
		/* also needs to be manipulated from video events as required */
		if(
			this.state.status=="disconnected"&&
			prvprops.connect!=this.props.connect&&
			this.props.connect
		){
			this.log(`componentDidUpdate:connecting`);
			this._onConnectButtonPress();
		}else if(
			this.state.status=="connected"&&
			prvprops.connect!=this.props.connect&&
			!this.props.connect
		){
			this.log(`componentDidUpdate:disconnecting`);
			this._onEndButtonPress();
		}
		/* mute */
		if(
			prvprops.mute!=this.props.mute&&
			this.props.mute
		){
			this.log(`componentDidUpdate:muting`);
			this._onMuteButtonPress();
		}else if(
			prvprops.mute!=this.props.mute&&
			!this.props.mute
		){
			this.log(`componentDidUpdate:unmuting`);
			this._onMuteButtonPress();
		}
		this.log("componentDidUpdate:end");
	}
	componentWillUnmount(){
		this.log("componentWillUnmount:beg");
		try{
			this.setState({status:"disconnected"})
			this.setState({participants:new Map()})
			this.setState({videoTracks:new Map()})
			this.refs.twilioVideo.disconnect()
		}catch(e){
			console.error(e.toString());
		}
		this.log("componentWillUnmount:end");
	}
	_onConnectButtonPress=()=>{
		this.log("_onConnectButtonPress:beg");
		if(
			this.props.roomname!=""&&
			this.props.token!=""
		){
			this.refs.twilioVideo.connect({
				roomName:this.props.roomname,
				accessToken:this.props.token
			});
			this.setState({status:"connecting"})
		}
		this.log("_onConnectButtonPress:end");
	};
	_onEndButtonPress=()=>{
		this.log("_onEndButtonPress:beg");
		this.refs.twilioVideo.disconnect()
		this.setState({status:"disconnected"})
		this.setState({participants:new Map()})
		this.setState({videoTracks:new Map()})
		this.log("_onEndButtonPress:end");
	};
	_onMuteButtonPress=()=>{
		this.log("_onMuteButtonPress:beg");
		this.refs.twilioVideo
			.setLocalAudioEnabled(!this.state.isAudioEnabled)
			.then(isEnabled=>{
				this.setState({isAudioEnabled:isEnabled})
				if(isEnabled){
					this.props.onMuteAction();
				}else{
					this.props.onUnmuteAction();
				}
			});
		this.log("_onMuteButtonPress:end");
	};
	_onFlipButtonPress=()=>{
		this.log("_onFlipButtonPress:beg");
		this.refs.twilioVideo.flipCamera();
		this.log("_onFlipButtonPress:end");
		this.props.onFlipAction();
	};
	_onRoomDidConnect=()=>{
		this.log("_onRoomDidConnect:beg");
		this.setState({status:"connected"});
		this.props.onConnectAction();
		this.log("_onRoomDidConnect:end");
	};
	_onRoomDidDisconnect=({roomName,error})=>{
		this.log("_onRoomDidDisconnect:beg");
		this.setState({status:"disconnected"})
		this.setState({participants:new Map()})
		this.setState({videoTracks:new Map()})
		this.props.onDisconnectAction();
		this.log("_onRoomDidDisconnect:end");
	};
	_onRoomDidFailToConnect=(error)=>{
		this.log("_onRoomDidFailToConnect:beg");
		this.setState({status:"disconnected"})
		this.setState({participants:new Map()})
		this.setState({videoTracks:new Map()})
		this.props.onErrorAction();
		this.log("_onRoomDidFailToConnect:end");
	};
	_onParticipantAddedVideoTrack=({participant,track})=>{
		this.log("_onParticipantAddedVideoTrack:beg");
		this.setState({
			videoTracks:new Map([
				...this.state.videoTracks,
				[
					track.trackSid,
					{
						participantSid:participant.sid,
						videoTrackSid:track.trackSid
					}
				]
			]),
		});
		this.props.onParticipantAddedAction();
		this.log("_onParticipantAddedVideoTrack:end");
	};
	_onParticipantRemovedVideoTrack=({participant,track})=>{
		this.log("_onParticipantRemovedVideoTrack:beg");
		const videoTracks=this.state.videoTracks
		videoTracks.delete(track.trackSid)
		/*
		const videoTracks=this.state.videoTracks;
		this.state.videoTracks.delete(track.trackSid);
		this.setState({
			videoTracks:{
				...videoTracks
			}
		});
		*/
		this.props.onParticipantRemovedAction();
		this.log("_onParticipantRemovedVideoTrack:end");
	};
	render(){
		this.log("render:beg");
		const roomname=this.props.roomname;
		const identity=this.props.identity;
		const token=this.props.token;
		const style=this.props.style;
		const connect=this.props.connect;
		const connected=this.props.connected;
		const mute=this.props.mute;
		const muted=this.props.muted;
		this.log("render:end");
		return(
			<View style={styles.container}>
			{
				this.state.status==="disconnected"&&
				<View>
					<TouchableHighlight
						style={[styles.buttonContainer,styles.loginButton]}
						onPress={this._onConnectButtonPress}
					>
						<Text style={styles.Buttontext}>Connect</Text>
					</TouchableHighlight>
				</View>
			}
			{
				(this.state.status==="connected"||this.state.status==='connecting')&&
				<View style={styles.callContainer}>
					{
						this.state.status==="connected"&&
						<View style={styles.remoteGrid}>
							<TouchableOpacity
								style={styles.remoteVideo}
								onPress={()=>{this.setState({isButtonDisplay:!this.state.isButtonDisplay})}}
							>
								{
									Array.from(this.state.videoTracks,([trackSid,trackIdentifier])=>{
										return(
											<View>
												<TwilioVideoParticipantView
													style={styles.remoteVideo}
													key={trackSid}
													trackIdentifier={trackIdentifier}
												/>
											</View>
										)
									})
								}
							</TouchableOpacity>
							<TwilioVideoLocalView
								enabled={true}
								style={this.state.isButtonDisplay?styles.localVideoOnButtonEnabled:styles.localVideoOnButtonDisabled}
							/>
						</View>
					}
					<View
						style={
							{
								display:this.state.isButtonDisplay?"flex":"none",
								position:"absolute",
								left:0,
								bottom:0,
								right:0,
								height:100,
								flexDirection:"row",
								alignItems:"center",
								justifyContent:"space-evenly",
								zIndex:this.state.isButtonDisplay?2:0,
							}
						}
					>
						<TouchableOpacity
							style={
								{
									display:this.state.isButtonDisplay?"flex":"none",
									width:60,
									height:60,
									marginLeft:10,
									marginRight:10,
									borderRadius:100/2,
									backgroundColor:"grey",
									justifyContent:"center",
									alignItems:"center"
								}
							}
							onPress={this._onMuteButtonPress}
						>
							{
								<Text style={{color:"#FFFFFF",fontSize:24}}>Mute</Text>
							}
						</TouchableOpacity>
						<TouchableOpacity
							style={
								{
									display:this.state.isButtonDisplay?"flex":"none",
									width:60,
									height:60,
									marginLeft:10,
									marginRight:10,
									borderRadius:100/2,
									backgroundColor:"grey",
									justifyContent:"center",
									alignItems:"center"
								}
							  }
							onPress={this._onEndButtonPress}>
							{
								<Text style={{color:"#FFFFFF",fontSize:24}}>End</Text>
							}
						</TouchableOpacity>
						<TouchableOpacity
							style={
								{
									display:this.state.isButtonDisplay?"flex":"none",
									width:60,
									height:60,
									marginLeft:10,
									marginRight:10,
									borderRadius:100/2,
									backgroundColor:"grey",
									justifyContent:"center",
									alignItems:"center"
								}
							}
							onPress={this._onFlipButtonPress}
						>
							{
								<Text style={{color:"#FFFFFF",fontSize:24}}>Flip</Text>
							}
						</TouchableOpacity>
					</View>
				</View>
			}
			<TwilioVideo
				ref="twilioVideo"
				onRoomDidConnect={this._onRoomDidConnect}
				onRoomDidDisconnect={this._onRoomDidDisconnect}
				onRoomDidFailToConnect={this._onRoomDidFailToConnect}
				onParticipantAddedVideoTrack={this._onParticipantAddedVideoTrack}
				onParticipantRemovedVideoTrack={this._onParticipantRemovedVideoTrack}
			/>
			</View>
		)
	}
}
