type Props = {
  amount: number
}

export default function TotalSummary({ amount }: Props) {
    
    const formattedAmount = new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0
    }).format(amount)
    
    return (
        <div className="p-4 bg-base-200 rounded-box shadow text-center">
            <p className="text-lg font-medium">Current month total:</p>
            <p className="text-2xl font-bold text-primary">{formattedAmount}</p>
        </div>
    )
}