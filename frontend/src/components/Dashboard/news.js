import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux'
import { thunkCreateNews } from "../../store/news";
import { useNavigate } from 'react-router-dom';


export default function AdminNews() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [disabled, setDisabled] = useState(true);

    useEffect(() => {
        if (title && body) {
            setDisabled(false)
        } else {
            setDisabled(true)
        }
    }, [title, body])

    const handleSubmit = () => {
        const article = new FormData();

        article.append('title', title)
        article.append('body', body)

        dispatch(thunkCreateNews(article));
        navigate('/');
        return;
    }

    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-3">
                <h1 className="text-xl leading-6 text-gray-900 font-bold">New Announcement</h1>
                <p className="text-sm text-gray-500">Please enter your announcement details below.</p>
            </div>
            <form onSubmit={() => handleSubmit()} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1 my-2">
                    <label className='text-xs ml-1 font-bold'>Headline</label>
                    <input
                        type="title"
                        id="title"
                        name="title"
                        className="p-2 border border-gray-300 rounded-md w-full"
                        placeholder='e.g. "Soccer fields temporarily closed"'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className='flex flex-col gap-1 my-2'>
                    <label className='text-xs ml-1 font-bold'>Description</label>
                    <textarea
                        id="description"
                        name="description"
                        className="mb-2 p-2 border border-gray-300 rounded-md w-full"
                        placeholder='Briefly describe your announcement...'
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                    />
                </div>
                <div className='flex justify-center'>
                    <button
                        type='submit'
                        disabled={disabled}
                        className={`mt-4 py-3 px-7 text-white bg-cyan-500 rounded-lg active:bg-cyan-600 ${disabled ? 'cursor-not-allowed bg-slate-400' : ''}`}
                    >
                        Post
                    </button>
                </div>
            </form>
        </div>
    )
}
