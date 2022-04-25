import React from 'react';

export function TodoButton({ className, buttonContent, onClick , data}) {
    return (
            <button className={ className }
                    onClick={ () => onClick(data) }>
                    { buttonContent }
            </button>
    );
}