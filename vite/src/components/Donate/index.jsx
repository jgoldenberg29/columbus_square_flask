
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
            <div className='flex flex-col md:flex-row justify-center align-center gap-10 py-10'>
                <div className='hidden md:flex flex-col justify-center align-center h-100'>
                    <h2 className='text-center py-8'>
                        Scan the QR code below to visit our PayPal on mobile.
                    </h2>
                    <div className='flex justify-center w-full'>
                        <div className='rounded-lg border h-60 w-60 border-gray-400' />
                    </div>
                </div>
                <div className='hidden md:flex flex-col items-center justify-center'>
                    <div className='border-l border-gray-300 h-60'></div>
                    <div className='bg-white px-6 py-2'>OR</div>
                    <div className='border-l border-gray-300 h-60'></div>
                </div>
                <div className='flex flex-col align-center justify-center h-100'>
                    <h2 className='text-center py-8'>
                        Click the link below to visit our PayPal on browser.
                    </h2>
                    <div className='flex justify-center w-full'>
                        <button onClick={() => null} className='px-8 py-3 text-white font-bold tracking-wide bg-green-600 rounded flex align-center gap-2 hover:bg-green-500'>
                            <h3 className='text-xl'><i class="fa-brands fa-paypal"></i></h3>
                            <h3 className='text-xl'>PayPal</h3>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
};
