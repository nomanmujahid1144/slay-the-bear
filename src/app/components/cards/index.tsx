import { ReactNode } from "react"

interface DefaultCardProps {
    children: ReactNode;
    className?: string;
}

export const DefaultCard = ({ children, className = '' }: DefaultCardProps) => {
    return (
        <div className={`db-activity-card ${className}`}>
            {children}
        </div>
    )
}