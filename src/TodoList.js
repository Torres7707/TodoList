import React, { Component, Fragment } from 'react';
import axios from 'axios';

import TodoItem from './TodoItem';

import './style.css';

class TodoList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			inputValue: '',
			list: [],
		};

		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleBtnClick = this.handleBtnClick.bind(this);
		this.handleItemDelete = this.handleItemDelete.bind(this);
	}

	render() {
		// console.log('xxx');
		return (
			<Fragment>
				<div>
					<label htmlFor="insertArea">请输入要进行的事项：</label>

					<input
						id="insertArea"
						className="input"
						value={this.state.inputValue}
						onChange={this.handleInputChange}
					/>

					<button onClick={this.handleBtnClick}>提交</button>
				</div>

				<ul>{this.getTodoItem()}</ul>
			</Fragment>
		);
	}

	componentDidMount() {
		axios
			.get('http://rap2.taobao.org:38080/app/mock/255674/api/todolist')
			// .then(() => {
			// 	alert('success');
			// })
			.then((res) => {
				console.log(res);
				this.setState(() => ({
					list: [...res.data.data],
				}));
			})
			.catch(() => {
				alert('error');
			});
	}

	getTodoItem() {
		return this.state.list.map((item, index) => {
			return (
				<TodoItem
					key={item}
					content={item}
					index={index}
					itemDelete={this.handleItemDelete}
				/>
			);
		});
	}

	handleInputChange(e) {
		// console.log(e.target.value);
		const value = e.target.value;

		this.setState(() => ({
			inputValue: value,
		}));
	}

	handleBtnClick() {
		this.setState((prevState) => ({
			list: [...prevState.list, prevState.inputValue],
			inputValue: '',
		}));
	}

	handleItemDelete(index) {
		// this.setState((prevState) => {
		// 	const list = [...prevState.list];
		// 	list.splice(index, 1);

		// 	return { list };
		// });

		this.setState({
			list: this.state.list.filter((item, i) => {
				return i !== index; //index为点击那项的索引，所以返回没有点击的项，删除了点击的项
			}),
		});
	}
}

export default TodoList;
