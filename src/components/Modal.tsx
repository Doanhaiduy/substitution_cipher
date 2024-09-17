import React from 'react';
import Chart from './Chart';
import DataReplacementContext from '../contexts/DataReplacementContext';

const dataCommon = [
    {
        CharacterFrequency: 'E',
        Percentage: 12.49,
    },
    {
        CharacterFrequency: 'T',
        Percentage: 9.28,
    },
    {
        CharacterFrequency: 'A',
        Percentage: 8.04,
    },
    {
        CharacterFrequency: 'O',
        Percentage: 7.64,
    },
    {
        CharacterFrequency: 'I',
        Percentage: 7.57,
    },
    {
        CharacterFrequency: 'N',
        Percentage: 7.23,
    },
    {
        CharacterFrequency: 'S',
        Percentage: 6.51,
    },
    {
        CharacterFrequency: 'R',
        Percentage: 6.28,
    },
    {
        CharacterFrequency: 'H',
        Percentage: 5.05,
    },
    {
        CharacterFrequency: 'L',
        Percentage: 4.07,
    },
    {
        CharacterFrequency: 'D',
        Percentage: 3.82,
    },
    {
        CharacterFrequency: 'C',
        Percentage: 3.34,
    },
    {
        CharacterFrequency: 'U',
        Percentage: 2.73,
    },
    {
        CharacterFrequency: 'M',
        Percentage: 2.51,
    },
    {
        CharacterFrequency: 'F',
        Percentage: 2.4,
    },
    {
        CharacterFrequency: 'P',
        Percentage: 2.14,
    },
    {
        CharacterFrequency: 'G',
        Percentage: 1.87,
    },
    {
        CharacterFrequency: 'W',
        Percentage: 1.68,
    },
    {
        CharacterFrequency: 'Y',
        Percentage: 1.66,
    },
    {
        CharacterFrequency: 'B',
        Percentage: 1.48,
    },
    {
        CharacterFrequency: 'V',
        Percentage: 1.05,
    },
    {
        CharacterFrequency: 'K',
        Percentage: 0.54,
    },
    {
        CharacterFrequency: 'X',
        Percentage: 0.23,
    },
    {
        CharacterFrequency: 'J',
        Percentage: 0.16,
    },
    {
        CharacterFrequency: 'Q',
        Percentage: 0.12,
    },
    {
        CharacterFrequency: 'Z',
        Percentage: 0.09,
    },
];

type Props = {
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const Modal = (props: Props) => {
    const { Data } = React.useContext(DataReplacementContext);

    const { visible, setVisible } = props;
    console.log(visible);

    const dataConvert = Data.map((item) => ({
        CharacterFrequency: item.CharacterFrequency,
        Percentage: parseFloat(
            (
                (parseInt(item.CharacterFrequencyCount) /
                    Data.reduce((acc, cur) => acc + parseInt(cur.CharacterFrequencyCount), 0)) *
                100
            ).toFixed(2)
        ),
    }));
    return (
        <div
            className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'
            style={{ display: visible ? 'flex ' : 'none' }}
        >
            <div className='relative w-11/12 h-5/6 bg-white rounded-md overflow-y-scroll'>
                <div className='flex justify-between items-center p-4 border-b'>
                    <h2 className='text-xl font-semibold'>Biểu đồ trực quan</h2>
                    <button className='text-xl font-semibold' onClick={() => setVisible(false)}>
                        &times;
                    </button>
                </div>
                <div className='p-4 flex justify-center items-center gap-5 lg:flex-row flex-col '>
                    <Chart data={dataCommon} title='Biểu đồ tần suất xuất hiện của các ký tự trong tiếng Anh' />
                    {dataConvert.length > 0 ? (
                        <Chart data={dataConvert} title='Biểu đồ tần số xuất hiện của các ký tự của bạn' />
                    ) : (
                        <p className='text-center'>Không có dữ liệu</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Modal;
