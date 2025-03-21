// import styled from "styled-components";
// import Button from "./Button";

// const StyledConfirmDelete = styled.div`
//   width: 40rem;
//   display: flex;
//   flex-direction: column;
//   gap: 1.2rem;

//   & p {
//     color: var(--color-grey-500);
//     margin-bottom: 1.2rem;
//   }

//   & div {
//     display: flex;
//     justify-content: flex-end;
//     gap: 1.2rem;
//   }
// `;

interface Props {
    resourceName: string;
    onConfirm: () => void;
    disabled: boolean;
    onCloseModal?: () => void;
}

function ConfirmActivate({ resourceName, onConfirm, disabled, onCloseModal }: Props) {
    return (
        <div className=" w-100 flex flex-col gap-[0.8rem] poppins-regular">
            <h3 className="text-xl font-medium text-gray-700">Activate {resourceName}</h3>
            <p className="text-gray-600 mb-[1.2rem]">
                Are you sure you want to activate this {resourceName}? This
                action will trigger the sharing of test links to participants via email.
            </p>

            <div className="flex justify-end gap-[1.2rem]">
                <button className="hover:text-zinc-400 cursor-pointer" disabled={disabled} onClick={onCloseModal}>
                    Cancel
                </button>
                <button className="text-green-500 cursor-pointer hover:text-emerald-400" disabled={disabled} onClick={onConfirm}>
                    Activate
                </button>
            </div>
        </div>
    );
}

export default ConfirmActivate;