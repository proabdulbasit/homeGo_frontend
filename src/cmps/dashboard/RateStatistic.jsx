import { Component } from 'react'
import { HostStaysMenu } from './HostStaysMenu'
import { RatePieChart } from '../dashboard/RatePieChart'

export class RateStatistic extends Component {

    state = {
        stay: null
    }

    componentDidMount(){
        this.setState({stay: this.props.stays[0]})
    }

    updateSelectedStay = (stay) => {
        this.setState({ stay })
    }

    render() {
        const { stays } = this.props
        const { stay } = this.state
        return (
            <section className="dash-rate-statistics-container">
                <div className="dash-rate-statistics">
                    <HostStaysMenu stays={stays} updateSelectedStay={this.updateSelectedStay} />
                    {stay && <div className="chart-container">
                        <h3>{stay.name}</h3>
                        <RatePieChart stay={stay} />
                    </div>}
                </div>
            </section>

        )
    }
}
