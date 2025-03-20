import classNames from "classnames";

interface TagProps {
    type: "pending" | "active" | "completed" | "stale"; 
    size?: "default" | "lg";
}   

function Tag({ type, size="default" }: TagProps) {
    const twClassNames = classNames(
        " font-medium rounded-full ",
        {
            "bg-red-100 text-red-700": type === "pending",
            "bg-emerald-100 text-green-700": type === "active", 
            "bg-zinc-200 text-zinc-600": type === "completed", 
            "bg-zinc-200 text-zinc-500": type === "stale", 
            "px-2 py-0.5 text-[0.8rem]": size === "default",
            "px-2 py-0.5 text-[0.85rem]": size === "lg" 
        }
    );

    return (
        <span className={twClassNames}>
            {type} {/* Optionally display the type */}
        </span>
    );
}

export default Tag;