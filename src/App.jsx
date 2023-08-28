import { useState } from 'react'
import config from './config'
import useInput from './hooks/useInput';

const assets = [
	'EURUSD',
	'GBPUSD',
	'USDJPY',
	'USDCHF',
	'AUDUSD',
	'USDCAD',
	'NZDUSD',
	'EURGBP',
	'EURJPY',
	'EURCHF',
	'EURCAD',
	'EURAUD',
	'EURNZD',
	'GBPJPY',
	'GBPCHF',
	'GBPCAD',
	'GBPAUD',
	'GBPNZD',
	'CHFJPY',
	'CADJPY',
	'AUDJPY',
	'NZDJPY',
	'CADCHF',
	'AUDCHF',
	'NZDCHF',
]

function App() {
	const [selected, setSelected] = useState('martingale');
	const [asset, get_asset, reset_asset] = useInput({ type: 'select', name: 'asset', label: 'Asset', initial_value: 'EURUSD', options: assets });
	const [trade_type, get_trade_type, reset_trade_type] = useInput({ type: 'select', name: 'trade_type', label: 'Trade Type', initial_value: 'call', options: ['CALL', 'PUT'] });
	const [duration_unit, get_duration_unit, reset_duration_unit] = useInput({ type: 'select', name: 'duration_unit', label: 'Duration Unit', initial_value: 'Ticks', options: ['Ticks', 'Seconds', 'Minutes', 'Hours', 'Days'] });
	const [duration_value, get_duration_value, reset_duration_value] = useInput({ type: 'text', name: 'duration_value', label: 'Duration Value', initial_value: 1, limit: { min: 1, max: 15 } });
	const [initial_stake, get_initial_stake, reset_initial_stake] = useInput({ type: 'text', name: 'initial_stake', label: 'Initial Stake', initial_value: '0.35', limit: { min: 0.35, max: 6000 } });
	const [size, get_size, reset_size] = useInput({ type: 'text', name: 'size', label: 'Size', initial_value: 1, limit: { min: 1, max: 100 } });
	const [profit_threshold, get_profit_threshold, reset_profit_threshold] = useInput({ type: 'text', name: 'profit_threshold', label: 'Profit Threshold', initial_value: '', limit: { min: 1, max: 100 } });
	const [loss_threshold, get_loss_threshold, reset_loss_threshold] = useInput({ type: 'text', name: 'loss_threshold', label: 'Loss Threshold', initial_value: '', limit: { min: 1, max: 100 } });
	const [streak_cycles, get_streak_cycles, reset_streak_cycles] = useInput({ type: 'text', name: 'streak_cycles', label: 'Streak Cycles', initial_value: '', limit: { min: 1, max: 100 } });
	const [units, get_units, reset_units] = useInput({ type: 'text', name: 'units', label: 'Units', initial_value: 1, limit: { min: 1, max: 100 } });

	const inputs = {
		asset,
		trade_type,
		duration_unit,
		duration_value,
		initial_stake,
		size,
		profit_threshold,
		loss_threshold,
		streak_cycles,
		units,
	};

	const getters = {
		get_asset,
		get_trade_type,
		get_duration_unit,
		get_duration_value,
		get_initial_stake,
		get_size,
		get_profit_threshold,
		get_loss_threshold,
		get_streak_cycles,
		get_units,
	};

	const resets = {
		reset_asset,
		reset_trade_type,
		reset_duration_unit,
		reset_duration_value,
		reset_initial_stake,
		reset_size,
		reset_profit_threshold,
		reset_loss_threshold,
		reset_streak_cycles,
		reset_units,
	};

	const renderForm = () => {
		const form = config[selected] || [];

		return form.map((item, index) => {
			if (Array.isArray(item)) {
				return (
					<div className='input__group' key={index + 'outer'}>
						{item.map((i) => { return <div key={i}>{inputs[i]}</div> })}
					</div>
				)
			}
			return <div key={item}>{inputs[item]}</div>
		});
	}

	const handleSelect = (e) => {
		const form = config[selected] || [];
		form?.forEach((item) => {
			if (Array.isArray(item)) {
				item.forEach((i) => {
					const r = `reset_${i}`;
					console.log(r);
					resets[r]?.();
				});
				return;
			}
			const i = `reset_${item}`;
			console.log(i);
			resets[i]?.();
		});
		setSelected(e.target.value);
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		const form = config[selected] || [];
		let data = {}
		form.forEach((item) => {
			if (Array.isArray(item)) {
				item.forEach((i) => {
					const d1 = getters[`get_${i}`]?.()
					data = {
						...d1,
						...data,
					}
				});
				return;
			}
			const d2 = getters[`get_${item}`]?.();
			data = {
				...d2,
				...data,
			}
		});
		console.log(data);
	}

	return (
		<div>
			<select onChange={handleSelect} value={selected} className='input__select'>
				<option value="martingale">Martingale</option>
				<option value="dalembert">Dalembert</option>
				<option value="oscars">Oscars</option>
				<option value="shafin">Shafin</option>
			</select>
			<div >
				{renderForm()}
			</div>
			<div>
				<button onClick={handleSubmit}>Submit</button>
			</div>
		</div>
	)
}

export default App
