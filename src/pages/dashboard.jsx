import React from "react"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'react-chartjs-2'
import { connect } from 'react-redux';
import { loadToys } from '../store/actions/toy.action.js'
//chart init
ChartJS.register(ArcElement, Tooltip, Legend)
function _DashBoard({ labels, toys, loadToys }) {
    if (!toys) loadToys()
    const labelMap = mapLabels(labels, toys.map(toy => toy.labels).flat())
    console.log('_DashBoard - labelMap', Object.values(labelMap))
    const data = {
        labels,
        datasets: [
            {
                label: '# of Votes',
                data: Object.values(labelMap),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    return <main className="dashboard-wrapper">
        <div className="chart-container full">
            <Pie data={data} />
        </div>
    </main>
}

const mapStateToProps = (storeState) => {
    return {
        toys: storeState.toyModule.toys,
        labels: storeState.toyModule.labels
    }
}

const mapDispatchToProps = {
    loadToys
}

export const DashBoard = connect(
    mapStateToProps
)(_DashBoard)


function mapLabels(labels, toyLabels) {
    return toyLabels.reduce((acc, label) => {
        if (!acc[label]) acc[label] = 0;
        acc[label]++
        return acc
    }, {})
}