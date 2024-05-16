import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import threeDot from '../../../assets/icons/3dots.svg';
import deleteIcon from '../../../assets/icons/delete.svg';
import edit from '../../../assets/icons/edit.svg';
import { formatReadableTime } from '../../../utils/formatReadableTime';

function BlogCard({ blog }) {
  const [actionButtonsStatus, setActionButtonsStatus] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="blog-card" onClick={() => navigate(`blog/${blog.id}`)}>
      <img
        className="blog-thumb"
        src={`${import.meta.env.VITE_REACT_APP_BASE_URL}/uploads/blog/${
          blog.thumbnail
        }`}
        alt=""
      />
      <div className="mt-2 relative">
        <h3 className="text-slate-300 text-xl lg:text-2xl">{blog.title}</h3>

        <p className="mb-6 text-base text-slate-500 mt-1">{blog.content}</p>

        {/* <!-- Meta Informations --> */}
        <div className="flex justify-between items-center">
          <div className="flex items-center capitalize space-x-2">
            {blog.author.avatar ? (
              <img
                src={`${
                  import.meta.env.VITE_REACT_APP_BASE_URL
                }/uploads/avatar/${blog.author.avatar}`}
                className="object-cover avater-img"
              />
            ) : (
              <div className="avater-img bg-indigo-600 text-white">
                {blog.author.firstName[0]}
              </div>
            )}

            <div>
              <h5 className="text-slate-500 text-sm">{`${blog.author.firstName} ${blog.author.lastName}`}</h5>
              <div className="flex items-center text-xs text-slate-700">
                <span> {formatReadableTime(blog.createdAt)}</span>
              </div>
            </div>
          </div>

          <div className="text-sm px-2 py-1 text-slate-700">
            <span>{`${blog.likes.length} Likes`}</span>
          </div>
        </div>

        {/* <!-- action dot --> */}
        <div className="absolute right-0 top-0">
          <button
            onClick={() => {
              setActionButtonsStatus(!actionButtonsStatus);
            }}
          >
            <img src={threeDot} alt="3dots of Action" />
          </button>

          {/* <!-- Action Menus Popup --> */}
          {actionButtonsStatus && (
            <div className="action-modal-container">
              <button className="action-menu-item hover:text-lwsGreen">
                <img src={edit} alt="Edit" />
                Edit
              </button>
              <button className="action-menu-item hover:text-red-500">
                <img src={deleteIcon} alt="Delete" />
                Delete
              </button>
            </div>
          )}
        </div>
        {/* <!-- action dot ends --> */}
      </div>
    </div>
  );
}

export default BlogCard;
