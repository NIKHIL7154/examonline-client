import React, { createContext, useContext, useState, ReactNode, MouseEvent } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import useOutsideClick from "../hooks/useOutsideClick";
import { HiDotsVertical } from "react-icons/hi";

// Styled components
const Menu = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
`;

const StyledToggle = styled.button`
    background: none;
    border: none;
    padding: 0.45rem;
    border-radius: 100%;
    transform: translateX(0.8rem);
    transition: all 0.2s;
    cursor: pointer;

    &:hover {
        background-color: oklch(0.928 0.006 264.531);
    }
`;

const StyledList = styled.ul<{ position: { x: number; y: number } }>`
    position: fixed;
    background-color: oklch(0.985 0.002 247.839);
    box-shadow: 0 0 5px oklch(0.872 0.01 258.338);
    border-radius: 0.45rem;
    right: ${(props) => props.position.x}px;
    top: ${(props) => props.position.y}px;
    padding: 0.5rem;
`;

const StyledButton = styled.button`
    width: 100%;
    text-align: left;
    background: none;
    border: none;
    padding: 0.2rem 0.5rem;
    font-size: 1rem;
    transition: all 0.2s;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.6rem;
    border-radius: 0.45rem;
    &:hover {
        background-color: oklch(0.928 0.006 264.531);
  }

  & svg {
    width: 1.3rem;
    height: 1.3rem;
    color: oklch(0.551 0.027 264.364);
    transition: all 0.3s;
  }
`;


// Define the context type
interface MenusContextType {
    openId: string;
    close: () => void;
    open: (id: string) => void;
    position: { x: number; y: number } | null;
    setPosition: React.Dispatch<React.SetStateAction<{ x: number; y: number } | null>>;
}

// Create the context
const MenusContext = createContext<MenusContextType | undefined>(undefined);

// Menus component
interface MenusProps {
    children: ReactNode;
}

function Menus({ children }: MenusProps) {
    const [openId, setOpenId] = useState<string>("");
    const [position, setPosition] = useState<{ x: number; y: number } | null>(null);

    const close = () => setOpenId("");
    const open = (id: string) => setOpenId(id);

    return (
        <MenusContext.Provider value={{ openId, close, open, position, setPosition }}>
            {children}
        </MenusContext.Provider>
    );
}

// Toggle component
interface ToggleProps {
    id: string;
    customButton?: React.ReactElement<React.ButtonHTMLAttributes<HTMLButtonElement>>;
}

function Toggle({ id, customButton }: ToggleProps) {
    const context = useContext(MenusContext);
    if (!context) throw new Error("Toggle must be used within a Menus provider");

    const { openId, close, open, setPosition } = context;

    function handleClick(e: MouseEvent<HTMLButtonElement>) {
        e.stopPropagation();

        const rect = e.currentTarget.getBoundingClientRect();
        setPosition({
            x: window.innerWidth - rect.width - rect.x,
            y: rect.y + rect.height + 8,
        });

        if (openId === "" || openId !== id) {
            open(id);
        } else {
            close();
        }
    }    

    return (
        <>
            {
                customButton
                    ? React.cloneElement(customButton, { onClick: handleClick })
                    : < StyledToggle onClick={handleClick} >
                        <HiDotsVertical className="text-lg text-gray-500" />
                    </ StyledToggle>
            }
        </>
    );
}

// List component
interface ListProps {
    id: string;
    children: ReactNode;
}

function List({ id, children }: ListProps) {
    const context = useContext(MenusContext);
    if (!context) throw new Error("List must be used within a Menus provider");

    const { openId, position, close } = context;
    const ref = useOutsideClick(close, false) as React.RefObject<HTMLUListElement>;

    if (openId !== id) return null;

    return createPortal(
        <StyledList position={position!} ref={ref}>
            {children}
        </StyledList>,
        document.body
    );
}

// Button component
interface ButtonProps {
    children: ReactNode;
    icon?: ReactNode;
    onClick?: () => void;
}

function Button({ children, icon, onClick }: ButtonProps) {
    const context = useContext(MenusContext);
    if (!context) throw new Error("Button must be used within a Menus provider");

    const { close } = context;

    function handleClick() {
        onClick?.();
        close();
    }

    return (
        <li>
            <StyledButton onClick={handleClick}>
                {icon}
                <span>{children}</span>
            </StyledButton>
        </li>
    );
}

// Attach components to Menus
Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;