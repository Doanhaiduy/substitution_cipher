import React from 'react';
import { Data, OtherData } from '../components/StatisticalTable';

const DataReplacementContext = React.createContext<{
    Data: Data;
    DataSecondary: OtherData;
    DataThird: OtherData;
    setData: React.Dispatch<React.SetStateAction<Data>>;
    setDataSecondary: React.Dispatch<React.SetStateAction<OtherData>>;
    setDataThird: React.Dispatch<React.SetStateAction<OtherData>>;
}>({
    Data: [],
    DataSecondary: [],
    DataThird: [],
    setData: () => {},
    setDataSecondary: () => {},
    setDataThird: () => {},
});

export const DataReplacementProvider = ({ children }: { children: React.ReactNode }) => {
    const [Data, setData] = React.useState<Data>([]);
    const [DataSecondary, setDataSecondary] = React.useState<OtherData>([]);
    const [DataThird, setDataThird] = React.useState<OtherData>([]);

    return (
        <DataReplacementContext.Provider
            value={{ Data, setData, DataSecondary, setDataSecondary, DataThird, setDataThird }}
        >
            {children}
        </DataReplacementContext.Provider>
    );
};

export default DataReplacementContext;
