import { Doughnut } from 'react-chartjs-2';

export function RatePieChart({ stay }) {

    function getRateData() {
        var chartData = stay.reviews.reduce((acc, review) => {
            acc[Math.round(review.avgRate) - 1]++
            return acc
        }, [0, 0, 0, 0, 0])
        return chartData;
    }

    const data = {
        labels: ['1 Star', '2 Star', '3 Star', '4 Star', '5 Star'],
        datasets: [
            {
                label: '# of Votes',
                data: getRateData(),
                backgroundColor: [
                    'rgba(255, 61, 61, 0.5)',
                    'rgba(255, 163, 59, 0.5)',
                    'rgba(252, 255, 71, 0.5)',
                    'rgba(184, 255, 103, 0.5)',
                    'rgba(66, 245, 110, 0.5)'
                ],
                borderColor: [
                    'rgba(255, 61, 61, 0.8)',
                    'rgba(255, 163, 59, 0.8)',
                    'rgba(252, 255, 71, 0.8)',
                    'rgba(184, 255, 103, 0.5)',
                    'rgba(66, 245, 110, 0.8)'
                ],
                borderWidth: 1,
            },
        ],
        
    };

    return (
        <div className="rate-chart" >
            <Doughnut data={data} />
        </div>
    )
}