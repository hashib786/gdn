import { useFrappeAuth, useFrappeGetDoc, useFrappeGetDocList } from "frappe-react-sdk";

function App() {
	const {
		currentUser,
		isValidating,
		isLoading,
		login,
		logout,
		error,
		updateCurrentUser,
		getUserCookie,
	} = useFrappeAuth();

	if (isLoading) return <div>loading...</div>;
	// window.getUserCookie = getUserCookie;
	// console.log({ getUserCookie });
	// const { data, mutate } = useFrappeGetDocList(
	// 	'User',
	// 	{
	// 		/** Fields to be fetched - Optional */
	// 		fields: ['name', 'creation'],
	// 		/** Filters to be applied - SQL AND operation */
	// 		filters: [['creation', '>', '2021-10-09']],
	// 		/** Filters to be applied - SQL OR operation */
	// 		orFilters: [],
	// 		/** Fetch from nth document in filtered and sorted list. Used for pagination  */
	// 		limit_start: 5,
	// 		/** Number of documents to be fetched. Default is 20  */
	// 		limit: 10,
	// 		/** Sort results by field and order  */
	// 		orderBy: {
	// 			field: 'creation',
	// 			order: 'desc',
	// 		},
	// 		/** Fetch documents as a dictionary */
	// 		asDict: false,
	// 	}
	// );

	// console.log({ data, error, isValidating, mutate })

	// const { data, } = useFrappeGetDoc(
	// 	'User',
	// 	'Administrator',
	// );
	const { data} = useFrappeGetDocList('User');
	console.log({ data });

	// render user
	return (
		<div className="flex flex-col items-center justify-center h-screen">
			{currentUser}
			<button onClick={() => login('administrator', 'admin')}>Login</button>
			<button onClick={logout}>Logout</button>
			<button onClick={updateCurrentUser}>Fetch current user</button>
		</div>
	);
}

export default App
