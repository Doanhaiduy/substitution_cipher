import React from 'react';
import StatisticalTable from '../components/StatisticalTable';
import DataReplacementContext from '../contexts/DataReplacementContext';

type Props = {};

const SubstitutionCipher = (props: Props) => {
    const [text, setText] = React.useState('');
    const [cipherText, setCipherText] = React.useState('');

    const { Data, setData } = React.useContext(DataReplacementContext);
    const [selectionStart, setSelectionStart] = React.useState<number | null>(null);
    const [selectionEnd, setSelectionEnd] = React.useState<number | null>(null);

    const StaticsText = (text: string) => {
        if (text.length === 0) {
            alert('Vui lòng nhập dữ liệu');
            return;
        }

        if (!/^[a-zA-Z\s]*$/.test(text)) {
            alert('Định dạng không hợp lệ');
            return;
        }

        const frequency = new Map<string, number>();

        for (let i = 0; i < text.length; i++) {
            if (text[i] === ' ') continue;

            if (frequency.has(text[i])) {
                frequency.set(text[i], frequency.get(text[i])! + 1);
            } else {
                frequency.set(text[i], 1);
            }
        }
        const tempData = Array.from(frequency).map(([key, value]) => ({
            CharacterFrequency: key,
            CharacterFrequencyCount: value.toString(),
            CharacterReplacement: '',
            hasReplace: false,
        }));
        tempData.sort((a, b) => parseInt(b.CharacterFrequencyCount) - parseInt(a.CharacterFrequencyCount));

        setData(tempData);
    };

    const HandleSubstitutionCipher = () => {
        if (Data.length === 0) {
            alert('Vui lòng thống kê trước khi phá mã');
            return;
        }

        const tempData = [...Data];
        const listIndexSpace = text
            .split('')
            .map((item, index) => (item === ' ' ? index : -1))
            .filter((item) => item !== -1);
        let cipherTextEmpty = text.replace(/./g, '-');

        listIndexSpace.forEach((index) => {
            cipherTextEmpty = cipherTextEmpty.substring(0, index) + ' ' + cipherTextEmpty.substring(index + 1);
        });

        console.log(cipherTextEmpty);

        for (let i = 0; i < tempData.length; i++) {
            if (tempData[i].hasReplace) {
                for (let j = 0; j < text.length; j++) {
                    if (text[j] === tempData[i].CharacterFrequency) {
                        cipherTextEmpty =
                            cipherTextEmpty.substring(0, j) +
                            tempData[i].CharacterReplacement +
                            cipherTextEmpty.substring(j + 1);
                    }
                }
            }
        }
        setCipherText(cipherTextEmpty);
    };

    const HandleStatistical = () => {
        StaticsText(text);
        setCipherText(text);
    };

    const handleCipherTextSelect = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setSelectionStart(event.target.selectionStart);
        setSelectionEnd(event.target.selectionEnd);
    };

    const getHighlightedText = (text: string) => {
        if (selectionStart !== null && selectionEnd !== null && selectionStart !== selectionEnd) {
            return (
                <span className='break-words'>
                    {text.slice(0, selectionStart)}
                    <span className='bg-yellow-300 break-words'>{text.slice(selectionStart, selectionEnd)}</span>
                    {text.slice(selectionEnd)}
                </span>
            );
        }
        return <span className='break-words'>{text}</span>;
    };

    return (
        <div className='flex justify-between h-screen gap-x-5 p-5 max-w-[1200px] '>
            <div className='w-1/2 flex flex-col items-center p-2'>
                <h2 className='mb-3 text-2xl font-semibold leading-tight self-start'>Trình phá mã thay thế</h2>
                <div>
                    <textarea
                        cols={50}
                        rows={10}
                        name=''
                        id=''
                        className='border-2 border-gray-300 p-2 rounded-lg uppercase break-words'
                        value={text}
                        onChange={(e) => {
                            setData([]);
                            setText(e.target.value);
                            setCipherText('');
                        }}
                    ></textarea>
                </div>
                <div className='flex gap-2 justify-around my-4'>
                    <p
                        onClick={HandleStatistical}
                        className='px-2 py-1 bg-blue-600 text-white rounded-lg min-w-[120px] text-center hover:opacity-80 cursor-pointer select-none'
                    >
                        Thống kê
                    </p>
                    <p
                        onClick={HandleSubstitutionCipher}
                        className='px-2 py-1 bg-blue-600 text-white rounded-lg min-w-[120px] text-center hover:opacity-80 cursor-pointer select-none'
                    >
                        Phá mã
                    </p>
                </div>
                {text.length > 0 && (
                    <div className='border-2 border-gray-300 p-2 rounded-lg mb-2 max-w-[80%]'>
                        {getHighlightedText(text)}
                    </div>
                )}

                <div>
                    <textarea
                        cols={50}
                        rows={10}
                        name=''
                        id=''
                        className='border-2 border-gray-300 p-2 rounded-lg text-red-600 '
                        value={cipherText}
                        readOnly
                        onSelect={handleCipherTextSelect}
                    ></textarea>
                </div>
            </div>
            <div className='w-1/2'>
                <StatisticalTable />
            </div>
            {/* copyright */}
        </div>
    );
};

export default SubstitutionCipher;
