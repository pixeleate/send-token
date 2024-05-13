import { cn } from '@/lib/utils';
import { type Address } from 'viem';
import { useBalance } from 'wagmi';

interface BalanceProps {
  amount?: number;
  address?: Address;
}

const Balance = ({ amount = 0, address }: BalanceProps) => {
  const { data: balance } = useBalance({
    address: address,
  });

  return balance ? (
    <span
      className={cn('text-xs', {
        'text-red-500': parseFloat(balance?.formatted) < amount,
        'text-slate-500': parseFloat(balance?.formatted) >= amount,
      })}
    >
      {parseFloat(balance?.formatted) > amount
        ? `Balance: ${balance?.formatted} ${balance?.symbol}`
        : `Insuficient balance: ${balance?.formatted} ${balance?.symbol} (may not be enough to cover gas fees)`}
    </span>
  ) : null;
};

export default Balance;
