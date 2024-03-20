import { useSelector } from "react-redux";
import { useState } from "react";
import defaultImage from './default-profile.jpeg';

export default function ManageAccount() {
    const user = useSelector(state => state.session.user.user) || {};

    const [editName, setEditName] = useState(false);
    const [name, setName] = useState(user.name);
    const [editEmail, setEditEmail] = useState(false);
    const [email, setEmail] = useState(user.email);

    return (
        <div>
            <div className="flex flex-col md:flex-row items-start">
                <div className="w-full md:w-1/3 flex flex-col gap-2 mb-6 md:mr-6">
                    <h2 className="text-sm font-bold">Profile Picture</h2>
                    <div className="w-full flex justify-center py-2">
                        {user.image ?
                            <img src={null} alt="" className="rounded-full w-72" />
                            :
                            <img src={defaultImage} alt="Profile Picture" className="rounded-full w-48 mx-auto" />
                        }
                    </div>
                </div>
                <div className="flex flex-col w-full h-100 gap-6 md:ml-8">
                    <div className="flex flex-col gap-2">
                        <div className="min-w-48">
                            <h2 className="text-sm font-bold">Name</h2>
                        </div>
                        <div className="flex gap-2 items-center">
                            {!editName ?
                                <h1 className="text-lg md:text-xl">{user.name}</h1>
                                :
                                <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="px-2 py-1 border rounded-lg text-lg md:text-xl w-full" />
                            }
                            <button onClick={() => setEditName(!editName)} className={`rounded-lg py-1 px-2 ${editName ? 'hover:text-red-500' : 'hover:text-green-500'}`}>
                                {!editName ?
                                    <i className="fa-solid fa-pen-to-square"></i>
                                    :
                                    <i className="fa-solid fa-xmark"></i>
                                }
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="min-w-48">
                            <h2 className="text-sm font-bold">Email</h2>
                        </div>
                        <div className="flex gap-2 items-center">
                            {!editEmail ?
                                <h1 className="text-lg md:text-xl">{user.email}</h1>
                                :
                                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} className="px-2 py-1 border rounded-lg text-lg md:text-xl w-full" />
                            }
                            <button onClick={() => setEditEmail(!editEmail)} className={`rounded-lg py-1 px-2 ${editEmail ? 'hover:text-red-500' : 'hover:text-green-500'}`}>
                                {!editEmail ?
                                    <i className="fa-solid fa-pen-to-square"></i>
                                    :
                                    <i className="fa-solid fa-xmark"></i>
                                }
                            </button>
                        </div>
                        <div className="mt-8">
                            {(name !== user.name || email !== user.email) && (
                                <div>
                                    <button onClick={() => null} className="px-5 py-2 rounded-lg bg-green-600 text-white hover:bg-green-500">
                                        Save
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
