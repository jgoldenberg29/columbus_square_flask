
import { useEffect } from 'react';
import { useNavigation } from '../../context/navigation'


export default function Donate() {
    const { setPage } = useNavigation();

    useEffect(() => {
        setPage('donate')
    }, [])

    return (
        <div className='px-4 md:w-4/5 mx-auto mb-20'>
            <h1 className='text-3xl pb-3 border-b border-gray-300'>Donate</h1>
        </div>
    )
};
