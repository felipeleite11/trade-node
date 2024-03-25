import { useEffect, useState } from "react"
import Chart from "react-apexcharts"
import { format } from "date-fns"
import io from 'socket.io-client'

import Candle from "../models/Candle"
import { http } from "../store/modules/CandleStore"

const initialCandlesCount = 5

const socket = io(import.meta.env.VITE_SOCKET_SERVER!)

const chartOptions: ApexCharts.ApexOptions = {
	chart: {
		toolbar: {
			show: false
		}
	},
	plotOptions: {
		candlestick: {
			colors: {
				upward: '#4caf50',
				downward: '#f44336'
			},
			wick: {
				useFillColor: true,
			}
		}
	},
	theme: {
		mode: 'dark'
	},
	xaxis: {
		labels: {
			format: 'HH:mm'
		},
		title: {
			text: 'Time'
		}
	},
	yaxis: {
		stepSize: 100,
		title: {
			text: 'Price'
		}
	}
}

interface ChartCandleProps {
	data: {
		x: string
		y: number[]
	}[]
}

export function CandleChart() {
	const [candles, setCandles] = useState<Candle[]>([])

	async function loadInitialData() {
		const { data } = await http.get(`candles/${initialCandlesCount}`)

		console.log('candles iniciais: ', data)

		setCandles(data)
	}

	useEffect(() => {
		loadInitialData()
	}, [])

	useEffect(() => {
		console.log('socket connected: ', socket.connected)

		socket.on(import.meta.env.VITE_SOCKET_EVENT_NAME!, (msg: any) => {
			console.log('candle recebida: ', msg)

			const candle = new Candle(msg)

			setCandles(old => [...old, candle])
		})
	}, [])

	const series: ChartCandleProps[] = [
		{
			data: candles.map(candle => ({
				x: format(new Date(candle.dateTime), 'HH:mm'),
				y: [
					candle.open,
					candle.high,
					candle.low,
					candle.close
				]
			}))
		}
	]

	return (
		<div>
			<Chart
				options={chartOptions}
				series={series}
				type="candlestick"
				width="500"
			/>

			<p>Atualizando candles a cada 1 minuto...</p>
		</div>
	)
}