import { useContextSelector } from 'use-context-selector'
import { TransactionsContext } from '../contexts/TransactionsContext'
import { useMemo } from 'react'

export function useSummary() {
  const transacitions = useContextSelector(TransactionsContext, (context) => {
    return context.transacitions
  })

  const summary = useMemo(() => {
    return transacitions.reduce(
      (acc, trans) => {
        if (trans.type === 'income') {
          acc.income += trans.price
          acc.total += trans.price
        } else {
          acc.outcome += trans.price
          acc.total -= trans.price
        }

        return acc
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    )
  }, [transacitions])

  return summary
}
