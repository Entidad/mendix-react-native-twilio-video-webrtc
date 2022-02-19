import{Component,createElement}from"react";
import{RnvComp}from"./components/RnvComp";
export class Rnv extends Component{
	constructor(props){
		super(props);
		this.cnam="Rnv";
		this.log(`${this.cnam}:constructor:beg`);
		this.log(`${this.cnam}:constructor:end`);
	}
	log(v){
		if(!this.props.debugon)return;
		//v=JSON.stringify(v);
		console.error(`${this.cnam}:${v}`);
	}
	componentDidUpdate(prvprops,prvstate){
		this.log(`componentDidUpdate:beg`);
		this.log(`componentDidUpdate:${JSON.stringify(prvprops.roomname.value)}->${JSON.stringify(this.props.roomname.value)}`);
		this.log(`componentDidUpdate:${JSON.stringify(prvprops.identity.value)}->${JSON.stringify(this.props.identity.value)}`);
		this.log(`componentDidUpdate:${JSON.stringify(prvprops.token.value)}->${JSON.stringify(this.props.token.value)}`);
		this.log(`componentDidUpdate:${JSON.stringify(prvprops.autoconnect.value)}->${JSON.stringify(this.props.autoconnect.value)}`);
		this.log(`componentDidUpdate:end`);
	}
	componentWillUnmount(){
		this.log(`componentWillUnmount:beg`);
		this.log(`componentWillUnmount:end`);
	}
	render(){
		this.log(`render:beg`);
		const style=this.props.style;
		const debugon=this.props.debugon;
		const roomname=this.props.roomname.value||"";
		const identity=this.props.identity.value||"";
		const token=this.props.token.value||"";
		const autoconnect=this.props.autoconnect.value||false;
		this.log(`render:end`);
		return<RnvComp
			roomname={roomname}
			identity={identity}
			token={token}
			style={style}
			autoconnect={autoconnect}
			debugon={debugon}
		/>;
	}
}
