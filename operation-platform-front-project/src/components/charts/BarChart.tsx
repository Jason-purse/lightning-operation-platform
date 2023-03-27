import React, {useEffect, useState} from "react";
import Chart from "react-apexcharts";

export default function index(props) {
    console.log("触发")
    const [data,setData] = useState({
        chartData: [],
        chartOptions: {},
    })

    useEffect(() => {
        setData({
            chartData: this.props.chartData,
            chartOptions: this.props.chartOptions,
        });
    },[])

    const [component, setComponent] = useState(null)
    useEffect(() => {
        setComponent("")
    }, [])

    console.log("component " + component)
    return (
        component ? <Chart
            options={this.state.chartOptions}
            series={this.state.chartData}
            type='bar'
            width='100%'
            height='100%'
        /> : <></>
    );
}