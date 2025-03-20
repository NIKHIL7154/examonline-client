function Empty({ resourceName }: {resourceName : string}) {
    return <p className="flex justify-center text-gray-600">No {resourceName} could be found.</p>;
  }
  
  export default Empty;