import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TodoItem extends Component {
	constructor(props) {
		super(props);

		this.handleClick = this.handleClick.bind(this);
	}

	shouldComponentUpdate(nextProps, nextState) {
		if (nextProps.content !== this.props.content) {
			return true;
		} else {
			return false;
		}
	}

	render() {
		console.log('child render');

		// const { content, test = 'hello,' } = this.props
		const { content, test } = this.props;

		return (
			<div onClick={this.handleClick}>
				{test}
				{content}
			</div>
		);
	}

	handleClick() {
		const { itemDelete, index } = this.props;

		itemDelete(index);
	}
}

TodoItem.propTypes = {
	content: PropTypes.string,
	index: PropTypes.number,
	itemDelete: PropTypes.func,
};

TodoItem.defaultProps = {
	test: 'hello,',
};

export default TodoItem;
