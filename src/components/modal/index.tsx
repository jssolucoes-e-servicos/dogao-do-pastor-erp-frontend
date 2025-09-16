'use client';

import React from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

export function Modal({ isOpen, onClose, children }: ModalProps) {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-xl max-h-[90vh] overflow-y-auto relative">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-2xl font-bold"
                >
                    &times;
                </button>
                {children}
            </div>
        </div>
    );
}