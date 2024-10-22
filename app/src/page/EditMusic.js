import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const EditMusic = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const music = location.state.music;

  const [formData, setFormData] = useState({
    title: music?.title || '',
    yearOfRelease: music?.yearOfRelease || '',
  });

  const [artistsData, setArtistsData] = useState(music?.artists || []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleArtistChange = (index, value) => {
    const newArtists = [...artistsData];
    newArtists[index] = value;
    setArtistsData(newArtists);
  };

  const handleAddArtist = () => {
    setArtistsData((prev) => [...prev, '']); 
  };

  const handleSubmit = async (e) => {
    
    e.preventDefault();
    try {
      const updateData = {
        title: formData.title,
        yearOfRelease: formData.yearOfRelease,
        artists: artistsData,
      };
  
      await fetch(`http://localhost:3001/music/${music.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });
  
      navigate('/');
    } catch (error) {
      console.error('Error updating music:', error);
    }
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Edit Music: {music?.title}
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">Title</label>
            <div className="mt-2">
              <input
                id="title"
                name="title"
                type="text"
                value={formData.title}
                onChange={handleChange}
                required
                className="block w-full rounded-md border-0 py-1.5"
              />
            </div>
          </div>

          <div>
            <label htmlFor="yearOfRelease" className="block text-sm font-medium leading-6 text-gray-900">Year of Release</label>
            <div className="mt-2">
              <input
                id="yearOfRelease"
                name="yearOfRelease"
                type="text"
                value={formData.yearOfRelease}
                onChange={handleChange}
                required
                className="block w-full rounded-md border-0 py-1.5"
              />
            </div>
          </div>

          <label className="block text-sm font-medium leading-6 text-gray-900">Artists</label>
          {artistsData.map((artist, index) => (
            <div className="mt-2" key={index}>
              <input
                type="text"
                value={artist}
                onChange={(e) => handleArtistChange(index, e.target.value)}
                required
                className="block w-full rounded-md border-0 py-1.5"
              />
            </div>
          ))}
          
          <button type="button" onClick={handleAddArtist} className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white">
            Add Artist
          </button>

          <div>
            <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white">
              Update Music
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditMusic;
