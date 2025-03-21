export default function getEnvironmentVariable(key: string): string {
    const value = import.meta.env[key];
    if (!value) {
        throw new Error(`Environment variable ${key} not found`);
    }
    return value;
}