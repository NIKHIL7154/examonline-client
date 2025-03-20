import { cloneElement, createContext, useContext, useState, ReactNode, ReactElement } from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import styled from "styled-components";
import useOutsideClick from "../hooks/useOutsideClick";

// Styled components
const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: oklch(0.985 0 0);
  border: 1px solid rgba(226, 226, 226, 0.182);
  border-radius: 12px;
  box-shadow: 0 1.5rem 2.5rem rgba(130, 130, 130, 0.203);
  padding: 2rem 2.5rem;
  transition: all 0.5s;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.35rem;
  border-radius: 0.45rem;
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 0.5rem;
  right: 1.2rem;
  cursor: pointer;
  &:hover {
    background-color: oklch(0.928 0.006 264.531);
  }

  & svg {
    width: 1.4rem;
    height: 1.4rem;
    color: oklch(0.551 0.027 264.364);
  }
`;

// Modal Context
interface ModalContextProps {
    openName: string;
    close: () => void;
    open: (name: string) => void;
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

// Modal component
interface ModalProps {
    children: ReactNode;
}

function Modal({ children }: ModalProps) {
    const [openName, setOpenName] = useState<string>("");

    const close = () => setOpenName("");
    const open = (name: string) => setOpenName(name);

    return (
        <ModalContext.Provider value={{ openName, close, open }}>
            {children}
        </ModalContext.Provider>
    );
}

// Window component
interface WindowProps {
    children: ReactElement<{ onCloseModal: () => void }>;
    name: string;
}

function Window({ children, name }: WindowProps) {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error("Window must be used within a Modal");
    }

    const { openName, close } = context;
    const ref = useOutsideClick(close) as React.RefObject<HTMLDivElement>;

    if (name !== openName) return null;

    return createPortal(
        <Overlay >
            <StyledModal className="styled-modal" ref={ref}>
                <Button onClick={close}><HiXMark /></Button>
                <div>
                    {cloneElement(children, { onCloseModal: close })}
                </div>
            </StyledModal>
        </Overlay>,
        document.body
    );
}

// Open component
interface OpenProps {
    children: ReactElement<{ onClick: () => void }>;
    opens: string;
}

function Open({ children, opens }: OpenProps) {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error("Open must be used within a Modal");
    }

    const { open } = context;

    return cloneElement(children, { onClick: () => open(opens) });
}

// Export Modal components
Modal.Open = Open;
Modal.Window = Window;

export default Modal;
