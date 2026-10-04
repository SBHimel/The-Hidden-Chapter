
import { getUsers } from "@/lib/data";

const page = async() => {
    const users = await getUsers();
    return (
        <div>
            <h1>Users {users?.length || 0}</h1>
            <ul>
                {users?.map((user: any) => (
                    <li key={user._id}>{user.name}</li>
                ))}
            </ul>
        </div>
    );
};
export default page;