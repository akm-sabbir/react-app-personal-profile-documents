import { useState} from 'react';
import { useUserFetcher } from './useUserFetch';

const Selects = ({userData, onIdUpdate}) =>(
    <div>
      <select onChange={(e) => onIdUpdate(e.target.value)}>
        <option value="1">User 1</option>
        <option value="2">User 2</option>
      </select>

      {userData ? (
        <h1>{userData.name}</h1>
      ) : (
        <p>Loading...</p>
      )}
  </div>
    );

const Para = ({errData}) =>(
        <p style={{ color: 'red' }}> Error: {errData}</p>
    );

function UserProfile() {
    const [userId, setUserId] = useState(null);
    const { data, loading, error } = useUserFetcher(userId);

    if (loading) return <p>Loading...</p>;

    return (

        <>
        { error ===  null ? <Para errData={error} />:
        <Selects userData={data} onIdUpdate={setUserId} />
        }
        </>
    );
}

export default UserProfile;