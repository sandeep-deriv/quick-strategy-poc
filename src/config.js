import { INPUT_TYPES, OPERATORS, assets } from "./constants";

const assetsValueLabel = assets.map((asset) => ({
    value: asset,
    label: asset,
}));

const ASSET = {
    type: INPUT_TYPES.SELECT,
    name: "asset",
    label: "Asset",
    initial_value: "EURUSD",
    options: assetsValueLabel,
    required: true,
};
const TRADE_TYPE = {
    type: INPUT_TYPES.SELECT,
    name: "trade_type",
    label: "Trade Type",
    initial_value: "call",
    options: [
        { value: "CALL", label: "Call" },
        { value: "PUT", label: "Put" },
    ],
    required: true,
};
const DURATION_UNIT = {
    type: INPUT_TYPES.SELECT,
    name: "duration_unit",
    label: "Duration Unit",
    initial_value: "Ticks",
    options: [
        { value: "Ticks", label: "Ticks" },
        { value: "Seconds", label: "Seconds" },
        { value: "Minutes", label: "Minutes" },
        { value: "Hours", label: "Hours" },
        { value: "Days", label: "Days" },
    ],
    required: true,
};
const DURATION_VALUE = {
    type: INPUT_TYPES.TEXT,
    name: "duration_value",
    label: "Duration Value",
    initial_value: 1,
    limit: { min: 1, max: 15 },
    required: true,
};
const INITIAL_STAKE = {
    type: INPUT_TYPES.TEXT,
    name: "initial_stake",
    label: "Initial Stake",
    initial_value: "0.35",
    limit: { min: 0.35, max: 6000 },
    required: true,
};
const SIZE = {
    type: INPUT_TYPES.TEXT,
    name: "size",
    label: "Size",
    initial_value: 1,
    limit: { min: 1, max: 100 },
    required: true,
};
const PROFIT_THRESHOLD = {
    type: INPUT_TYPES.NUMBER,
    name: "profit_threshold",
    label: "Profit Threshold",
    initial_value: "",
    limit: { min: 1, max: 100 },
};
const LOSS_THRESHOLD = {
    type: INPUT_TYPES.NUMBER,
    name: "loss_threshold",
    label: "Loss Threshold",
    initial_value: "",
    limit: { min: 1, max: 100 },
    required: true,
};
const STREAK_CYCLES = {
    type: INPUT_TYPES.TEXT,
    name: "streak_cycles",
    label: "Streak Cycles",
    initial_value: "",
    limit: { min: 1, max: 100 },
    required: true,
};
const UNITS = {
    type: INPUT_TYPES.TEXT,
    name: "units",
    label: "Units",
    initial_value: 1,
    limit: { min: 1, max: 100 },
    required: true,
};

const SAMPLE_TEST = {
    type: INPUT_TYPES.SELECT,
    name: "sample1",
    label: "Conditional Sample 1",
    initial_value: "C",
    options: [
        { value: "A", label: "Option A" },
        { value: "B", label: "Option B" },
        { value: "C", label: "Option C" },
        { value: "D", label: "Option D" },
        { value: "E", label: "Option E" },
    ],
    required: true,
    conditions: [
        {
            name: "duration_unit",
            operator: OPERATORS.EQUAL,
            value: "Seconds",
        },
        {
            name: "duration_value",
            operator: OPERATORS.GREATER_THAN_OR_EQUAL,
            value: 5,
        },
    ],
};

const SAMPLE_TEST_1 = {
    type: INPUT_TYPES.TEXT,
    name: "sample2",
    label: "Conditional Sample 2",
    initial_value: 10,
    limit: { min: 3, max: 15 },
    required: true,
    conditions: [
        {
            name: "duration_unit",
            operator: OPERATORS.EQUAL,
            value: "Ticks",
        },
        {
            name: "duration_value",
            operator: OPERATORS.LESS_THAN,
            value: 5,
        },
    ],
};

export default {
    martingale: [
        ASSET,
        TRADE_TYPE,
        [
            {
                type: "group",
                label: "Group Name",
            },
            DURATION_UNIT,
            DURATION_VALUE,
        ],
        INITIAL_STAKE,
        SIZE,
        PROFIT_THRESHOLD,
        LOSS_THRESHOLD,
    ],
    dalembert: [
        ASSET,
        TRADE_TYPE,
        DURATION_UNIT,
        DURATION_VALUE,
        INITIAL_STAKE,
        UNITS,
        PROFIT_THRESHOLD,
        LOSS_THRESHOLD,
    ],
    oscars: [
        ASSET,
        TRADE_TYPE,
        DURATION_UNIT,
        DURATION_VALUE,
        INITIAL_STAKE,
        UNITS,
        PROFIT_THRESHOLD,
        LOSS_THRESHOLD,
        STREAK_CYCLES,
    ],
    shafin: [
        ASSET,
        [
            {
                type: "group",
                label: "Sample Group Name 1",
            },
            DURATION_UNIT,
            DURATION_VALUE,
            SAMPLE_TEST,
        ],
        SAMPLE_TEST_1,
        STREAK_CYCLES
    ],
};
