
import { useEffect } from 'react';
import { useNavigation } from '../../context/navigation'


export default function Donate() {
    const { setPage } = useNavigation();

    useEffect(() => {
        setPage('donate')
    }, [])

    return (
        <div className='w-full h-screen flex justify-center items-center'>
            <h1>Help me I'm poor</h1>
        </div>
    )
};
