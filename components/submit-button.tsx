'use client';

import {useFormStatus} from 'react-dom';
import {Button} from "@mui/material";
import {FC, JSX} from "react";

type Props = {
    children: React.ReactNode
}
export const SubmitButton: FC<Props> = ({children}): JSX.Element => {
    const {pending} = useFormStatus();

    return (
        <Button
            variant='contained'
            type={pending ? 'button' : 'submit'}
            aria-disabled={pending}
            fullWidth
        >
            {children}
            {pending && (
                <svg
                    className="animate-spin ml-2 h-4 w-4 text-black"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                    />
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                </svg>
            )}
            <span aria-live="polite" className="sr-only" role="status">
                {pending ? 'Loading' : 'Submit form'}
              </span>
        </Button>
    );
};