
import   { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';
import { useDashboardDataQuery } from '../../../provider/queries/Users.query';
import { useLocation } from 'react-router-dom';
import Loader from '../../../components/Loader';

export default function PieChartDemo() {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});
    const { data, isError, isLoading, isFetching } = useDashboardDataQuery({})
    const location = useLocation()

    useEffect(() => {
        if (!data) {
            return
        }

        const documentStyle = getComputedStyle(document.documentElement);
        const chartData = {
            labels: ['user', 'orders', 'sell'],
            datasets: [
                {
                    data: [data.consumers, data.orders, data.sell],
                    backgroundColor: [
                        documentStyle.getPropertyValue('--pink-500'),
                        documentStyle.getPropertyValue('--indigo-500'),
                        documentStyle.getPropertyValue('--teal-500')
                    ],
                    hoverBackgroundColor: [
                        documentStyle.getPropertyValue('--blue-400'),
                        documentStyle.getPropertyValue('--yellow-400'),
                        documentStyle.getPropertyValue('--green-400')
                    ]
                }
            ]
        }
        const options = {
            plugins: {
                legend: {
                    labels: {
                        usePointStyle: true
                    }
                }
            }
        };

        setChartData(chartData);
        setChartOptions(options);
    }, [data, location]);
    if (isFetching || isLoading) {
        return <Loader />
    }
    if (isError) {
        return <>
            something went wrong
        </>
    }

    return ( 
            <Chart type="polarArea" data={chartData} options={chartOptions} className="w-2/3 lg:w-1/3" />
      
    )
}
