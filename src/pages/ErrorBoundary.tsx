
const ErrorBoundary = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-100 to-gray-300">
      <div className="bg-white p-10 rounded-xl shadow-2xl text-center">
        <h1 className="text-5xl font-extrabold text-red-600 mb-6">Oops! Something went wrong</h1>
        <p className="text-gray-800 mb-8">We're sorry, but something went wrong. Please try again later.</p>
        <button
          onClick={() => window.location.href = "/"}
          className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-300"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default ErrorBoundary;