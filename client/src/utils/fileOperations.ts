import toast from "react-hot-toast";

export const isMoreThanOneFile = (length: number | undefined) => ((length ?? 0) > 1) ? true : false;


export const validateXlsxFile = (file: File, setFile: (file: File) => void) => {
    const allowedTypes = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
    if (allowedTypes.includes(file.type)) {
        setFile(file);
    } else {
        return toast.error("Please upload a XLSX file");
    }
};