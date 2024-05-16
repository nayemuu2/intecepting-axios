import axios from 'axios';
import React, { useState } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { useProfile } from '../../../hooks/useProfile';
import {
  errorToastMessage,
  successToastMessage,
} from '../../../utils/toastifyUtils';

function SingleComment({ id, comment, fetchData }) {
  // console.log('comment = ', comment);
  const { auth, setAuth } = useAuth();
  const { profile, setProfile } = useProfile();

  const [isHovered, setIsHovered] = useState(false);
  const [apiResponse, setApiResponse] = useState({
    isLoading: false,
    isError: false,
    error: '',
    isSuccess: false,
    data: null,
  });

  const deleteComment = async () => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}/blogs/${id}/comment/${
          comment.id
        }`,
        {
          headers: {
            'Content-Type': 'application/json',
            authorization: `Token ${auth.accessToken}`,
          },
        }
      );

      // console.log('data =', response.data);
      successToastMessage('Comment Delete successfull');
      fetchData();
    } catch (error) {
      if (error?.response?.data?.error) {
        errorToastMessage(error.response.data.error); //custom error message
      } else if (error?.message) {
        errorToastMessage(error.message);
      } else {
        errorToastMessage('SomeThing Went Wrong');
      }
    } finally {
      setApiResponse({
        isLoading: false,
        isError: false,
        error: '',
        isSuccess: false,
        data: null,
      });
    }
  };

  const handleDelete = () => {
    if (!apiResponse.isLoading) {
      setApiResponse({
        isLoading: true,
        isError: false,
        error: '',
        isSuccess: false,
        data: null,
      });

      deleteComment();
    }
  };

  return (
    <div className="flex items-start space-x-4 my-8">
      {comment.author.avatar ? (
        <img
          src={`${import.meta.env.VITE_REACT_APP_BASE_URL}/uploads/avatar/${
            comment.author.avatar
          }`}
          className="object-cover avater-img"
        />
      ) : (
        <div className="avater-img bg-orange-600 text-white">
          <span className="">{comment.author.firstName[0]}</span>
        </div>
      )}

      {/* <div className="avater-img bg-orange-600 text-white">
        <span className="">{comment.author.firstName[0]}</span>
      </div> */}
      <div className="w-full">
        <div className="flex gap-1">
          <h5 className="text-slate -500 font-bold">{`${comment.author.firstName} ${comment.author.lastName}`}</h5>
          {comment?.author.id === profile?.id && (
            <div
              className="cursor-pointer"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onClick={handleDelete}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M8.59199 1.875H11.4087C11.5895 1.875 11.747 1.875 11.8953 1.89833C12.1843 1.94462 12.4583 2.05788 12.6956 2.22907C12.933 2.40025 13.1269 2.6246 13.262 2.88417C13.332 3.0175 13.3812 3.16667 13.4387 3.3375L13.5312 3.61667C13.595 3.84347 13.7338 4.04194 13.925 4.17967C14.1161 4.3174 14.3483 4.38626 14.5837 4.375H17.0837C17.2494 4.375 17.4084 4.44085 17.5256 4.55806C17.6428 4.67527 17.7087 4.83424 17.7087 5C17.7087 5.16576 17.6428 5.32473 17.5256 5.44194C17.4084 5.55915 17.2494 5.625 17.0837 5.625H2.91699C2.75123 5.625 2.59226 5.55915 2.47505 5.44194C2.35784 5.32473 2.29199 5.16576 2.29199 5C2.29199 4.83424 2.35784 4.67527 2.47505 4.55806C2.59226 4.44085 2.75123 4.375 2.91699 4.375H5.49199C5.71458 4.36966 5.9296 4.29314 6.10552 4.15667C6.28143 4.02019 6.409 3.83094 6.46949 3.61667L6.56283 3.3375C6.61949 3.16667 6.66866 3.0175 6.73782 2.88417C6.87299 2.6245 7.06707 2.40009 7.30453 2.2289C7.542 2.05771 7.81625 1.9445 8.10532 1.89833C8.25366 1.875 8.41116 1.875 8.59116 1.875M7.50616 4.375C7.56467 4.2604 7.61345 4.1411 7.65199 4.01833L7.73532 3.76833C7.81116 3.54083 7.82866 3.495 7.84616 3.46167C7.89115 3.37501 7.95581 3.30009 8.03497 3.24293C8.11413 3.18577 8.20558 3.14795 8.30199 3.1325C8.41062 3.12332 8.51972 3.12082 8.62866 3.125H11.3703C11.6103 3.125 11.6603 3.12667 11.697 3.13333C11.7933 3.14869 11.8847 3.18639 11.9639 3.2434C12.043 3.30041 12.1077 3.37516 12.1528 3.46167C12.1703 3.495 12.1878 3.54083 12.2637 3.76917L12.347 4.01917L12.3795 4.1125C12.412 4.20417 12.4503 4.29083 12.4928 4.375H7.50616Z"
                  fill={isHovered ? '#e10000' : '#DCE0E4'}
                />
                <path
                  d="M4.92956 7.04167C4.9185 6.87624 4.84219 6.72197 4.7174 6.61281C4.59261 6.50365 4.42957 6.44853 4.26414 6.45958C4.09871 6.47063 3.94445 6.54695 3.83528 6.67174C3.72612 6.79653 3.671 6.95957 3.68206 7.125L4.06872 12.9183C4.13956 13.9867 4.19706 14.85 4.33206 15.5283C4.47289 16.2325 4.71122 16.8208 5.20456 17.2817C5.69706 17.7433 6.30039 17.9425 7.01289 18.035C7.69789 18.125 8.56289 18.125 9.63456 18.125H10.3671C11.4379 18.125 12.3037 18.125 12.9887 18.035C13.7004 17.9425 14.3037 17.7433 14.7971 17.2817C15.2896 16.8208 15.5279 16.2317 15.6687 15.5283C15.8037 14.8508 15.8604 13.9867 15.9321 12.9183L16.3187 7.125C16.3298 6.95957 16.2747 6.79653 16.1655 6.67174C16.0563 6.54695 15.9021 6.47063 15.7366 6.45958C15.5712 6.44853 15.4082 6.50365 15.2834 6.61281C15.1586 6.72197 15.0823 6.87624 15.0712 7.04167L14.6879 12.7917C14.6129 13.9142 14.5596 14.6958 14.4429 15.2833C14.3287 15.8542 14.1704 16.1558 13.9429 16.3692C13.7146 16.5825 13.4029 16.7208 12.8262 16.7958C12.2321 16.8733 11.4487 16.875 10.3229 16.875H9.67789C8.55289 16.875 7.76956 16.8733 7.17456 16.7958C6.59789 16.7208 6.28622 16.5825 6.05789 16.3692C5.83039 16.1558 5.67206 15.8542 5.55789 15.2842C5.44122 14.6958 5.38789 13.9142 5.31289 12.7908L4.92956 7.04167Z"
                  fill={isHovered ? '#e10000' : '#DCE0E4'}
                />
                <path
                  d="M7.85428 8.545C8.01914 8.52848 8.18382 8.5781 8.31211 8.68295C8.44041 8.78781 8.52182 8.93931 8.53844 9.10417L8.95511 13.2708C8.96731 13.4334 8.91551 13.5943 8.81076 13.7192C8.70601 13.8441 8.55659 13.9232 8.39438 13.9395C8.23217 13.9558 8.07001 13.9081 7.94249 13.8065C7.81497 13.705 7.73218 13.5576 7.71178 13.3958L7.29511 9.22917C7.27859 9.0643 7.32821 8.89962 7.43306 8.77133C7.53792 8.64304 7.68942 8.56163 7.85428 8.545ZM12.1459 8.545C12.3106 8.56164 12.462 8.64292 12.5668 8.77103C12.6717 8.89914 12.7214 9.06361 12.7051 9.22834L12.2884 13.395C12.2678 13.5564 12.185 13.7034 12.0576 13.8048C11.9302 13.9061 11.7683 13.9537 11.6064 13.9376C11.4444 13.9214 11.2952 13.8427 11.1904 13.7182C11.0856 13.5937 11.0334 13.4332 11.0451 13.2708L11.4618 9.10417C11.4784 8.93947 11.5597 8.7881 11.6878 8.68327C11.8159 8.57844 11.9812 8.52871 12.1459 8.545Z"
                  fill={isHovered ? '#e10000' : '#DCE0E4'}
                />
              </svg>
            </div>
          )}
        </div>
        <p className="text-slate-300">{comment.content}</p>
      </div>
    </div>
  );
}

export default SingleComment;
