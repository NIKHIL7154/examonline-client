


const TestExpired = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-green-50 text-green-900 text-center p-6">
            <h1 className="text-3xl font-bold mb-4">
                Test Expired
            </h1>
            <p className="text-lg mb-4">
                The test you are looking for has expired. Please contact your administrator for further assistance.
            </p>
            <a href="/" className="bg-blue-500 text-white py-2 px-4 rounded">
                Go to Homepage
            </a>
        </div>
    );
};

export default TestExpired;
