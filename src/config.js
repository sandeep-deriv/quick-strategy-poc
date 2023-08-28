
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

const ASSET = { type: 'select', name: 'asset', label: 'Asset', initial_value: 'EURUSD', options: assets };
const TRADE_TYPE = { type: 'select', name: 'trade_type', label: 'Trade Type', initial_value: 'call', options: ['CALL', 'PUT'] };
const DURATION_UNIT = { type: 'select', name: 'duration_unit', label: 'Duration Unit', initial_value: 'Ticks', options: ['Ticks', 'Seconds', 'Minutes', 'Hours', 'Days'] };
const DURATION_VALUE = { type: 'text', name: 'duration_value', label: 'Duration Value', initial_value: 1, limit: { min: 1, max: 15 } };
const INITIAL_STAKE = { type: 'text', name: 'initial_stake', label: 'Initial Stake', initial_value: '0.35', limit: { min: 0.35, max: 6000 } };
const SIZE = { type: 'text', name: 'size', label: 'Size', initial_value: 1, limit: { min: 1, max: 100 } };
const PROFIT_THRESHOLD = { type: 'text', name: 'profit_threshold', label: 'Profit Threshold', initial_value: '', limit: { min: 1, max: 100 } };
const LOSS_THRESHOLD = { type: 'text', name: 'loss_threshold', label: 'Loss Threshold', initial_value: '', limit: { min: 1, max: 100 } };
const STREAK_CYCLES = { type: 'text', name: 'streak_cycles', label: 'Streak Cycles', initial_value: '', limit: { min: 1, max: 100 } };
const UNITS = { type: 'text', name: 'units', label: 'Units', initial_value: 1, limit: { min: 1, max: 100 } };


export default {
    martingale: [ASSET, TRADE_TYPE, [DURATION_UNIT, DURATION_VALUE], INITIAL_STAKE, SIZE, PROFIT_THRESHOLD, LOSS_THRESHOLD],
    dalembert: [ASSET, TRADE_TYPE, DURATION_UNIT, DURATION_VALUE, INITIAL_STAKE, UNITS, PROFIT_THRESHOLD, LOSS_THRESHOLD],
    oscars: [ASSET, TRADE_TYPE, DURATION_UNIT, DURATION_VALUE, INITIAL_STAKE, UNITS, PROFIT_THRESHOLD, LOSS_THRESHOLD, STREAK_CYCLES],
    shafin: [[ASSET], [DURATION_UNIT, DURATION_VALUE]]
}