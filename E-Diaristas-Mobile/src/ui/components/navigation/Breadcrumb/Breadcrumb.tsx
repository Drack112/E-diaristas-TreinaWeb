import React from 'react';
import { BreadcrumbContainer, BreadcrumbItem } from './Breadcrumb.style';

export interface BreadcrumbProps {
    selected: string;
    items: string[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ selected, items }) => {
    return (
        <BreadcrumbContainer>
            {items.map((item, index) => (
                <BreadcrumbItem key={index} isSelected={selected === item}>
                    {item}
                </BreadcrumbItem>
            ))}
        </BreadcrumbContainer>
    );
};

export default Breadcrumb;
