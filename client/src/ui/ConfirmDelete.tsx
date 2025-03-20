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

function ConfirmDelete({ resourceName, onConfirm, disabled, onCloseModal }: Props) {
    return (
        <div className=" w-100 flex flex-col gap-[0.8rem] poppins-regular">
            <h3 className="text-xl font-medium text-gray-700">Delete {resourceName}</h3>
            <p className="text-gray-600 mb-[1.2rem]">
                Are you sure you want to delete this {resourceName} permanently? This
                action cannot be undone.
            </p>

            <div className="flex justify-end gap-[1.2rem]">
                <button className="hover:text-zinc-400 cursor-pointer" disabled={disabled} onClick={onCloseModal}>
                    Cancel
                </button>
                <button className="text-red-600 cursor-pointer hover:text-red-400" disabled={disabled} onClick={onConfirm}>
                    Delete
                </button>
            </div>
        </div>
    );
}

export default ConfirmDelete;