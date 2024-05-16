import './Loader.css';

function Loader() {
  return (
    <div className="flex justify-center">
      <div className="flex gap-2 items-center">
        Loading
        <div className="loader"></div>
      </div>
    </div>
  );
}

export default Loader;
