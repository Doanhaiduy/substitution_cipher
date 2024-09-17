import React from 'react';
import DataReplacementContext from '../contexts/DataReplacementContext';

export type Data = {
    CharacterFrequency: string;
    CharacterFrequencyCount: string;
    CharacterReplacement: string;
    hasReplace: boolean;
}[];

type Props = {
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const StatisticalTable = (props: Props) => {
    const { Data, setData } = React.useContext(DataReplacementContext);
    const { visible, setVisible } = props;

    const HandleChangeValue = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const tempData = [...Data];
        tempData[index].CharacterReplacement = e.target.value;
        tempData[index].hasReplace = e.target.value !== '';
        setData(tempData);
    };

    return (
        <div className='p-2 rounded-md sm:p-4 dark:text-gray-800 dark:bg-gray-50'>
            <div className='flex justify-between items-center'>
                <h2 className='mb-3 text-2xl font-semibold leading-tight'>Thống kê</h2>
                <p
                    onClick={() => setVisible(!visible)}
                    className='px-2 py-1 text-white bg-blue-600 rounded-lg cursor-pointer hover:opacity-80'
                >
                    Xem biểu đồ
                </p>
            </div>
            <div className='overflow-x-auto rounded-md'>
                <table className='min-w-full text-md rounded-md'>
                    <thead className='rounded-t-lg dark:bg-gray-300'>
                        <tr className='text-right'>
                            <th title='Chữ' className='p-3 text-center'>
                                Chữ
                            </th>
                            <th title='Tần số' className='p-3 text-center'>
                                Tần số
                            </th>
                            <th title='Thay' className='p-3 text-center'>
                                Thay
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {Data?.map((item, index) => (
                            <tr
                                key={index}
                                className='text-right border-b border-opacity-20 dark:border-gray-300 dark:bg-gray-100 hover:bg-gray-200'
                            >
                                <td className='px-3 py-1 text-center'>{item.CharacterFrequency}</td>
                                <td className='px-3 py-1 text-center'>{item.CharacterFrequencyCount}</td>
                                <td className='px-3 py-1 text-center'>
                                    <input
                                        type='text'
                                        value={item.CharacterReplacement}
                                        className='max-w-[40px] text-center cursor-pointer rounded-md'
                                        onChange={(e) => {
                                            if (e.target.value.length > 1) return;
                                            if (!/^[a-zA-Z\s]*$/.test(e.target.value)) return;
                                            HandleChangeValue(e, index);
                                        }}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default StatisticalTable;
