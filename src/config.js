const ASSET = 'asset';
const TRADE_TYPE = 'trade_type';
const DURATION_UNIT = 'duration_unit';
const DURATION_VALUE = 'duration_value';
const INITIAL_STAKE = 'initial_stake';
const SIZE = 'size';
const PROFIT_THRESHOLD = 'profit_threshold';
const LOSS_THRESHOLD = 'loss_threshold';
const STREAK_CYCLES = 'streak_cycles';
const UNITS = 'units';


export default {
    martingale: [ASSET, TRADE_TYPE, [DURATION_UNIT, DURATION_VALUE], INITIAL_STAKE, SIZE, PROFIT_THRESHOLD, LOSS_THRESHOLD],
    dalembert: [ASSET, TRADE_TYPE, DURATION_UNIT, DURATION_VALUE, INITIAL_STAKE, UNITS, PROFIT_THRESHOLD, LOSS_THRESHOLD],
    oscars: [ASSET, TRADE_TYPE, DURATION_UNIT, DURATION_VALUE, INITIAL_STAKE, UNITS, PROFIT_THRESHOLD, LOSS_THRESHOLD, STREAK_CYCLES],
    shafin: [[ASSET], [DURATION_UNIT, DURATION_VALUE]]
}