import React, { useEffect, useState } from 'react';

const useRouteName = () => {
    const [curRoute, setCurRoute] = useState<string>("");

    useEffect(() => {
        const extractRoute = () => {
            const pathSegments = window.location.pathname.split('/');
            return pathSegments[2] || '';
        };

        const initialRoute = extractRoute();
        setCurRoute(initialRoute);

        const intervalRoute = setInterval(() => {
            const currentRoute = extractRoute();
            if (currentRoute !== curRoute) {
                setCurRoute(currentRoute);
            }
        }, 500);

        return () => {
            clearInterval(intervalRoute);
        };
    }, [curRoute]);

    return [curRoute, setCurRoute];
};

export default useRouteName;