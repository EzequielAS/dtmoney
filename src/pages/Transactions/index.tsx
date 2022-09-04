import { Header } from '../../components/Header'
import { Summary } from '../../components/Summary'
import { dateFormatter, priceFormatter } from '../../utils/formatter'
import { TransactionsContext } from '../../contexts/TransactionsContext'
import { useContextSelector } from 'use-context-selector'
import { SearchForm } from './components/SearchForm'

import {
  PriceHighlight,
  TransactionContainer,
  TransactionContent,
  TransactionsTable,
} from './styles'

export function Transactions() {
  const transacitions = useContextSelector(TransactionsContext, (context) => {
    return context.transacitions
  })

  return (
    <TransactionContainer>
      <Header />
      <Summary />

      <TransactionContent>
        <SearchForm />

        <TransactionsTable>
          <tbody>
            {transacitions.map((transaction) => (
              <tr key={transaction.id}>
                <td>{transaction.description}</td>
                <td>
                  <PriceHighlight variant={transaction.type}>
                    {transaction.type === 'outcome' && '- '}
                    {priceFormatter.format(transaction.price)}
                  </PriceHighlight>
                </td>
                <td>{transaction.category}</td>
                <td>{dateFormatter.format(new Date(transaction.createdAt))}</td>
              </tr>
            ))}
          </tbody>
        </TransactionsTable>
      </TransactionContent>
    </TransactionContainer>
  )
}
