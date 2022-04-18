import{
	Component,
	createElement
}from"react";
import{
	Text,
	View,
	StyleSheet,
	TouchableOpacity,
	TouchableHighlight
}from"react-native";
import{
	Image
}from"mendix/components/native/Image";
import{
	mergeNativeStyles
}from"@mendix/pluggable-widgets-tools";
import{
	SvgXml
}from"react-native-svg";
import{
	TwilioVideoLocalView,
	TwilioVideoParticipantView,
	TwilioVideo
}from"react-native-twilio-video-webrtc";
import normalize from"react-native-normalize";
import{widthPercentageToDP as wp,heightPercentageToDP as hp}from"react-native-responsive-screen";
import{
	checkMultiple,
	request,
	requestMultiple,
	PERMISSIONS,
	RESULTS,
}from"react-native-permissions";
/*const*/styles=StyleSheet.create({
	container:{
		backgroundColor:"#0a1325",
		width:wp("100%"),
		height:hp("100%")
	},
	callContainer:{
		height:hp("100%"),
		width:wp("100%"),
		//backgroundColor:"#000000",
		zIndex:0,
		elevation:0,
		padding:12,
		borderWidth: 5,
		//borderRadius: 10
	},
		callContainerLocalVideoWrapper:{
			borderWidth:5,
			borderRadius:5,
			borderColor:"#FFFFFF",
			height:"90%",
		},
			callContainerLocalVideo:{
				width:"100%",
				height:"100%",
				//margin:12,
				//borderRadius:12,
				zIndex:0,
				elevation:0,
				//backgroundColor:"#000000",
				zIndex:1,
				elevation:1,
			},
		callContainerRemoteVideoWrapper:{
			borderWidth:5,
			borderRadius:5,
			borderColor:"#FFFFFF",
			height:"70%",
		},
			callContainerRemoteVideo:{
				width:"100%",
				height:"100%",
				//backgroundColor:"#000000",
				zIndex:2,
				elevation:2
			},
	callTileContainer:{
		position:"absolute",
		bottom:"10%",
		left:0,
		height:"20%",
		width:wp("100%"),
		padding:17.5,
		//backgroundColor:"#000000"
	},
		remoteTileGrid:{
			flex:1,
			flexDirection:"row",
			height:"100%",
			width:"100%",
			//backgroundColor:"#000000"
		},
			remoteTileTouchableOpacity:{
				zIndex:12,
				elevation:12
			},
				remoteTileVideoWrapper:{
					borderWidth:5,
					borderColor:"white",
					borderRadius:5,
					marginRight:10,
				},
					remoteTileVideo:{
						height:"100%",
						aspectRatio:1,
						//backgroundColor:"#000000"
					},
	callButtonContainer:{
		position:"absolute",
		left:0,
		bottom:0,
		height:"10%",
		flexDirection:"row",
		alignItems:"center",
		justifyContent:"space-evenly",
		//backgroundColor:"#000000"
	},
		callButtonContainerButton:{
			width:"33.33%",
			height:"100%",
			//backgroundColor:"#000000",
			justifyContent:"center",
			alignItems:"center",
				//padding:12,
		},
			callButtonContainerButtonText:{
				color:"#FFFFFF",
				fontSize:16
			},
			callButtonContainerButtonImage:{
				width:"100%",
				height:"100%",
			}
});
export class ReactNativeVideoComponent extends Component{
	constructor(props){
		super(props);
		this.cnam="RnvComp";
		this.log("constructor:beg");
		//styles=mergeNativeStyles(styles,this.props.style);
		this.state={
			isAudioEnabled:true,
			isVideoEnabled:true,
			isButtonDisplay:true,
			status:"disconnected",
			participants:new Map(),
			videoTracks:new Map(),
			currentVideoTrack:null,//new Map(),
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
		this.getAllPermissions(function(){
			this.log("getAllPermissions:cb:beg");
			this._onConnectButtonPress();
			this.log("getAllPermissions:cb:end");
		}.bind(this));
		this.log("componentDidMount:end");
	}
	componentDidUpdate(prvprops,prvstate){
		this.log("componentDidUpdate:beg");
		if(
			this.state.status=="disconnected"&&
			prvprops.connect!=this.props.connect&&
			this.props.connect
		){
		}else if(
			this.state.status=="connected"&&
			prvprops.connect!=this.props.connect&&
			!this.props.connect
		){
			this.log(`componentDidUpdate:disconnecting`);
			this._onEndButtonPress();
		}
		this.log("componentDidUpdate:end");
	}
	componentWillUnmount(){
		this.log("componentWillUnmount:beg");
		try{
			this.refs.twilioVideo.disconnect()
			this.setState({status:"disconnected"})
			this.setState({participants:new Map()})
			this.setState({videoTracks:new Map()})
			this.setState({currentVideoTrack:null})
		}catch(e){
			console.error(e.toString());
		}
		this.log("componentWillUnmount:end");
	}
	getAllPermissions(callback){
		this.log("getAllPermissions:beg");
		const iosPermissions=[
			PERMISSIONS.IOS.CAMERA,PERMISSIONS.IOS.MICROPHONE
		];
		const androidPermissions=[
			PERMISSIONS.ANDROID.CAMERA,
			PERMISSIONS.ANDROID.RECORD_AUDIO,
		];
		// https://stackoverflow.com/questions/54819865/how-do-i-request-multiple-permissions-at-once-in-react-native
		checkMultiple(
			Platform.OS==='ios'?iosPermissions:androidPermissions,
		).then((statuses)=>{
			this.log("getAllPermissions:permissions acquired");
			const[CAMERA,AUDIO]=Platform.OS==='ios'?iosPermissions:androidPermissions;
			if(
				statuses[CAMERA]===RESULTS.UNAVAILABLE||
				statuses[AUDIO]===RESULTS.UNAVAILABLE
			){
				this.log("getAllPermissions:AUDIO or CAMERA UNAVAILABLE");
				this.log("getAllPermissions:invoking callback anyways");
				callback&&callback();
			}else if(
				statuses[CAMERA]===RESULTS.BLOCKED||
				statuses[AUDIO]===RESULTS.BLOCKED
			){
				this.log("getAllPermissions:AUDIO or CAMERA BLOCKED");
				alert(
					'Error:'+
					'Permission to access hardware was blocked, please grant manually',
				);
			}else{
				if(
					statuses[CAMERA]===RESULTS.DENIED&&
					statuses[AUDIO]===RESULTS.DENIED
				){
					this.log("getAllPermissions:AUDIO and CAMERA DENIED");
					requestMultiple(
						Platform.OS==='ios'?iosPermissions:androidPermissions,
					).then((newStatuses)=>{
						if(
							newStatuses[CAMERA]===RESULTS.GRANTED&&
							newStatuses[AUDIO]===RESULTS.GRANTED
						){
							this.log("getAllPermissions:AUDIO and CAMERA GRANTED");
							callback&&callback();
						}else{
							this.log("getAllPermissions:error:AUDIO and CAMERA not GRANTED");
							alert(
								'Error:'+
								'One of the permissions was not granted'
							);
						}
					});
				} else if (
					statuses[CAMERA]===RESULTS.DENIED||
					statuses[AUDIO]===RESULTS.DENIED
				) {
					this.log("getAllPermissions:"+(statuses[CAMERA]===RESULTS.DENIED?"CAMERA":"AUDIO")+" DENIED");
					this.log("getAllPermissions:requesting "+(statuses[CAMERA]===RESULTS.DENIED?"CAMERA":"AUDIO")+"");
					request(statuses[CAMERA]===RESULTS.DENIED?CAMERA:AUDIO).then(
						(result)=>{
							if(result===RESULTS.GRANTED){
								this.log("getAllPermissions:GRANTED");
								this.log("getAllPermissions:executing callback");
								callback&&callback();
							}else{
								this.log("getAllPermissions:Failed to GRANT");
								alert(
									'Error:'+
									'Permission not granted'
								);
							}
						},
					);
				}else if(
					statuses[CAMERA]===RESULTS.GRANTED||
					statuses[AUDIO]===RESULTS.GRANTED
				){
					this.log("getAllPermissions:AUDIO||CAMERA GRANTED");
					this.log("getAllPermissions:executing callback");
					callback&&callback();
				}
			}
		});
		this.log("getAllPermissions:end");
	};
	_onConnectButtonPress=()=>{
		this.log("_onConnectButtonPress:beg");
		if(
			this.props.roomname!=""&&
			this.props.token!=""
		){
			this.log("_onConnectButtonPress:connecting");
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
		this.setState({currentVideoTrack:null})
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
		this.setState({currentVideoTrack:track});
		let val=new Map([
			...this.state.videoTracks,
			[
				track.trackSid,
				{
					participantSid:participant.sid,
					videoTrackSid:track.trackSid,
					t:track
				}
			]
		]);
		this.setState({
			videoTracks:val,
		});
		this.props.onParticipantAddedAction();
		this.log("_onParticipantAddedVideoTrack:end");
	};
	_onParticipantRemovedVideoTrack=({participant,track})=>{
		this.log("_onParticipantRemovedVideoTrack:beg");
		this.setState({currentVideoTrack:null});
		const videoTracks=this.state.videoTracks
		videoTracks.delete(track.trackSid);
		this.setState({videoTracks:videoTracks});
		this.state.videoTracks.forEach((v,k)=>{
			this.setState({currentVideoTrack:v.t});
		});

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
					this.state.status==="connected"&&
					this.state.currentVideoTrack==null&&
					<View style={styles.callContainer}>
						<View style={styles.callContainerLocalVideoWrapper}>
							<TwilioVideoLocalView
								enabled={true}
								style={styles.callContainerLocalVideo}
							/>
						</View>
					</View>
				}
				{
					this.state.status==="connected"&&
					this.state.currentVideoTrack!=null&&
					<View style={styles.callContainer}>
						<View style={styles.callContainerRemoteVideoWrapper}>
							<TwilioVideoParticipantView
								key={this.state.currentVideoTrack.trackSid}
								trackIdentifier={this.state.videoTracks.get(this.state.currentVideoTrack.trackSid)}
								style={styles.callContainerRemoteVideo}
							/>
						</View>
					</View>
				}
				{
					(this.state.status==="connected"||this.state.status==='connecting')&&this.state.currentVideoTrack!=null&&
					<View style={styles.callTileContainer}>
						{
							this.state.status==="connected"&&
							<View style={styles.remoteTileGrid}>
								{
									Array.from(this.state.videoTracks,([trackSid,trackIdentifier])=>{
										return(
											<TouchableOpacity
												onPress={()=>{
													this.setState({
														currentVideoTrack:this.state.videoTracks.get(trackSid).t
													});
												}}
												style={styles.remoteTileTouchableOpacity}
											>
												<View style={styles.remoteTileVideoWrapper}>
													<TwilioVideoParticipantView
														style={styles.remoteTileVideo}
														key={trackSid}
														trackIdentifier={trackIdentifier}
													/>
												</View>
											</TouchableOpacity>
										)
									})
								}
							</View>
						}
					</View>
				}
				{
					this.state.status==="connected"&&
					<View
						style={styles.callButtonContainer}
					>
						<TouchableOpacity
							style={styles.callButtonContainerButton}
							onPress={this._onMuteButtonPress}
						>
							{this.props.text_mute!=""&&this.props.text_unmute!=""&&
								<Text style={styles.callButtonContainerButtonText}>{this.state.isAudioEnabled?this.props.text_mute:this.props.text_unmute}</Text>
							}
							{
								typeof(this.props.image_mute)=='string'&&this.state.isAudioEnabled&&
								<SvgXml style={styles.callButtonContainerButtonImage} xml={this.props.image_mute} width="100%" height="100%" />
							}
							{
								typeof(this.props.image_mute)=='number'&&this.state.isAudioEnabled&&
								<Image style={styles.callButtonContainerButtonImage} source={this.props.image_mute}/>
							}
							{
								typeof(this.props.image_unmute)=='string'&&!this.state.isAudioEnabled&&
								<SvgXml style={styles.callButtonContainerButtonImage} xml={this.props.image_unmute} width="100%" height="100%" />
							}
							{
								typeof(this.props.image_unmute)=='number'&&!this.state.isAudioEnabled&&
								<Image style={styles.callButtonContainerButtonImage} source={this.props.image_unmute}/>
							}
						</TouchableOpacity>
						<TouchableOpacity
							style={styles.callButtonContainerButton}
							onPress={this._onEndButtonPress}
						>
							{this.props.text_end!=""&&
								<Text style={styles.callButtonContainerButtonText}>{this.props.text_end}</Text>
							}
							{
								typeof(this.props.image_end)=='string'&&
								<SvgXml style={styles.callButtonContainerButtonImage} xml={this.props.image_end} width="100%" height="100%" />
							}
							{
								typeof(this.props.image_end)=='number'&&
								<Image style={styles.callButtonContainerButtonImage} source={this.props.image_end}/>
							}
						</TouchableOpacity>
						<TouchableOpacity
							style={styles.callButtonContainerButton}
							onPress={this._onFlipButtonPress}
						>
							{this.props.text_flip!=""&&
								<Text style={styles.callButtonContainerButtonText}>{this.props.text_flip}</Text>
							}
							{
								typeof(this.props.image_flip)=='string'&&
								<SvgXml style={styles.callButtonContainerButtonImage} xml={this.props.image_flip} width="100%" height="100%" />
							}
							{
								typeof(this.props.image_flip)=='number'&&
								<Image style={styles.callButtonContainerButtonImage} source={this.props.image_flip}/>
							}
						</TouchableOpacity>
					</View>
				}
				{
					<TwilioVideo
						ref="twilioVideo"
						onRoomDidConnect={this._onRoomDidConnect}
						onRoomDidDisconnect={this._onRoomDidDisconnect}
						onRoomDidFailToConnect={this._onRoomDidFailToConnect}
						onParticipantAddedVideoTrack={this._onParticipantAddedVideoTrack}
						onParticipantRemovedVideoTrack={this._onParticipantRemovedVideoTrack}
					/>
				}
			</View>
		);
	}
}
