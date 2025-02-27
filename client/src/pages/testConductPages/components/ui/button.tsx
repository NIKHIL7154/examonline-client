import type React from "react"
export const Button = ({
    children,
    className,
    size,
    variant,
    disabled,

}: { children: React.ReactNode; className?: string; size?: string; variant?:string; disabled?:boolean }) => {
    let fontSize = "text-base"
    let padding = "px-4 py-2"
    const variantStyle: { [key: string]: string } = {
        "":"",
        "primary": "bg-green-500 text-white",
        "outline": "border border-green-500 text-green-500",
    }
    if (size === "lg") {
        fontSize = "text-lg"
        padding = "px-6 py-3"
    }

    return <button disabled={disabled} className={`${className} ${fontSize} ${padding} rounded ${variantStyle[variant ?variant:""]}`}>{children}</button>
}
// c="text-base px-4 py-2 bg-green-500 text-white"

