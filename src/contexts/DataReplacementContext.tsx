import React from 'react';
import { Data } from '../components/StatisticalTable';

const DataReplacementContext = React.createContext<{
    Data: Data;
    setData: React.Dispatch<React.SetStateAction<Data>>;
}>({
    Data: [],
    setData: () => {},
});

export const DataReplacementProvider = ({ children }: { children: React.ReactNode }) => {
    const [Data, setData] = React.useState<Data>([]);

    return <DataReplacementContext.Provider value={{ Data, setData }}>{children}</DataReplacementContext.Provider>;
};

export default DataReplacementContext;
