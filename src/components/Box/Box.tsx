import React, { memo } from 'react'

interface Props {
    backgroundColor: string
}

const Box = ({ backgroundColor } : Props) => {
    return (
        <div className="cell-container" style={{backgroundColor: backgroundColor}}> 
        </div>
    )
}

export default memo(Box);
