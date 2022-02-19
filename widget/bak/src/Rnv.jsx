import{Component,createElement}from"react";
import{RnvComp}from"./components/RnvComp";
export class Rnv extends Component{
	render(){
		const roomname=this.props.roomname.value||"";
		const identity=this.props.identity.value||"";
		const token=this.props.token.value||"";
		return<RnvComp
			roomname={roomname}
			identity={identity}
			token={token}
			style={this.props.style}
		/>;
	}
}
