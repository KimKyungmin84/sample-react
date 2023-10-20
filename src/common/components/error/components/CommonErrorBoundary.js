import { Component, PropsWithChildren } from "react";

class CommonErrorBoundary extends Component{
	constructor(props) {
        console.log("CommonErrorBoundary constructor() 실행")
		super(props);
		this.state = { error: null };
	}

	reset() {
        console.log("CommonErrorBoundary reset() 실행")
		this.setState({ error: null });
	}

	static getDerivedStateFromError(error) {
        console.log("CommonErrorBoundary getDerivedStateFromError() 실행")
		return { error: error };
	}

	render() {
		return this.props.children;
	}
}

export default CommonErrorBoundary;
