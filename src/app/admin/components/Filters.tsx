import React from 'react';
import { Input, Select } from 'antd';

const { Option } = Select;

interface FiltersProps {
    searchText: string;
    setSearchText: (text: string) => void;
    statusFilter?: string | undefined;
    setStatusFilter?: (status: string | undefined) => void;
    status?: boolean;
    text: string;
}

const Filters: React.FC<FiltersProps> = ({
    searchText,
    setSearchText,
    statusFilter,
    setStatusFilter,
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
        </div>
    );
};

export default Filters;
