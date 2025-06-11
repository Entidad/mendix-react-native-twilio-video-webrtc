import { Component, createElement } from "react";
import { Big } from "big.js";
import { ReactNativeVideoComponent } from "./components/ReactNativeVideoComponent";
import { mergeNativeStyles } from "@mendix/pluggable-widgets-tools";
export class ReactNativeVideo extends Component {
	constructor(props) {
		super(props);
		this.cnam = "ReactNativeVideo";
		this.log(`${this.cnam}:constructor:beg`);
		this.log(`${this.cnam}:constructor:end`);
	}
	log(v) {
		if (!this.props.debugon) return;
		console.error(`${this.cnam}:${v}`);
	}
	componentDidUpdate(prvprops, prvstate) {
		this.log(`componentDidUpdate:beg`);
		this.log(`componentDidUpdate:end`);
	}
	componentDidMount() {
		this.log("componentDidMount:beg");
		this.log("componentDidMount:end");
	}
	componentWillUnmount() {
		this.log(`componentWillUnmount:beg`);
		this.onUnmountAction();
		this.log(`componentWillUnmount:end`);
	}
	onConnectAction() {
		this.log(`onConnectAction:beg`);
		if (this.props.connected && this.props.connected.status == "available") this.props.connected.setValue(true);
		if (this.props.participants && this.props.participants.status == "available") this.props.participants.setValue(new Big(0));
		if (
			this.props.onConnectAction
		) {
			if (
				this.props.onConnectAction.canExecute &&
				this.props.onConnectAction.isAuthorized &&
				!(
					this.props.onConnectAction.isExecuting &&
					this.props.onConnectAction.disabledDuringExecution
				)
			) {
				this.props.onConnectAction.execute();
			}
		}
		this.log(`onConnectAction:end`);
	}
	onDisconnectAction() {
		this.log(`onDisconnectAction:beg`);
		if (this.props.connected && this.props.connected.status == "available") this.props.connected.setValue(false);
		if (this.props.muted && this.props.muted.status == "available") this.props.muted.setValue(false);
		if (this.props.participants && this.props.participants.status == "available") this.props.participants.setValue(new Big(0));
		if (
			this.props.onDisconnectAction
		) {
			if (
				this.props.onDisconnectAction.canExecute &&
				this.props.onDisconnectAction.isAuthorized &&
				!(
					this.props.onDisconnectAction.isExecuting &&
					this.props.onDisconnectAction.disabledDuringExecution
				)
			) {
				this.props.onDisconnectAction.execute();
			}
		}
		this.log(`onDisconnectAction:end`);
	}
	onMuteAction() {
		this.log(`onMuteAction:beg`);
		if (this.props.muted && this.props.muted.status == "available") this.props.muted.setValue(true);
		if (
			this.props.onMuteAction
		) {
			if (
				this.props.onMuteAction.canExecute &&
				this.props.onMuteAction.isAuthorized &&
				!(
					this.props.onMuteAction.isExecuting &&
					this.props.onMuteAction.disabledDuringExecution
				)
			) {
				this.props.onMuteAction.execute();
			}
		}
		this.log(`onMuteAction:end`);
	}
	onUnmuteAction() {
		this.log(`onUnmuteAction:beg`);
		if (this.props.muted && this.props.muted.status == "available") this.props.muted.setValue(false);
		if (
			this.props.onUnmuteAction
		) {
			if (
				this.props.onUnmuteAction.canExecute &&
				this.props.onUnmuteAction.isAuthorized &&
				!(
					this.props.onUnmuteAction.isExecuting &&
					this.props.onUnmuteAction.disabledDuringExecution
				)
			) {
				this.props.onUnmuteAction.execute();
			}
		}
		this.log(`onUnmuteAction:end`);
	}

