import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Loading from './Loading';

const Home = ({userData}) => {
  const navigate = useNavigate();

  const [musicData, setMusicData] = useState([]);
  const [hasMusic, setHasMusic] = useState(false);

  useEffect(() => {
    const fetchMusicData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/music');
        setMusicData(response.data);
        setHasMusic(true);
      } catch (error) {
        console.error('Error fetching music data:', error);
      }
    };

    fetchMusicData();
  }, []);

  const handleEdit = (music) => {
    navigate(`/edit-music/${music.id}`, { state: { music } });
  };

  const handleDelete = async (musicId) => {
    try {
      await axios.delete(`http://localhost:3001/music/${musicId}`); 
      setMusicData((prevData) => prevData.filter((music) => music.id !== musicId)); 
    } catch (error) {
      console.error('Error deleting music:', error);
    }
  };

  if(!hasMusic) return <Loading/>

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <h1>List of latest song in the world</h1>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">Name</th>
            <th scope="col" className="px-6 py-3">Year</th>
            <th scope="col" className="px-6 py-3">Artists</th>
            <th scope="col" className="px-6 py-3"><span className="sr-only">Edit</span></th>
          </tr>
        </thead>
        <tbody>
          {musicData.map((music) => (
            <tr key={music.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {music?.title}
              </th>
              <td className="px-6 py-4">{music?.yearOfRelease}</td>
              <td className="px-6 py-4">
                {music?.artists.map((artist, index) => (
                  <label key={index} style={{ marginRight: '10px' }}>{artist}</label>
                ))}
              </td>

              {userData?.role === "admin" || userData!== null ? <>
              <td className="px-6 py-4 text-right">
                <button
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  onClick={() => handleEdit(music)}
                >
                  Edit
                </button>
              </td>
              <td className="px-6 py-4 text-right">
                <button
                  className="font-medium text-red-600 dark:text-red-500 hover:underline"
                  onClick={() => handleDelete(music.id)}
                >
                  Delete
                </button>
              </td> </>: (<></>)}
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;