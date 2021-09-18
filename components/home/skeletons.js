import React from 'react';
import styled from 'styled-components';

const SkeletonTd = styled.td`
    height: 24px;
`;

const SkeletonTdContent = styled.div`
    height: 100%;

    box-shadow: 0 4px 10px 0 rgba(33, 33, 33, 0.15);
    border-radius: 4px;
    position: relative;
    overflow: hidden;

    ::before {
        content: '';
        display: block;
        position: absolute;
        left: -150px;
        top: 0;
        height: 100%;
        width: 150px;
        background: linear-gradient(to right, transparent 0%, #d8d8d8 50%, transparent 100%);
        animation: load 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    }

    @keyframes load {
        from {
            left: -150px;
        }
        to {
            left: 100%;
        }
    }
`;

export const RowSkeleton = ({numberOfColumns}) => (
    <tr>
        {Array.from({length: numberOfColumns}, () => (
            <SkeletonTd style={{padding: 0}}>
                <SkeletonTdContent />
            </SkeletonTd>
        ))}
    </tr>
);
