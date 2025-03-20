import classNames from 'classnames';
interface RowProps {
    type?: 'horizontal' | 'vertical';
    children: React.ReactNode;
}

function Row({ type = "vertical", children }: RowProps) {
    const rowClass = classNames('flex', {
        'justify-between items-center': type === 'horizontal',
        'flex-col gap-4': type === 'vertical', 
    });

    return (
        <div className={rowClass}> {children} </div>
    );
}

export default Row;
