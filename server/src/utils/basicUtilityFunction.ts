
const clientUrl = (process.env.NODE_ENV === "production")
        ? process.env.PROD_CLIENT
        : process.env.DEV_CLIENT;

function formatDate(date: Date) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
    return date.toLocaleString('en-US', options as any);
}

function formatDateUTC(dateInput: Date | string): string {
    // Convert string to Date if necessary
    const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;

    // Check if the date is valid
    if (isNaN(date.getTime())) {
        throw new Error('Invalid date');
    }

    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone; // Automatically get user's time zone
    const options: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
        timeZone: userTimeZone, // Set the time zone
    };

    const formattedDate = date.toLocaleString('en-US', options);

    // Calculate UTC offset
    const utcOffset = date.getTimezoneOffset();
    const offsetHours = Math.floor(Math.abs(utcOffset) / 60);
    const offsetMinutes = Math.abs(utcOffset) % 60;
    const sign = utcOffset > 0 ? '-' : '+';
    const utcString = `UTC ${sign}${String(offsetHours).padStart(2, '0')}:${String(offsetMinutes).padStart(2, '0')}`;

    return `${formattedDate}, ${utcString}, ${userTimeZone}`;
}

export {
    clientUrl,
    formatDate,
    formatDateUTC,
}