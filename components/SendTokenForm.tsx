'use client';

import { forwardRef, type FormHTMLAttributes } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import {
  useAccount,
  useSendTransaction,
  useWaitForTransactionReceipt,
  type BaseError,
} from 'wagmi';
import { Address, isAddress, parseEther } from 'viem';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import { cn } from '@/lib/utils';
import ConnectButton from './ConnectButton';
import Balance from './Balance';

const formSchema = z.object({
  walletAddress: z.custom<Address>(isAddress, 'Invalid wallet address'),
  amount: z.coerce.number().gt(0, 'Amount must be a positive number'),
});

export interface FormProps extends FormHTMLAttributes<HTMLFormElement> {}

const SendTokenForm = forwardRef<HTMLFormElement, FormProps>(
  ({ className, ...props }, ref) => {
    const { isConnected, address } = useAccount();
    const { data: hash, sendTransaction, isPending } = useSendTransaction();

    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        walletAddress: undefined,
        amount: 0,
      },
    });

    const onSubmit = (values: z.infer<typeof formSchema>) => {
      sendTransaction({
        to: values.walletAddress,
        value: parseEther(String(values.amount)),
      });
    };

    const { isLoading: isConfirming, isSuccess: isConfirmed } =
      useWaitForTransactionReceipt({
        hash,
      });

    const amount = form.watch('amount');

    return (
      <Form {...form}>
        <form
          ref={ref}
          onSubmit={form.handleSubmit(onSubmit)}
          className={cn(className, 'space-y-8')}
          {...props}
        >
          <FormField
            control={form.control}
            name='walletAddress'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Send To</FormLabel>
                <FormControl>
                  <Input placeholder='Enter 0x Address' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='amount'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount</FormLabel>
                <div className='flex bg-slate-800 p-2 rounded'>
                  <div className='flex items-center gap-2 mr-4'>
                    <span className=' w-8 h-8 rounded-full font-bold bg-red-500 items-center justify-center flex'>
                      A
                    </span>
                    <span>AVAX</span>
                  </div>
                  <FormControl>
                    <Input placeholder='0' {...field} />
                  </FormControl>
                </div>

                <FormDescription className='text-right'>
                  <Balance amount={amount} address={address} />
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {isConnected ? (
            <Button disabled={isPending} className='w-full' type='submit'>
              {isPending ? 'Confirming...' : 'Send'}
            </Button>
          ) : (
            <ConnectButton />
          )}
          {isConfirming && (
            <div className='flex py-4 text-sm text-yellow-500 justify-center'>
              Waiting for confirmation...
            </div>
          )}
          {isConfirmed && (
            <div className='flex py-4 text-sm text-green-500 justify-center w-full'>
              Transaction confirmed.
            </div>
          )}
        </form>
        {hash && (
          <div className='py-4 text-sm text-slate-400'>Txn Hash: {hash}</div>
        )}
      </Form>
    );
  }
);

SendTokenForm.displayName = 'SendTokenForm';

export default SendTokenForm;
