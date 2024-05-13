import SendTokenForm from '@/components/SendTokenForm';

export default function Home() {
  return (
    <main className='flex flex-col items-center justify-between p-24'>
      <SendTokenForm className='border p-10 rounded-lg lg:w-1/3 md:w-2/3 w-full' />
    </main>
  );
}
