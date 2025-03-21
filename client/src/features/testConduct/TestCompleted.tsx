

const TestCompleted = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-green-50">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                <h1 className="text-4xl font-bold text-green-600 mb-4">Test Completed</h1>
                <p className="text-lg text-gray-700 mb-6">You have successfully completed the test. You can now close this window.</p>
                <button 
                    className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition duration-300"
                >
                    Close Window
                </button>
            </div>
        </div>
    )
}

export default TestCompleted