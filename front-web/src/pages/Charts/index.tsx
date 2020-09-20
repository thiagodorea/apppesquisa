import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { buildBarSeries, getPlatformChartData, getGenderChartData } from './helpers'
import Filters from '../../components/Filters';
import './style.css'
import Chart from 'react-apexcharts';
import { barOptions, pieOptions } from './chart-options';

const BASE_URL = 'http://10.146.23.24:8080'

type PieChartData = {
    labels: string[];
    series: number[];
}

type BarChartData = {
    x: string;
    y: number;
}

const initialPieData = {
    labels: [],
    series: []
}

const Charts = () => {
    const [barChartData, setBarChartData] = useState<BarChartData[]>([]);
    const [platformData, setPlatformData] = useState<PieChartData>(initialPieData);
    const [genderData, setGenderData] = useState<PieChartData>(initialPieData);

    useEffect(() => {
        async function getData(){
            const recordsResponse = await Axios.get(`${BASE_URL}/records`);
            const gamesResponse = await Axios.get(`${BASE_URL}/games`);

            const barData = buildBarSeries(gamesResponse.data, recordsResponse.data.content)
            setBarChartData(barData)
            
            const plateformChatData = getPlatformChartData(recordsResponse.data.content)
            setPlatformData(plateformChatData)
            
            const genderChartData = getGenderChartData(recordsResponse.data.content)
            setGenderData(genderChartData)
        }

        getData();
    },[])

    return (
        <div className="page-container">
            <Filters link="/records" linkText="VER TABELA" />
            <div className="chart-container">
                <div className="top-related">
                    <h1 className="top-related-title">
                        Jogos mais votados
                </h1>
                    <div className="games-container">
                        <Chart
                            options={barOptions}
                            type="bar"
                            width="600"
                            height="500"
                            series={[{ data: barChartData }]}
                        />
                    </div>
                </div>
                <div className="charts">
                    <div className="platform-chart">
                        <h2 className="chart-title">
                            Plataformas
                        <Chart
                                options={{ ...pieOptions, labels: platformData?.labels }}
                                type="donut"
                                series={platformData?.series}
                                width="350"
                            />
                        </h2>
                    </div>
                    <div className="gender-chart">
                        <h2 className="chart-title">
                            Gêneros
                        <Chart
                                options={{ ...pieOptions, labels: genderData?.labels }}
                                type="donut"
                                series={genderData?.series}
                                width="350"
                            />
                        </h2>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Charts;