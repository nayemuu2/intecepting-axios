import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import useAxios from '../../../hooks/useAxios';
import { useProfile } from '../../../hooks/useProfile';
import {
  errorToastMessage,
  successToastMessage,
} from '../../../utils/toastifyUtils';

function CommentForm({ id, fetchData }) {
  const [comment, setComment] = useState('');
  const [apiRequestStatus, setApiRequestStatus] = useState(false);

  const { auth, setAuth } = useAuth();
  const { profile, setProfile } = useProfile();
  const { api } = useAxios();

  const postComment = async () => {
    try {
      const response = await api.post(`/blogs/${id}/comment`, {
        content: comment,
      });

      // console.log('data =', response.data);
      successToastMessage('Comment successfull');
      setComment('');
      fetchData();
    } catch (error) {
      // console.dir('error = ', error);
      if (error?.response?.data?.error) {
        errorToastMessage(error.response.data.error);
      } else if (error?.message) {
        errorToastMessage(error.message);
      } else {
        errorToastMessage('SomeThing Went Wrong');
      }
    } finally {
      setApiRequestStatus(false);
    }
  };

  useEffect(() => {
    if (apiRequestStatus) {
      postComment();
    }
  }, [apiRequestStatus]);

  const handleComment = () => {
    // console.log('comment = ', comment);

    if (!auth?.accessToken) {
      return errorToastMessage('Please Log in First');
    }

    if (comment.trim().length === 0) {
      return errorToastMessage('You did not write anything');
    }

    setApiRequestStatus(true);
  };

  return (
    <div className="flex items -center space-x-4">
      <div className="avater-img bg-indigo-600 text-white">
        {profile?.avatar ? (
          <img
            src={`${import.meta.env.VITE_REACT_APP_BASE_URL}/uploads/avatar/${
              profile.avatar
            }`}
            className="object-cover avater-img"
          />
        ) : (
          <span className="">{profile?.firstName[0]}</span>
        )}
      </div>
      <div className="w-full">
        <textarea
          className="w-full bg-[#030317] border border-slate-500 text-slate-300 p-4 rounded-md focus:outline-none"
          placeholder="Write a comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>
        <div className="flex justify-end mt-4">
          <button
            className="bg-indigo-600 text-white px-6 py-2 md:py-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
            onClick={handleComment}
            disabled={apiRequestStatus}
          >
            Comment
          </button>
        </div>
      </div>
    </div>
  );
}

export default CommentForm;