	onFlipAction() {
		this.log(`onFlipAction:beg`);
		if (
			this.props.onFlipAction
		) {
			if (
				this.props.onFlipAction.canExecute &&
				this.props.onFlipAction.isAuthorized &&
				!(
					this.props.onFlipAction.isExecuting &&
					this.props.onFlipAction.disabledDuringExecution
				)
			) {
				this.props.onFlipAction.execute();
			}
		}
		this.log(`onFlipAction:end`);
	}
	onErrorAction() {
		this.log(`onErrorAction:beg`);
		if (
			this.props.onErrorAction
		) {
			if (
				this.props.onErrorAction.canExecute &&
				this.props.onErrorAction.isAuthorized &&
				!(
					this.props.onErrorAction.isExecuting &&
					this.props.onErrorAction.disabledDuringExecution
				)
			) {
				this.props.onErrorAction.execute();
			}
		}
		this.log(`onErrorAction:end`);
	}
	onParticipantAddedAction() {
		this.log(`onParticipantAddedAction:beg`);
		if (this.props.participants && this.props.participants.status == "available") {
			this.props.participants.setValue(isNaN(this.props.participants.value) ? new Big(1) : (new Big(this.props.participants.value + 1)));
		}
		if (
			this.props.onParticipantAddedAction
		) {
			if (
				this.props.onParticipantAddedAction.canExecute &&
				this.props.onParticipantAddedAction.isAuthorized &&
				!(
					this.props.onParticipantAddedAction.isExecuting &&
					this.props.onParticipantAddedAction.disabledDuringExecution
				)
			) {
				this.props.onParticipantAddedAction.execute();
			}
		}
		this.log(`onParticipantAddedAction:end`);
	}
	onParticipantRemovedAction() {
		this.log(`onParticipantRemovedAction:beg`);
		if (this.props.participants && this.props.participants.status == "available") {
			this.props.participants.setValue(isNaN(this.props.participants.value) ? new Big(1) : (new Big(this.props.participants.value - 1)));
		}
		if (
			this.props.onParticipantRemovedAction
		) {
			if (
				this.props.onParticipantRemovedAction.canExecute &&
				this.props.onParticipantRemovedAction.isAuthorized &&
				!(
					this.props.onParticipantRemovedAction.isExecuting &&
					this.props.onParticipantRemovedAction.disabledDuringExecution
				)
			) {
				this.props.onParticipantRemovedAction.execute();
			}
		}
		this.log(`onParticipantRemovedAction:end`);
	}
	onUnmountAction() {
		this.log(`onUnmountAction:beg`);
		if (this.props.connected && this.props.connected.status == "available") this.props.connected.setValue(false);
		if (this.props.muted && this.props.muted.status == "available") this.props.muted.setValue(false);
		if (
			this.props.onUnmountAction
		) {
			if (
				this.props.onUnmountAction.canExecute &&
				this.props.onUnmountAction.isAuthorized &&
				!(
					this.props.onUnmountAction.isExecuting &&
					this.props.onUnmountAction.disabledDuringExecution
				)
			) {
				this.props.onUnmountAction.execute();
			}
		}
		this.log(`onUnmountAction:end`);
	}
	render() {
		this.log(`render:beg`);
		const style = this.props.style;
		const debugon = this.props.debugon;
		const roomname = this.props.roomname.value || "";
		const identity = this.props.identity.value || "";
		const token = this.props.token.value || "";
		const connect = this.props.connect ? this.props.connect.value || false : false;
		const connected = this.props.connect ? this.props.connect.value || false : false;
		const mute = this.props.connect ? this.props.connect.value || false : false;
		const muted = this.props.connect ? this.props.connect.value || false : false;
		const image_mute = this.props.image_mute ? this.props.image_mute.value || null : null;
		const image_unmute = this.props.image_unmute ? this.props.image_unmute.value || null : null;
		const image_flip = this.props.image_flip ? this.props.image_flip.value || null : null;
		const image_end = this.props.image_end ? this.props.image_end.value || null : null;
		const text_mute = this.props.text_mute || "";
		const text_unmute = this.props.text_unmute || "";
		const text_flip = this.props.text_flip || "";
		const text_end = this.props.text_end || "";
		this.log(`render:end`);
		return <ReactNativeVideoComponent
			roomname={roomname}
			identity={identity}
			token={token}
			style={style}
			connect={connect}
			connected={connected}
			mute={mute}
			muted={muted}
			debugon={debugon}
			onConnectAction={this.onConnectAction.bind(this)}
			onDisconnectAction={this.onDisconnectAction.bind(this)}
			onMuteAction={this.onMuteAction.bind(this)}
			onUnmuteAction={this.onUnmuteAction.bind(this)}
			onFlipAction={this.onFlipAction.bind(this)}
			onErrorAction={this.onErrorAction.bind(this)}
			onParticipantAddedAction={this.onParticipantAddedAction.bind(this)}
			onParticipantRemovedAction={this.onParticipantRemovedAction.bind(this)}
			image_mute={image_mute}
			image_unmute={image_unmute}
			image_flip={image_flip}
			image_end={image_end}
			text_mute={text_mute}
			text_unmute={text_unmute}
			text_flip={text_flip}
			text_end={text_end}

		/>;
	}
}
