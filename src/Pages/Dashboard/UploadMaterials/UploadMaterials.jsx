import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import LoadingSpinner from "../../Shared/LoadingSpinner/LoadingSpinner";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";


const UploadMaterials = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: sessionData = {}, isLoading, } = useQuery({
        queryKey: ['sessionData'],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/session?email=${user.email}`);
            return data;
        }
    });
    if (isLoading) return <LoadingSpinner />;
    console.log(sessionData)


    const filteredSessions = sessionData.filter(session => session.Status === 'Approved');


    return (
        <div>
            <Helmet>
                <title>Upload-Materials | ThinkSync</title>
            </Helmet>
            <div className="my-12">
                <section className="container px-4 mx-auto">
                    <div className="flex items-center gap-x-3">
                        <h2 className="text-lg font-medium text-stone-800 ">Total Materials: {filteredSessions.length}</h2>

                        <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-stone-800 dark:text-blue-400"> users</span>
                    </div>

                    <div className="flex flex-col mt-6">
                        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                                <div className="overflow-hidden border border-stone-200 dark:border-stone-700 md:rounded-lg">
                                    <table className="min-w-full divide-y divide-stone-200 dark:divide-stone-700">
                                        <thead className="bg-stone-50 dark:bg-stone-900">
                                            <tr>
                                                <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-stone-500 dark:text-stone-400">
                                                    <div className="flex items-center gap-x-3">
                                                        <span>Sessions</span>
                                                    </div>
                                                </th>



                                                <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-stone-500 dark:text-stone-400">
                                                    <button className="flex items-center gap-x-2">
                                                        <span>Description</span>

                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                                                        </svg>
                                                    </button>
                                                </th>

                                                <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-stone-500 dark:text-stone-400">Status</th>

                                                <th scope="col" className="relative py-3.5 px-4">
                                                    <span className="sr-only">Edit</span>
                                                </th>
                                            </tr>
                                        </thead>


                                        {/* ..........................................Distruct here................................... */}


                                        {
                                            filteredSessions.map(session => (
                                                <tbody key={session._id} className="bg-white divide-y divide-stone-200 dark:divide-stone-700 dark:bg-stone-900">
                                                    <tr>
                                                        <td className="px-4 py-4 text-sm font-medium text-stone-700 whitespace-nowrap">
                                                            <div className="inline-flex items-center gap-x-3">

                                                                <div className="flex items-center gap-x-2">
                                                                    <div>
                                                                        <h2 className="font-medium text-stone-800 dark:text-white ">{session.title}</h2>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </td>

                                                        <td className="px-4 py-4 text-sm text-stone-500 dark:text-stone-300 whitespace-nowrap">
                                                            {session.description.length > 50 ? `${session.description.substring(0, 50)}...` : session.description}
                                                        </td>

                                                        <td className="px-4 py-4 text-sm text-stone-500 dark:text-stone-300 whitespace-nowrap">{session.Status}</td>

                                                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                            <div className="flex items-center gap-x-6">




                                                                {/* Edit Button */}




                                                                <div className="flex justify-center">

                                                                    <Link to={`/dashboard/upload-selection/${session._id}`}><button className="text-stone-500 transition-colors duration-200 dark:hover:text-yellow-500 dark:text-stone-300 hover:text-yellow-500 focus:outline-none">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5V18a2.25 2.25 0 002.25 2.25h13.5A2.25 2.25 0 0021 18v-1.5M7.5 11.25L12 6.75m0 0l4.5 4.5M12 6.75V15" />
                                                                        </svg>
                                                                    </button></Link>



                                                                </div>

                                                                {/* Delete Button */}

                                                                {/* <button onClick={() => handleDeleteUser(session)} className="text-stone-500 transition-colors duration-200 dark:hover:text-red-500 dark:text-stone-300 hover:text-red-500 focus:outline-none">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                                    </svg>
                                                                </button> */}


                                                            </div>
                                                        </td>
                                                    </tr>

                                                </tbody>
                                            ))
                                        }
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </section >
            </div >
        </div>
    );
};

export default UploadMaterials;

