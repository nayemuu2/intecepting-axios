import { useState } from 'react';
import Footer from '../../components/reusable/Footer/Footer';
import Navbar from '../../components/reusable/Navbar/Navbar';

function EditBlog() {
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState('');
  const [content, setContent] = useState('');
  const [coverImage, setCoverImage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('title = ', title);
    console.log('tags = ', tags);
    console.log('content = ', content);
    console.log('coverImage = ', coverImage);
  };

  return (
    <div className="bg-[#030317] text-white">
      <Navbar />

      <main>
        <section>
          <div className="container">
            {/* <!-- Form Input field for creating Blog Post --> */}
            <form onSubmit={handleSubmit} className="createBlog">
              <label className="grid place-items-center bg-slate-600/20 h-[150px] rounded-md my-4">
                <div className="flex items-center gap-4 hover:scale-110 transition-all cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                    />
                  </svg>
                  <p>Upload Your Image</p>

                  <input
                    type="file"
                    className="hidden"
                    accept=".jpg, .png, .webp, .jpeg"
                    onChange={(e) => setCoverImage(e.target.files[0])}
                  />
                </div>
              </label>
              <div className="mb-6">
                <input
                  type="text"
                  id="title"
                  name="title"
                  placeholder="Enter your blog title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div className="mb-6">
                <input
                  type="text"
                  id="tags"
                  name="tags"
                  placeholder="Your Comma Separated Tags Ex. JavaScript, React, Node, Express,"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                />
              </div>

              <div className="mb-6">
                <textarea
                  id="content"
                  name="content"
                  placeholder="Write your blog content"
                  rows="8"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                ></textarea>
              </div>

              <button
                type="submit"
                className="bg-indigo-600 text-white px-6 py-2 md:py-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
              >
                Create Blog
              </button>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default EditBlog;
