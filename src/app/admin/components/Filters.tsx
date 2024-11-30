import React from 'react';
import { Input, Select } from 'antd';

const { Option } = Select;

interface FiltersProps {
    searchText: string;
    setSearchText: (text: string) => void;
    statusFilter: string | undefined;
    setStatusFilter: (status: string | undefined) => void;
    totalRange: number[];
    setTotalRange: (range: number[]) => void;
    profitRange: number[];
    setProfitRange: (range: number[]) => void;
    profit: boolean;
    total: boolean;
    status: boolean;
    text: string;
}

const Filters: React.FC<FiltersProps> = ({
    searchText,
    setSearchText,
    statusFilter,
    setStatusFilter,
    totalRange,
    setTotalRange,
    profitRange,
    setProfitRange,
    profit,
    total,
    status,
    text,
}) => {
    return (
        <div style={{ marginBottom: 16 }}>
            <div className='flex flex-row justify-between'>
                {/* Search Input */}
                <Input
                    placeholder={text}
                    value={searchText}
                    onChange={e => setSearchText(e.target.value)}
                    style={{ width: 300, marginBottom: 16 }}
                />

                {/* Status Filter */}
                { 
                    status && 
                    <Select
                        placeholder="Filter by Status"
                        value={statusFilter}
                        onChange={setStatusFilter}
                        style={{ marginBottom: 16, width: 200 }}
                    >
                        <Option value="">All</Option>
                        <Option value="Shipped">Shipped</Option>
                        <Option value="Processing">Processing</Option>
                        <Option value="Cancelled">Cancelled</Option>
                        {/* Add other statuses as needed */}
                    </Select>
                }
            </div>

            {/* Total Range Filter */}
            {
                total &&
                <Input.Group compact style={{ marginBottom: 16 }}>
                    <Input
                        style={{ width: '50%' }}
                        placeholder="Min Total"
                        type="number"
                        onChange={e => setTotalRange([+e.target.value, totalRange[1]])}
                    />
                    <Input
                        style={{ width: '50%' }}
                        placeholder="Max Total"
                        type="number"
                        onChange={e => setTotalRange([totalRange[0], +e.target.value])}
                    />
                </Input.Group>
            }

            {/* Profit Range Filter */}
            {
                profit &&
                <Input.Group compact style={{ marginBottom: 16 }}>
                    <Input
                        style={{ width: '50%' }}
                        placeholder="Min Profit"
                        type="number"
                        onChange={e => setProfitRange([+e.target.value, profitRange[1]])}
                    />
                    <Input
                        style={{ width: '50%' }}
                        placeholder="Max Profit"
                        type="number"
                        onChange={e => setProfitRange([profitRange[0], +e.target.value])}
                    />
                </Input.Group>
            }
        </div>
    );
};

export default Filters;
