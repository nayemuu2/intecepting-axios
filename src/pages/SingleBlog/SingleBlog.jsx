import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import comment from '../../assets/icons/comment.svg';
import heartFilled from '../../assets/icons/heart-filled.svg';
import heart from '../../assets/icons/heart.svg';
import like from '../../assets/icons/like.svg';
import likeFill from '../../assets/icons/likeFill.svg';
import Footer from '../../components/reusable/Footer/Footer';
import Loader from '../../components/reusable/Loader/Loader';
import Navbar from '../../components/reusable/Navbar/Navbar';
import { useAuth } from '../../hooks/useAuth';
import useAxios from '../../hooks/useAxios';
import { useProfile } from '../../hooks/useProfile';
import { formatReadableTime } from '../../utils/formatReadableTime';
import { errorToastMessage } from '../../utils/toastifyUtils';
import CommentForm from './Comments/CommentForm';
import SingleComment from './Comments/SingleComment';

function SingleBlog() {
  const { id } = useParams();

  const { auth, setAuth } = useAuth();
  const { state, dispatch } = useProfile();
  const { api } = useAxios();
  const { profile } = useProfile();

  // console.log('id = ', id);

  const [apiResponse, setApiResponse] = useState({
    isLoading: false,
    isError: false,
    error: '',
    isSuccess: false,
    data: null,
  });

  const commentSectionRef = useRef();

  const handleScrollTocommentSection = () => {
    commentSectionRef.current.scrollIntoView({
      behavior: 'smooth',
    });
  };

  // console.log('apiResponse = ', apiResponse);
  let isLiked = false;

  if (apiResponse?.data?.likes && profile?.id) {
    console.log('apiResponse = ', apiResponse.data.likes);
    isLiked = apiResponse.data.likes.find(
      (likedBy) => likedBy.id === profile.id
    );
  }

  const fetchData = async () => {
    try {
      const response = await api.get(`/blogs/${id}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      setApiResponse({
        ...apiResponse,
        isLoading: false,
        isSuccess: true,
        data: response.data,
      });

      // console.log('data = ', response.data);
    } catch (error) {
      setApiResponse({ ...apiResponse, isLoading: false });
      if (error?.message) {
        errorToastMessage(error.message);
      } else {
        errorToastMessage('SomeThing Went Wrong');
      }
    }
  };

  const handleToggleFevourite = async () => {
    try {
      const response = await api.patch(`/blogs/${id}/favourite`, {});

      // console.log('data =', response.data);

      fetchData();
    } catch (error) {
      if (error?.message) {
        errorToastMessage(error.message);
      } else {
        errorToastMessage('SomeThing Went Wrong');
      }
    }
  };

  const handleLike = async () => {
    try {
      const response = await api.post(`/blogs/${id}/like`, {});

      // console.log('data =', response.data);

      fetchData();
    } catch (error) {
      if (error?.message) {
        errorToastMessage(error.message);
      } else {
        errorToastMessage('SomeThing Went Wrong');
      }
    }
  };

  useEffect(() => {
    setApiResponse({
      isLoading: true,
      isError: false,
      error: '',
      isSuccess: false,
      data: null,
    });

    fetchData();
  }, []);

  let content = null;

  // if (apiResponse.data) {
  //   console.log('apiResponse.data = ', apiResponse.data);
  // }

  if (apiResponse.isLoading) {
    content = <Loader />;
  }
  if (apiResponse.isSuccess && apiResponse.data) {
    content = (
      <>
        <main>
          {/* <!-- Begin Blogs --> */}
          <section>
            <div className="container text-center py-8">
              <h1 className="font-bold text-3xl md:text-5xl">
                {apiResponse.data.title}
              </h1>
              <div className="flex justify-center items-center my-4 gap-4">
                <div className="flex items-center capitalize space-x-2">
                  {apiResponse.data.author.avatar ? (
                    <img
                      src={`${
                        import.meta.env.VITE_REACT_APP_BASE_URL
                      }/uploads/avatar/${apiResponse.data.author.avatar}`}
                      className="object-cover avater-img"
                    />
                  ) : (
                    <div className="avater-img bg-indigo-600 text-white">
                      {apiResponse.data.author.firstName[0]}
                    </div>
                  )}
                  <h5 className="text-slate-500 text-sm">{`${apiResponse.data.author.firstName} ${apiResponse.data.author.lastName}`}</h5>
                </div>
                <span className="text-sm text-slate-700 dot">
                  {formatReadableTime(apiResponse.data.createdAt)}
                </span>
                <span className="text-sm text-slate-700 dot">{`${apiResponse.data.likes.length} Likes`}</span>
              </div>
              <img
                className="mx-auto w-full md:w-8/12 object-cover h-80 md:h-96"
                src={`${import.meta.env.VITE_REACT_APP_BASE_URL}/uploads/blog/${
                  apiResponse.data.thumbnail
                }`}
                alt=""
              />

              {/* <!-- Tags --> */}

              {apiResponse.data.tags && (
                <ul className="tags">
                  {apiResponse.data.tags.split(',').map((keyword, index) => (
                    <li key={index}> {keyword.trim()}</li>
                  ))}
                </ul>
              )}

              {/* <!-- Content --> */}
              <div className="mx-auto w-full md:w-10/12 text-slate-300 text-base md:text-lg leading-8 py-2 !text-left">
                {apiResponse.data.content}
              </div>

              {/* <div className="mx-auto w-full md:w-10/12 text-slate-300 text-base md:text-lg leading-8 py-2 !text-left">
                Today I was mob programming with Square's Mobile & Performance
                Reliability team and we toyed with an interesting idea. Our
                codebase has classes that represent screens a user can navigate
                to. These classes are defined in modules, and these modules have
                an owner team defined. When navigating to a screen, we wanted to
                have the owner team information available, at runtime. We
                created a build tool that looks at about 1000 Screen classes,
                determines the owner team, and generates a class to do the
                lookup at runtime. The generated code looked like this:
                <br />
                mapOf(vararg pairs: Pair) is a nice utility to create a map
                (more specifically, a LinkedHashMap) but using that syntax leads
                to the creation of a temporary vararg array of size 1000, as
                well as 1000 temporary Pair instances. Memory hoarding Let's
                look at the retained size of the map we just created: ~30
                characters per class name * 2 bytes per character = 60 bytes per
                entry Each entry is stored as a LinkedHashMapEntry which adds 2
                references to HashMap.Node which itself holds 3 references and 1
                int. On a 64bit VM that's 5 references * 8 bytes, plus 4 bytes
                for the int: 44 bytes per entry. So for the entries alone we're
                at (60 + 44) * 1000 = 104 KB. The default load factor is 75%,
                which means the size of the array backing the hashmap must
                always be at least 25% greater than the number of entries. And
                the array size has to be a factor of 2. So, for 1000 entries,
                that's an object array of size 2048: 2048 * 8 = 16,314 bytes.
                The total retained size of the map is ~120 KB. Can we do better?
                Could we make it... 0?
                <h2 className="font-bold text-3xl mt-4">100% code-based map</h2>
                What if we generate code that returns the right team for a given
                screen, instead of creating a map? Since we know the full list
                of screen classes, we can check ahead of time whether there's
                any hashcode conflict, and if not, we can generate code that
                directly
              </div> */}
            </div>
          </section>
          {/* <!-- End Blogs --> */}

          {/* <!-- Begin Comments --> */}
          <section id="comments" ref={commentSectionRef}>
            <div className="mx-auto w-full md:w-10/12 container">
              <h2 className="text-3xl font-bold my-8">
                Comments ({apiResponse.data.comments.length})
              </h2>

              {auth?.accessToken ? (
                <CommentForm id={id} fetchData={fetchData} />
              ) : (
                <></>
              )}

              {apiResponse.data.comments.length &&
                apiResponse.data.comments.map((comment, index) => (
                  <SingleComment
                    comment={comment}
                    key={index}
                    id={id}
                    fetchData={fetchData}
                  />
                ))}
            </div>
          </section>
        </main>
        {/* <!-- End main --> */}

        {/* <!-- Floating Actions--> */}
        <div className="floating-action">
          <ul className="floating-action-menus">
            <li>
              {isLiked ? (
                <span onClick={handleLike}>
                  <img src={likeFill} alt="like" />
                </span>
              ) : (
                <span onClick={handleLike}>
                  <img src={like} alt="like" />
                </span>
              )}

              <span>{apiResponse.data.likes.length}</span>
            </li>

            <li>
              {/* <!-- There is heart-filled.svg in the icons folder --> */}
              <span onClick={handleToggleFevourite}>
                <img
                  src={apiResponse.data.isFavourite ? heartFilled : heart}
                  alt="Favourite"
                />
              </span>
            </li>
            <div onClick={handleScrollTocommentSection}>
              <li>
                <img src={comment} alt="Comments" />
                <span>{apiResponse.data.comments.length}</span>
              </li>
            </div>
          </ul>
        </div>
      </>
    );
  }

  return (
    <div>
      <Navbar />

      {content}
      <ToastContainer />
      <Footer />
    </div>
  );
}

export default SingleBlog;
