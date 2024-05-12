
import { Component } from 'react'
import { DateRange } from 'react-date-range';

export class PickDates extends Component {

  state = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',

  }

  handleSelect = (ranges) => {
    this.setState({
      startDate: ranges.selection.startDate,
      endDate: ranges.selection.endDate,
      key: 'selection'
    }, () => { this.props.handleDates(this.state) })
  }

  render() {

    return (
      <DateRange
        editableDateInputs={true}
        ranges={[this.state]}
        moveRangeOnFirstSelection={false}
        onChange={this.handleSelect}
      />
    )

  }
}








