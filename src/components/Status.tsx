interface StatusProps{
    status: 'OPEN' | 'IN_PROGRESS' | 'PENDING';
}
export function Status({status}:StatusProps){
    let styleClassName: string = '';
    let statusDisplay: string = '';
    switch(status) {
        case 'OPEN':
            styleClassName = 'text-yellow'
            statusDisplay = 'EM ABERTO'
            break
        case 'IN_PROGRESS':
            styleClassName = 'text-green'
            statusDisplay = 'EM ANDAMENTO'
            break
        case 'PENDING':
            styleClassName = 'text-blue'
            statusDisplay = 'PENDENTE RETORNO'
            break
        default:
            ''
    }
    
    return <span className={styleClassName}>
        {statusDisplay}
    </span>
}