import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import BlogCard from '../../components/reusable/BlogCard/BlogCard';
import Footer from '../../components/reusable/Footer/Footer';
import Loader2 from '../../components/reusable/Loader2/Loader2';
import Navbar from '../../components/reusable/Navbar/Navbar';
import { errorToastMessage } from '../../utils/toastifyUtils';

function Home() {
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [blogs, setBlogs] = useState([]);
  const loaderRef = useRef(null);

  let limit = 10;

  // console.log('currentPage = ', currentPage);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_REACT_APP_BASE_URL
        }/blogs?page=${currentPage}&limit=${limit}`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      // console.log('response.data = ', response.data);
      setBlogs((previousBlogs) => [...previousBlogs, ...response.data.blogs]);
      // setBlogs([...blogs, ...response.data.blogs]);
      const totalPage = Math.ceil(response.data.total / limit);
      // console.log('totalPage = ', totalPage);
      // console.log('currentPage = ', currentPage);

      if (currentPage < totalPage) {
        setHasMore(true);
      } else {
        setHasMore(false);
      }

      setCurrentPage((previousState) => previousState + 1);
      // console.log('yoo');
    } catch (error) {
      if (error?.response?.data?.error) {
        errorToastMessage(error.response.data.error); // our custom error message
      } else if (error?.message) {
        errorToastMessage(error.message);
      } else {
        errorToastMessage('SomeThing Went Wrong');
      }

      setHasMore(false);
    }
  };

  useEffect(() => {
    const onIntersection = (items) => {
      const loaderItem = items[0];

      if (loaderItem.isIntersecting && hasMore) {
        // console.log('loading is visiable');
        fetchData();
      } else {
        // console.log('loading is not visiable');
      }
    };
    const observer = new IntersectionObserver(onIntersection);

    if (observer && loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [currentPage, hasMore]);

  return (
    <div>
      <Navbar />

      {/* <!-- Search Result --> */}
      {/* <SearchResult /> */}

      <main>
        {/* <!-- Begin Blogs --> */}
        <section>
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
              {/* <!-- Blog Contents --> */}
              <div className="space-y-3 md:col-span-5">
                {blogs?.length ? (
                  blogs.map((blog) => <BlogCard key={blog.id} blog={blog} />)
                ) : (
                  <></>
                )}

                {hasMore && (
                  <div ref={loaderRef}>
                    {blogs?.length ? (
                      <Loader2>loading more data...</Loader2>
                    ) : (
                      <Loader2>loading...</Loader2>
                    )}
                  </div>
                )}
              </div>

              {/* <!-- Sidebar --> */}
              <div className="md:col-span-2 h-full w-full space-y-5">
                <div className="sidebar-card">
                  <h3 className="text-slate-300 text-xl lg:text-2xl font-semibold">
                    Most Popular 👍️
                  </h3>

                  <ul className="space-y-5 my-5">
                    <li>
                      <h3 className="text-slate-400 font-medium hover:text-slate-300 transition-all cursor-pointer">
                        How to Auto Deploy a Next.js App on Ubuntu from GitHub
                      </h3>
                      <p className="text-slate-600 text-sm">
                        by Saad Hasan <span>·</span> 100 Likes
                      </p>
                    </li>

                    <li>
                      <h3 className="text-slate-400 font-medium hover:text-slate-300 transition-all cursor-pointer">
                        How to Auto Deploy a Next.js App on Ubuntu from GitHub
                      </h3>
                      <p className="text-slate-600 text-sm">
                        by Saad Hasan <span>·</span> 100 Likes
                      </p>
                    </li>

                    <li>
                      <h3 className="text-slate-400 font-medium hover:text-slate-300 transition-all cursor-pointer">
                        How to Auto Deploy a Next.js App on Ubuntu from GitHub
                      </h3>
                      <p className="text-slate-600 text-sm">
                        by Saad Hasan <span>·</span> 100 Likes
                      </p>
                    </li>

                    <li>
                      <h3 className="text-slate-400 font-medium hover:text-slate-300 transition-all cursor-pointer">
                        How to Auto Deploy a Next.js App on Ubuntu from GitHub
                      </h3>
                      <p className="text-slate-600 text-sm">
                        by Saad Hasan <span>·</span> 100 Likes
                      </p>
                    </li>
                  </ul>
                </div>

                <div className="sidebar-card">
                  <h3 className="text-slate-300 text-xl lg:text-2xl font-semibold">
                    Your Favourites ❤️
                  </h3>

                  <ul className="space-y-5 my-5">
                    <li>
                      <h3 className="text-slate-400 font-medium hover:text-slate-300 transition-all cursor-pointer">
                        How to Auto Deploy a Next.js App on Ubuntu from GitHub
                      </h3>
                      <p className="text-slate-600 text-sm">
                        #tailwindcss, #server, #ubuntu
                      </p>
                    </li>

                    <li>
                      <h3 className="text-slate-400 font-medium hover:text-slate-300 transition-all cursor-pointer">
                        How to Auto Deploy a Next.js App on Ubuntu from GitHub
                      </h3>
                      <p className="text-slate-600 text-sm">
                        #tailwindcss, #server, #ubuntu
                      </p>
                    </li>

                    <li>
                      <h3 className="text-slate-400 font-medium hover:text-slate-300 transition-all cursor-pointer">
                        How to Auto Deploy a Next.js App on Ubuntu from GitHub
                      </h3>
                      <p className="text-slate-600 text-sm">
                        #tailwindcss, #server, #ubuntu
                      </p>
                    </li>

                    <li>
                      <h3 className="text-slate-400 font-medium hover:text-slate-300 transition-all cursor-pointer">
                        How to Auto Deploy a Next.js App on Ubuntu from GitHub
                      </h3>
                      <p className="text-slate-600 text-sm">
                        #tailwindcss, #server, #ubuntu
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <!-- End Blogs --> */}
      </main>
      {/* <!-- End main --> */}

      <ToastContainer />

      <Footer />
    </div>
  );
}

export default Home;
