import { Component } from 'react';

export class FilterOrders extends Component {

    state = {
        filterBy: {
            status: 'all',
            price: true,
            startDate: true,
            name: true
        }
    }

    handleChange = (ev) => {
        var field = ev.target.name;
        var input = ev.target.value
        this.setState({ filterBy: { ...this.state.filterBy, [field]: input }});
    }

    render() {
        const { name, price, startDate } = this.state
        return (
            <div>
                <select>
                    <option>All</option>
                    <option>Approve</option>
                    <option>Pending</option>
                </select>
                <button name="name" value={name} onClick={this.handleChange}>name</button>
                <button name="price" value={price} onClick={this.handleChange}>price</button>
                <button name="startDate" value={startDate} onClick={this.handleChange}>date</button>
            </div>
        )
    }
}